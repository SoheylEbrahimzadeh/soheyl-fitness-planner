import { SignedIn, SignedOut } from '@clerk/clerk-react'
import type { AbsoluteMacros } from '@macromaxxing/db'
import {
	BookOpen,
	ChevronLeft,
	Dumbbell,
	PiggyBank,
	Play,
	ShoppingCart,
	SkipForward,
	Sparkles,
	TrendingUp
} from 'lucide-react'
import { type FC, useMemo } from 'react'
import { Link, useNavigate } from 'react-router'
import { Button, Card, CardContent, CardHeader, Spinner, TRPCError } from '~/components/ui'
import { LandingPage } from '~/features/landing'
import { isPlanForWeek } from '~/features/mealPlans/utils/planWeek'
import { MacroTargetBars } from '~/features/nutrition/components/MacroTargetBars'
import { targetDelta, targetStatus } from '~/features/nutrition/utils/targets'
import { MacroRing } from '~/features/recipes/components/MacroRing'
import { calculateDayTotals, calculateRecipeMacros, calculateSlotMacros } from '~/features/recipes/utils/macros'
import { MuscleReadinessChip } from '~/features/workouts/components/MuscleChip'
import {
	cn,
	estimateWorkoutDurationSec,
	getWeekStart,
	getWeekStartDate,
	type ProgramCycleResult,
	pendingRecoveryFromPriorSession,
	pickNextWorkout,
	prefetchRoute,
	useDirection,
	useDocumentTitle,
	useTranslation
} from '~/lib'
import type { RouterOutput } from '~/lib/trpc'
import { trpc } from '~/lib/trpc'
import type { ReadinessSessionInput } from '~/lib/workouts/muscleReadiness'

export const clientLoader = () => prefetchRoute(utils => [utils.dashboard.summary.ensureData()])

type Template = RouterOutput['dashboard']['summary']['templates'][number]
type DashboardSession = RouterOutput['dashboard']['summary']['sessions'][number]
type MacroTargets = NonNullable<RouterOutput['dashboard']['summary']['macroTargets']>
/** Matches the `t` returned by `useTranslation()` — passed into plain (non-component) helpers below. */
type TFunc = (path: string, vars?: Record<string, string | number>) => string

/** Official product target until a real price backend exists — see BudgetSection. */
const WEEKLY_BUDGET_EUR = 50

function findLastSessionForWorkout(
	sessions: readonly DashboardSession[],
	workoutId: Template['id']
): ReadinessSessionInput | null {
	for (const session of sessions) {
		if (session.workoutId === workoutId && session.completedAt !== null) return session
	}
	return null
}

function resolvePriorSessionForRest(
	templates: readonly Template[],
	sessions: readonly DashboardSession[],
	cycleResult: ProgramCycleResult<Template> | null,
	nextTemplate: Template
): ReadinessSessionInput | null {
	if (cycleResult?.kind === 'program') {
		if (templates.length < 2) return null
		const nextIdx = templates.findIndex(t => t.id === nextTemplate.id)
		if (nextIdx === -1) return null
		const priorWorkoutId = templates[(nextIdx - 1 + templates.length) % templates.length].id
		return findLastSessionForWorkout(sessions, priorWorkoutId)
	}

	return sessions.find(s => s.completedAt !== null) ?? null
}

function todayDayIndex(): number {
	const d = new Date().getDay() // 0=Sun, 6=Sat
	return d === 0 ? 6 : d - 1 // Convert to 0=Mon..6=Sun
}

interface MealSlotMacros {
	recipeName: string
	/** Null for a bare ingredient dropped straight into a slot — there is no recipe page to link to. */
	recipeId: string | null
	hasInstructions: boolean
	planId: string
	slotId: string
	slotIndex: number
	portions: number
	macros: AbsoluteMacros
}

