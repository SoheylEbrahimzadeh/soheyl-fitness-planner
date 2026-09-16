import { SignUpButton } from '@clerk/clerk-react'
import { ArrowUpRight } from 'lucide-react'
import { type FC, useEffect, useState } from 'react'
import { Button } from '~/components/ui'
import { useTranslation } from '~/lib'
import { GridPaperBackground, MonoLabel } from '../components'

export const FooterCta: FC = () => {
	const { dict } = useTranslation()
	const f = dict.landing.footerCta
	const [now, setNow] = useState(() => new Date())
	useEffect(() => {
		const id = setInterval(() => setNow(new Date()), 60_000)
		return () => clearInterval(id)
	}, [])
	const stamp = `${now.toISOString().replace('T', ' ').slice(0, 16)} UTC`

	return (
		<section className="relative overflow-hidden bg-surface-0">
			<GridPaperBackground />
			<div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
				<MonoLabel className="text-accent">{f.marker}</MonoLabel>
				<h2 className="mt-6 font-display font-light text-5xl leading-[0.95] tracking-tight md:text-7xl">
					{f.titleLine1}
					<br />
					<span className="italic">{f.titleLine2}</span>
				</h2>
				<p className="mx-auto mt-6 max-w-xl font-display text-base text-ink-muted leading-relaxed md:text-lg">
					{f.subtitle}
				</p>
				<div className="mt-10 flex flex-wrap items-center justify-center gap-6">
					<SignUpButton mode="modal">
						<Button size="lg" className="h-12 px-7 font-display text-base">
							{f.ctaCreate}
							<ArrowUpRight className="size-4" />
						</Button>
					</SignUpButton>
					<a
						href="#plate"
						className="group flex items-center gap-2 font-mono text-ink-muted text-xs uppercase tracking-[0.25em] transition-colors hover:text-ink"
					>
						{f.ctaBackToTop}
						<span className="transition-transform group-hover:-translate-y-0.5">↑</span>
					</a>
				</div>
				<div className="mt-16 border-edge border-t pt-6 font-mono text-[10px] text-ink-faint uppercase tracking-[0.25em]">
					<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
						<span>§ Soheyl Fitness · {import.meta.env.VITE_APP_VERSION}</span>
						<span className="h-3 w-px bg-edge" />
						<span className="tabular-nums">{stamp}</span>
						<span className="h-3 w-px bg-edge" />
						<span>{f.tagline}</span>
					</div>
				</div>
			</div>
		</section>
	)
}
