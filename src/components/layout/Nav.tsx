import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import { ChefHat, LogIn, type LucideIcon, Menu } from 'lucide-react'
import { type FC, type HTMLAttributes, useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { Button } from '~/components/ui/Button'
import { OfflineIndicator } from '~/components/ui/OfflineIndicator'
import { RestTimer } from '~/features/workouts/components/RestTimer'
import { useWorkoutSessionStore } from '~/features/workouts/store'
import {
	cn,
	FAVORITABLE_ROUTES,
	type FavoritableRoute,
	useBottomNavFavorites,
	useDirection,
	useTranslation
} from '~/lib'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileMenuDrawer } from './MobileMenuDrawer'

const publicLinks = FAVORITABLE_ROUTES.filter(r => r.public)
const authOnlyLinks = FAVORITABLE_ROUTES.filter(r => !r.public)

export function Nav() {
	const { t } = useTranslation()
	const dir = useDirection()
	const timerActive = useWorkoutSessionStore(s => s.sessionStartedAt !== null)
	const { favorites, isFavorite, toggle } = useBottomNavFavorites()
	const [menuOpen, setMenuOpen] = useState(false)
	const closeMenu = useCallback(() => setMenuOpen(false), [])

	// Close menu when a workout timer starts so the RestTimer isn't covered by an open drawer.
	useEffect(() => {
		if (timerActive) closeMenu()
	}, [timerActive, closeMenu])

	// Bottom bar = canonical order filtered by favorites.
	const mobileFavLinks: FavoritableRoute[] = FAVORITABLE_ROUTES.filter(r => favorites.includes(r.to))

	return (
		<>
			{/* Top nav (desktop full, mobile collapsed to brand + status + hamburger) */}
			<nav className="sticky top-0 z-50 border-edge border-b bg-surface-1" dir={dir}>
				<div className="mx-auto flex h-12 max-w-8xl items-center gap-4 px-3 md:px-4">
					<NavLink to="/" className="flex items-center gap-2 font-semibold text-accent">
						<ChefHat className="size-5" />
						<span className="tracking-tight">Soheyl Fitness</span>
					</NavLink>
					<div className="hidden flex-1 items-center md:flex">
						{publicLinks.map(({ labelKey, ...props }) => (
							<WebLink key={props.to} {...props} label={t(labelKey)} />
						))}
						<SignedIn>
							{authOnlyLinks.map(({ labelKey, ...props }) => (
								<WebLink key={props.to} {...props} label={t(labelKey)} />
							))}
						</SignedIn>
					</div>
					<div className="ms-auto flex items-center gap-2">
						<LanguageSwitcher className="hidden md:flex" />
						<OfflineIndicator />
						<RestTimer />
						{/* Desktop-only: avatar / auth actions. */}
						<div className="hidden items-center gap-2 md:flex">
							<SignedIn>
								<UserButton />
							</SignedIn>
							<SignedOut>
								<SignUpButton mode="modal">
									<Button>{t('common.signUp')}</Button>
								</SignUpButton>
								<SignInButton mode="modal">
									<WebLink icon={LogIn} label={t('common.signIn')} />
								</SignInButton>
							</SignedOut>
						</div>
						{/* Mobile-only hamburger. Hidden during active workout timer to keep RestTimer focused. */}
						<SignedIn>
							<button
								type="button"
								onClick={() => setMenuOpen(true)}
								aria-label={t('common.openMenu')}
								aria-expanded={menuOpen}
								aria-controls="mobile-menu-drawer"
								className={cn(
									'rounded-sm p-1.5 text-ink-muted transition-colors hover:text-ink md:hidden',
									timerActive && 'hidden'
								)}
							>
								<Menu className="size-5" />
							</button>
						</SignedIn>
						<SignedOut>
							<SignUpButton mode="modal">
								<Button className="md:hidden">{t('common.signUp')}</Button>
							</SignUpButton>
							<SignInButton mode="modal">
								<button
									type="button"
									aria-label={t('common.signIn')}
									className="rounded-sm p-1.5 text-ink-muted transition-colors hover:text-ink md:hidden"
								>
									<LogIn className="size-5" />
								</button>
							</SignInButton>
						</SignedOut>
					</div>
				</div>
			</nav>

			{/* Mobile bottom tab bar. `transform-gpu` (translateZ(0)) is not decoration: iOS 26
			    Safari lays a bottom-anchored fixed element out correctly but PAINTS it in the
			    wrong place — Web Inspector shows the right frame while the bar renders partway
			    up the screen and drifts with the scroll. Promoting it to its own compositing
			    layer hands positioning to the compositor and sidesteps the broken paint path.
			    Don't remove it without testing a long scroll on a real iOS device. */}
			<nav
				className="fixed right-0 bottom-0 left-0 z-50 transform-gpu border-edge border-t bg-surface-1 md:hidden"
				dir={dir}
			>
				<div className="grid auto-cols-fr grid-flow-col justify-center px-3 2xs:py-1">
					<SignedIn>
						<AppLinks links={mobileFavLinks} />
					</SignedIn>
					<SignedOut>
						<AppLinks links={publicLinks} />
						<SignInButton mode="modal">
							<AppLink icon={LogIn} label={t('common.signIn')} />
						</SignInButton>
					</SignedOut>
				</div>
			</nav>

			<MobileMenuDrawer open={menuOpen} onClose={closeMenu} isFavorite={isFavorite} onToggleFavorite={toggle} />
		</>
	)
}

