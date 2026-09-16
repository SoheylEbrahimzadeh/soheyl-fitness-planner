import type { Dictionary } from '../types'

export const fa: Dictionary = {
	common: {
		signUp: 'ثبت‌نام',
		signIn: 'ورود',
		openMenu: 'باز کردن منو',
		closeMenu: 'بستن منو',
		menu: 'منو',
		language: 'زبان'
	},
	nav: {
		dashboard: 'داشبورد',
		myPlan: 'برنامه من',
		mealPlan: 'برنامه غذایی',
		workoutPlan: 'برنامه تمرینی',
		shoppingList: 'لیست خرید',
		budget: 'بودجه',
		progress: 'پیشرفت',
		settings: 'تنظیمات',
		pinHint: 'تا {{max}} مورد را می‌توانی به نوار پایین سنجاق کنی. انتخاب یک مورد پنجم، قدیمی‌ترین را جایگزین می‌کند.',
		pinToBottomBar: 'سنجاق کردن {{label}} به نوار پایین',
		unpinFromBottomBar: 'برداشتن {{label}} از نوار پایین'
	},
	dashboard: {
		title: 'داشبورد',
		kicker: 'PERSONAL FITNESS PLANNER',
		greeting: 'سلام، {{name}}',
		focusLine: 'امروز روی یک هدف تمرکز کن:',
		focusGoal: 'کاهش چربی، حفظ عضله',
		activeProgramBadge: 'برنامه فعال',
		bodyGoal: {
			title: 'هدف بدن',
			headline: 'کاهش چربی + حفظ و افزایش عضله',
			subtitle: 'Body Recomposition',
			tags: ['کاهش چربی', 'حفظ و افزایش عضله', 'تمرین مقاومتی', 'ریکاوری کافی']
		},
		macro: {
			caloriesToday: 'کالری امروز',
			inRange: 'در محدوده هدف',
			setCalorieGoal: 'تنظیم هدف کالری',
			proteinToday: 'پروتئین امروز',
			setProteinGoal: 'تنظیم هدف پروتئین'
		},
		status: {
			todayWorkout: 'تمرین امروز',
			inProgress: 'در حال انجام',
			emptyProgram: 'برنامه خالی است',
			weeklyBudget: 'بودجه هفتگی'
		},
		meals: {
			title: '🍽️ برنامه غذایی امروز',
			nothingLogged: 'چیزی ثبت نشده',
			viewRecipe: 'مشاهده دستور پخت',
			noRecipe: 'دستور پخت ثبت نشده',
			slotFallback: 'وعده {{n}}',
			slots: ['صبحانه', 'ناهار', 'میان‌وعده', 'شام']
		},
		workout: {
			title: '🏋️ تمرین امروز',
			viewAll: 'مشاهده همه',
			defaultName: 'تمرین',
			inProgressSuffix: 'در حال انجام',
			sessionStats: '{{sets}} ست · {{volume}}k حجم',
			emptyProgram: 'برنامه فعال «{{name}}» تمرینی ندارد.',
			editProgram: 'ویرایش برنامه',
			next: 'بعدی',
			exerciseCount: '{{count}} حرکت',
			durationMin: '~{{min}} دقیقه',
			start: 'شروع',
			skip: 'رد کردن',
			skipTitle: 'این یکی را رد کن — بعدی جایگزین شود',
			undoSkip: 'بازگردانی',
			noTemplates: 'هنوز الگوی تمرینی نساخته‌ای.',
			createOne: 'ساخت یکی'
		},
		progress: {
			title: '📊 پیشرفت',
			nutritionToday: 'پیروی تغذیه‌ای امروز',
			setGoalsPrefix: 'برای دیدن پیروی تغذیه‌ای، ',
			macroGoalsLink: 'هدف‌های ماکرو',
			setGoalsSuffix: ' را تنظیم کن.',
			workoutAdherence: 'پیروی تمرینی این هفته',
			completedSessions: '{{count}} جلسه تکمیل‌شده',
			weightTrend: 'روند وزن',
			noWeightData: 'هنوز داده‌ای برای وزن ثبت نشده'
		},
		budget: {
			title: '💰 بودجه هفتگی',
			perWeek: '/ هفته',
			priceNote: 'قیمت‌ها پس از اتصال محصولات REWE محاسبه می‌شوند.'
		},
		buildNewWeek: 'ساخت هفته جدید'
	}
}