function computeTodayMeals(plans: RouterOutput['dashboard']['summary']['plans']): MealSlotMacros[] {
	const today = todayDayIndex()
	const weekKey = getWeekStartDate(Date.now())
	const meals: MealSlotMacros[] = []

	for (const plan of plans) {
		// Slots are weekday-indexed, so every other week's plan would otherwise pile onto today as well.
		if (!isPlanForWeek(plan, weekKey)) continue
		for (const inv of plan.inventory) {
			const todaySlots = inv.slots.filter(s => s.dayOfWeek === today)
			if (todaySlots.length === 0) continue

			const recipe = inv.recipe
			const { portion: portionMacros } = calculateRecipeMacros(recipe)

			for (const slot of todaySlots) {
				meals.push({
					recipeName: recipe.name,
					recipeId: recipe.id,
					hasInstructions: Boolean(recipe.instructions?.trim()),
					planId: plan.id,
					slotId: slot.id,
					slotIndex: slot.slotIndex,
					portions: slot.portions,
					macros: calculateSlotMacros(portionMacros, slot.portions)
				})
			}
		}
	}

	return meals
}

// Canonical meal-slot positions come from the i18n dictionary (`dashboard.meals.slots`, one
// per language). `slotIndex` has no explicit type in the schema (it's a plain day-position, see
// weekCalendar.ts), so this is a display convention, not a data guarantee — a plan with more
// slots in a day than named slots just spills into extra numbered buckets via
// `dashboard.meals.slotFallback`.
function groupMealsBySlot(
	meals: MealSlotMacros[],
	slots: readonly string[],
	t: TFunc
): { label: string; meals: MealSlotMacros[] }[] {
	const maxIndex = Math.max(slots.length - 1, ...meals.map(m => m.slotIndex))
	const buckets: { label: string; meals: MealSlotMacros[] }[] = []
	for (let i = 0; i <= maxIndex; i++) {
		buckets.push({
			label: slots[i] ?? t('dashboard.meals.slotFallback', { n: i + 1 }),
			meals: meals.filter(m => m.slotIndex === i)
		})
	}
	return buckets
}

const DashboardPage: FC = () => (
	<>
		<SignedOut>
			<LandingPage />
		</SignedOut>
		<SignedIn>
			<DashboardContent />
		</SignedIn>
	</>
)

export default DashboardPage