interface LinkProps {
	className?: string
	to?: string | (() => void)
	label?: string
	/** Emoji glyph — used for real nav items. Utility auth actions fall back to `icon`. */
	emoji?: string
	icon?: LucideIcon
	end?: boolean
}

const WebLink: FC<LinkProps> = ({ to, label, emoji, icon: Icon, className, end, ...rest }) => {
	const Elem =
		typeof to === 'string'
			? (props: HTMLAttributes<HTMLAnchorElement>) => <NavLink to={to} end={end} {...props} />
			: (props: HTMLAttributes<HTMLButtonElement>) => <button type="button" onClick={to} {...props} />
	return (
		<Elem
			{...rest}
			className={cn(
				'group flex items-center gap-1.5 rounded-sm px-3 py-1.5 current:font-medium current:text-accent text-ink-muted text-sm transition-colors hover:text-ink',
				className
			)}
		>
			{emoji ? (
				<span className="text-base leading-none">{emoji}</span>
			) : Icon ? (
				<Icon className="size-5" />
			) : null}
			<span className="group-hover:inline max-lg:hidden">{label}</span>
		</Elem>
	)
}

const AppLink: FC<LinkProps> = ({ to, label, emoji, icon: Icon, className, end, ...rest }) => {
	const Elem =
		typeof to === 'string'
			? (props: HTMLAttributes<HTMLAnchorElement>) => <NavLink to={to} end={end} {...props} />
			: (props: HTMLAttributes<HTMLButtonElement>) => <button type="button" onClick={to} {...props} />
	return (
		<Elem
			{...rest}
			className={cn(
				'mx-auto space-y-0.5 py-2 text-center current:font-medium 2xs:text-sm current:text-accent text-ink-muted text-xs transition-colors',
				className
			)}
		>
			{emoji ? (
				<span className="block 2xs:text-xl text-lg leading-none">{emoji}</span>
			) : Icon ? (
				<Icon className="mx-auto 2xs:size-6 size-5" />
			) : null}
			<div>{label}</div>
		</Elem>
	)
}

const AppLinks: FC<{ links: readonly FavoritableRoute[] }> = ({ links }) => {
	const { t } = useTranslation()
	return links.map(({ labelKey, ...link }) => <AppLink key={link.to} {...link} label={t(labelKey)} />)
}
