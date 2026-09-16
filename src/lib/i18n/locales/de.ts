import type { Dictionary } from '../types'

export const de: Dictionary = {
	common: {
		signUp: 'Registrieren',
		signIn: 'Anmelden',
		openMenu: 'Menü öffnen',
		closeMenu: 'Menü schließen',
		menu: 'Menü',
		language: 'Sprache'
	},
	nav: {
		dashboard: 'Dashboard',
		myPlan: 'Mein Plan',
		mealPlan: 'Ernährungsplan',
		workoutPlan: 'Trainingsplan',
		shoppingList: 'Einkaufsliste',
		budget: 'Budget',
		progress: 'Fortschritt',
		settings: 'Einstellungen',
		pinHint:
			'Du kannst bis zu {{max}} Elemente an die untere Leiste anheften. Wählst du ein fünftes, ersetzt es das älteste.',
		pinToBottomBar: '{{label}} an untere Leiste anheften',
		unpinFromBottomBar: '{{label}} von unterer Leiste lösen'
	},
	dashboard: {
		title: 'Dashboard',
		kicker: 'PERSONAL FITNESS PLANNER',
		greeting: 'Hallo, {{name}}',
		focusLine: 'Konzentriere dich heute auf ein Ziel:',
		focusGoal: 'Fett verlieren, Muskeln erhalten',
		activeProgramBadge: 'Aktives Programm',
		bodyGoal: {
			title: 'Körperziel',
			headline: 'Fettabbau + Muskelerhalt und -aufbau',
			subtitle: 'Body Recomposition',
			tags: ['Fettabbau', 'Muskelerhalt & -aufbau', 'Krafttraining', 'Ausreichende Erholung']
		},
		macro: {
			caloriesToday: 'Kalorien heute',
			inRange: 'Im Zielbereich',
			setCalorieGoal: 'Kalorienziel festlegen',
			proteinToday: 'Protein heute',
			setProteinGoal: 'Proteinziel festlegen'
		},
		status: {
			todayWorkout: 'Heutiges Training',
			inProgress: 'Läuft',
			emptyProgram: 'Programm ist leer',
			weeklyBudget: 'Wochenbudget'
		},
		meals: {
			title: '🍽️ Heutige Mahlzeiten',
			nothingLogged: 'Noch nichts eingetragen',
			viewRecipe: 'Rezept ansehen',
			noRecipe: 'Kein Rezept hinterlegt',
			slotFallback: 'Slot {{n}}',
			slots: ['Frühstück', 'Mittagessen', 'Snack', 'Abendessen']
		},
		workout: {
			title: '🏋️ Heutiges Training',
			viewAll: 'Alle anzeigen',
			defaultName: 'Training',
			inProgressSuffix: 'läuft',
			sessionStats: '{{sets}} Sätze · {{volume}}k Volumen',
			emptyProgram: 'Das aktive Programm „{{name}}“ enthält keine Trainings.',
			editProgram: 'Programm bearbeiten',
			next: 'Als Nächstes',
			exerciseCount: '{{count}} Übungen',
			durationMin: '~{{min}} Min.',
			start: 'Starten',
			skip: 'Überspringen',
			skipTitle: 'Dieses überspringen — das nächste rückt vor',
			undoSkip: 'Rückgängig',
			noTemplates: 'Du hast noch keine Trainingsvorlage erstellt.',
			createOne: 'Eine erstellen'
		},
		progress: {
			title: '📊 Fortschritt',
			nutritionToday: 'Ernährungs-Adhärenz heute',
			setGoalsPrefix: 'Um die Ernährungs-Adhärenz zu sehen, lege deine ',
			macroGoalsLink: 'Makroziele',
			setGoalsSuffix: ' fest.',
			workoutAdherence: 'Trainings-Adhärenz diese Woche',
			completedSessions: '{{count}} Einheiten abgeschlossen',
			weightTrend: 'Gewichtsverlauf',
			noWeightData: 'Noch keine Gewichtsdaten erfasst'
		},
		budget: {
			title: '💰 Wochenbudget',
			perWeek: '/ Woche',
			priceNote: 'Preise werden berechnet, sobald REWE-Produkte verbunden sind.'
		},
		buildNewWeek: 'Neue Woche erstellen'
	}
}