const DashboardContent: FC = () => {
	const { t, dict } = useTranslation()
	const dir = useDirection()
	useDocumentTitle(t('dashboard.title'))
	const navigate = useNavigate()
	const summaryQuery = trpc.dashboard.summary.useQuery()
	const utils = trpc.useUtils()

	const createSessionMutation = trpc.workout.createSession.useMutation({
		onSuccess: session => {
			utils.dashboard.summary.invalidate()
			navigate(`/workouts/sessions/${session.id}`)
		}
	})

	const invalidateSummary = () => utils.dashboard.summary.invalidate()
	const skipMutation = trpc.workout.skipWorkout.useMutation({ onSuccess: invalidateSummary })
	const unskipMutation = trpc.workout.unskipWorkout.useMutation({ onSuccess: invalidateSummary })
	const ensureWeekMutation = trpc.mealPlan.ensureWeek.useMutation({
		onSuccess: plan => navigate(`/plans/${plan.id}`)
	})

	const todayMeals = useMemo(
		() => (summaryQuery.data ? computeTodayMeals(summaryQuery.data.plans) : []),
		[summaryQuery.data]
	)
	const mealBuckets = useMemo(
		() => groupMealsBySlot(todayMeals, dict.dashboard.meals.slots, t),
		[todayMeals, dict, t]
	)
	const dayTotals = useMemo(() => calculateDayTotals(todayMeals.map(m => m.macros)), [todayMeals])

	const cycleResult = useMemo<ProgramCycleResult<Template> | null>(() => {
		const data = summaryQuery.data
		if (!data) return null
		return pickNextWorkout(data.templates, data.sessions, data.activeProgram ?? null, data.skips)
	}, [summaryQuery.data])

	const visibleTemplates = useMemo(() => {
		const data = summaryQuery.data
		if (!data) return []
		const { templates, activeProgram } = data
		if (!activeProgram || activeProgram.workoutIds.length === 0) return templates
		const byId = new Map(templates.map(t => [t.id, t]))
		return activeProgram.workoutIds.flatMap(id => {
			const t = byId.get(id)
			return t ? [t] : []
		})
	}, [summaryQuery.data])

	const weeklySessionCount = useMemo(() => {
		const data = summaryQuery.data
		if (!data) return 0
		const weekStart = getWeekStart(Date.now())
		return data.sessions.filter(s => s.completedAt !== null && s.completedAt >= weekStart).length
	}, [summaryQuery.data])

	if (summaryQuery.isLoading) {
		return (
			<div className="flex justify-center py-12">
				<Spinner />
			</div>
		)
	}

	if (!summaryQuery.data) {
		return <TRPCError error={summaryQuery.error} />
	}

	const { sessions, macroTargets } = summaryQuery.data
	const activeSession = sessions.find(s => !s.completedAt)
	const cycleForDisplay = !activeSession ? cycleResult : null

	return (
		<div dir={dir} className="mx-auto max-w-4xl space-y-8 pb-4">
			{summaryQuery.error && <TRPCError error={summaryQuery.error} />}

			<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<div className="mb-2 font-medium text-ink-faint text-xs tracking-wide">{t('dashboard.kicker')}</div>

					<h1 className="font-display font-semibold text-3xl text-ink sm:text-4xl">
						{t('dashboard.greeting', { name: 'Soheyl' })}
					</h1>

					<p className="mt-2 text-ink-muted text-sm sm:text-base">
						{t('dashboard.focusLine')}{' '}
						<span className="font-medium text-ink">{t('dashboard.focusGoal')}</span>
					</p>
				</div>

				<div className="flex items-center gap-2 self-start rounded-full border border-edge bg-surface-1 px-4 py-2 shadow-black/10 shadow-sm sm:self-auto">
					<span className="size-2 rounded-full bg-success" />
					<span className="text-ink-muted text-xs">{t('dashboard.activeProgramBadge')}</span>
				</div>
			</div>

			<BodyGoalSection />

			<MacroHeroSection dayTotals={dayTotals} targets={macroTargets} />

			<div className="grid grid-cols-2 gap-4">
				<StatusChip
					href="/workouts"
					icon={Dumbbell}
					label={t('dashboard.status.todayWorkout')}
					value={
						activeSession ? (
							<span className="text-accent">{t('dashboard.status.inProgress')}</span>
						) : cycleForDisplay?.kind === 'emptyActiveProgram' ? (
							<span className="text-ink-faint">{t('dashboard.status.emptyProgram')}</span>
						) : cycleForDisplay?.template ? (
							<span className="truncate">{cycleForDisplay.template.name}</span>
						) : (
							<span className="text-ink-faint">—</span>
						)
					}
				/>
				<StatusChip
					href="/budget"
					icon={PiggyBank}
					label={t('dashboard.status.weeklyBudget')}
					value={<span dir="ltr">€{WEEKLY_BUDGET_EUR}</span>}
				/>
			</div>

			<div className="grid gap-4 lg:grid-cols-2">
				<TodayMealsSection buckets={mealBuckets} />
				<TodayWorkoutSection
					activeSession={activeSession}
					cycleResult={cycleForDisplay}
					templates={visibleTemplates}
					sessions={sessions}
					onStartSession={id => createSessionMutation.mutate({ workoutId: id })}
					onSkip={id => skipMutation.mutate({ workoutId: id })}
					onUndoSkip={workoutId => {
						const skip = summaryQuery.data?.skips.find(s => s.workoutId === workoutId)
						if (skip) unskipMutation.mutate({ id: skip.id })
					}}
					isPending={createSessionMutation.isPending}
					isSkipPending={skipMutation.isPending || unskipMutation.isPending}
				/>
			</div>

			<ProgressSection dayTotals={dayTotals} targets={macroTargets} weeklySessionCount={weeklySessionCount} />

			<BudgetSection />

			<Button
				size="lg"
				className="h-12 w-full rounded-full font-medium text-base shadow-black/30 shadow-lg"
				onClick={() => ensureWeekMutation.mutate({ weekStart: getWeekStartDate(Date.now()) })}
				disabled={ensureWeekMutation.isPending}
			>
				<Sparkles className="size-4" />
				{t('dashboard.buildNewWeek')}
			</Button>
			{ensureWeekMutation.error && <TRPCError error={ensureWeekMutation.error} />}
		</div>
	)
}

