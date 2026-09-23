import type { MealPlan } from '@macromaxxing/db'
import { type FC, useState } from 'react'
import { Button, Modal, Spinner, TRPCError } from '~/components/ui'
import { useLanguage, useTranslation } from '~/lib'
import { trpc } from '~/lib/trpc'

export interface GenerateWeekDialogProps {
	planId: MealPlan['id']
	onClose: () => void
}

/**
 * "Generate Weekly Plan": one confirm click runs `mealPlan.generateWeek`, which fills every empty
 * slot in this plan from the user's nutrition targets — reusing a fitting recipe where one exists,
 * generating a new AI recipe otherwise (see `workers/functions/lib/meal-plan-generator.ts`). The
 * current UI language is passed through explicitly, since the backend has no session-side notion
 * of it (see `src/lib/i18n/context.tsx` — language lives only in `localStorage`).
 */
export const GenerateWeekDialog: FC<GenerateWeekDialogProps> = ({ planId, onClose }) => {
	const { t } = useTranslation()
	const { lang } = useLanguage()
	const utils = trpc.useUtils()
	const [done, setDone] = useState(false)

	const generateMutation = trpc.mealPlan.generateWeek.useMutation({
		onSuccess: () => {
			utils.mealPlan.get.invalidate({ id: planId })
			setDone(true)
		}
	})

	function handleConfirm() {
		generateMutation.mutate({ planId, language: lang })
	}

	const result = generateMutation.data

	return (
		<Modal onClose={onClose} className="w-full max-w-sm p-4">
			<h2 className="font-semibold text-ink">{t('mealPlanGenerator.dialogTitle')}</h2>

			{!done && (
				<>
					<p className="mt-2 text-ink-muted text-sm">{t('mealPlanGenerator.dialogDescription')}</p>

					{generateMutation.error && (
						<div className="mt-3">
							<TRPCError error={generateMutation.error} />
						</div>
					)}

					<div className="mt-4 flex justify-end gap-2">
						<Button variant="ghost" onClick={onClose} disabled={generateMutation.isPending}>
							{t('mealPlanGenerator.cancel')}
						</Button>
						<Button onClick={handleConfirm} disabled={generateMutation.isPending}>
							{generateMutation.isPending ? (
								<>
									<Spinner className="size-4 text-current" />
									{t('mealPlanGenerator.generating')}
								</>
							) : (
								t('mealPlanGenerator.confirm')
							)}
						</Button>
					</div>
				</>
			)}

			{done && result && (
				<>
					<p className="mt-2 text-ink-muted text-sm">
						{result.slotsFilled === 0
							? t('mealPlanGenerator.noOpenSlots')
							: t('mealPlanGenerator.resultSummary', {
									filled: result.slotsFilled,
									reused: result.recipesReused,
									created: result.recipesCreated
								})}
					</p>
					<div className="mt-4 flex justify-end">
						<Button onClick={onClose}>{t('mealPlanGenerator.close')}</Button>
					</div>
				</>
			)}
		</Modal>
	)
}
