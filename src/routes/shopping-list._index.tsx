import { ShoppingCart } from 'lucide-react'
import type { FC } from 'react'
import { Card, LinkButton } from '~/components/ui'
import { useDirection, useDocumentTitle } from '~/lib'

/**
 * Placeholder landing for the "🛒 لیست خرید" nav item. A real grocery list already exists
 * (GroceryListDialog) but is scoped to a single week's meal plan — opened from `/plans/:id`.
 * There is no aggregate/standalone grocery-list route yet, and building one (REWE catalog,
 * pricing, a dedicated grocery table) is explicitly out of scope for this slice. This page is
 * an honest empty state that points at the real feature instead of faking one.
 */
const ShoppingListPage: FC = () => {
	useDocumentTitle('لیست خرید')
	const dir = useDirection()
	return (
		<div dir={dir} className="space-y-4">
			<h1 className="font-semibold text-ink text-lg">🛒 لیست خرید</h1>
			<Card className="flex flex-col items-center gap-3 py-12 text-center text-ink-faint">
				<ShoppingCart className="size-8 text-ink-faint" />
				<p className="max-w-sm text-sm">
					لیست خرید مستقل و یکپارچه (با قیمت‌گذاری REWE و بودجه) هنوز ساخته نشده.
					<br />
					در حال حاضر لیست خرید برای هر برنامه غذایی هفتگی، داخل همان صفحه برنامه در دسترس است.
				</p>
				<LinkButton to="/plans">رفتن به برنامه‌های من</LinkButton>
			</Card>
		</div>
	)
}

export default ShoppingListPage
