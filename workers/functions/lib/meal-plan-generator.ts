import { calculateRecipeMacros, type MacroTargets, resolveMacroTargets, type TypeIDString } from '@macromaxxing/db'
import { TRPCError } from '@trpc/server'
import { Output } from 'ai'
import { generateTextWithFallback } from './ai-utils'
import {
	batchGeneratedRecipeSchema,
	buildBatchGenerateRecipePrompt,
	type GeneratedRecipe,
	type LanguageCode
} from './constants'
import { buildGeneratedRecipe, resolveGeneratedIngredients } from './recipe-builder'
import { logMealEntry } from './routes/mealPlans'
import { getDecryptedApiKey } from './routes/settings'
import { trainingHardSetsPerWeek, trainingSessionsPerWeek } from './training-frequency'
import type { TRPCContext } from './trpc'

/**
 * Canonical meal-slot positions — mirrors `dict.dashboard.meals.slots` (`src/lib/i18n/locales/*.ts`),
 * which is the ONLY place this order/count is otherwise encoded (`slotIndex` has no type column in
 * the schema; see `mealPlans.ts`). Kept in this fixed English form for AI-prompt context only — the
 * UI labels the user sees come from the dictionary, never from here.
 *
 * The per-slot share of the day's targets is a UX default split, not a nutrition claim — the user's
 * actual daily kcal/macro targets (`resolveMacroTargets`) are never altered, only distributed.
 */
const MEAL_SLOTS: ReadonlyArray<{ label: string; share: number }> = [
	{ label: 'Breakfast', share: 0.25 },
	{ label: 'Lunch', share: 0.3 },
	{ label: 'Snack', share: 0.1 },
	{ label: 'Dinner', share: 0.35 }
]

/** A generated/reused recipe is scaled to roughly hit its slot's target kcal, clamped to a sane range. */
function clampPortions(raw: number): number {
	if (!Number.isFinite(raw) || raw <= 0) return 1
	const rounded = Math.round(raw * 4) / 4 // nearest 0.25 portion
	return Math.min(3, Math.max(0.5, rounded))
}

interface SlotTarget {
	dayOfWeek: number
	slotIndex: number
	mealLabel: string
	targets: MacroTargets
}

type Placement =
	| { kind: 'reuse'; slot: SlotTarget; recipeId: TypeIDString<'rcp'>; portions: number }
	| { kind: 'generate'; slot: SlotTarget }

export interface GenerateWeekResult {
	planId: TypeIDString<'mpl'>
	slotsFilled: number
	slotsSkippedAlreadyFull: number
	recipesReused: number
	recipesCreated: number
}

type GenerateWeekCtx = {
	db: TRPCContext['db']
	user: { id: string }
	env: { USDA_API_KEY?: string; ENCRYPTION_SECRET?: string }
}

/**
 * Fill every empty slot in a week's meal plan: reuse an existing recipe that already fits the
 * slot's target macros when one qualifies, otherwise batch-generate new recipes with AI (one AI
 * call for all of them, then one more to resolve their ingredients — see `recipe-builder.ts`) and
 * place those. Never touches a slot that already has something in it, never invents a nutrition
 * target (throws if the user hasn't set one, same as `settings.getTargets`), and never invents
 * macros for an ingredient the batch resolution couldn't find.
 */
