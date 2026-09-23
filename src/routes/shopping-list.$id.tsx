import type { MealPlan } from '@macromaxxing/db'
import { ArrowLeft } from 'lucide-react'
import type { FC } from 'react'
import { Link, useParams } from 'react-router'
import { Card, Spinner, TRPCError } from '~/components/ui'
import { GroceryList } from '~/features/mealPlans/components/GroceryList'
import { mealPlanLabel, prefetchRoute, useDocumentTitle, useTranslation } from '~/lib'
import { trpc } from '~/lib/trpc'
import type { Route } from './+types/shopping-list.$id'

export const clientLoader = ({ params }: Route.ClientLoaderArgs) =>
	prefetchRoute(utils => [utils.mealPlan.get.ensureData({ id: params.id as MealPlan['id'] })])

const ShoppingListDetailPage: FC = () => {
	const { id } = useParams<{ id: MealPlan['id'] }>()
	const { t, dict } = useTranslation()
	const planQuery = trpc.mealPlan.get.useQuery({ id: id! }, { enabled: !!id })
	const label = planQuery.data ? mealPlanLabel(planQuery.data) : dict.nav.shoppingList
	useDocumentTitle(`${dict.nav.shoppingList} — ${label}`)

	return (
		<div className="space-y-3">
			<div className="flex items-center gap-3">
				<Link to="/shopping-list" className="text-ink-faint hover:text-ink">
					<ArrowLeft className="size-4" />
				</Link>
				<h1 className="min-w-0 truncate font-semibold text-ink text-lg">{label}</h1>
			</div>

			{planQuery.isLoading && (
				<div className="flex justify-center py-12">
					<Spinner />
				</div>
			)}

			{planQuery.error && <TRPCError error={planQuery.error} />}

			{planQuery.data && (
				<Card className="p-4">
					<GroceryList plan={planQuery.data} />
				</Card>
			)}

			{!(planQuery.isLoading || planQuery.data || planQuery.error) && (
				<div className="py-12 text-center text-ink-faint text-sm">{t('shoppingList.emptyWeeks')}</div>
			)}
		</div>
	)
}

export default ShoppingListDetailPage
