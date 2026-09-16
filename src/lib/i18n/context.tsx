import {
	createContext,
	type FC,
	type ReactNode,
	useCallback,
	useContext,
	useLayoutEffect,
	useMemo,
	useState
} from 'react'
import { de } from './locales/de'
import { en } from './locales/en'
import { fa } from './locales/fa'
import { fr } from './locales/fr'
import { type Dictionary, LANGUAGE_OPTIONS, type LanguageCode } from './types'

const DICTIONARIES: Record<LanguageCode, Dictionary> = { fa, en, fr, de }

const STORAGE_KEY = 'soheyl-fitness:language'

function readStoredLanguage(): LanguageCode {
	if (typeof window === 'undefined') return 'fa'
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY)
		if (raw && raw in DICTIONARIES) return raw as LanguageCode
	} catch {
		// Privacy mode / storage disabled — fall back to default below.
	}
	return 'fa'
}

function dirFor(lang: LanguageCode): 'rtl' | 'ltr' {
	return LANGUAGE_OPTIONS.find(o => o.code === lang)?.dir ?? 'ltr'
}

/** Resolve a dot path like "dashboard.macro.caloriesToday" against a Dictionary. */
function getByPath(dict: Dictionary, path: string): unknown {
	return path.split('.').reduce<unknown>((acc, key) => {
		if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
			return (acc as Record<string, unknown>)[key]
		}
		return undefined
	}, dict)
}

function interpolate(template: string, vars?: Record<string, string | number>): string {
	if (!vars) return template
	return template.replace(/\{\{(\w+)\}\}/g, (match, key) => (key in vars ? String(vars[key]) : match))
}

export interface LanguageContextValue {
	lang: LanguageCode
	setLang: (lang: LanguageCode) => void
	dir: 'rtl' | 'ltr'
	dict: Dictionary
	/** Look up a translation by dot path (e.g. "dashboard.macro.caloriesToday") with optional {{var}} interpolation. */
	t: (path: string, vars?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

/**
 * Hand-rolled i18n (no i18next) — the local dev shell has no network egress to install new
 * packages, and this app's translation needs (flat dictionaries + {{var}} interpolation, no
 * plurals/ICU) don't need the extra dependency weight anyway.
 */
export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [lang, setLangState] = useState<LanguageCode>(readStoredLanguage)

	const setLang = useCallback((next: LanguageCode) => {
		setLangState(next)
		try {
			window.localStorage.setItem(STORAGE_KEY, next)
		} catch {
			// Quota or privacy mode — the choice simply won't persist across reloads.
		}
	}, [])

	const dir = dirFor(lang)
	const dict = DICTIONARIES[lang]

	// Layout effect, not a plain effect — it must run before paint so switching languages
	// never shows a frame with the wrong text direction.
	useLayoutEffect(() => {
		document.documentElement.lang = lang
		document.documentElement.dir = dir
	}, [lang, dir])

	const t = useCallback(
		(path: string, vars?: Record<string, string | number>) => {
			const value = getByPath(dict, path)
			if (typeof value !== 'string') {
				// Missing/mistyped key — surface the path itself so it's obvious in the UI, never a crash.
				return path
			}
			return interpolate(value, vars)
		},
		[dict]
	)

	const value = useMemo<LanguageContextValue>(() => ({ lang, setLang, dir, dict, t }), [lang, setLang, dir, dict, t])

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
	const ctx = useContext(LanguageContext)
	if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
	return ctx
}

/** Most components only need `t` (and sometimes `dict` for arrays like tag lists). */
export function useTranslation(): { t: LanguageContextValue['t']; dict: Dictionary } {
	const { t, dict } = useLanguage()
	return { t, dict }
}

/** Components that only need the current text direction (e.g. for a `dir` prop). */
export function useDirection(): 'rtl' | 'ltr' {
	return useLanguage().dir
}
