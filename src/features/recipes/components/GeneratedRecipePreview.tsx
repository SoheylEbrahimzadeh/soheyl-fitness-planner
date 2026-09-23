import type { MealPlan } from '@macromaxxing/db'
import { ArrowLeft, X } from 'lucide-react'
import { type FC, useState } from 'react'
import { Button, Input, Modal, NumberInput, Spinner, TRPCError } from '~/components/ui'
import { useLanguage, useTranslation } from '~/lib'
import { trpc } from '~/lib/trpc'
import { formatIngredientAmount, getAllUnits } from '../utils/format'

export interface GeneratedRecipePreviewProps {
	planId: MealPlan['id']
	onClose: () => void
}

type Step = 'input' | 'preview' | 'importing'

interface GeneratedIngredient {
	name: string
	displayName: string
	amount: number
	unit: string
	preparation: string | null
}

/**
 * "Generate Recipe with AI": invent a brand-new recipe from scratch (name, ingredients,
 * instructions, servings, prep time — `ai.generateRecipe`), preview it, then import it the same
 * way `RecipeImportDialog.tsx` imports a parsed one — `ingredient.batchFindOrCreate` +
 * `recipe.create` + `recipe.addIngredient` — before adding it to this plan's inventory so it's
 * immediately usable. Nothing is persisted until the user confirms the preview.
 */
