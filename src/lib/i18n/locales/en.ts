import type { Dictionary } from '../types'

export const en: Dictionary = {
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
			skipTitle: "Skip this one — the next one takes its place",
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
	}
}
