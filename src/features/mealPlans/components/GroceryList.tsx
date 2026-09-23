import { Check, ClipboardCopy } from 'lucide-react'
import { type FC, useCallback, useMemo, useState } from 'react'
import { useTranslation } from '~/lib'
import { type RouterOutput, trpc } from '~/lib/trpc'
import { formatGroceryList, type GroceryItem, generateGroceryList } from '../utils/grocery'

type MealPlan = RouterOutput['mealPlan']['get']

export interface GroceryListProps {
	plan: NonNullable<MealPlan>
}

/**
 * The plan's shopping list, auto-generated from its inventory (see `generateGroceryList`) and
 * always in sync with it — add a recipe to the plan and its ingredients show up here on the next
 * render, no separate "build my list" step. Check-off state is the only thing that's actually
 * stored (`mealPlan.toggleGroceryCheck`), scoped to this plan/week so next week starts blank.
 */
export const GroceryList: FC<GroceryListProps> = ({ plan }) => {
	const { t } = useTranslation()
	const items = useMemo(() => generateGroceryList(plan), [plan])
	const checkedIds = useMemo(() => new Set(plan.groceryCheckedIngredientIds), [plan.groceryCheckedIngredientIds])
	const [copied, setCopied] = useState(false)
	const utils = trpc.useUtils()

	const toggleMutation = trpc.mealPlan.toggleGroceryCheck.useMutation({
		onMutate: async ({ ingredientId, checked }) => {
			await utils.mealPlan.get.cancel({ id: plan.id })
			const previous = utils.mealPlan.get.getData({ id: plan.id })
			utils.mealPlan.get.setData({ id: plan.id }, current => {
				if (!current) return current
				const ids = new Set(current.groceryCheckedIngredientIds)
				if (checked) ids.add(ingredientId)
				else ids.delete(ingredientId)
				return { ...current, groceryCheckedIngredientIds: [...ids] }
			})
			return { previous }
		},
		onError: (_err, _input, context) => {
			if (context?.previous) utils.mealPlan.get.setData({ id: plan.id }, context.previous)
		},
		onSettled: () => utils.mealPlan.get.invalidate({ id: plan.id })
	})

	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(formatGroceryList(items))
		setCopied(true)
		setTimeout(() => setCopied(false), 1500)
	}, [items])

	if (items.length === 0) {
		return <div className="py-8 text-center text-ink-faint text-sm">{t('shoppingList.emptyIngredients')}</div>
	}

	const checkedCount = items.filter(item => checkedIds.has(item.ingredient.id)).length
	// Reuses the existing checked/unchecked grocery-check state as the have/need signal (checked =
	// already have it, unchecked = still need to buy) — no separate pantry-stock table.
	const needItems = items.filter(item => !checkedIds.has(item.ingredient.id))
	const haveItems = items.filter(item => checkedIds.has(item.ingredient.id))

	function renderRow(item: GroceryItem) {
		return (
			<GroceryRow
				key={item.ingredient.id}
				item={item}
				checked={checkedIds.has(item.ingredient.id)}
				onToggle={checked =>
					toggleMutation.mutate({ mealPlanId: plan.id, ingredientId: item.ingredient.id, checked })
				}
			/>
		)
	}

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between gap-2 text-ink-muted text-xs">
				<span>{t('shoppingList.progress', { checked: checkedCount, total: items.length })}</span>
				<button
					type="button"
					onClick={handleCopy}
					className="flex items-center gap-1 rounded-sm px-1.5 py-1 transition-colors hover:bg-surface-2 hover:text-ink"
				>
					{copied ? <Check className="size-3.5 text-success" /> : <ClipboardCopy className="size-3.5" />}
					{copied ? t('shoppingList.copied') : t('shoppingList.copy')}
				</button>
			</div>

			{needItems.length > 0 && (
				<div className="space-y-0.5">
					<div className="px-2 text-ink-faint text-xs uppercase tracking-wider">
						{t('shoppingList.needToBuySection', { count: needItems.length })}
					</div>
					{needItems.map(renderRow)}
				</div>
			)}

			{haveItems.length > 0 && (
				<div className="space-y-0.5">
					<div className="px-2 text-ink-faint text-xs uppercase tracking-wider">
						{t('shoppingList.haveItSection', { count: haveItems.length })}
					</div>
					{haveItems.map(renderRow)}
				</div>
			)}
		</div>
	)
}

const GroceryRow: FC<{ item: GroceryItem; checked: boolean; onToggle: (checked: boolean) => void }> = ({
	item,
	checked,
	onToggle
}) => {
	const grams = Math.round(item.totalGrams)

	return (
		<button
			type="button"
			onClick={() => onToggle(!checked)}
			className="flex w-full items-center gap-2.5 rounded-sm px-2 py-1.5 text-left transition-colors hover:bg-surface-2"
		>
			<span
				className={`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
					checked ? 'border-accent bg-accent text-white' : 'border-edge'
				}`}
			>
				{checked && <Check className="size-3" />}
			</span>
			<div className={`min-w-0 flex-1 ${checked ? 'text-ink-faint line-through' : ''}`}>
				<span className="text-sm">{item.ingredient.name}</span>
				{item.sources.length > 1 && (
					<span className="ml-1.5 text-ink-faint text-xs">
						({item.sources.map(s => s.recipeName).join(', ')})
					</span>
				)}
			</div>
			<span
				className={`shrink-0 font-mono text-sm tabular-nums ${checked ? 'text-ink-faint' : 'text-ink-muted'}`}
			>
				{formatGrams(grams)}
			</span>
		</button>
	)
}

function formatGrams(grams: number): string {
	if (grams >= 1000) {
		const kg = grams / 1000
		return kg % 1 === 0 ? `${kg} kg` : `${kg.toFixed(1)} kg`
	}
	return `${grams}g`
}
