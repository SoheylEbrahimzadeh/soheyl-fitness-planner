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
	},
	landing: {
		hero: {
			headlineLine1: 'Jedes Gramm',
			headlineAccent1: 'erfassen.',
			headlineLine2: 'Jede Wiederholung',
			headlineAccent2: 'loggen.',
			subhead:
				'Ein präzises Logbuch für Meal Prep und Krafttraining. Gemacht für alle, die messen, was sie essen und was sie heben.',
			ctaStart: 'Jetzt loslegen',
			ctaSeeLog: 'Log ansehen',
			specTagline: 'Ernährungs- + Trainingslog',
			specEst: 'Gegründet 2025',
			specSerial: 'Serie 0001A',
			specLive: 'Live',
			footnotes: [
				{ value: '14.328', label: 'USDA-Lebensmittel indexiert' },
				{ value: '14', label: 'Muskelgruppen erfasst' },
				{ value: '0,1 g', label: 'Makro-Genauigkeit' }
			],
			nutritionPanel: {
				title: 'Nährwertangaben',
				code: 'rcp_01',
				batchYieldLabel: 'Ergiebigkeit',
				batchYieldValue: '6 Portionen',
				servingSizeLabel: 'Portionsgröße',
				servingSizeValue: '1 Portion · 285 g',
				amountPerPortionLabel: 'Menge pro Portion',
				caloriesLabel: 'Kalorien',
				dailyIntakeLabel: '% Tagesbedarf',
				rows: [
					{ label: 'Fett gesamt', value: '22 g', pct: '28 %' },
					{ label: 'Kohlenhydrate gesamt', value: '58 g', pct: '21 %' },
					{ label: 'Ballaststoffe', value: '8 g', pct: '28 %' },
					{ label: 'Eiweiß', value: '52 g', pct: '40 %' }
				],
				ingredientsLabel: 'Zutaten',
				ingredientsText:
					'Hähnchenschenkel, Jasminreis, Brokkoliröschen, Sesamöl, Sojasauce, frischer Ingwer, Knoblauch, Chiliflocken.'
			},
			trainingPanel: {
				title: 'Trainingsdaten',
				code: 'wks_07',
				sessionLabel: 'Einheit',
				sessionValue: 'Push A · 58 Min.',
				totalVolumeLabel: 'Gesamtvolumen',
				totalVolumeValue: '14.280 kg',
				workingSetsLoggedLabel: 'Protokollierte Arbeitssätze',
				loadedLabel: 'Bewegt',
				setsRepsE1rmLabel: 'Sätze × Wdh. · e1RM',
				musclesLoadedLabel: 'Beanspruchte Muskeln',
				musclesLoadedText: 'Brust, vordere Schulter, seitliche Schulter, Trizeps, Rumpf.'
			}
		},
		numbersRail: [
			{ value: '14.328', label: 'USDA-Lebensmittel indexiert' },
			{ value: '14', label: 'Muskelgruppen' },
			{ value: '4', label: 'Ermüdungsstufen' },
			{ value: '0,1 g', label: 'Makro-Genauigkeit' },
			{ value: 'e1RM', label: 'Rekorde automatisch erkannt' },
			{ value: 'AES-GCM', label: 'BYOK-Schlüsselspeicher' },
			{ value: 'FTS5', label: 'Suchmaschine' },
			{ value: 'MCP', label: 'Server bereitgestellt' },
			{ value: 'Programme', label: 'Zyklusbasiertes Dashboard' },
			{ value: 'PWA', label: 'Offline-first' },
			{ value: 'D1', label: 'SQLite am Edge' },
			{ value: 'R2', label: 'Bildspeicher' },
			{ value: '3', label: 'KI-Anbieter' }
		],
		plate: {
			marker: '§ 01 / Teller',
			title: 'Mahlzeiten, aufs Gramm genau erfasst.',
			kicker: 'Rezepte mit Zutaten, Portionsgrößen, Unterrezepten und Kochgewicht. Makros skalieren mit allem mit.',
			cards: [
				{
					eyebrow: 'Rezept',
					title: 'Grammgenaue Berechnung',
					body: 'Zutaten rein, Makros raus. Pro 100 g, pro Portion, pro Charge. Unterrezepte lassen sich kombinieren. Das Kochgewicht passt die Dichte live an.'
				},
				{
					eyebrow: 'Suche',
					title: 'Drei Quellen, eine Eingabe',
					body: 'Zuerst die lokale USDA-Datenbank. Dann USDA FoodData Central. Zuletzt dein eigener KI-Anbieter. Barcode-Scan. Dichtewerte für Löffel, Esslöffel, Stück.'
				},
				{
					eyebrow: 'Plan',
					title: 'Die Woche, verplant',
					body: 'Erstelle einen Plan. Füge Rezepte zu seinem Bestand hinzu. Verteile Portionen auf Mo–So. Bei Überzuteilung warnen wir dich — blockiert wird nie.'
				}
			],
			perRawLabel: 'Pro 100 g roh',
			perPortionLabel: 'Pro Portion · 285 g',
			perBatchLabel: 'Pro Charge · 6 Portionen',
			localDbLabel: 'Lokale DB',
			usdaApiLabel: 'USDA-API',
			aiLabel: 'KI',
			weekTotalLabel: 'Wochensumme'
		},
		rack: {
			marker: '§ 02 / Rack',
			title: 'Training, Wiederholung für Wiederholung erfasst.',
			kicker: 'Vorlagen füllen geplante Sätze vor. Mit einem Tap bestätigen. Die Körperkarte heizt sich mit dem Volumen auf. Der Pausentimer weiß, wie hart du gerade warst.',
			coverageMapLabel: 'Abdeckungskarte',
			lastDaysVolumeLabel: 'Letzte 14 Tage · Volumen',
			lowLabel: 'Niedrig',
			highLabel: 'Hoch',
			features: [
				{
					title: 'Vorlagen, die sich vorausfüllen',
					body: 'Einmal anlegen mit Sätzen, Wiederholungen, Zielgewicht und Satzarten (Arbeitssatz / Aufwärmen / Abwärtssatz / voll). Jede Einheit startet mit geplanten Sätzen, bereit zur Bestätigung.'
				},
				{
					title: 'Supersätze als verschachtelte Runden',
					body: 'Gruppiere Übungen mit supersetGroup. Die Oberfläche zeigt Runden statt zweier Listen, mit Übergangstimern zwischen den Bewegungen.'
				},
				{
					title: 'Ermüdungsbewusster Pausentimer',
					body: 'Pausendauer = Wiederholungen × 4 × Ziel × Stufen-Modifikator. Kniebeugen bekommen mehr Erholung als Curls. Der Timer bleibt seitenübergreifend bestehen und übersteht ein Neuladen.'
				},
				{
					title: 'Körperkarten-Hitze aus echtem Volumen',
					body: 'Jede Übung ist Muskelgruppen mit einer Intensität (0,0–1,0) zugeordnet. Einheiten verdichten sich zu einer Abdeckungskarte, die genau zeigt, was du trainiert hast — und was du vernachlässigt hast.'
				},
				{
					title: 'Kraftstandards',
					body: 'Bankdrücken → Kurzhantel-Schrägbank. Kniebeuge → Beinstrecker. Kuratierte Verhältnisse von Grund- zu Isolationsübungen melden, wenn eine Zusatzübung im Verhältnis zur Hauptübung aus dem Rahmen fällt.'
				}
			]
		},
		cycle: {
			marker: '§ 03 / Zyklus',
			title: 'Programme, die sich wiederholen. Hinweise, die hängen bleiben.',
			kicker: 'Wähle ein Programm. Das Dashboard durchläuft es. Öffne jede Übung für Hinweise, Fallstricke und die Wiederholung, die sie verdient hat.',
			cards: [
				{
					eyebrow: 'Programme',
					title: 'Benannte Zyklen, standardmäßig aktiv',
					body: 'Fasse Vorlagen zu einem Programm zusammen — Push / Pull / Legs, Ober-/Unterkörper, was auch immer. Markiere eines als aktiv, und das Dashboard sagt dir anhand des Zyklustags, nicht per Vermutung, was als Nächstes kommt.'
				},
				{
					eyebrow: 'Technik',
					title: 'Der Coach steckt in der Übung',
					body: 'Jede Übung hat ihren eigenen Technikleitfaden — Beschreibung, Hinweise zum Fokus, zu vermeidende Fallstricke. Für System-Übungen kuratiert, selbst editierbar. Einen Tap vom Satz entfernt, den du gleich ausführst.'
				}
			],
			activeLabel: 'Aktiv',
			loopsLabel: 'Läuft im Kreis',
			nextLabel: 'Nächste',
			doneLabel: 'Erledigt',
			queuedLabel: 'In Warteschlange',
			dayOfCycle: 'Tag {{day}} von {{total}}',
			wrapsToLabel: 'Beginnt wieder bei {{name}}',
			cuesLabel: 'Hinweise',
			pitfallsLabel: 'Fallstricke',
			guideLabel: 'Leitfaden'
		},
		signal: {
			marker: '§ 04 / Signal',
			title: 'Erfasste Sätze werden zum Signal.',
			kicker: 'Jeder Arbeitssatz speist einen Graphen. Rekorde melden sich von selbst. Stagnationen werden sichtbar. Das Wochenvolumen zeigt sich nach Muskel.',
			cards: [
				{
					eyebrow: 'Wochenvolumen',
					title: 'Gestapelt nach Muskelgruppe',
					body: 'Arbeitssätze gewichtet nach Muskelintensität, pro Woche summiert, nach Gruppe gestapelt. Lies den Trend; erkenne den Muskel, der still hinterherhinkt.'
				},
				{
					eyebrow: 'Rekorde',
					title: 'Erkannt, nicht erklärt',
					body: 'Übertrifft das geschätzte 1RM den bisherigen Bestwert um mehr als 0,5 kg, meldet es sich selbst. Keine Serien, keine Pop-ups — nur ein stilles ↑ neben der Übung.'
				},
				{
					eyebrow: 'Stagnation',
					title: 'Plateaus werden sichtbar',
					body: 'Drei Einheiten ohne Steigerung im Topsatz oder e1RM, und die Übung taucht hier auf. Deload, tauschen oder durchziehen — die Entscheidung liegt bei dir.'
				},
				{
					eyebrow: 'Kalender',
					title: 'Dichte nach Tag',
					body: 'Einheiten, Arbeitssätze — nach Intensität eingefärbt. Die leeren Felder sagen mehr als die vollen.'
				},
				{
					eyebrow: 'Pro Übung',
					title: 'e1RM im Zeitverlauf',
					body: 'Öffne eine Übung für Topsatz, e1RM und Volumen pro Einheit. Jeder Punkt ist eine Wiederholung, die ihn verdient hat.'
				}
			]
		},
		auto: {
			marker: '§ 05 / Auto',
			title: 'Schalte im Studio deinen Kopf aus.',
			kicker: 'Die App berechnet Aufwärmen, Pause und Abwärtssätze. Du erfasst den Satz — sie übernimmt die Rechnung, die Uhr und das Vorausfüllen beim nächsten Mal, basierend auf dem, was du wirklich getan hast.',
			steps: [
				{
					title: 'Öffne die Einheit.',
					body: 'Die App zieht deine letzte Einheit, erzeugt die Aufwärmrampe und füllt Ziele aus der Vorlage vor. Sätze, Wiederholungen, Gewicht und Satzart — schon da, bereit zur Bestätigung.'
				},
				{
					title: 'Bestätige den geplanten Satz.',
					body: 'Gleiche Form wie letztes Mal, bereits ausgefüllt. Ein Tap — er wird erfasst und du gehst zum nächsten Satz. Ändere Gewicht oder Wiederholungen, wenn du wirklich schwerer warst; die App steht dir nicht im Weg.'
				},
				{
					title: 'Die Pause startet automatisch.',
					body: 'Countdown = Wiederholungen × 4 × Ziel × Ermüdungsstufe. Kniebeugen bekommen mehr Erholung als Curls. Grundübungen mehr als Isolationsübungen. Supersätze wechseln zwischen Übungen einer Runde zu einem kurzen Übergangstimer, dann nach Abschluss der Runde zu einer vollen Pause — ohne manuelles Umschalten.'
				},
				{
					title: 'Passe live an.',
					body: 'An die Wand gestoßen bei einem Arbeitssatz? Die App schlägt Abwärtssätze bei -10 % / -15 % vor, damit du die Runde noch mit echtem Reiz abschließen kannst. Überspringen, wenn du sie nicht willst.'
				},
				{
					title: 'Fertig — Ziele aktualisieren sich selbst.',
					body: 'Die Sitzungsübersicht markiert jede Abweichung: schwerer als geplant, weniger Wiederholungen, alles Stagnierende. Ein Tap übernimmt die neuen Zahlen. Die nächste Einheit füllt sich anhand dessen vor, was du wirklich getan hast — nicht anhand gestriger Wunschvorstellungen.'
				}
			]
		},
		intelligence: {
			marker: '§ 06 / Instrument',
			title: 'Gebaut, um Vertrauen zu verdienen.',
			kicker: 'Die Technik dahinter. Verschlüsselt, portabel, skriptfähig. Nichts, wovon du nicht wieder wegkönntest.',
			rows: [
				{
					key: 'KI-Anbieter',
					value: 'Gemini / OpenAI / Anthropic',
					body: 'Bring deinen eigenen Schlüssel mit. Wechsle den Anbieter pro Anfrage. Eine Fallback-Kette fängt 429er ab.'
				},
				{
					key: 'Schlüsselspeicher',
					value: 'AES-GCM',
					body: 'Ruhend verschlüsselt auf Cloudflare D1. Nur zum Zeitpunkt der Anfrage entschlüsselt. Verlässt nie dein Konto.'
				},
				{
					key: 'Lebensmitteldatenbank',
					value: '14.328 lokale Lebensmittel',
					body: 'USDA Foundation + SR Legacy, indexiert mit SQLite FTS5. Abfragen in unter 10 ms am Edge.'
				},
				{
					key: 'Offline-Modus',
					value: 'PWA · Workbox',
					body: 'Auf dem Startbildschirm installierbar. Workbox cached Ressourcen vorab. Plane eine Woche aus dem Studio heraus, ganz ohne Netz.'
				},
				{
					key: 'Externe API',
					value: 'MCP-Server · Bearer',
					body: 'Richte Claude, Cursor oder jeden MCP-Client auf /api/mcp. Rezepte lesen, Trainings erfassen, Analysen abfragen — jede dokumentierte Prozedur als Tool verfügbar.'
				},
				{
					key: 'Infrastruktur',
					value: 'Cloudflare D1 + R2',
					body: 'SQLite am Edge für Daten. R2 für Rezeptbilder. Hono + tRPC auf Pages Functions.'
				}
			]
		},
		howItWorks: {
			marker: '§ 07 / Log',
			title: 'Der Kreislauf.',
			kicker: 'Vier Schritte. Wöchentlich wiederholen. Die App bleibt im Hintergrund.',
			stepLabel: 'Schritt',
			steps: [
				{
					title: 'Katalogisieren',
					body: 'Rezepte und Zutaten hinzufügen. KI füllt Makros, wenn USDA sie nicht hat. Portionsgröße festlegen. Kcal pro Gramm, pro Portion, pro Charge sehen.',
					meta: '~30 Sek. pro Rezept'
				},
				{
					title: 'Planen',
					body: 'Einen Essensplan erstellen. Rezepte mit Portionsanzahl zum Bestand hinzufügen. Portionen auf Mo–So verteilen. Einmal kochen, die ganze Woche essen.',
					meta: 'Bestandsbasiert'
				},
				{
					title: 'Trainieren',
					body: 'Trainingsvorlagen aus System- oder eigenen Übungen erstellen. Eine Einheit starten, geplante Sätze füllen sich vor. Jeden Satz mit einem Tap bestätigen.',
					meta: 'Checklisten-gesteuert'
				},
				{
					title: 'Auswerten',
					body: 'Die Körperkarte heizt sich nach Volumen auf. Die Sitzungsübersicht markiert Abweichungen zwischen Plan und Realität. Ziele mit einem Tap aktualisieren.',
					meta: 'Abweichungsbewusst'
				}
			]
		},
		faq: {
			marker: '§ 08 / Notizen',
			title: 'Fragen.',
			kicker: 'Klare Antworten. Keine Akkordeons.',
			qLabel: 'F',
			items: [
				{
					q: 'Ist es kostenlos?',
					a: 'Die App ist kostenlos. Für Ernährungssuchen, die die lokale USDA-Datenbank nicht abdeckt, bring deinen eigenen KI-Schlüssel mit — Gemini, OpenAI oder Anthropic. Barcode-Scan und die lokale Lebensmitteldatenbank funktionieren ganz ohne Schlüssel.'
				},
				{
					q: 'Ist der Quellcode verfügbar?',
					a: 'Ja. Soheyl Fitness ist Open Source. Lies den Code, melde ein Issue oder schick einen Pull Request. Hoste es selbst, wenn du willst.'
				},
				{
					q: 'Funktioniert sie offline?',
					a: 'Ja. Es ist eine PWA. Auf dem Startbildschirm installieren, Ressourcen cachen, eine Woche ganz ohne Netz planen. Änderungen synchronisieren sich, sobald die Verbindung zurückkehrt.'
				},
				{
					q: 'Kann ich einem Programm folgen (PPL, Ober-/Unterkörper usw.)?',
					a: 'Ja. Fasse deine Trainingsvorlagen in einem benannten Programm zusammen und markiere eines als aktiv. Das Dashboard durchläuft es Tag für Tag — Push A abgeschlossen, „als Nächstes" wird Pull A. Jederzeit umsortieren; der Zyklus passt sich an.'
				},
				{
					q: 'Bekomme ich Fortschrittsdiagramme und Rekorderkennung?',
					a: 'Ja. Die Analytics-Seite zeigt aktuelle Rekorde (geschätztes 1RM übertrifft den bisherigen Bestwert um mehr als 0,5 kg), stagnierende Übungen, Wochenvolumen nach Muskel und eine Kalender-Heatmap. Jede Übung hat ihr eigenes e1RM-/Volumen-/Topsatz-Diagramm.'
				},
				{
					q: 'Ist das eine Rezept- oder eine Trainings-App?',
					a: 'Beides. Genau das ist der Punkt. Meal Prep und Krafttraining teilen sich eine Zielgruppe — und die Woche einer Person. Ein Werkzeug für beides.'
				},
				{
					q: 'Verkauft ihr meine Daten oder trainiert ihr Modelle damit?',
					a: 'Nein. Deine Rezepte, Trainings und KI-Schlüssel gehören dir. Schlüssel sind ruhend mit AES-GCM verschlüsselt und werden nur bei deiner Anfrage entschlüsselt.'
				},
				{
					q: 'Kann ich andere Tools verbinden?',
					a: 'Ja. Die App stellt einen MCP-Server bereit. Erstelle in den Einstellungen ein Personal Access Token und richte Claude, Cursor oder jeden MCP-fähigen Client darauf.'
				},
				{
					q: 'Was ist mit Barcodes, die nicht in der Datenbank sind?',
					a: 'Füge einen Link zur Produktseite ein — die App liest das JSON-LD-Product-Schema aus, mit KI als Rückfalllösung. Oder gib die Angaben direkt ein, und das Rezept wird als Fertiggericht behandelt.'
				}
			],
			repoLinkLabel: 'Repository auf GitHub ansehen'
		},
		footerCta: {
			marker: '§ Ende des Datenblatts',
			titleLine1: 'Starte das Log heute.',
			titleLine2: 'Sei bis Sonntag besser.',
			subtitle:
				'Kostenloses Konto. Keine Kreditkarte. Deine Daten bleiben deine. Installiere sie auf deinem Handy, wenn du willst.',
			ctaCreate: 'Konto erstellen',
			ctaBackToTop: 'Nach oben',
			tagline: 'Gemacht für alle, die messen'
		}
	}
}