export const GeneratedRecipePreview: FC<GeneratedRecipePreviewProps> = ({ planId, onClose }) => {
	const { t } = useTranslation()
	const { lang } = useLanguage()
	const utils = trpc.useUtils()

	const [step, setStep] = useState<Step>('input')
	const [mealLabel, setMealLabel] = useState('')
	const [targetKcalInput, setTargetKcalInput] = useState('')
	const [targetProteinInput, setTargetProteinInput] = useState('')
	const [validationError, setValidationError] = useState<string | null>(null)

	// Preview state
	const [recipeName, setRecipeName] = useState('')
	const [ingredients, setIngredients] = useState<GeneratedIngredient[]>([])
	const [instructions, setInstructions] = useState('')
	const [servings, setServings] = useState<number | null>(null)
	const [prepTimeMinutes, setPrepTimeMinutes] = useState<number | null>(null)

	const [progress, setProgress] = useState({ current: 0, total: 0 })
	const [importError, setImportError] = useState<string | null>(null)

	const generateRecipe = trpc.ai.generateRecipe.useMutation()
	const createRecipe = trpc.recipe.create.useMutation()
	const batchFindOrCreate = trpc.ingredient.batchFindOrCreate.useMutation()
	const addIngredient = trpc.recipe.addIngredient.useMutation()
	const addToInventory = trpc.mealPlan.addToInventory.useMutation()

	function resolveGrams(
		ing: GeneratedIngredient,
		ingredientData: { units?: Array<{ name: string; grams: number }> | null; density?: number | null }
	) {
		let amountGrams: number
		let displayUnit: string | null = null
		let displayAmount: number | null = null

		if (ing.unit === 'g') {
			amountGrams = ing.amount
		} else {
			const allUnits = getAllUnits(ingredientData.units ?? [], ingredientData.density ?? null)
			const unitInfo = allUnits.find(u => u.name.toLowerCase() === ing.unit.toLowerCase())
			if (unitInfo) {
				amountGrams = ing.amount * unitInfo.grams
				displayUnit = ing.unit
				displayAmount = ing.amount
			} else {
				amountGrams = ing.amount
			}
		}

		return { amountGrams, displayUnit, displayAmount }
	}

	async function handleGenerate() {
		if (!mealLabel.trim()) {
			setValidationError(t('recipeGenerator.mealLabelRequired'))
			return
		}
		setValidationError(null)
		const result = await generateRecipe.mutateAsync({
			language: lang,
			mealLabel: mealLabel.trim(),
			targetKcal: targetKcalInput.trim() ? Number(targetKcalInput) : null,
			targetProtein: targetProteinInput.trim() ? Number(targetProteinInput) : null
		})
		setRecipeName(result.name)
		setIngredients(result.ingredients)
		setInstructions(result.instructions)
		setServings(result.servings)
		setPrepTimeMinutes(result.prepTimeMinutes)
		setStep('preview')
	}

	async function handleImport() {
		setStep('importing')
		setImportError(null)
		setProgress({ current: 0, total: ingredients.length })

		try {
			const recipe = await createRecipe.mutateAsync({
				name: recipeName,
				instructions,
				prepTimeMinutes
			})

			const results = await batchFindOrCreate.mutateAsync({ names: ingredients.map(ing => ing.name) })

			for (let i = 0; i < ingredients.length; i++) {
				const ing = ingredients[i]
				const { ingredient } = results[i]
				setProgress({ current: i + 1, total: ingredients.length })

				const { amountGrams, displayUnit, displayAmount } = resolveGrams(ing, ingredient)

				await addIngredient.mutateAsync({
					recipeId: recipe.id,
					ingredientId: ingredient.id,
					amountGrams,
					displayUnit,
					displayAmount,
					preparation: ing.preparation
				})
			}

			await addToInventory.mutateAsync({ planId, recipeId: recipe.id, totalPortions: servings ?? 1 })

			utils.mealPlan.get.invalidate({ id: planId })
			onClose()
		} catch (err) {
			setImportError(err instanceof Error ? err.message : 'Import failed')
			setStep('preview')
		}
	}

	return (
		<Modal className="flex max-h-[80vh] w-full max-w-lg flex-col">
			<div className="flex items-center gap-3 border-edge border-b px-4 py-3">
				{step === 'preview' && (
					<Button variant="ghost" size="icon" onClick={() => setStep('input')}>
						<ArrowLeft className="size-4" />
					</Button>
				)}
				<h2 className="font-semibold text-ink">{t('recipeGenerator.dialogTitle')}</h2>
				<Button
					variant="ghost"
					size="icon"
					className="ml-auto"
					onClick={onClose}
					disabled={step === 'importing'}
				>
					<X className="size-4" />
				</Button>
			</div>

			<div className="flex-1 overflow-y-auto p-4">
				{step === 'input' && (
					<div className="space-y-3">
						<div className="space-y-1">
							<span className="text-ink-muted text-xs">{t('recipeGenerator.mealLabel')}</span>
							<Input
								value={mealLabel}
								onChange={e => setMealLabel(e.target.value)}
								placeholder={t('recipeGenerator.mealLabelPlaceholder')}
								autoFocus
							/>
						</div>

						<div className="flex gap-3">
							<div className="flex-1 space-y-1">
								<span className="text-ink-muted text-xs">
									{t('recipeGenerator.targetKcal')} ({t('recipeGenerator.optional')})
								</span>
								<NumberInput
									value={targetKcalInput}
									onChange={e => setTargetKcalInput(e.target.value)}
									unit="kcal"
								/>
							</div>
							<div className="flex-1 space-y-1">
								<span className="text-ink-muted text-xs">
									{t('recipeGenerator.targetProtein')} ({t('recipeGenerator.optional')})
								</span>
								<NumberInput
									value={targetProteinInput}
									onChange={e => setTargetProteinInput(e.target.value)}
									unit="g"
								/>
							</div>
						</div>

						{validationError && <p className="text-destructive text-sm">{validationError}</p>}
						{generateRecipe.error && <TRPCError error={generateRecipe.error} />}
					</div>
				)}

				{step === 'preview' && (
					<div className="space-y-3">
						{importError && (
							<div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-destructive text-sm">
								{importError}
							</div>
						)}

						<div className="space-y-1">
							<span className="text-ink-muted text-xs">{recipeName}</span>
						</div>

						<div className="space-y-1">
							<span className="text-ink-muted text-xs">
								{t('recipeGenerator.ingredients')} ({ingredients.length})
							</span>
							<div className="max-h-48 overflow-y-auto rounded-sm border border-edge bg-surface-1 p-2">
								{ingredients.map(ing => (
									<div
										key={`${ing.name}-${ing.amount}-${ing.unit}`}
										className="flex items-center gap-2 py-0.5 text-sm"
									>
										<span className="w-20 text-right font-mono text-ink-muted tabular-nums">
											{formatIngredientAmount(ing.amount, ing.unit)}
										</span>
										<span className="text-ink">{ing.displayName}</span>
										{ing.preparation && (
											<span className="text-ink-faint text-xs">{ing.preparation}</span>
										)}
									</div>
								))}
							</div>
						</div>

						{instructions && (
							<div className="space-y-1">
								<span className="text-ink-muted text-xs">{t('recipeGenerator.instructions')}</span>
								<div className="max-h-24 overflow-y-auto whitespace-pre-line rounded-sm border border-edge bg-surface-1 p-2 text-ink-muted text-sm">
									{instructions}
								</div>
							</div>
						)}

						<div className="flex gap-4 text-ink-muted text-sm">
							{servings && (
								<span>
									{t('recipeGenerator.servings')}:{' '}
									<span className="font-mono tabular-nums">{servings}</span>
								</span>
							)}
							{prepTimeMinutes && <span>{t('recipeGenerator.prepTime', { min: prepTimeMinutes })}</span>}
						</div>
					</div>
				)}

				{step === 'importing' && (
					<div className="flex flex-col items-center gap-3 py-8">
						<Spinner />
						<p className="text-ink-muted text-sm">
							{t('recipeGenerator.importing', { current: progress.current, total: progress.total })}
						</p>
					</div>
				)}
			</div>

			{step !== 'importing' && (
				<div className="flex justify-end gap-2 border-edge border-t px-4 py-3">
					<Button variant="ghost" onClick={onClose}>
						{t('recipeGenerator.cancel')}
					</Button>
					{step === 'input' && (
						<Button onClick={handleGenerate} disabled={generateRecipe.isPending}>
							{generateRecipe.isPending ? (
								<>
									<Spinner className="size-4 text-current" />
									{t('recipeGenerator.generating')}
								</>
							) : (
								t('recipeGenerator.generate')
							)}
						</Button>
					)}
					{step === 'preview' && <Button onClick={handleImport}>{t('recipeGenerator.addToPlan')}</Button>}
				</div>
			)}
		</Modal>
	)
}
