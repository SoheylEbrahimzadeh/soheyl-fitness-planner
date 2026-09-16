import type { FC } from 'react'
import { useTranslation } from '~/lib'

export const NumbersRail: FC = () => {
	const { dict } = useTranslation()
	const items = dict.landing.numbersRail
	const looped = [...items, ...items].map((item, i) => ({
		...item,
		key: `${item.label}-${i < items.length ? 'a' : 'b'}`
	}))
	return (
		<section className="border-edge border-b bg-surface-0">
			<div className="group relative overflow-hidden py-4">
				<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-0 to-transparent" />
				<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-0 to-transparent" />
				<div className="flex w-max animate-marquee items-center gap-10 font-mono text-sm group-hover:[animation-play-state:paused]">
					{looped.map(item => (
						<div key={item.key} className="flex items-baseline gap-3 whitespace-nowrap">
							<span className="font-semibold text-ink text-lg tabular-nums">{item.value}</span>
							<span className="text-[11px] text-ink-muted uppercase tracking-[0.2em]">{item.label}</span>
							<span className="ml-6 text-accent">·</span>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
