import { Globe } from 'lucide-react'
import type { FC } from 'react'
import { Select } from '~/components/ui'
import { cn, LANGUAGE_OPTIONS, useLanguage } from '~/lib'

export const LanguageSwitcher: FC<{ className?: string }> = ({ className }) => {
	const { lang, setLang, t } = useLanguage()

	return (
		<div className={cn('flex items-center gap-1.5', className)}>
			<Globe className="size-4 shrink-0 text-ink-faint" aria-hidden="true" />
			<Select
				aria-label={t('common.language')}
				value={lang}
				onChange={setLang}
				options={LANGUAGE_OPTIONS.map(o => ({ label: o.nativeName, value: o.code }))}
				className="h-8 w-auto"
			/>
		</div>
	)
}
