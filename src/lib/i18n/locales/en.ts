import type { Dictionary } from '../types'

export const en: Dictionary = {
	enums: {
		setType: {
			warmup: 'Warmup',
			working: 'Working',
			backoff: 'Backoff'
		},
		setMode: {
			warmup: 'Warmup',
			working: 'Working',
			backoff: 'Backoff',
			full: 'Full'
		},
		trainingGoal: {
			default: 'Default',
			hypertrophy: 'Hypertrophy',
			strength: 'Strength'
		},
		muscleGroup: {
			chest: 'Chest',
			upper_back: 'Upper Back',
			lats: 'Lats',
			front_delts: 'Front Delts',
			side_delts: 'Side Delts',
			rear_delts: 'Rear Delts',
			biceps: 'Biceps',
			triceps: 'Triceps',
			forearms: 'Forearms',
			quads: 'Quads',
			hamstrings: 'Hamstrings',
			glutes: 'Glutes',
			calves: 'Calves',
			core: 'Core'
		},
		exerciseMetric: {
			e1rm: 'e1RM',
			volume: 'Volume',
			weight: 'Top set'
		},
		exerciseType: {
			compound: 'Compound',
			isolation: 'Isolation'
		}
	},
	common: {
		signUp: 'Sign up',
		signIn: 'Sign in',
		openMenu: 'Open menu',
		closeMenu: 'Close menu',
		menu: 'Menu',
		language: 'Language'
	},
	nav: {
		dashboard: 'Dashboard',
		myPlan: 'My Plan',
		mealPlan: 'Meal Plan',
		workoutPlan: 'Workout Plan',
		shoppingList: 'Shopping List',
		budget: 'Budget',
		progress: 'Progress',
		settings: 'Settings',
		pinHint: 'You can pin up to {{max}} items to the bottom bar. Picking a fifth replaces the oldest one.',
		pinToBottomBar: 'Pin {{label}} to bottom bar',
		unpinFromBottomBar: 'Unpin {{label}} from bottom bar'
	},
	dashboard: {
		title: 'Dashboard',
		kicker: 'PERSONAL FITNESS PLANNER',
		greeting: 'Hi, {{name}}',
		focusLine: 'Focus on one goal today:',
		focusGoal: 'Cut fat, keep muscle',
		activeProgramBadge: 'Active program',
		bodyGoal: {
			title: 'Body goal',
			headline: 'Fat loss + muscle maintenance and growth',
			subtitle: 'Body Recomposition',
			tags: ['Fat loss', 'Muscle maintenance & growth', 'Resistance training', 'Adequate recovery']
		},
		macro: {
			caloriesToday: 'Calories today',
			inRange: 'On target',
			setCalorieGoal: 'Set calorie goal',
			proteinToday: 'Protein today',
			setProteinGoal: 'Set protein goal'
		},
		status: {
			todayWorkout: "Today's workout",
			inProgress: 'In progress',
			emptyProgram: 'Program is empty',
			weeklyBudget: 'Weekly budget'
		},
		meals: {
			title: "🍽️ Today's meals",
			nothingLogged: 'Nothing logged',
			viewRecipe: 'View recipe',
			noRecipe: 'No recipe logged',
			slotFallback: 'Slot {{n}}',
			slots: ['Breakfast', 'Lunch', 'Snack', 'Dinner']
		},
		workout: {
			title: "🏋️ Today's workout",
			viewAll: 'View all',
			defaultName: 'Workout',
			inProgressSuffix: 'in progress',
			sessionStats: '{{sets}} sets · {{volume}}k volume',
			emptyProgram: 'Active program "{{name}}" has no workouts.',
			editProgram: 'Edit program',
			next: 'Next',
			exerciseCount: '{{count}} exercises',
			durationMin: '~{{min}} min',
			start: 'Start',
			skip: 'Skip',
			skipTitle: 'Skip this one — the next one takes its place',
			undoSkip: 'Undo',
			noTemplates: "You haven't built a workout template yet.",
			createOne: 'Create one'
		},
		progress: {
			title: '📊 Progress',
			nutritionToday: "Today's nutrition adherence",
			setGoalsPrefix: 'To see nutrition adherence, set your ',
			macroGoalsLink: 'macro goals',
			setGoalsSuffix: '.',
			workoutAdherence: "This week's workout adherence",
			completedSessions: '{{count}} sessions completed',
			weightTrend: 'Weight trend',
			noWeightData: 'No weight data logged yet'
		},
		budget: {
			title: '💰 Weekly budget',
			perWeek: '/ week',
			priceNote: 'Prices will be calculated once REWE products are connected.'
		},
		buildNewWeek: 'Build new week'
	},
	landing: {
		hero: {
			headlineLine1: 'Track every',
			headlineAccent1: 'gram.',
			headlineLine2: 'Log every',
			headlineAccent2: 'rep.',
			subhead:
				'A precision log for meal prep and strength training. Built for lifters who measure what they eat and what they lift.',
			ctaStart: 'Start tracking',
			ctaSeeLog: 'See the log',
			specTagline: 'Nutrition + Training Log',
			specEst: 'Est 2025',
			specSerial: 'Serial 0001A',
			specLive: 'Live',
			footnotes: [
				{ value: '14,328', label: 'USDA foods indexed' },
				{ value: '14', label: 'Muscle groups tracked' },
				{ value: '0.1 g', label: 'Macro resolution' }
			],
			nutritionPanel: {
				title: 'Nutrition Facts',
				code: 'rcp_01',
				batchYieldLabel: 'Batch yield',
				batchYieldValue: '6 portions',
				servingSizeLabel: 'Serving size',
				servingSizeValue: '1 portion · 285 g',
				amountPerPortionLabel: 'Amount per portion',
				caloriesLabel: 'Calories',
				dailyIntakeLabel: '% Daily Intake',
				rows: [
					{ label: 'Total Fat', value: '22 g', pct: '28%' },
					{ label: 'Total Carbs', value: '58 g', pct: '21%' },
					{ label: 'Dietary Fiber', value: '8 g', pct: '28%' },
					{ label: 'Protein', value: '52 g', pct: '40%' }
				],
				ingredientsLabel: 'Ingredients',
				ingredientsText:
					'Chicken thigh, jasmine rice, broccoli florets, sesame oil, soy, fresh ginger, garlic, chili flake.'
			},
			trainingPanel: {
				title: 'Training Facts',
				code: 'wks_07',
				sessionLabel: 'Session',
				sessionValue: 'Push A · 58 min',
				totalVolumeLabel: 'Total volume',
				totalVolumeValue: '14,280 kg',
				workingSetsLoggedLabel: 'Working sets logged',
				loadedLabel: 'Loaded',
				setsRepsE1rmLabel: 'Sets × Reps · e1RM',
				musclesLoadedLabel: 'Muscles loaded',
				musclesLoadedText: 'Chest, front delts, side delts, triceps, core.'
			}
		},
		numbersRail: [
			{ value: '14,328', label: 'USDA foods indexed' },
			{ value: '14', label: 'Muscle groups' },
			{ value: '4', label: 'Fatigue tiers' },
			{ value: '0.1 g', label: 'Macro resolution' },
			{ value: 'e1RM', label: 'PRs auto-detected' },
			{ value: 'AES-GCM', label: 'BYOK key storage' },
			{ value: 'FTS5', label: 'Search engine' },
			{ value: 'MCP', label: 'Server exposed' },
			{ value: 'Programs', label: 'Cycle-aware dashboard' },
			{ value: 'PWA', label: 'Offline-first' },
			{ value: 'D1', label: 'SQLite at the edge' },
			{ value: 'R2', label: 'Image storage' },
			{ value: '3', label: 'AI providers' }
		],
		plate: {
			marker: '§ 01 / Plate',
			title: 'Meals tracked to the gram.',
			kicker: 'Recipes with ingredients, portion sizes, subrecipes, and cooked weight. Macros scale with everything.',
			cards: [
				{
					eyebrow: 'Recipe',
					title: 'Gram-accurate math',
					body: 'Ingredients in, macros out. Per-100 g, per-portion, per-batch. Subrecipes compose. Cooked weight adjusts density on the fly.'
				},
				{
					eyebrow: 'Lookup',
					title: 'Three sources, one box',
					body: 'Local USDA database first. USDA FoodData Central next. Your AI provider last. Barcode scan. Density for scoops, tbsps, pieces.'
				},
				{
					eyebrow: 'Plan',
					title: 'The week, allocated',
					body: 'Create a plan. Add recipes to its inventory. Drop portions into Mon → Sun slots. Over-allocate and we warn you — never block you.'
				}
			],
			perRawLabel: 'Per 100 g raw',
			perPortionLabel: 'Per portion · 285 g',
			perBatchLabel: 'Per batch · 6 portions',
			localDbLabel: 'Local DB',
			usdaApiLabel: 'USDA API',
			aiLabel: 'AI',
			weekTotalLabel: 'Week total'
		},
		rack: {
			marker: '§ 02 / Rack',
			title: 'Training logged rep for rep.',
			kicker: 'Templates pre-fill planned sets. Tap to confirm. Body map heats up with volume. Rest timer knows how hard you just worked.',
			coverageMapLabel: 'Coverage map',
			lastDaysVolumeLabel: 'Last 14 days · volume',
			lowLabel: 'Low',
			highLabel: 'High',
			features: [
				{
					title: 'Templates that pre-fill',
					body: 'Build once with sets, reps, target weight, and set modes (working / warmup / backoff / full). Every session starts with planned sets ready to confirm.'
				},
				{
					title: 'Supersets as interleaved rounds',
					body: 'Group exercises with supersetGroup. The UI renders rounds instead of two lists, with transition timers between movements.'
				},
				{
					title: 'Fatigue-aware rest timer',
					body: 'Rest duration = reps × 4 × goal × tier modifier. Squats get longer recovery than curls. The timer persists across pages and survives a refresh.'
				},
				{
					title: 'Body map heat from real volume',
					body: 'Each exercise maps to muscle groups with intensity (0.0–1.0). Sessions aggregate into a coverage map that shows exactly what you trained — and what you neglected.'
				},
				{
					title: 'Strength standards',
					body: 'Bench → incline DB. Squat → leg extension. Curated compound-to-isolation ratios flag when an accessory lift is out of proportion with the main lift.'
				}
			]
		},
		cycle: {
			marker: '§ 03 / Cycle',
			title: 'Programs that loop. Cues that stick.',
			kicker: 'Pick a program. The dashboard cycles through it. Open any exercise for cues, pitfalls, and the rep that earned it.',
			cards: [
				{
					eyebrow: 'Programs',
					title: 'Named cycles, active by default',
					body: "Group templates into a program — Push / Pull / Legs, Upper / Lower, whatever. Star one as active and the dashboard tells you what's next, by day-of-cycle, not by guess."
				},
				{
					eyebrow: 'Technique',
					title: 'The coach lives in the lift',
					body: "Every exercise carries its own technique guide — description, cues to focus on, pitfalls to avoid. Curated for system lifts, editable on your own. One tap from the set you're about to perform."
				}
			],
			activeLabel: 'Active',
			loopsLabel: 'Loops',
			nextLabel: 'Next',
			doneLabel: 'Done',
			queuedLabel: 'Queued',
			dayOfCycle: 'Day {{day}} of {{total}}',
			wrapsToLabel: 'Wraps to {{name}}',
			cuesLabel: 'Cues',
			pitfallsLabel: 'Pitfalls',
			guideLabel: 'Guide'
		},
		signal: {
			marker: '§ 04 / Signal',
			title: 'Logged sets become signal.',
			kicker: "Every working set feeds a graph. PRs flag themselves. Stalls surface. The week's volume shows up by muscle.",
			cards: [
				{
					eyebrow: 'Weekly volume',
					title: 'Stacked by muscle group',
					body: 'Working sets weighted by muscle intensity, summed per week, stacked by group. Read the trend; spot the muscle that quietly fell off.'
				},
				{
					eyebrow: 'PRs',
					title: 'Detected, not declared',
					body: 'When estimated 1RM beats the prior best by more than 0.5 kg, it flags itself. No streaks, no toasts — a quiet ↑ next to the lift.'
				},
				{
					eyebrow: 'Stalled',
					title: 'Flatlines surface',
					body: 'Three sessions without a top-set or e1RM gain and the lift surfaces here. Deload, swap, or push — the call is yours.'
				},
				{
					eyebrow: 'Calendar',
					title: 'Density by day',
					body: 'Sessions, working sets — coloured by intensity. The empty cells say more than the full ones.'
				},
				{
					eyebrow: 'Per-exercise',
					title: 'e1RM over time',
					body: 'Open any lift to see top set, e1RM, and volume per session. Every dot is one rep that earned it.'
				}
			]
		},
		auto: {
			marker: '§ 05 / Auto',
			title: 'Turn off your brain at the gym.',
			kicker: 'The app calculates warmup, rest, and backoff. You log the set — it does the math, holds the clock, and pre-fills next time from what you actually did.',
			steps: [
				{
					title: 'Open the workout.',
					body: 'The app pulls your last session, generates the warmup ramp, and pre-fills targets from the template. Sets, reps, weight, and set type — already there, ready to confirm.'
				},
				{
					title: 'Confirm the planned set.',
					body: 'Same shape as last time, already filled. Tap once — it logs and moves you to the next set. Edit weight or reps if you actually went heavier; the app stays out of your way.'
				},
				{
					title: 'Rest auto-starts.',
					body: 'Countdown = reps × 4 × goal × fatigue tier. Squats get longer recovery than curls. Compounds longer than isolations. Supersets swap to a short transition timer between exercises in a round, then a full rest once the round closes — no manual switching.'
				},
				{
					title: 'Adjust on the fly.',
					body: "Hit a wall on a working set? The app suggests backoff sets at -10% / -15% so you can still close the round at a real stimulus. Skip if you don't want them."
				},
				{
					title: 'Finish — targets self-update.',
					body: "Session review flags every divergence: heavier than planned, fewer reps, anything stalled. One tap accepts the new numbers. Next session pre-fills from what you actually did, not yesterday's wishful thinking."
				}
			]
		},
		intelligence: {
			marker: '§ 06 / Instrument',
			title: 'Built to be trusted.',
			kicker: "The tooling underneath. Encrypted, portable, scriptable. Nothing you can't walk away from.",
			rows: [
				{
					key: 'AI providers',
					value: 'Gemini / OpenAI / Anthropic',
					body: 'Bring your own key. Swap providers per request. Fallback chain handles 429s.'
				},
				{
					key: 'Key storage',
					value: 'AES-GCM',
					body: 'Encrypted at rest on Cloudflare D1. Decrypted only at request time. Never leaves your account.'
				},
				{
					key: 'Food database',
					value: '14,328 foods local',
					body: 'USDA Foundation + SR Legacy, indexed with SQLite FTS5. Queries in under 10 ms at the edge.'
				},
				{
					key: 'Offline mode',
					value: 'PWA · Workbox',
					body: 'Installable to home screen. Workbox precaches assets. Plan a week from the gym with no signal.'
				},
				{
					key: 'External API',
					value: 'MCP server · bearer',
					body: 'Point Claude, Cursor, or any MCP client at /api/mcp. Read recipes, log workouts, query analytics — every annotated procedure exposed as a tool.'
				},
				{
					key: 'Infra',
					value: 'Cloudflare D1 + R2',
					body: 'SQLite at the edge for data. R2 for recipe images. Hono + tRPC on Pages Functions.'
				}
			]
		},
		howItWorks: {
			marker: '§ 07 / Log',
			title: 'The loop.',
			kicker: 'Four steps. Repeat weekly. The app gets out of the way.',
			stepLabel: 'Step',
			steps: [
				{
					title: 'Catalog',
					body: 'Add recipes and ingredients. AI fills macros if USDA does not have them. Set portion size. See kcal per gram, per portion, per batch.',
					meta: '~30 s per recipe'
				},
				{
					title: 'Plan',
					body: 'Create a meal plan. Add recipes to inventory with portion count. Allocate portions across Mon → Sun slots. Cook once, eat all week.',
					meta: 'Inventory-based'
				},
				{
					title: 'Lift',
					body: 'Build workout templates from system or custom exercises. Start a session and planned sets pre-fill. Tap to confirm each set.',
					meta: 'Checklist-driven'
				},
				{
					title: 'Review',
					body: 'Body map heats by volume. Session review flags drift between planned and actual. Update targets in one tap.',
					meta: 'Divergence-aware'
				}
			]
		},
		faq: {
			marker: '§ 08 / Notes',
			title: 'Questions.',
			kicker: 'Plain answers. No accordions.',
			qLabel: 'Q',
			items: [
				{
					q: 'Is it free?',
					a: 'The app is free. For nutrition lookups that miss the local USDA database, bring your own AI key — Gemini, OpenAI, or Anthropic. Barcode scanning and the local food database work without any key at all.'
				},
				{
					q: 'Is the source code available?',
					a: 'Yes. Soheyl Fitness is open source. Read the code, file an issue, or send a pull request. Self-host it if you want.'
				},
				{
					q: 'Does it work offline?',
					a: 'Yes. It is a PWA. Install to home screen, cache assets, plan a week with no signal. Mutations sync when the connection returns.'
				},
				{
					q: 'Can I follow a program (PPL, Upper / Lower, etc.)?',
					a: 'Yes. Group your workout templates into a named program and star one as active. The dashboard cycles through it day by day — finish Push A, "Up next" becomes Pull A. Reorder anytime; the cycle adjusts.'
				},
				{
					q: 'Do I get progress charts and PR detection?',
					a: 'Yes. The analytics page shows recent PRs (estimated 1RM beats prior best by more than 0.5 kg), stalled lifts, weekly volume by muscle, and a calendar heatmap. Each exercise gets its own e1RM / volume / top-set chart.'
				},
				{
					q: 'Is this a recipe app or a training app?',
					a: "Both. That is the point. Meal prep and strength training share an audience — and a user's week. One instrument for both."
				},
				{
					q: 'Do you sell my data or train models on it?',
					a: 'No. Your recipes, workouts, and AI keys are yours. Keys are encrypted at rest with AES-GCM and decrypted only when you make a request.'
				},
				{
					q: 'Can I connect other tools?',
					a: 'Yes. The app exposes an MCP server. Create a personal access token in Settings and point Claude, Cursor, or any MCP-aware client at it.'
				},
				{
					q: 'What about barcode labels that are not in the database?',
					a: 'Paste a link to the product page — the app parses JSON-LD Product schema, falling back to AI. Or type the label values directly and the recipe will be treated as a premade meal.'
				}
			],
			repoLinkLabel: 'View the repository on GitHub'
		},
		footerCta: {
			marker: '§ End of spec',
			titleLine1: 'Start the log today.',
			titleLine2: 'Be better by Sunday.',
			subtitle: 'Free account. No credit card. Your data stays yours. Install to your phone if you want.',
			ctaCreate: 'Create an account',
			ctaBackToTop: 'Back to top',
			tagline: 'Built for lifters who measure'
		}
	}
}
