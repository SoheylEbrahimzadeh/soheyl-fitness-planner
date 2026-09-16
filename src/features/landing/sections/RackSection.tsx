import type { MuscleGroup } from '@macromaxxing/db'
import type { FC } from 'react'
import { BodyMap } from '~/features/workouts/components/BodyMap'
import { cn, HEAT_GRADIENT, useTranslation } from '~/lib'
import { MonoLabel, SectionShell } from '../components'

export const RackSection: FC = () => {
	const { dict } = useTranslation()
	const r = dict.landing.rack
	return (
		<SectionShell id="rack" marker={r.marker} title={r.title} kicker={r.kicker} variant="alt">
			<div className="grid gap-12 md:grid-cols-5 md:gap-16">
				<div className="md:col-span-2">
					<RackBodyMap />
					<div className="mt-6 flex items-baseline justify-between border-edge border-t pt-4">
						<MonoLabel>{r.lastDaysVolumeLabel}</MonoLabel>
						<span className="font-mono text-ink text-sm tabular-nums">183,420 kg</span>
					</div>
				</div>
				<div className="md:col-span-3">
					<RackFeatureList />
				</div>
			</div>
		</SectionShell>
	)
}

const MUSCLE_VOLUMES: Array<[MuscleGroup, number]> = [
	['chest', 0.9],
	['front_delts', 0.75],
	['side_delts', 0.65],
	['rear_delts', 0.35],
	['triceps', 0.8],
	['biceps', 0.45],
	['forearms', 0.2],
	['lats', 0.55],
	['upper_back', 0.5],
	['quads', 0.85],
	['hamstrings', 0.4],
	['glutes', 0.6],
	['calves', 0.25],
	['core', 0.5]
]

const RackBodyMap: FC = () => {
	const { dict } = useTranslation()
	const r = dict.landing.rack
	return (
		<div className="border border-edge bg-surface-0 p-6">
			<div className="mb-4 flex items-baseline justify-between">
				<MonoLabel>{r.coverageMapLabel}</MonoLabel>
				<span className="font-mono text-[10px] text-ink-faint uppercase tracking-[0.2em]">14 / 14 muscles</span>
			</div>
			<BodyMap muscleVolumes={new Map(MUSCLE_VOLUMES)} sex="male" />
			<div className="mt-5 flex items-center gap-3 border-edge border-t pt-3 font-mono text-[10px] text-ink-muted uppercase tracking-[0.15em]">
				<span>{r.lowLabel}</span>
				<div className="h-1.5 flex-1" style={{ backgroundImage: HEAT_GRADIENT }} />
				<span>{r.highLabel}</span>
			</div>
		</div>
	)
}

const RACK_FEATURE_META = [
	{ eyebrow: 'A', meta: 'working · warmup · backoff · full' },
	{ eyebrow: 'B', meta: 'round 1 / 3 · transition 15 s' },
	{ eyebrow: 'C', meta: 'tier 1 · compound · +30 s' },
	{ eyebrow: 'D', meta: '14 muscle groups · intensity-weighted' },
	{ eyebrow: 'E', meta: 'ratios enforced at the model layer' }
] as const

const RackFeatureList: FC = () => {
	const { dict } = useTranslation()
	const features = dict.landing.rack.features
	return (
		<ol className="border border-edge">
			{features.map((f, i) => (
				<li
					key={f.title}
					className={cn(
						'group relative flex gap-6 px-6 py-6 transition-colors hover:bg-surface-0',
						i !== 0 && 'border-edge border-t'
					)}
				>
					<span className="w-8 shrink-0 font-mono text-accent text-xs uppercase tracking-[0.25em]">
						{RACK_FEATURE_META[i].eyebrow}
					</span>
					<div className="min-w-0 flex-1">
						<h3 className="font-display font-normal text-xl leading-tight md:text-2xl">{f.title}</h3>
						<p className="mt-2 font-display text-base text-ink-muted leading-relaxed">{f.body}</p>
						<div className="mt-3 font-mono text-[10px] text-ink-faint uppercase tracking-[0.2em]">
							{RACK_FEATURE_META[i].meta}
						</div>
					</div>
				</li>
			))}
		</ol>
	)
}
