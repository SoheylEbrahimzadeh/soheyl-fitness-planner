import { useEffect } from 'react'

const SUFFIX = 'Soheyl Fitness'

export function useDocumentTitle(title?: string) {
	useEffect(() => {
		document.title = title ? `${title} — ${SUFFIX}` : SUFFIX
	}, [title])
}