// ─── Body goal ───────────────────────────────────────────────────────

const BodyGoalSection: FC = () => {
	const { t, dict } = useTranslation()
	return (
		<Card className="rounded-2xl border-edge bg-surface-1 shadow-black/20 shadow-sm">
			<CardContent className="p-5 sm:p-6">
				<div className="text-ink-faint text-xs">{t('dashboard.bodyGoal.title')}</div>
				<div className="mt-1.5 font-display font-semibold text-ink text-xl">
					{t('dashboard.bodyGoal.headline')}
				</div>
				<div dir="ltr" className="mt-0.5 text-right text-ink-faint text-xs">
					{t('dashboard.bodyGoal.subtitle')}
				</div>
				<div className="mt-3 flex flex-wrap gap-2">
					{dict.dashboard.bodyGoal.tags.map(tag => (
						<span key={tag} className="rounded-full border border-edge px-3 py-1 text-ink-muted text-xs">
							{tag}
						</span>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

// ─── Macro hero ──────────────────────────────────────────────────────

const statusColor = { under: 'text-ink-muted', on: 'text-success', over: 'text-destructive' } as const

const MacroHeroSection: FC<{ dayTotals: AbsoluteMacros; targets: MacroTargets | null }> = ({ dayTotals, targets }) => {
	const { t } = useTranslation()
	return (
		<Card className="overflow-hidden rounded-2xl border-accent/15 bg-surface-1 shadow-black/30 shadow-lg">
			<CardContent className="grid gap-8 p-6 sm:p-8 md:grid-cols-2">
				<div className="flex items-center gap-6">
					<MacroRing macros={dayTotals} size="lg" ratio="caloric" />
					<div className="min-w-0">
						<div className="text-ink-faint text-xs">{t('dashboard.macro.caloriesToday')}</div>
						<div dir="ltr" className="mt-1 text-right font-display font-semibold text-4xl text-ink">
							{dayTotals.kcal.toFixed(0)}
							{targets && <span className="text-ink-faint text-lg"> / {targets.kcal.toFixed(0)}</span>}
						</div>
						{targets ? (
							<div
								className={cn(
									'mt-1 font-mono text-sm',
									statusColor[targetStatus(dayTotals.kcal, targets.kcal, 'budget')]
								)}
							>
								{targetDelta(dayTotals.kcal, targets.kcal, 'budget') || t('dashboard.macro.inRange')}
							</div>
						) : (
							<Link to="/settings" className="mt-1 inline-block text-accent text-xs hover:underline">
								{t('dashboard.macro.setCalorieGoal')}
							</Link>
						)}
					</div>
				</div>

				<div className="flex flex-col justify-center gap-3 md:border-edge md:border-s md:ps-8">
					<div className="text-ink-faint text-xs">{t('dashboard.macro.proteinToday')}</div>
					<div dir="ltr" className="text-right font-display font-semibold text-4xl text-ink">
						{dayTotals.protein.toFixed(0)}
						<span className="text-ink-faint text-lg">
							g{targets && ` / ${targets.protein.toFixed(0)}g`}
						</span>
					</div>
					{targets ? (
						<div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-2">
							<div
								className="h-full rounded-full bg-macro-protein transition-all duration-500"
								style={{ width: `${Math.min(100, (dayTotals.protein / targets.protein) * 100)}%` }}
							/>
						</div>
					) : (
						<Link to="/settings" className="text-accent text-xs hover:underline">
							{t('dashboard.macro.setProteinGoal')}
						</Link>
					)}
				</div>
			</CardContent>
		</Card>
	)
}

// ─── Status chips ────────────────────────────────────────────────────

const StatusChip: FC<{
	href: string
	icon: FC<{ className?: string }>
	label: string
	value: React.ReactNode
}> = ({ href, icon: Icon, label, value }) => (
	<Link
		to={href}
		className="flex items-center gap-3 rounded-xl border border-edge bg-surface-1 px-5 py-4 shadow-black/20 shadow-sm transition-colors hover:bg-surface-2"
	>
		<Icon className="size-5 shrink-0 text-ink-faint" />
		<div className="min-w-0">
			<div className="text-ink-faint text-xs">{label}</div>
			<div className="truncate font-medium text-ink text-sm">{value}</div>
		</div>
	</Link>
)

// ─── Today: meals ────────────────────────────────────────────────────

const TodayMealsSection: FC<{ buckets: { label: string; meals: MealSlotMacros[] }[] }> = ({ buckets }) => {
	const { t } = useTranslation()
	return (
		<Card className="rounded-2xl border-edge bg-surface-1 shadow-black/20 shadow-sm">
			<CardHeader className="px-5 py-4 sm:px-6">
				<h2 className="font-semibold text-base text-ink">{t('dashboard.meals.title')}</h2>
			</CardHeader>
			<CardContent className="space-y-4 p-5 sm:p-6">
				{buckets.map(bucket => (
					<div key={bucket.label} className="space-y-1.5">
						<div className="text-ink-faint text-xs">{bucket.label}</div>
						{bucket.meals.length === 0 ? (
							<div className="text-ink-faint text-sm">{t('dashboard.meals.nothingLogged')}</div>
						) : (
							bucket.meals.map(meal => (
								<div
									key={meal.slotId}
									className="rounded-xl px-2 py-2 transition-colors hover:bg-surface-2"
								>
									<Link to={`/plans/${meal.planId}`} className="flex items-center gap-3">
										<div className="min-w-0 flex-1">
											<div className="truncate font-medium text-ink text-sm">
												{meal.recipeName}
											</div>
											<div
												dir="ltr"
												className="text-right font-mono text-ink-muted text-xs tabular-nums"
											>
												{meal.portions > 1 && `${meal.portions}× · `}
												{meal.macros.kcal.toFixed(0)} kcal · P {meal.macros.protein.toFixed(0)}g
												· C {meal.macros.carbs.toFixed(0)}g · F {meal.macros.fat.toFixed(0)}g
											</div>
										</div>
										<ChevronLeft className="size-4 shrink-0 text-ink-faint" />
									</Link>
									{meal.recipeId &&
										(meal.hasInstructions ? (
											<Link
												to={`/recipes/${meal.recipeId}`}
												className="mt-1.5 inline-flex items-center gap-1 text-accent text-xs hover:underline"
											>
												<BookOpen className="size-3" />
												{t('dashboard.meals.viewRecipe')}
											</Link>
										) : (
											<span className="mt-1.5 inline-flex items-center gap-1 text-ink-faint text-xs">
												<BookOpen className="size-3" />
												{t('dashboard.meals.noRecipe')}
											</span>
										))}
								</div>
							))
						)}
					</div>
				))}
			</CardContent>
		</Card>
	)
}

// ─── Today: workout ──────────────────────────────────────────────────

interface TodayWorkoutSectionProps {
	activeSession: DashboardSession | undefined
	cycleResult: ProgramCycleResult<Template> | null
	templates: readonly Template[]
	sessions: readonly DashboardSession[]
	onStartSession: (workoutId: Template['id']) => void
	onSkip: (workoutId: Template['id']) => void
	onUndoSkip: (workoutId: Template['id']) => void
	isPending: boolean
	isSkipPending: boolean
}

const TodayWorkoutSection: FC<TodayWorkoutSectionProps> = ({
	activeSession,
	cycleResult,
	templates,
	sessions,
	onStartSession,
	onSkip,
	onUndoSkip,
	isPending,
	isSkipPending
}) => {
	const { t } = useTranslation()
	const nextTemplate = cycleResult && cycleResult.kind !== 'emptyActiveProgram' ? cycleResult.template : null
	const skippedWorkoutId = cycleResult?.kind === 'program' ? cycleResult.skippedWorkoutId : null
	const canSkip = cycleResult?.kind === 'program'
	const isSkipped = nextTemplate ? nextTemplate.id === skippedWorkoutId : false

	const priorSession = useMemo(
		() => (nextTemplate ? resolvePriorSessionForRest(templates, sessions, cycleResult, nextTemplate) : null),
		[nextTemplate, templates, sessions, cycleResult]
	)
	const pendingMuscles = useMemo(
		() => (nextTemplate ? pendingRecoveryFromPriorSession(priorSession, nextTemplate, Date.now()) : []),
		[nextTemplate, priorSession]
	)

	return (
		<Card className="rounded-2xl border-edge bg-surface-1 shadow-black/20 shadow-sm">
			<CardHeader className="px-5 py-4 sm:px-6">
				<div className="flex items-center justify-between">
					<h2 className="font-semibold text-base text-ink">{t('dashboard.workout.title')}</h2>
					<Link to="/workouts" className="text-ink-faint text-xs hover:text-ink">
						{t('dashboard.workout.viewAll')}
					</Link>
				</div>
			</CardHeader>
			<CardContent className="p-5 sm:p-6">
				{activeSession ? (
					<Link
						to={`/workouts/sessions/${activeSession.id}`}
						className="-m-2 flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-surface-2"
					>
						<div className="flex size-10 items-center justify-center rounded-full bg-accent/20">
							<Play className="size-4 text-accent" />
						</div>
						<div className="min-w-0 flex-1">
							<div className="font-medium text-ink text-sm">
								{activeSession.name ?? t('dashboard.workout.defaultName')} —{' '}
								{t('dashboard.workout.inProgressSuffix')}
							</div>
							<div dir="ltr" className="text-right font-mono text-ink-muted text-xs tabular-nums">
								{t('dashboard.workout.sessionStats', {
									sets: activeSession.summary.setCount,
									volume: (activeSession.summary.volumeKg / 1000).toFixed(1)
								})}
							</div>
						</div>
						<ChevronLeft className="size-4 shrink-0 text-ink-faint" />
					</Link>
				) : cycleResult?.kind === 'emptyActiveProgram' ? (
					<div className="text-ink-faint text-sm">
						{t('dashboard.workout.emptyProgram', { name: cycleResult.programName })}{' '}
						<Link to={`/plans/programs/${cycleResult.programId}`} className="text-accent hover:underline">
							{t('dashboard.workout.editProgram')}
						</Link>
					</div>
				) : nextTemplate ? (
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							<Link
								to={`/workouts/${nextTemplate.id}`}
								className="min-w-0 truncate font-medium text-ink text-sm hover:underline"
							>
								{nextTemplate.name}
							</Link>
							<span className="shrink-0 text-accent text-xs">{t('dashboard.workout.next')}</span>
						</div>
						<div dir="ltr" className="text-right font-mono text-ink-faint text-xs tabular-nums">
							{t('dashboard.workout.exerciseCount', { count: nextTemplate.exercises.length })}
							{Math.round(estimateWorkoutDurationSec(nextTemplate) / 60) > 0 &&
								` · ${t('dashboard.workout.durationMin', {
									min: Math.round(estimateWorkoutDurationSec(nextTemplate) / 60)
								})}`}
						</div>
						{pendingMuscles.length > 0 && (
							<div className="flex flex-wrap gap-1">
								{pendingMuscles.map(m => (
									<MuscleReadinessChip
										key={m.muscleGroup}
										muscleGroup={m.muscleGroup}
										remainingHours={m.remainingHours}
										readyAt={m.readyAt}
									/>
								))}
							</div>
						)}
						<div className="flex items-center gap-2">
							<Button
								size="sm"
								className="rounded-lg"
								onClick={() => onStartSession(nextTemplate.id)}
								disabled={isPending}
							>
								<Play className="size-3.5" />
								{t('dashboard.workout.start')}
							</Button>
							{canSkip && !isSkipped && (
								<Button
									variant="ghost"
									size="sm"
									className="rounded-lg"
									onClick={() => onSkip(nextTemplate.id)}
									disabled={isSkipPending}
									title={t('dashboard.workout.skipTitle')}
								>
									<SkipForward className="size-3.5" />
									{t('dashboard.workout.skip')}
								</Button>
							)}
							{isSkipped && (
								<Button
									variant="ghost"
									size="sm"
									className="rounded-lg"
									onClick={() => onUndoSkip(nextTemplate.id)}
									disabled={isSkipPending}
								>
									{t('dashboard.workout.undoSkip')}
								</Button>
							)}
						</div>
					</div>
				) : (
					<div className="py-2 text-ink-faint text-sm">
						{t('dashboard.workout.noTemplates')}{' '}
						<Link to="/workouts/new" className="text-accent hover:underline">
							{t('dashboard.workout.createOne')}
						</Link>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

// ─── Progress ────────────────────────────────────────────────────────

const ProgressSection: FC<{
	dayTotals: AbsoluteMacros
	targets: MacroTargets | null
	weeklySessionCount: number
}> = ({ dayTotals, targets, weeklySessionCount }) => {
	const { t } = useTranslation()
	return (
		<Card className="rounded-2xl border-edge bg-surface-1 shadow-black/20 shadow-sm">
			<CardHeader className="px-5 py-4 sm:px-6">
				<div className="flex items-center gap-2">
					<TrendingUp className="size-4 text-ink-muted" />
					<h2 className="font-semibold text-base text-ink">{t('dashboard.progress.title')}</h2>
				</div>
			</CardHeader>
			<CardContent className="space-y-5 p-5 sm:p-6">
				<div>
					<div className="mb-2 text-ink-faint text-xs">{t('dashboard.progress.nutritionToday')}</div>
					{targets ? (
						<MacroTargetBars totals={dayTotals} targets={targets} />
					) : (
						<div className="text-ink-faint text-sm">
							{t('dashboard.progress.setGoalsPrefix')}
							<Link to="/settings" className="text-accent hover:underline">
								{t('dashboard.progress.macroGoalsLink')}
							</Link>
							{t('dashboard.progress.setGoalsSuffix')}
						</div>
					)}
				</div>
				<div>
					<div className="mb-1 text-ink-faint text-xs">{t('dashboard.progress.workoutAdherence')}</div>
					<div dir="ltr" className="text-right font-mono text-ink text-sm tabular-nums">
						{t('dashboard.progress.completedSessions', { count: weeklySessionCount })}
					</div>
				</div>
				<div>
					<div className="mb-1 text-ink-faint text-xs">{t('dashboard.progress.weightTrend')}</div>
					<div className="text-ink-faint text-sm">{t('dashboard.progress.noWeightData')}</div>
				</div>
			</CardContent>
		</Card>
	)
}

// ─── Budget ──────────────────────────────────────────────────────────

const BudgetSection: FC = () => {
	const { t } = useTranslation()
	return (
		<Card className="rounded-2xl border-edge bg-surface-1 shadow-black/20 shadow-sm">
			<CardHeader className="px-5 py-4 sm:px-6">
				<div className="flex items-center gap-2">
					<PiggyBank className="size-4 text-ink-muted" />
					<h2 className="font-semibold text-base text-ink">{t('dashboard.budget.title')}</h2>
				</div>
			</CardHeader>
			<CardContent className="p-5 sm:p-6">
				<div dir="ltr" className="text-right font-display font-semibold text-3xl text-ink">
					€{WEEKLY_BUDGET_EUR}
					<span className="text-ink-faint text-sm"> {t('dashboard.budget.perWeek')}</span>
				</div>
				<p className="mt-3 flex items-center gap-1.5 text-ink-faint text-xs">
					<ShoppingCart className="size-3.5 shrink-0" />
					{t('dashboard.budget.priceNote')}
				</p>
			</CardContent>
		</Card>
	)
}
