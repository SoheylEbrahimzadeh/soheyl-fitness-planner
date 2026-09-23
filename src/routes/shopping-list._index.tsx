import { ShoppingCart } from 'lucide-react'
import type { FC } from 'react'
import { Link } from 'react-router'
import { Card, LinkButton, Spinner, TRPCError } from '~/components/ui'
import { mealPlanLabel, prefetchRoute, useDocumentTitle, useTranslation } from '~/lib'
import { trpc } from '~/lib/trpc'

export const clientLoader = () => prefetchRoute(utils => [utils.mealPlan.list.ensureData()])

/**
 * One shopping list per week: each meal plan with a `weekStart` gets an auto-generated list at
 * `/shopping-list/:id` (see GroceryList), built from whatever's in that plan's inventory. A plan
 * with no week (a reusable template) has no week to shop for, so it's left off this index.
 */
const ShoppingListIndexPage: FC = () => {
	const { t, dict } = useTranslation()
	useDocumentTitle(dict.nav.shoppingList)
	const plansQuery = trpc.mealPlan.list.useQuery()
	const weeklyPlans = (plansQuery.data ?? [])
		.filter(plan => plan.weekStart != null)
		.sort((a, b) => (b.weekStart ?? '').localeCompare(a.weekStart ?? ''))

	return (
		<div className="space-y-4">
			<div>
				<h1 className="font-semibold text-ink text-lg">{dict.nav.shoppingList}</h1>
				<p className="text-ink-faint text-sm">{t('shoppingList.subtitle')}</p>
			</div>

			{plansQuery.isLoading && (
				<div className="flex justify-center py-12">
					<Spinner />
				</div>
			)}

			{plansQuery.error && <TRPCError error={plansQuery.error} />}

			{!plansQuery.isLoading && weeklyPlans.length === 0 && (
				<Card className="flex flex-col items-center gap-3 py-12 text-center text-ink-faint">
					<ShoppingCart className="size-8 text-ink-faint" />
					<p className="max-w-sm text-sm">{t('shoppingList.emptyWeeks')}</p>
					<LinkButton to="/plans">{t('shoppingList.goToPlans')}</LinkButton>
				</Card>
			)}

			<div className="grid grid-cols-1 gap-2">
				{weeklyPlans.map(plan => (
					<Link key={plan.id} to={`/shopping-list/${plan.id}`}>
						<Card className="flex items-center gap-4 p-3 transition-colors hover:bg-surface-2">
							<div className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-accent/10 text-accent">
								<ShoppingCart className="size-4" />
							</div>
							<div className="min-w-0 flex-1">
								<h3 className="truncate font-medium text-ink text-sm">{mealPlanLabel(plan)}</h3>
								<p className="text-ink-faint text-xs">
									{t('shoppingList.recipeCount', { count: plan.inventory.length })}
								</p>
							</div>
						</Card>
					</Link>
				))}
			</div>
		</div>
	)
}

export default ShoppingListIndexPage
