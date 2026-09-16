import { SignUpButton } from '@clerk/clerk-react'
import { ArrowRight } from 'lucide-react'
import type { FC } from 'react'
import { Button } from '~/components/ui'
import { cn, useTranslation } from '~/lib'
import { GridPaperBackground, MonoLabel } from '../components'

export const Hero: FC = () => {
	const { t } = useTranslation()
	return (
		<section className="relative overflow-hidden border-edge border-b">
			<GridPaperBackground />
			<div className="relative mx-auto max-w-7xl px-4 pt-16">
				<SpecStrip />
			</div>
			<div className="relative mx-auto max-w-6xl px-6 pb-20 md:pb-28">
				<div className="mt-12 grid gap-16 md:mt-20 md:grid-cols-12 md:gap-10">
					<div className="md:col-span-7">
						<HeroHeadline />
						<p className="mt-10 max-w-lg font-display text-ink-muted text-lg leading-relaxed md:text-xl">
							{t('landing.hero.subhead')}
						</p>
						<div className="mt-10 flex flex-wrap items-center gap-6">
							<SignUpButton mode="modal">
								<Button size="lg" className="h-12 px-6 font-display text-base">
									{t('landing.hero.ctaStart')}
									<ArrowRight className="size-4" />
								</Button>
							</SignUpButton>
							<a
								href="#plate"
								className="group flex items-center gap-2 font-mono text-ink-muted text-xs uppercase tracking-[0.25em] transition-colors hover:text-ink"
							>
								{t('landing.hero.ctaSeeLog')}
								<span className="transition-transform group-hover:translate-y-0.5">↓</span>
							</a>
						</div>
						<HeroFootnotes />
					</div>
					<div className="md:col-span-5">
						<div className="flex flex-col gap-5 md:sticky md:top-20">
							<NutritionFactsPanel />
							<TrainingFactsPanel />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

const HeroHeadline: FC = () => {
	const { t } = useTranslation()
	return (
		<h1 className="-mx-0.5 font-display font-light text-[56px] text-ink leading-[0.92] tracking-[-0.02em] md:text-[112px]">
			<span className="block animate-rise">{t('landing.hero.headlineLine1')}</span>
			<span
				className="block animate-rise italic"
				style={{ animationDelay: '120ms', color: 'var(--color-accent)' }}
			>
				{t('landing.hero.headlineAccent1')}
			</span>
			<span className="mt-2 block animate-rise" style={{ animationDelay: '260ms' }}>
				{t('landing.hero.headlineLine2')}
			</span>
			<span
				className="block animate-rise italic"
				style={{ animationDelay: '380ms', color: 'var(--color-accent)' }}
			>
				{t('landing.hero.headlineAccent2')}
			</span>
		</h1>
	)
}

const SpecStrip: FC = () => {
	const { t } = useTranslation()
	return (
		<div className="flex items-center gap-4 border-edge border-y py-2 font-mono text-[10px] text-ink-faint uppercase tracking-[0.2em]">
			<span className="text-accent">§ {import.meta.env.VITE_APP_VERSION}</span>
			<span className="h-3 w-px bg-edge" />
			<span className="hidden md:inline">{t('landing.hero.specTagline')}</span>
			<span className="hidden h-3 w-px bg-edge md:inline-block" />
			<span>{t('landing.hero.specEst')}</span>
			<span className="h-3 w-px bg-edge" />
			<span className="hidden sm:inline">{t('landing.hero.specSerial')}</span>
			<span className="ml-auto hidden items-center gap-2 sm:flex">
				<span className="size-1.5 animate-pulse rounded-full bg-success" />
				<span>{t('landing.hero.specLive')}</span>
			</span>
		</div>
	)
}

const HeroFootnotes: FC = () => {
	const { dict } = useTranslation()
	return (
		<div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-edge border-t pt-6 font-mono text-[10px] text-ink-muted uppercase tracking-[0.15em]">
			{dict.landing.hero.footnotes.map(f => (
				<div key={f.label}>
					<div className="text-ink text-lg tabular-nums tracking-normal">{f.value}</div>
					<div className="mt-1">{f.label}</div>
				</div>
			))}
		</div>
	)
}

const NutritionFactsPanel: FC = () => {
	const { dict } = useTranslation()
	const p = dict.landing.hero.nutritionPanel
	return (
		<article className="relative border-4 border-ink/90 bg-surface-0 p-4 font-mono text-ink md:p-5">
			<div className="flex items-baseline justify-between">
				<span className="font-black font-display text-[30px] text-ink leading-none tracking-tight md:text-[34px]">
					{p.title}
				</span>
				<span className="font-mono text-[9px] text-ink-faint uppercase tracking-[0.2em]">{p.code}</span>
			</div>
			<div className="mt-1 flex justify-between text-[11px]">
				<span className="text-ink-muted">{p.batchYieldLabel}</span>
				<span className="font-semibold">{p.batchYieldValue}</span>
			</div>
			<div className="mt-0.5 flex justify-between text-[11px]">
				<span className="text-ink-muted">{p.servingSizeLabel}</span>
				<span className="font-semibold tabular-nums">{p.servingSizeValue}</span>
			</div>
			<div className="my-2 h-[10px] bg-ink/90" />
			<MonoLabel>{p.amountPerPortionLabel}</MonoLabel>
			<div className="mt-1 flex items-end justify-between">
				<span className="font-black font-display text-3xl leading-none">{p.caloriesLabel}</span>
				<span className="font-black font-mono text-[44px] text-macro-kcal tabular-nums leading-none">612</span>
			</div>
			<div className="my-2 h-[3px] bg-ink/90" />
			<div className="flex justify-end text-[10px] text-ink-muted uppercase tracking-[0.15em]">
				{p.dailyIntakeLabel}
			</div>
			{p.rows.map((row, i) => (
				<NutritionRow
					key={row.label}
					label={row.label}
					value={row.value}
					pct={row.pct}
					accent={[MACRO_FAT, MACRO_CARBS, MACRO_FIBER, MACRO_PROTEIN][i]}
					indent={i === 2}
					emphasised={i === 3}
				/>
			))}
			<div className="my-2 h-[10px] bg-ink/90" />
			<MonoLabel className="mb-1 block">{p.ingredientsLabel}</MonoLabel>
			<p className="text-[11px] text-ink-muted leading-snug">{p.ingredientsText}</p>
		</article>
	)
}

const MACRO_FAT = 'text-macro-fat'
const MACRO_CARBS = 'text-macro-carbs'
const MACRO_FIBER = 'text-macro-fiber'
const MACRO_PROTEIN = 'text-macro-protein'

const NutritionRow: FC<{
	label: string
	value: string
	pct: string
	accent: string
	indent?: boolean
	emphasised?: boolean
}> = ({ label, value, pct, accent, indent, emphasised }) => (
	<div
		className={cn(
			'flex items-baseline justify-between border-ink/20 border-b py-1 text-[13px] last:border-b-0',
			emphasised && 'font-semibold'
		)}
	>
		<span className={cn(indent && 'pl-4')}>
			<span className={cn('inline-block size-1.5 translate-y-[-2px]', accent, 'mr-2 bg-current')} />
			{label}
			<span className="ml-2 font-mono text-[11px] text-ink-muted tabular-nums">{value}</span>
		</span>
		<span className="font-mono tabular-nums">{pct}</span>
	</div>
)

const TrainingFactsPanel: FC = () => {
	const { dict } = useTranslation()
	const p = dict.landing.hero.trainingPanel
	return (
		<article className="relative border-4 border-ink/90 bg-surface-0 p-4 font-mono text-ink md:p-5">
			<div className="flex items-baseline justify-between">
				<span className="font-black font-display text-[30px] text-ink leading-none tracking-tight md:text-[34px]">
					{p.title}
				</span>
				<span className="font-mono text-[9px] text-ink-faint uppercase tracking-[0.2em]">{p.code}</span>
			</div>
			<div className="mt-1 flex justify-between text-[11px]">
				<span className="text-ink-muted">{p.sessionLabel}</span>
				<span className="font-semibold">{p.sessionValue}</span>
			</div>
			<div className="mt-0.5 flex justify-between text-[11px]">
				<span className="text-ink-muted">{p.totalVolumeLabel}</span>
				<span className="font-semibold tabular-nums">{p.totalVolumeValue}</span>
			</div>
			<div className="my-2 h-[10px] bg-ink/90" />
			<MonoLabel>{p.workingSetsLoggedLabel}</MonoLabel>
			<div className="mt-1 flex items-end justify-between">
				<span className="font-black font-display text-3xl leading-none">{p.loadedLabel}</span>
				<span className="font-black font-mono text-[44px] text-accent tabular-nums leading-none">18</span>
			</div>
			<div className="my-2 h-[3px] bg-ink/90" />
			<div className="flex justify-end text-[10px] text-ink-muted uppercase tracking-[0.15em]">
				{p.setsRepsE1rmLabel}
			</div>
			<ExerciseRow name="Bench Press" sets="4 × 8" load="100 kg" e1rm="124" />
			<ExerciseRow name="Incline DB" sets="3 × 10" load="32 kg" e1rm="42" />
			<ExerciseRow name="Shoulder Press" sets="3 × 12" load="52 kg" e1rm="74" />
			<ExerciseRow name="Lateral Raise" sets="4 × 15" load="12 kg" e1rm="18" />
			<ExerciseRow name="Triceps Rope" sets="3 × 12" load="26 kg" e1rm="36" />
			<div className="my-2 h-[10px] bg-ink/90" />
			<MonoLabel className="mb-1 block">{p.musclesLoadedLabel}</MonoLabel>
			<p className="text-[11px] text-ink-muted leading-snug">{p.musclesLoadedText}</p>
		</article>
	)
}

const ExerciseRow: FC<{ name: string; sets: string; load: string; e1rm: string }> = ({ name, sets, load, e1rm }) => (
	<div className="grid grid-cols-[1fr_auto_auto] items-baseline gap-3 border-ink/20 border-b py-1 text-[12px] last:border-b-0">
		<span>{name}</span>
		<span className="font-mono text-[11px] text-ink-muted tabular-nums">
			{sets} · {load}
		</span>
		<span className="w-10 text-right font-mono tabular-nums">{e1rm}</span>
	</div>
)
