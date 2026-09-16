import type { Equipment, Exercise } from '@macromaxxing/db'
import { type FC, useMemo, useState } from 'react'
import { ExerciseGuideModal } from '~/features/workouts/components/ExerciseGuideModal'
import { TimerModeView } from '~/features/workouts/components/TimerModeView'
import { useElapsedTimer } from '~/features/workouts/hooks/useElapsedTimer'
import { cn, type FlatSet, useTranslation } from '~/lib'
import { SectionShell } from '../components'

const STEP_NUMBERS = ['01', '02', '03', '04', '05'] as const

export const AutoSection: FC = () => {
	const { dict } = useTranslation()
	const a = dict.landing.auto
	return (
		<SectionShell id="auto" marker={a.marker} title={a.title} kicker={a.kicker}>
			<div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:gap-16">
				<ol className="border border-edge">
					{a.steps.map((s, i) => (
						<li
							key={s.title}
							className={cn(
								'grid grid-cols-[44px_1fr] gap-5 px-6 py-6',
								i !== 0 && 'border-edge border-t'
							)}
						>
							<span className="font-mono text-accent text-xs uppercase tracking-[0.25em]">
								{STEP_NUMBERS[i]}
							</span>
							<div>
								<h3 className="font-display font-normal text-xl leading-tight md:text-2xl">
									{s.title}
								</h3>
								<p className="mt-2 font-display text-base text-ink-muted leading-relaxed">{s.body}</p>
							</div>
						</li>
					))}
				</ol>
				<div className="flex items-start justify-center">
					<div className="w-full max-w-[400px]">
						<DemoTimerScreen />
					</div>
				</div>
			</div>
		</SectionShell>
	)
}

// Mock state piped through the live TimerModeView component so the landing surface
// always reflects the real timer-mode layout. Resting mid-session, working set 3/4 of
// bench press at 1:42 remaining.

// Real production system-exercise ID for Bench Press. Lets the demo's help modal
// fetch the actual seeded guide via the public getGuide endpoint.
const DEMO_BENCH_ID: Exercise['id'] = 'exc_01kh1qkzdbesmataj8pf85bgkf'

const DEMO_BENCH_EQUIPMENT: Equipment[] = ['barbell', 'bench_flat', 'squat_rack']

// 4 working sets + 2 backoff sets queued. Visitor catches the moment between
// the final working set and the first auto-suggested backoff drop.
const CURRENT_SET: FlatSet = {
	exerciseId: DEMO_BENCH_ID,
	exerciseName: 'Bench Press',
	setType: 'working',
	weightKg: 100,
	reps: 5,
	setNumber: 4,
	totalSets: 6,
	transition: false,
	itemIndex: 1,
	completed: false,
	bwMultiplier: 0,
	fatigueTier: 2,
	goal: 'strength',
	log: null,
	superset: null
}

const NEXT_SET: FlatSet = {
	exerciseId: DEMO_BENCH_ID,
	exerciseName: 'Bench Press',
	setType: 'backoff',
	weightKg: 80,
	reps: 7,
	setNumber: 5,
	totalSets: 6,
	transition: false,
	itemIndex: 1,
	completed: false,
	bwMultiplier: 0,
	fatigueTier: 2,
	goal: 'strength',
	log: null,
	superset: null
}

const REST_TOTAL_SEC = 150 // 2:30
const REST_START_SEC = 102 // 1:42 — start mid-countdown so visitors see motion immediately

const DemoTimerScreen: FC = () => {
	const [weight, setWeight] = useState<number | null>(100)
	const [reps, setReps] = useState(5)
	const [guideOpen, setGuideOpen] = useState(false)

	// Use the same ticking primitive as the live timer (useElapsedTimer = ~30fps via Date.now()).
	// Anchor the cycle start at mount, offset back so the first frame reads at REST_START_SEC.
	// Modulo over REST_TOTAL_SEC gives a seamless loop with no setState/effect cycles.
	const cycleAnchor = useMemo(() => Date.now() - (REST_TOTAL_SEC - REST_START_SEC) * 1000, [])
	const elapsedSec = useElapsedTimer(cycleAnchor) / 1000
	const remaining = REST_TOTAL_SEC - (elapsedSec % REST_TOTAL_SEC)

	return (
		<>
			<TimerModeView
				exerciseGroupCount={5}
				currentSet={CURRENT_SET}
				nextSet={NEXT_SET}
				isResting
				isDoingSet={false}
				isSetPaused={false}
				isInSuperset={false}
				hasConfirmedSets
				hasNotes={false}
				setElapsedSec={0}
				restRemainingSec={remaining}
				restTotalSec={REST_TOTAL_SEC}
				restSetType="working"
				roundStartedAt={null}
				sessionElapsedSec={0}
				weight={weight}
				reps={reps}
				onEditWeight={setWeight}
				onEditReps={setReps}
				onOpenGuide={() => setGuideOpen(true)}
			/>
			{guideOpen && (
				<ExerciseGuideModal
					exerciseId={CURRENT_SET.exerciseId}
					exerciseName={CURRENT_SET.exerciseName}
					equipment={DEMO_BENCH_EQUIPMENT}
					onClose={() => setGuideOpen(false)}
				/>
			)}
		</>
	)
}
