import { PiggyBank } from 'lucide-react'
import type { FC } from 'react'
import { Card } from '~/components/ui'
import { useDirection, useDocumentTitle } from '~/lib'

/**
 * Placeholder landing for the "💰 بودجه" nav item. There is no monetary-budget data model in
 * this codebase yet (no cost/price fields anywhere in the schema — "budget" elsewhere in the
 * app means the kcal macro budget, a different concept). Building real grocery pricing is out
 * of scope for this slice, so this is an explicit empty state rather than invented numbers.
 */
const BudgetPage: FC = () => {
	useDocumentTitle('بودجه')
	const dir = useDirection()
	return (
		<div dir={dir} className="space-y-4">
			<h1 className="font-semibold text-ink text-lg">💰 بودجه</h1>
			<Card className="flex flex-col items-center gap-3 py-12 text-center text-ink-faint">
				<PiggyBank className="size-8 text-ink-faint" />
				<p className="max-w-sm text-sm">
					بخش بودجه هنوز پیاده‌سازی نشده. برای این کار به مدل داده‌ی قیمت (هزینه هر ماده غذایی) نیاز است که فعلاً
					در این مرحله ساخته نمی‌شود.
				</p>
			</Card>
		</div>
	)
}

export default BudgetPage
