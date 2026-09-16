import type { FC } from 'react'
import { useTranslation } from '~/lib'
import { BarcodeStrip, SectionShell } from '../components'

export const HowItWorks: FC = () => {
	const { dict } = useTranslation()
	const s = dict.landing.howItWorks
	return (
		<SectionShell id="log" marker={s.marker} title={s.title} kicker={s.kicker}>
			<div className="grid gap-6 md:grid-cols-2">
				{s.steps.map((step, i) => (
					<article
						key={step.title}
						className="group relative flex flex-col border border-edge bg-surface-0 p-8 transition-colors hover:border-accent/50"
					>
						<div className="flex items-baseline justify-between font-mono text-[10px] text-ink-faint uppercase tracking-[0.25em]">
							<span className="text-accent">
								{s.stepLabel} {String(i + 1).padStart(2, '0')}
							</span>
							<span>{step.meta}</span>
						</div>
						<h3 className="mt-5 font-display font-normal text-4xl text-ink leading-[0.95] tracking-tight md:text-5xl">
							{step.title}
						</h3>
						<p className="mt-6 flex-1 font-display text-base text-ink-muted leading-relaxed md:text-lg">
							{step.body}
						</p>
						<div className="mt-8 flex items-center gap-3 border-edge border-t pt-4 font-mono text-[10px] text-ink-muted uppercase tracking-[0.2em]">
							<BarcodeStrip seed={step.title} />
							<span className="ml-auto">{`wk_${String(i + 1).padStart(2, '0')}`}</span>
						</div>
					</article>
				))}
			</div>
		</SectionShell>
	)
}