export async function generateWeek(
	ctx: GenerateWeekCtx,
	input: { planId: TypeIDString<'mpl'>; language: LanguageCode }
): Promise<GenerateWeekResult> {
	const plan = await ctx.db.query.mealPlans.findFirst({
		where: { id: input.planId, userId: ctx.user.id },
		with: { inventory: { with: { slots: true } } }
	})
	if (!plan) throw new TRPCError({ code: 'NOT_FOUND', message: 'Meal plan not found' })

	// Resolve the user's daily macro targets exactly like `settings.getTargets` — never invent numbers.
	const [settingsRow, sessionsPerWeek, hardSetsPerWeek] = await Promise.all([
		ctx.db.query.userSettings.findFirst({ where: { userId: ctx.user.id } }),
		trainingSessionsPerWeek(ctx.db, ctx.user.id),
		trainingHardSetsPerWeek(ctx.db, ctx.user.id)
	])
	const profile = settingsRow && {
		...settingsRow,
		trainingSessionsPerWeek: sessionsPerWeek,
		trainingHardSetsPerWeek: hardSetsPerWeek
	}
	const dailyTargets = profile ? resolveMacroTargets(profile) : null
	if (!dailyTargets) {
		throw new TRPCError({
			code: 'PRECONDITION_FAILED',
			message: 'No nutrition target set. Go to Settings to set a nutrition goal before generating a plan.'
		})
	}

	// Never overwrite a meal the user (or a previous run) already placed.
	const occupied = new Set(plan.inventory.flatMap(inv => inv.slots.map(s => `${s.dayOfWeek}:${s.slotIndex}`)))

	const openSlots: SlotTarget[] = []
	let slotsSkippedAlreadyFull = 0
	for (let day = 0; day < 7; day++) {
		for (let slotIndex = 0; slotIndex < MEAL_SLOTS.length; slotIndex++) {
			if (occupied.has(`${day}:${slotIndex}`)) {
				slotsSkippedAlreadyFull++
				continue
			}
			const { label, share } = MEAL_SLOTS[slotIndex]
			openSlots.push({
				dayOfWeek: day,
				slotIndex,
				mealLabel: label,
				targets: {
					kcal: dailyTargets.kcal * share,
					protein: dailyTargets.protein * share,
					carbs: dailyTargets.carbs * share,
					fat: dailyTargets.fat * share,
					fiber: dailyTargets.fiber * share
				}
			})
		}
	}

	if (openSlots.length === 0) {
		return { planId: plan.id, slotsFilled: 0, slotsSkippedAlreadyFull, recipesReused: 0, recipesCreated: 0 }
	}

	// --- Step 1: try to reuse an existing recipe that already fits, before generating anything new ---
	const library = await ctx.db.query.recipes.findMany({
		where: { userId: ctx.user.id },
		with: {
			recipeIngredients: {
				with: {
					ingredient: true,
					subrecipe: { with: { recipeIngredients: { with: { ingredient: true } } } }
				}
			}
		}
	})
	const priced = library
		.map(recipe => ({ recipe, macros: calculateRecipeMacros(recipe) }))
		.filter(p => p.macros.portion.kcal > 0)

	const KCAL_TOLERANCE = 0.25 // within ±25% of the slot's target kcal counts as "already fits"
	const usageCount = new Map<TypeIDString<'rcp'>, number>()
	const placements: Placement[] = []

	for (const slot of openSlots) {
		const candidates = priced.filter(
			p => Math.abs(p.macros.portion.kcal - slot.targets.kcal) / slot.targets.kcal <= KCAL_TOLERANCE
		)
		if (candidates.length === 0) {
			placements.push({ kind: 'generate', slot })
			continue
		}
		// Prefer whichever qualifying recipe has been used least so far this run, for variety —
		// the user's confirmed "reuse first, round-robin among matches" algorithm.
		candidates.sort((a, b) => {
			const usageDiff = (usageCount.get(a.recipe.id) ?? 0) - (usageCount.get(b.recipe.id) ?? 0)
			if (usageDiff !== 0) return usageDiff
			return (
				Math.abs(a.macros.portion.kcal - slot.targets.kcal) -
				Math.abs(b.macros.portion.kcal - slot.targets.kcal)
			)
		})
		const chosen = candidates[0]
		usageCount.set(chosen.recipe.id, (usageCount.get(chosen.recipe.id) ?? 0) + 1)
		placements.push({
			kind: 'reuse',
			slot,
			recipeId: chosen.recipe.id,
			portions: clampPortions(slot.targets.kcal / chosen.macros.portion.kcal)
		})
	}

	// --- Step 2: batch-generate every slot that had no existing match, in as few AI calls as possible ---
	const toGenerate = placements.filter((p): p is Extract<Placement, { kind: 'generate' }> => p.kind === 'generate')
	let generatedRecipes: GeneratedRecipe[] = []
	if (toGenerate.length > 0) {
		const encryptionSecret = ctx.env.ENCRYPTION_SECRET
		if (!encryptionSecret) {
			throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'ENCRYPTION_SECRET not configured' })
		}
		const settings = await getDecryptedApiKey(ctx.db, ctx.user.id, encryptionSecret)
		if (!settings) {
			throw new TRPCError({
				code: 'PRECONDITION_FAILED',
				message: 'No AI provider configured. Go to Settings to add your API key.'
			})
		}

		const { output } = await generateTextWithFallback({
			provider: settings.provider,
			apiKey: settings.apiKey,
			output: Output.object({ schema: batchGeneratedRecipeSchema }),
			prompt: buildBatchGenerateRecipePrompt(
				toGenerate.map(p => ({
					mealLabel: p.slot.mealLabel,
					targetKcal: p.slot.targets.kcal,
					targetProtein: p.slot.targets.protein
				})),
				input.language
			),
			fallback: settings.modelFallback
		})
		generatedRecipes = output
	}

	// --- Step 3: resolve every new ingredient in ONE batch call, then persist each generated recipe ---
	const ingredientMap = await resolveGeneratedIngredients(ctx, generatedRecipes)
	const built: { recipeId: TypeIDString<'rcp'>; portionKcal: number }[] = []
	for (const generated of generatedRecipes) {
		const { recipe, macros } = await buildGeneratedRecipe(ctx, generated, ingredientMap)
		built.push({ recipeId: recipe.id, portionKcal: macros.portion.kcal })
	}

	// --- Step 4: place every slot into the plan ---
	let generatedIndex = 0
	let recipesReused = 0
	let recipesCreated = 0
	for (const placement of placements) {
		if (placement.kind === 'reuse') {
			await logMealEntry(ctx, {
				planId: plan.id,
				dayOfWeek: placement.slot.dayOfWeek,
				slotIndex: placement.slot.slotIndex,
				entry: { kind: 'recipe', recipeId: placement.recipeId, portions: placement.portions }
			})
			recipesReused++
			continue
		}

		// One `toGenerate` placement per `generatedRecipes` entry, same order — but if the AI
		// returned fewer recipes than requested, skip the remainder rather than invent one.
		const builtRecipe = built[generatedIndex]
		generatedIndex++
		if (!builtRecipe) continue

		const portions = clampPortions(
			builtRecipe.portionKcal > 0 ? placement.slot.targets.kcal / builtRecipe.portionKcal : 1
		)
		await logMealEntry(ctx, {
			planId: plan.id,
			dayOfWeek: placement.slot.dayOfWeek,
			slotIndex: placement.slot.slotIndex,
			entry: { kind: 'recipe', recipeId: builtRecipe.recipeId, portions }
		})
		recipesCreated++
	}

	return {
		planId: plan.id,
		slotsFilled: recipesReused + recipesCreated,
		slotsSkippedAlreadyFull,
		recipesReused,
		recipesCreated
	}
}
