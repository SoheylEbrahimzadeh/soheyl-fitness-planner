import type { AiProvider } from '@macromaxxing/db'
import z from 'zod'

export const macroSchema = z.object({
	protein: z.number().describe('Protein in grams per 100g'),
	carbs: z.number().describe('Carbohydrates in grams per 100g'),
	fat: z.number().describe('Fat in grams per 100g'),
	kcal: z.number().describe('Calories per 100g'),
	fiber: z.number().describe('Fiber in grams per 100g')
})

export const unitSchema = z.object({
	name: z.string().describe("Unit name: 'tbsp', 'tsp', 'cup', 'pcs', 'medium', 'large', 'scoop', etc."),
	grams: z
		.number()
		.describe(
			'Edible weight in grams per 1 unit, on the same basis as the per-100g macros — skin, peel, pit, shell, bone and rind excluded (1 pcs avocado ≈ 140g of flesh, not the ~200g whole fruit)'
		),
	isDefault: z.boolean().describe('true for the most natural unit (e.g., "pcs" for eggs, "g" for flour)')
})

export const ingredientAiSchema = z.object({
	protein: z.number().describe('Protein in grams per 100g'),
	carbs: z.number().describe('Carbohydrates in grams per 100g'),
	fat: z.number().describe('Fat in grams per 100g'),
	kcal: z.number().describe('Calories per 100g'),
	fiber: z.number().describe('Fiber in grams per 100g'),
	density: z.number().nullable().describe('g/ml for liquids and powders, null for solid items'),
	units: z.array(unitSchema).describe('Common units for measuring this ingredient with gram equivalents')
})

export const cookedWeightSchema = z.object({
	cookedWeight: z.number().describe('Estimated cooked weight in grams after typical cooking')
})

export const parsedRecipeSchema = z.object({
	name: z.string().describe('Recipe name/title'),
	ingredients: z
		.array(
			z.object({
				name: z
					.string()
					.describe(
						'Ingredient name without preparation descriptors, e.g. "flour", "chicken breast", "garlic cloves"'
					),
				amount: z.number().describe('Numeric amount'),
				unit: z
					.string()
					.describe(
						'Unit: "g", "tbsp", "cup", "pcs", "large", "medium", "small", "ml", "dl", "tsp", "scoop", etc.'
					),
				preparation: z
					.string()
					.nullable()
					.describe(
						'Preparation method stripped from name, e.g. "minced", "finely chopped", "diced". null if none'
					)
			})
		)
		.describe('List of ingredients with amounts'),
	instructions: z.string().describe('Cooking instructions as plain text, preserving step numbering'),
	servings: z.number().nullable().describe('Number of servings/portions, null if not specified'),
	imageUrl: z.url().nullable().describe('URL of the main recipe image if visible on the page')
})

export const MODELS: Record<AiProvider, string> = {
	gemini: 'gemini-3-flash-preview',
	openai: 'gpt-4o-mini',
	anthropic: 'claude-3-5-haiku-20241022'
}

export const FALLBACK_MODELS: Record<AiProvider, string[]> = {
	gemini: ['gemini-2.5-flash', 'gemini-2.5-flash-lite-preview', 'gemma-3-27b-it'],
	openai: [],
	anthropic: []
}

export const parsedProductSchema = z.object({
	name: z.string(),
	servingSize: z.number().describe('Serving size in grams (total product weight if single serving)'),
	servings: z.number().nullable().describe('Servings per container, default 1 if not stated'),
	protein: z.number().describe('Protein per serving in grams'),
	carbs: z.number().describe('Carbs per serving in grams'),
	fat: z.number().describe('Fat per serving in grams'),
	kcal: z.number().describe('Calories per serving'),
	fiber: z.number().describe('Fiber per serving in grams')
})

export const batchIngredientAiSchema = z.array(
	z.object({
		name: z.string().describe('Ingredient name exactly as provided in the input'),
		protein: z.number().describe('Protein in grams per 100g'),
		carbs: z.number().describe('Carbohydrates in grams per 100g'),
		fat: z.number().describe('Fat in grams per 100g'),
		kcal: z.number().describe('Calories per 100g'),
		fiber: z.number().describe('Fiber in grams per 100g'),
		density: z.number().nullable().describe('g/ml for liquids and powders, null for solid items'),
		units: z.array(unitSchema).describe('Common units for measuring this ingredient with gram equivalents')
	})
)

export const RECIPE_AI_PROMPT = `
Parse this recipe into structured data.
Extract the recipe name, all ingredients with numeric amounts and units (use metric where possible: g, ml, dl, tbsp, tsp, cup, pcs, large, medium, small),
cooking instructions as numbered steps, and number of servings.

For each ingredient, separate the base ingredient name from any preparation method:
- "1 red onion, finely chopped" → name: "Red Onion", amount: 1, unit: "pcs", preparation: "finely chopped"
- "3 garlic cloves, crushed" → name: "Garlic Cloves", amount: 3, unit: "pcs", preparation: "crushed"
- "200g bag of spinach" → name: "Spinach", amount: 200, unit: "g", preparation: null
- "400g sweet potatoes, cut into chunks" → name: "Sweet Potatoes", amount: 400, unit: "g", preparation: "cut into chunks"
Do not include preparation words, serving instructions, or package descriptions in the ingredient name.`

export const generatedInstructionsSchema = z.object({
	instructions: z
		.string()
		.describe('Cooking instructions as a markdown numbered list. Each step on its own line: "1. Step\\n2. Step"')
})

