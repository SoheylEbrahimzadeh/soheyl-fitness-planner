import type { FC } from 'react'
import { cn, useTranslation } from '~/lib'
import { SectionShell } from '../components'

export const IntelligenceSection: FC = () => {
	const { dict } = useTranslation()
	const s = dict.landing.intelligence
	return (
		<SectionShell id="instrument" marker={s.marker} variant="alt" title={s.title} kicker={s.kicker}>
			<div className="overflow-hidden border border-edge">
				{s.rows.map((row, i) => (
					<div
						key={row.key}
						className={cn(
							'grid gap-4 px-6 py-5 font-mono md:grid-cols-[180px_240px_1fr] md:gap-10 md:px-8 md:py-6',
							i !== 0 && 'border-edge border-t'
						)}
					>
						<div className="text-[10px] text-ink-faint uppercase tracking-[0.25em]">
							{String(i + 1).padStart(2, '0')} · {row.key}
						</div>
						<div className="font-display text-ink text-xl tracking-tight md:text-2xl">{row.value}</div>
						<div className="font-display text-base text-ink-muted leading-relaxed">{row.body}</div>
					</div>
				))}
			</div>
		</SectionShell>
	)
}
