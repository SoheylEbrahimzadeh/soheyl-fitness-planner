import {
	calculateRecipeMacros,
	type RecipeMacros,
	recipeIngredients,
	recipes,
	resolveUnitGrams
} from '@macromaxxing/db'
import type { GeneratedRecipe } from './constants'
import { batchFindOrCreateIngredients } from './routes/ingredients'
import type { TRPCContext } from './trpc'
import { normalizeIngredientName } from './utils'

type ResolveCtx = {
	db: TRPCContext['db']
	user: { id: string }
	env: { USDA_API_KEY?: string; ENCRYPTION_SECRET?: string }
}

type ResolvedIngredient = Awaited<ReturnType<typeof batchFindOrCreateIngredients>>[number]['ingredient']

/**
 * Resolve every distinct ingredient name used across a batch of AI-generated recipes in ONE
 * `batchFindOrCreateIngredients` call (which itself does at most one AI call for whatever isn't
 * already in the library), instead of one resolution call per recipe. `meal-plan-generator.ts`
 * calls this once for the whole week, then passes the map into `buildGeneratedRecipe` per recipe —
 * this is what keeps `generateWeek` at roughly two AI calls total regardless of how many meals it
 * fills.
 *
 * Keyed by `normalizeIngredientName(...).toLowerCase()` rather than by array position:
 * `batchFindOrCreateIngredients` drops names it could not resolve at all (see its own comments),
 * which would silently shift a positional mapping. A name missing from the returned map means it
 * could not be resolved — `buildGeneratedRecipe` skips that ingredient line rather than inventing
 * a value for it.
 */
export async function resolveGeneratedIngredients(
	ctx: ResolveCtx,
	generatedRecipes: GeneratedRecipe[]
): Promise<Map<string, ResolvedIngredient>> {
	const namesByKey = new Map<string, string>()
	for (const recipe of generatedRecipes) {
		for (const ing of recipe.ingredients) {
			const key = normalizeIngredientName(ing.name).toLowerCase()
			if (!namesByKey.has(key)) namesByKey.set(key, ing.name)
		}
	}
	if (namesByKey.size === 0) return new Map()

	const resolved = await batchFindOrCreateIngredients(ctx, Array.from(namesByKey.values()))
	return new Map(resolved.map(r => [r.ingredient.name.toLowerCase(), r.ingredient]))
}

/**
 * Persist one AI-generated recipe as a real recipe + recipeIngredients rows, mirroring
 * `recipe.create` + `recipe.addIngredient` (routes/recipes.ts) and the `resolveGrams` logic in
 * `RecipeImportDialog.tsx` — but in-process, no tRPC round trip, so the weekly generator can place
 * a recipe straight into a meal-plan slot afterward without bouncing through the browser.
 *
 * `ingredientMap` must already hold every ingredient this recipe needs — build it once for the
 * whole batch with `resolveGeneratedIngredients` first. An ingredient name missing from the map
 * (resolution failed) is skipped rather than inserted with invented macros.
 */
export async function buildGeneratedRecipe(
	ctx: { db: TRPCContext['db']; user: { id: string } },
	generated: GeneratedRecipe,
	ingredientMap: Map<string, ResolvedIngredient>
): Promise<{ recipe: NonNullable<Awaited<ReturnType<typeof loadFullRecipe>>>; macros: RecipeMacros }> {
	const now = Date.now()

	const [recipe] = await ctx.db
		.insert(recipes)
		.values({
			userId: ctx.user.id,
			name: generated.name,
			instructions: generated.instructions,
			prepTimeMinutes: generated.prepTimeMinutes ?? null,
			createdAt: now,
			updatedAt: now
		})
		.returning()

	const rows = generated.ingredients
		.map((ing, i) => {
			const ingredient = ingredientMap.get(normalizeIngredientName(ing.name).toLowerCase())
			if (!ingredient) {
				console.warn('generated_recipe_ingredient_unresolved', { recipeId: recipe.id, name: ing.name })
				return null
			}

			const unit = ing.unit.trim().toLowerCase()
			let amountGrams: number
			let displayUnit: string | null = null
			let displayAmount: number | null = null
			if (unit === 'g') {
				amountGrams = ing.amount
			} else {
				const grams = resolveUnitGrams(ing.unit, ingredient.units, ingredient.density)
				if (grams != null) {
					amountGrams = ing.amount * grams
					displayUnit = ing.unit
					displayAmount = ing.amount
				} else {
					// Unknown unit for this ingredient — fall back to reading the number as grams
					// rather than dropping the ingredient outright.
					amountGrams = ing.amount
				}
			}

			return {
				recipeId: recipe.id,
				ingredientId: ingredient.id,
				amountGrams,
				displayUnit,
				displayAmount,
				preparation: ing.preparation ?? null,
				sortOrder: i
			}
		})
		.filter((row): row is NonNullable<typeof row> => row !== null)

	if (rows.length > 0) {
		await ctx.db.insert(recipeIngredients).values(rows)
	}

	const fullRecipe = await loadFullRecipe(ctx, recipe.id)
	if (!fullRecipe) throw new Error('Failed to load newly created recipe')

	const macros = calculateRecipeMacros(fullRecipe)
	return { recipe: fullRecipe, macros }
}

function loadFullRecipe(ctx: { db: TRPCContext['db'] }, recipeId: (typeof recipes.$inferSelect)['id']) {
	return ctx.db.query.recipes.findFirst({
		where: { id: recipeId },
		with: {
			recipeIngredients: {
				with: {
					ingredient: true,
					subrecipe: { with: { recipeIngredients: { with: { ingredient: true } } } }
				},
				orderBy: { sortOrder: 'asc' }
			}
		}
	})
}
