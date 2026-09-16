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
}
