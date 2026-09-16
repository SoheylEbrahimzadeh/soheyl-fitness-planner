export type LanguageCode = 'fa' | 'en' | 'fr' | 'de'

export interface LanguageOption {
	code: LanguageCode
	/** Always shown in that language's own script, regardless of the current UI language. */
	nativeName: string
	dir: 'rtl' | 'ltr'
}

export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
	{ code: 'fa', nativeName: 'فارسی', dir: 'rtl' },
	{ code: 'en', nativeName: 'English', dir: 'ltr' },
	{ code: 'fr', nativeName: 'Français', dir: 'ltr' },
	{ code: 'de', nativeName: 'Deutsch', dir: 'ltr' }
]

export interface Dictionary {
	common: {
		signUp: string
		signIn: string
		openMenu: string
		closeMenu: string
		menu: string
		language: string
	}
	nav: {
		dashboard: string
		myPlan: string
		mealPlan: string
		workoutPlan: string
		shoppingList: string
		budget: string
		progress: string
		settings: string
		/** {{max}} */
		pinHint: string
		/** {{label}} */
		pinToBottomBar: string
		/** {{label}} */
		unpinFromBottomBar: string
	}
	dashboard: {
		title: string
		kicker: string
		/** {{name}} */
		greeting: string
		focusLine: string
		focusGoal: string
		activeProgramBadge: string
		bodyGoal: {
			title: string
			headline: string
			subtitle: string
			tags: readonly [string, string, string, string]
		}
		macro: {
			caloriesToday: string
			inRange: string
			setCalorieGoal: string
			proteinToday: string
			setProteinGoal: string
		}
		status: {
			todayWorkout: string
			inProgress: string
			emptyProgram: string
			weeklyBudget: string
		}
		meals: {
			title: string
			nothingLogged: string
			viewRecipe: string
			noRecipe: string
			/** {{n}} */
			slotFallback: string
			slots: readonly [string, string, string, string]
		}
		workout: {
			title: string
			viewAll: string
			defaultName: string
			inProgressSuffix: string
			/** {{sets}}, {{volume}} */
			sessionStats: string
			/** {{name}} */
			emptyProgram: string
			editProgram: string
			next: string
			/** {{count}} */
			exerciseCount: string
			/** {{min}} */
			durationMin: string
			start: string
			skip: string
			skipTitle: string
			undoSkip: string
			noTemplates: string
			createOne: string
		}
		progress: {
			title: string
			nutritionToday: string
			setGoalsPrefix: string
			macroGoalsLink: string
			setGoalsSuffix: string
			workoutAdherence: string
			/** {{count}} */
			completedSessions: string
			weightTrend: string
			noWeightData: string
		}
		budget: {
			title: string
			perWeek: string
			priceNote: string
		}
		buildNewWeek: string
	}
	landing: {
		hero: {
			headlineLine1: string
			headlineAccent1: string
			headlineLine2: string
			headlineAccent2: string
			subhead: string
			ctaStart: string
			ctaSeeLog: string
			specTagline: string
			specEst: string
			specSerial: string
			specLive: string
			footnotes: readonly [
				{ value: string; label: string },
				{ value: string; label: string },
				{ value: string; label: string }
			]
			nutritionPanel: {
				title: string
				code: string
				batchYieldLabel: string
				batchYieldValue: string
				servingSizeLabel: string
				servingSizeValue: string
				amountPerPortionLabel: string
				caloriesLabel: string
				dailyIntakeLabel: string
				rows: readonly [
					{ label: string; value: string; pct: string },
					{ label: string; value: string; pct: string },
					{ label: string; value: string; pct: string },
					{ label: string; value: string; pct: string }
				]
				ingredientsLabel: string
				ingredientsText: string
			}
			trainingPanel: {
				title: string
				code: string
				sessionLabel: string
				sessionValue: string
				totalVolumeLabel: string
				totalVolumeValue: string
				workingSetsLoggedLabel: string
				loadedLabel: string
				setsRepsE1rmLabel: string
				musclesLoadedLabel: string
				musclesLoadedText: string
			}
		}
		numbersRail: readonly [
			{ value: string; label: string },
			{ value: string; label: string },
			{ value: string; label: string },
			{ value: string; label: string },
			{ value: string; label: string },
			{ value: string; label: string },
			{ value: string; label: string },
			{ value: string; label: string },
			{ value: string; label: string },
			{ value: string; label: string },
			{ value: string; label: string },
			{ value: string; label: string },
			{ value: string; label: string }
		]
		plate: {
			marker: string
			title: string
			kicker: string
			cards: readonly [
				{ eyebrow: string; title: string; body: string },
				{ eyebrow: string; title: string; body: string },
				{ eyebrow: string; title: string; body: string }
			]
			perRawLabel: string
			perPortionLabel: string
			perBatchLabel: string
			localDbLabel: string
			usdaApiLabel: string
			aiLabel: string
			weekTotalLabel: string
		}
		rack: {
			marker: string
			title: string
			kicker: string
			coverageMapLabel: string
			lastDaysVolumeLabel: string
			lowLabel: string
			highLabel: string
			features: readonly [
				{ title: string; body: string },
				{ title: string; body: string },
				{ title: string; body: string },
				{ title: string; body: string },
				{ title: string; body: string }
			]
		}
		cycle: {
			marker: string
			title: string
			kicker: string
			cards: readonly [
				{ eyebrow: string; title: string; body: string },
				{ eyebrow: string; title: string; body: string }
			]
			activeLabel: string
			loopsLabel: string
			nextLabel: string
			doneLabel: string
			queuedLabel: string
			/** {{day}}, {{total}} */
			dayOfCycle: string
			wrapsToLabel: string
			cuesLabel: string
			pitfallsLabel: string
			guideLabel: string
		}
		signal: {
			marker: string
			title: string
			kicker: string
			cards: readonly [
				{ eyebrow: string; title: string; body: string },
				{ eyebrow: string; title: string; body: string },
				{ eyebrow: string; title: string; body: string },
				{ eyebrow: string; title: string; body: string },
				{ eyebrow: string; title: string; body: string }
			]
		}
		auto: {
			marker: string
			title: string
			kicker: string
			steps: readonly [
				{ title: string; body: string },
				{ title: string; body: string },
				{ title: string; body: string },
				{ title: string; body: string },
				{ title: string; body: string }
			]
		}
		intelligence: {
			marker: string
			title: string
			kicker: string
			rows: readonly [
				{ key: string; value: string; body: string },
				{ key: string; value: string; body: string },
				{ key: string; value: string; body: string },
				{ key: string; value: string; body: string },
				{ key: string; value: string; body: string },
				{ key: string; value: string; body: string }
			]
		}
		howItWorks: {
			marker: string
			title: string
			kicker: string
			stepLabel: string
			steps: readonly [
				{ title: string; body: string; meta: string },
				{ title: string; body: string; meta: string },
				{ title: string; body: string; meta: string },
				{ title: string; body: string; meta: string }
			]
		}
		faq: {
			marker: string
			title: string
			kicker: string
			qLabel: string
			items: readonly [
				{ q: string; a: string },
				{ q: string; a: string },
				{ q: string; a: string },
				{ q: string; a: string },
				{ q: string; a: string },
				{ q: string; a: string },
				{ q: string; a: string },
				{ q: string; a: string },
				{ q: string; a: string }
			]
			repoLinkLabel: string
		}
		footerCta: {
			marker: string
			titleLine1: string
			titleLine2: string
			subtitle: string
			ctaCreate: string
			ctaBackToTop: string
			tagline: string
		}
	}
}
