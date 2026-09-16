import type { Dictionary } from '../types'

export const fr: Dictionary = {
	common: {
		signUp: "S'inscrire",
		signIn: 'Se connecter',
		openMenu: 'Ouvrir le menu',
		closeMenu: 'Fermer le menu',
		menu: 'Menu',
		language: 'Langue'
	},
	nav: {
		dashboard: 'Tableau de bord',
		myPlan: 'Mon programme',
		mealPlan: 'Plan de repas',
		workoutPlan: "Programme d'entraînement",
		shoppingList: 'Liste de courses',
		budget: 'Budget',
		progress: 'Progression',
		settings: 'Paramètres',
		pinHint:
			"Tu peux épingler jusqu'à {{max}} éléments à la barre du bas. En choisir un cinquième remplace le plus ancien.",
		pinToBottomBar: 'Épingler {{label}} à la barre du bas',
		unpinFromBottomBar: 'Détacher {{label}} de la barre du bas'
	},
	dashboard: {
		title: 'Tableau de bord',
		kicker: 'PERSONAL FITNESS PLANNER',
		greeting: 'Bonjour, {{name}}',
		focusLine: "Concentre-toi sur un objectif aujourd'hui :",
		focusGoal: 'Perdre du gras, garder le muscle',
		activeProgramBadge: 'Programme actif',
		bodyGoal: {
			title: 'Objectif physique',
			headline: 'Perte de gras + maintien et développement musculaire',
			subtitle: 'Body Recomposition',
			tags: [
				'Perte de gras',
				'Maintien et développement musculaire',
				'Entraînement en résistance',
				'Récupération suffisante'
			]
		},
		macro: {
			caloriesToday: "Calories aujourd'hui",
			inRange: "Dans l'objectif",
			setCalorieGoal: "Définir l'objectif calorique",
			proteinToday: "Protéines aujourd'hui",
			setProteinGoal: "Définir l'objectif de protéines"
		},
		status: {
			todayWorkout: 'Entraînement du jour',
			inProgress: 'En cours',
			emptyProgram: 'Le programme est vide',
			weeklyBudget: 'Budget hebdomadaire'
		},
		meals: {
			title: '🍽️ Repas du jour',
			nothingLogged: "Rien d'enregistré",
			viewRecipe: 'Voir la recette',
			noRecipe: 'Aucune recette enregistrée',
			slotFallback: 'Créneau {{n}}',
			slots: ['Petit-déjeuner', 'Déjeuner', 'Collation', 'Dîner']
		},
		workout: {
			title: '🏋️ Entraînement du jour',
			viewAll: 'Voir tout',
			defaultName: 'Entraînement',
			inProgressSuffix: 'en cours',
			sessionStats: '{{sets}} séries · {{volume}}k de volume',
			emptyProgram: "Le programme actif « {{name}} » n'a aucun entraînement.",
			editProgram: 'Modifier le programme',
			next: 'Suivant',
			exerciseCount: '{{count}} exercices',
			durationMin: '~{{min}} min',
			start: 'Démarrer',
			skip: 'Passer',
			skipTitle: 'Passer celui-ci — le suivant prendra sa place',
			undoSkip: 'Annuler',
			noTemplates: "Tu n'as pas encore créé de modèle d'entraînement.",
			createOne: 'En créer un'
		},
		progress: {
			title: '📊 Progression',
			nutritionToday: 'Suivi nutritionnel du jour',
			setGoalsPrefix: 'Pour voir le suivi nutritionnel, définis tes ',
			macroGoalsLink: 'objectifs de macros',
			setGoalsSuffix: '.',
			workoutAdherence: 'Suivi d’entraînement cette semaine',
			completedSessions: '{{count}} séances terminées',
			weightTrend: 'Évolution du poids',
			noWeightData: "Aucune donnée de poids enregistrée pour l'instant"
		},
		budget: {
			title: '💰 Budget hebdomadaire',
			perWeek: '/ semaine',
			priceNote: 'Les prix seront calculés une fois les produits REWE connectés.'
		},
		buildNewWeek: 'Créer une nouvelle semaine'
	}
}