export const GENERATE_INSTRUCTIONS_PROMPT = `Generate cooking instructions for a recipe with the given ingredients.
Return a markdown numbered list with each step on its own line, separated by newlines.
Be concise and practical — focus on the cooking process, not obvious prep like "gather ingredients".
Use metric measurements when referencing ingredient amounts.

Example format:
1. Heat oil in a pan over medium heat.
2. Add onion and cook for 5 minutes.
3. Stir in garlic and cook for 1 minute.`

// --- AI recipe generation (new recipe from scratch, not parsed from existing text) ---

/**
 * Supported UI languages (mirrors `LanguageCode` in `src/lib/i18n/types.ts`). Kept as a separate,
 * backend-local literal rather than importing from `src/` — workers/ cannot import frontend code,
 * same reason `@macromaxxing/db/macros` was pulled out for `recipe.search` to use server-side.
 */
export const zLanguageCode = z.enum(['en', 'fa', 'de', 'fr'])
export type LanguageCode = z.infer<typeof zLanguageCode>

export const LANGUAGE_NAMES: Record<LanguageCode, string> = {
	en: 'English',
	fa: 'Persian (Farsi)',
	de: 'German',
	fr: 'French'
}

const generatedRecipeIngredientSchema = z.object({
	name: z
		.string()
		.describe(
			'Ingredient name in ENGLISH ONLY, without preparation descriptors, e.g. "chicken breast", "garlic cloves". Used to look up or create the ingredient in the nutrition database — must stay in English regardless of the requested output language so it matches the existing English-only ingredient library and USDA data.'
		),
	displayName: z
		.string()
		.describe(
			'The same ingredient, as it should be shown to the user, translated into the requested output language. May equal `name` for English output.'
		),
	amount: z.number().describe('Numeric amount'),
	unit: z
		.string()
		.describe('Unit: "g", "tbsp", "cup", "pcs", "large", "medium", "small", "ml", "dl", "tsp", "scoop", etc.'),
	preparation: z
		.string()
		.nullable()
		.describe('Preparation method stripped from the name, e.g. "minced", "diced". null if none.')
})

export const generatedRecipeSchema = z.object({
	name: z.string().describe('Recipe name/title, in the requested output language'),
	ingredients: z.array(generatedRecipeIngredientSchema).describe('List of ingredients with amounts'),
	instructions: z
		.string()
		.describe('Cooking instructions as a markdown numbered list, in the requested output language'),
	servings: z.number().positive().describe('Number of servings/portions this recipe makes'),
	prepTimeMinutes: z.number().positive().nullable().describe('Total prep + cook time in minutes, null if unsure')
})

export type GeneratedRecipe = z.infer<typeof generatedRecipeSchema>

export const batchGeneratedRecipeSchema = z.array(generatedRecipeSchema)

/**
 * `targetKcal`/`targetProtein` steer the recipe toward a calorie/protein band without pretending
 * AI nutrition estimates are exact — the actual macros are still priced from the resolved
 * ingredients afterward (see `recipe-builder.ts`), same as every other recipe in this app.
 */
export function buildGenerateRecipePrompt(params: {
	language: LanguageCode
	mealLabel: string
	targetKcal: number | null
	targetProtein: number | null
	excludeNames?: string[]
}): string {
	const languageName = LANGUAGE_NAMES[params.language]
	const targetLine =
		params.targetKcal != null
			? `Target roughly ${Math.round(params.targetKcal)} kcal${params.targetProtein != null ? ` and ${Math.round(params.targetProtein)}g protein` : ''} per serving.`
			: ''
	const excludeLine = params.excludeNames?.length
		? `Avoid repeating these recipes already used this week: ${params.excludeNames.join(', ')}.`
		: ''

	return `Invent a complete, realistic ${params.mealLabel} recipe.
${targetLine}
${excludeLine}
Write the recipe name, instructions, and each ingredient's displayName in ${languageName}.
Each ingredient's "name" field (used for database lookup) MUST stay in English regardless of the output language.
Extract numeric amounts and units (use metric where possible: g, ml, dl, tbsp, tsp, cup, pcs, large, medium, small).
Separate the base ingredient name from any preparation method (e.g. "onion, finely chopped" -> name: "onion", preparation: "finely chopped").
Give practical, numbered cooking instructions.`
}

export function buildBatchGenerateRecipePrompt(
	items: Array<{ mealLabel: string; targetKcal: number | null; targetProtein: number | null }>,
	language: LanguageCode
): string {
	const languageName = LANGUAGE_NAMES[language]
	const list = items
		.map(
			(it, i) =>
				`${i + 1}. ${it.mealLabel}${it.targetKcal != null ? ` — roughly ${Math.round(it.targetKcal)} kcal${it.targetProtein != null ? `, ${Math.round(it.targetProtein)}g protein` : ''} per serving` : ''}`
		)
		.join('\n')

	return `Invent ${items.length} complete, realistic, DISTINCT recipes, one per line below, in the SAME ORDER as listed.
${list}

Write each recipe's name, instructions, and each ingredient's displayName in ${languageName}.
Each ingredient's "name" field (used for database lookup) MUST stay in English regardless of the output language.
Extract numeric amounts and units (use metric where possible: g, ml, dl, tbsp, tsp, cup, pcs, large, medium, small).
Separate the base ingredient name from any preparation method (e.g. "onion, finely chopped" -> name: "onion", preparation: "finely chopped").
Give practical, numbered cooking instructions for each recipe.
Vary the recipes from each other — do not repeat the same dish for different meals.`
}

export const PREMADE_AI_PROMPT = `
Extract product nutrition information from this page.
Return the product name, serving size (total product weight in grams), servings per container, and macros per serving (protein, carbs, fat, kcal, fiber in grams).

IMPORTANT: These are typically premade meals/dishes. If no explicit serving count is stated,
assume the entire product is 1 serving and use the total weight as serving size.
Do NOT default to "per 100g" — use the actual product weight.`
