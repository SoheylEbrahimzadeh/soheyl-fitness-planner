import type { Dictionary } from '../types'

export const fr: Dictionary = {
	enums: {
		setType: {
			warmup: 'Échauffement',
			working: 'Travail',
			backoff: 'Dégressive'
		},
		setMode: {
			warmup: 'Échauffement',
			working: 'Travail',
			backoff: 'Dégressive',
			full: 'Complète'
		},
		trainingGoal: {
			default: 'Par défaut',
			hypertrophy: 'Hypertrophie',
			strength: 'Force'
		},
		muscleGroup: {
			chest: 'Pectoraux',
			upper_back: 'Haut du dos',
			lats: 'Grand dorsal',
			front_delts: 'Deltoïdes avant',
			side_delts: 'Deltoïdes latéraux',
			rear_delts: 'Deltoïdes arrière',
			biceps: 'Biceps',
			triceps: 'Triceps',
			forearms: 'Avant-bras',
			quads: 'Quadriceps',
			hamstrings: 'Ischio-jambiers',
			glutes: 'Fessiers',
			calves: 'Mollets',
			core: 'Gainage'
		},
		exerciseMetric: {
			e1rm: 'e1RM',
			volume: 'Volume',
			weight: 'Série de tête'
		},
		exerciseType: {
			compound: 'Composé',
			isolation: 'Isolation'
		}
	},
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
	},
	landing: {
		hero: {
			headlineLine1: 'Suis chaque',
			headlineAccent1: 'gramme.',
			headlineLine2: 'Note chaque',
			headlineAccent2: 'répétition.',
			subhead:
				"Un journal de précision pour la préparation des repas et la musculation. Conçu pour les athlètes qui mesurent ce qu'ils mangent et ce qu'ils soulèvent.",
			ctaStart: 'Commencer',
			ctaSeeLog: 'Voir le journal',
			specTagline: 'Journal nutrition + entraînement',
			specEst: 'Fondé en 2025',
			specSerial: 'Série 0001A',
			specLive: 'En direct',
			footnotes: [
				{ value: '14 328', label: 'Aliments USDA indexés' },
				{ value: '14', label: 'Groupes musculaires suivis' },
				{ value: '0,1 g', label: 'Précision des macros' }
			],
			nutritionPanel: {
				title: 'Valeurs nutritives',
				code: 'rcp_01',
				batchYieldLabel: 'Rendement du lot',
				batchYieldValue: '6 portions',
				servingSizeLabel: 'Taille de la portion',
				servingSizeValue: '1 portion · 285 g',
				amountPerPortionLabel: 'Quantité par portion',
				caloriesLabel: 'Calories',
				dailyIntakeLabel: '% apport quotidien',
				rows: [
					{ label: 'Lipides', value: '22 g', pct: '28 %' },
					{ label: 'Glucides', value: '58 g', pct: '21 %' },
					{ label: 'Fibres alimentaires', value: '8 g', pct: '28 %' },
					{ label: 'Protéines', value: '52 g', pct: '40 %' }
				],
				ingredientsLabel: 'Ingrédients',
				ingredientsText:
					'Cuisse de poulet, riz jasmin, fleurettes de brocoli, huile de sésame, soja, gingembre frais, ail, flocons de piment.'
			},
			trainingPanel: {
				title: "Valeurs d'entraînement",
				code: 'wks_07',
				sessionLabel: 'Séance',
				sessionValue: 'Push A · 58 min',
				totalVolumeLabel: 'Volume total',
				totalVolumeValue: '14 280 kg',
				workingSetsLoggedLabel: 'Séries de travail notées',
				loadedLabel: 'Chargé',
				setsRepsE1rmLabel: 'Séries × reps · e1RM',
				musclesLoadedLabel: 'Muscles sollicités',
				musclesLoadedText: 'Pectoraux, deltoïdes avant, deltoïdes latéraux, triceps, gainage.'
			}
		},
		numbersRail: [
			{ value: '14 328', label: 'Aliments USDA indexés' },
			{ value: '14', label: 'Groupes musculaires' },
			{ value: '4', label: 'Niveaux de fatigue' },
			{ value: '0,1 g', label: 'Précision des macros' },
			{ value: 'e1RM', label: 'Records auto-détectés' },
			{ value: 'AES-GCM', label: 'Stockage de clé BYOK' },
			{ value: 'FTS5', label: 'Moteur de recherche' },
			{ value: 'MCP', label: 'Serveur exposé' },
			{ value: 'Programmes', label: 'Tableau de bord cyclique' },
			{ value: 'PWA', label: 'Priorité hors ligne' },
			{ value: 'D1', label: 'SQLite en périphérie' },
			{ value: 'R2', label: "Stockage d'images" },
			{ value: '3', label: "Fournisseurs d'IA" }
		],
		plate: {
			marker: '§ 01 / Assiette',
			title: 'Des repas suivis au gramme près.',
			kicker: 'Des recettes avec ingrédients, portions, sous-recettes et poids cuit. Les macros se recalculent avec tout.',
			cards: [
				{
					eyebrow: 'Recette',
					title: 'Un calcul précis au gramme',
					body: 'Des ingrédients en entrée, des macros en sortie. Par 100 g, par portion, par lot. Les sous-recettes se combinent. Le poids cuit ajuste la densité à la volée.'
				},
				{
					eyebrow: 'Recherche',
					title: 'Trois sources, une seule boîte',
					body: "D'abord la base de données USDA locale. Puis USDA FoodData Central. En dernier recours, votre fournisseur d'IA. Scan de code-barres. Densité pour les cuillères, les mesures, les pièces."
				},
				{
					eyebrow: 'Plan',
					title: 'La semaine, allouée',
					body: 'Créez un plan. Ajoutez des recettes à son inventaire. Répartissez les portions du lundi au dimanche. Une sur-allocation vous alerte — elle ne vous bloque jamais.'
				}
			],
			perRawLabel: 'Pour 100 g crus',
			perPortionLabel: 'Par portion · 285 g',
			perBatchLabel: 'Par lot · 6 portions',
			localDbLabel: 'Base locale',
			usdaApiLabel: 'API USDA',
			aiLabel: 'IA',
			weekTotalLabel: 'Total de la semaine'
		},
		rack: {
			marker: '§ 02 / Rack',
			title: 'Un entraînement noté répétition par répétition.',
			kicker: "Les modèles pré-remplissent les séries prévues. Confirmez d'un geste. La carte corporelle chauffe avec le volume. Le minuteur de repos sait à quel point vous venez de forcer.",
			coverageMapLabel: 'Carte de couverture',
			lastDaysVolumeLabel: '14 derniers jours · volume',
			lowLabel: 'Faible',
			highLabel: 'Élevé',
			features: [
				{
					title: 'Des modèles qui se pré-remplissent',
					body: 'Créez une fois avec séries, répétitions, poids cible et modes de série (travail / échauffement / dégressive / complète). Chaque séance démarre avec des séries planifiées, prêtes à confirmer.'
				},
				{
					title: 'Des supersets en rounds imbriqués',
					body: "Regroupez les exercices avec supersetGroup. L'interface affiche des rounds plutôt que deux listes, avec des minuteurs de transition entre les mouvements."
				},
				{
					title: 'Un minuteur de repos sensible à la fatigue',
					body: 'Durée de repos = répétitions × 4 × objectif × modificateur de palier. Le squat récupère plus longtemps que le curl. Le minuteur persiste entre les pages et survit à une actualisation.'
				},
				{
					title: 'Une carte corporelle chauffée par le volume réel',
					body: "Chaque exercice se rattache à des groupes musculaires avec une intensité (0,0–1,0). Les séances s'agrègent en une carte de couverture qui montre exactement ce que vous avez travaillé — et ce que vous avez négligé."
				},
				{
					title: 'Des standards de force',
					body: 'Développé couché → développé incliné haltères. Squat → leg extension. Des ratios composé-isolation sélectionnés signalent un exercice accessoire disproportionné par rapport au mouvement principal.'
				}
			]
		},
		cycle: {
			marker: '§ 03 / Cycle',
			title: 'Des programmes qui bouclent. Des repères qui restent.',
			kicker: "Choisissez un programme. Le tableau de bord le parcourt. Ouvrez n'importe quel exercice pour ses repères, ses pièges, et la répétition qui les a gagnés.",
			cards: [
				{
					eyebrow: 'Programmes',
					title: 'Des cycles nommés, actifs par défaut',
					body: 'Regroupez des modèles dans un programme — Push / Pull / Legs, haut du corps / bas du corps, peu importe. Marquez-en un comme actif et le tableau de bord vous dit ce qui suit, par jour du cycle, pas au hasard.'
				},
				{
					eyebrow: 'Technique',
					title: 'Le coach vit dans le mouvement',
					body: 'Chaque exercice porte son propre guide technique — description, repères à cibler, pièges à éviter. Sélectionné pour les mouvements du système, modifiable par vos soins. À un geste de la série que vous allez exécuter.'
				}
			],
			activeLabel: 'Actif',
			loopsLabel: 'Boucle',
			nextLabel: 'Suivant',
			doneLabel: 'Fait',
			queuedLabel: 'En attente',
			dayOfCycle: 'Jour {{day}} sur {{total}}',
			wrapsToLabel: 'Revient à {{name}}',
			cuesLabel: 'Repères',
			pitfallsLabel: 'Pièges',
			guideLabel: 'Guide'
		},
		signal: {
			marker: '§ 04 / Signal',
			title: 'Les séries notées deviennent un signal.',
			kicker: 'Chaque série de travail alimente un graphique. Les records se signalent eux-mêmes. Les stagnations remontent. Le volume de la semaine apparaît par muscle.',
			cards: [
				{
					eyebrow: 'Volume hebdomadaire',
					title: 'Empilé par groupe musculaire',
					body: 'Séries de travail pondérées par intensité musculaire, sommées par semaine, empilées par groupe. Lisez la tendance ; repérez le muscle discrètement délaissé.'
				},
				{
					eyebrow: 'Records',
					title: 'Détectés, pas déclarés',
					body: 'Quand le 1RM estimé dépasse le meilleur précédent de plus de 0,5 kg, il se signale seul. Pas de séries, pas de notifications — juste un ↑ discret à côté du mouvement.'
				},
				{
					eyebrow: 'Stagnation',
					title: 'Les plateaux remontent',
					body: "Trois séances sans progression de la série de tête ou de l'e1RM et le mouvement apparaît ici. Réduisez la charge, changez, ou poussez — le choix est le vôtre."
				},
				{
					eyebrow: 'Calendrier',
					title: 'Densité par jour',
					body: "Séances, séries de travail — colorées selon l'intensité. Les cases vides en disent plus long que les pleines."
				},
				{
					eyebrow: 'Par exercice',
					title: "L'e1RM dans le temps",
					body: "Ouvrez un mouvement pour voir la série de tête, le e1RM et le volume par séance. Chaque point est une répétition qui l'a mérité."
				}
			]
		},
		auto: {
			marker: '§ 05 / Auto',
			title: 'Coupez le mental à la salle.',
			kicker: "L'application calcule l'échauffement, le repos et la dégressive. Vous notez la série — elle fait le calcul, tient l'horloge, et pré-remplit la prochaine fois d'après ce que vous avez réellement fait.",
			steps: [
				{
					title: 'Ouvrez la séance.',
					body: "L'application reprend votre dernière séance, génère la montée en charge, et pré-remplit les objectifs depuis le modèle. Séries, répétitions, poids et type de série — déjà prêts à confirmer."
				},
				{
					title: 'Confirmez la série prévue.',
					body: "Même format que la dernière fois, déjà rempli. Un geste — elle est notée et vous passez à la série suivante. Modifiez le poids ou les répétitions si vous êtes allé plus lourd ; l'application ne vous gêne pas."
				},
				{
					title: 'Le repos démarre automatiquement.',
					body: "Compte à rebours = répétitions × 4 × objectif × palier de fatigue. Le squat récupère plus longtemps que le curl. Les mouvements composés plus que les isolations. Les supersets basculent sur un minuteur de transition court entre les exercices d'un round, puis un repos complet une fois le round terminé — sans bascule manuelle."
				},
				{
					title: 'Ajustez en direct.',
					body: "Vous butez sur une série de travail ? L'application propose des séries dégressives à -10 % / -15 % pour terminer le round avec un vrai stimulus. Ignorez-les si vous n'en voulez pas."
				},
				{
					title: 'Terminez — les objectifs se mettent à jour seuls.',
					body: "La revue de séance signale chaque écart : plus lourd que prévu, moins de répétitions, tout ce qui stagne. Un geste accepte les nouveaux chiffres. La prochaine séance se pré-remplit d'après ce que vous avez vraiment fait, pas les vœux pieux d'hier."
				}
			]
		},
		intelligence: {
			marker: '§ 06 / Instrument',
			title: 'Conçu pour inspirer confiance.',
			kicker: "L'infrastructure sous le capot. Chiffrée, portable, scriptable. Rien dont vous ne puissiez repartir.",
			rows: [
				{
					key: "Fournisseurs d'IA",
					value: 'Gemini / OpenAI / Anthropic',
					body: 'Apportez votre propre clé. Changez de fournisseur à chaque requête. Une chaîne de repli gère les erreurs 429.'
				},
				{
					key: 'Stockage des clés',
					value: 'AES-GCM',
					body: 'Chiffrées au repos sur Cloudflare D1. Déchiffrées uniquement au moment de la requête. Ne quittent jamais votre compte.'
				},
				{
					key: 'Base alimentaire',
					value: '14 328 aliments locaux',
					body: 'USDA Foundation + SR Legacy, indexée avec SQLite FTS5. Requêtes en moins de 10 ms en périphérie.'
				},
				{
					key: 'Mode hors ligne',
					value: 'PWA · Workbox',
					body: "Installable sur l'écran d'accueil. Workbox précharge les ressources. Planifiez une semaine depuis la salle, sans réseau."
				},
				{
					key: 'API externe',
					value: 'Serveur MCP · bearer',
					body: 'Pointez Claude, Cursor, ou tout client MCP vers /api/mcp. Lisez les recettes, notez les séances, interrogez les analyses — chaque procédure annotée exposée comme un outil.'
				},
				{
					key: 'Infrastructure',
					value: 'Cloudflare D1 + R2',
					body: 'SQLite en périphérie pour les données. R2 pour les images de recettes. Hono + tRPC sur Pages Functions.'
				}
			]
		},
		howItWorks: {
			marker: '§ 07 / Journal',
			title: 'La boucle.',
			kicker: "Quatre étapes. Répétez chaque semaine. L'application s'efface.",
			stepLabel: 'Étape',
			steps: [
				{
					title: 'Cataloguer',
					body: "Ajoutez recettes et ingrédients. L'IA complète les macros si l'USDA ne les a pas. Réglez la taille des portions. Voyez les kcal par gramme, par portion, par lot.",
					meta: '~30 s par recette'
				},
				{
					title: 'Planifier',
					body: "Créez un plan de repas. Ajoutez des recettes à l'inventaire avec un nombre de portions. Répartissez les portions du lundi au dimanche. Cuisinez une fois, mangez toute la semaine.",
					meta: "Basé sur l'inventaire"
				},
				{
					title: "S'entraîner",
					body: "Construisez des modèles d'entraînement à partir d'exercices du système ou personnalisés. Démarrez une séance et les séries prévues se pré-remplissent. Confirmez chaque série d'un geste.",
					meta: 'Guidé par liste de contrôle'
				},
				{
					title: 'Réviser',
					body: "La carte corporelle chauffe selon le volume. La revue de séance signale les écarts entre prévu et réel. Mettez à jour les objectifs d'un geste.",
					meta: 'Sensible aux écarts'
				}
			]
		},
		faq: {
			marker: '§ 08 / Notes',
			title: 'Questions.',
			kicker: "Des réponses simples. Pas d'accordéons.",
			qLabel: 'Q',
			items: [
				{
					q: 'Est-ce gratuit ?',
					a: "L'application est gratuite. Pour les recherches nutritionnelles absentes de la base USDA locale, apportez votre propre clé d'IA — Gemini, OpenAI ou Anthropic. Le scan de code-barres et la base alimentaire locale fonctionnent sans aucune clé."
				},
				{
					q: 'Le code source est-il disponible ?',
					a: 'Oui. Soheyl Fitness est open source. Lisez le code, signalez un problème, ou envoyez une pull request. Auto-hébergez-le si vous voulez.'
				},
				{
					q: 'Fonctionne-t-elle hors ligne ?',
					a: "Oui. C'est une PWA. Installez-la sur l'écran d'accueil, mettez les ressources en cache, planifiez une semaine sans réseau. Les modifications se synchronisent au retour de la connexion."
				},
				{
					q: 'Puis-je suivre un programme (PPL, haut/bas du corps, etc.) ?',
					a: "Oui. Regroupez vos modèles d'entraînement dans un programme nommé et marquez-en un comme actif. Le tableau de bord le parcourt jour après jour — terminez Push A, « à suivre » devient Pull A. Réorganisez à tout moment ; le cycle s'adapte."
				},
				{
					q: 'Ai-je des graphiques de progression et une détection des records ?',
					a: "Oui. La page d'analyses affiche les records récents (1RM estimé dépassant le meilleur précédent de plus de 0,5 kg), les mouvements stagnants, le volume hebdomadaire par muscle et une carte de chaleur du calendrier. Chaque exercice a son propre graphique e1RM / volume / série de tête."
				},
				{
					q: "S'agit-il d'une application de recettes ou d'entraînement ?",
					a: "Les deux. C'est tout l'intérêt. La préparation des repas et la musculation partagent un public — et la semaine d'un même utilisateur. Un seul instrument pour les deux."
				},
				{
					q: 'Vendez-vous mes données ou entraînez-vous des modèles dessus ?',
					a: "Non. Vos recettes, séances et clés d'IA vous appartiennent. Les clés sont chiffrées au repos avec AES-GCM et déchiffrées uniquement lors de vos requêtes."
				},
				{
					q: "Puis-je connecter d'autres outils ?",
					a: "Oui. L'application expose un serveur MCP. Créez un jeton d'accès personnel dans les paramètres et pointez Claude, Cursor, ou tout client compatible MCP vers lui."
				},
				{
					q: "Qu'en est-il des codes-barres absents de la base ?",
					a: "Collez un lien vers la page produit — l'application analyse le schéma JSON-LD Product, avec repli sur l'IA. Ou saisissez directement les valeurs de l'étiquette et la recette sera traitée comme un plat préparé."
				}
			],
			repoLinkLabel: 'Voir le dépôt sur GitHub'
		},
		footerCta: {
			marker: '§ Fin de la fiche',
			titleLine1: "Commencez le journal aujourd'hui.",
			titleLine2: 'Soyez meilleur dimanche.',
			subtitle:
				'Compte gratuit. Sans carte bancaire. Vos données restent les vôtres. Installez-la sur votre téléphone si vous voulez.',
			ctaCreate: 'Créer un compte',
			ctaBackToTop: 'Retour en haut',
			tagline: 'Conçu pour les athlètes qui mesurent'
		}
	}
}
