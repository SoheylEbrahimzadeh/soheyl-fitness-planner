import type { FC } from 'react'
import { cn, useTranslation } from '~/lib'
import { SectionShell } from '../components'

const REPO_URL = 'https://github.com/SoheylEbrahimzadeh/soheyl-fitness-planner'
const SOURCE_CODE_ITEM_INDEX = 1

export const FaqSection: FC = () => {
	const { dict } = useTranslation()
	const f = dict.landing.faq
	return (
		<SectionShell id="faq" marker={f.marker} title={f.title} kicker={f.kicker} variant="alt">
			<ol className="border border-edge">
				{f.items.map((item, i) => (
					<li
						key={item.q}
						className={cn(
							'grid gap-4 px-6 py-7 md:grid-cols-[80px_1fr_2fr] md:gap-10 md:px-8',
							i !== 0 && 'border-edge border-t'
						)}
					>
						<span className="font-mono text-[10px] text-ink-faint uppercase tracking-[0.25em]">
							{f.qLabel} · {String(i + 1).padStart(2, '0')}
						</span>
						<h3 className="font-display font-normal text-ink text-xl leading-tight tracking-tight md:text-2xl">
							{item.q}
						</h3>
						<p className="font-display text-base text-ink-muted leading-relaxed">
							{item.a}
							{i === SOURCE_CODE_ITEM_INDEX && (
								<>
									{' '}
									<a
										href={REPO_URL}
										target="_blank"
										rel="noreferrer"
										className="font-mono text-accent underline underline-offset-2 hover:text-ink"
									>
										{f.repoLinkLabel}
									</a>
								</>
							)}
						</p>
					</li>
				))}
			</ol>
		</SectionShell>
	)
}
