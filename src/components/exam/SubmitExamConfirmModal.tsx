import { useEffect, useRef } from 'react'

type Props = {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
  answeredCount: number
  totalQuestions: number
}

export function SubmitExamConfirmModal({
  open,
  onCancel,
  onConfirm,
  answeredCount,
  totalQuestions,
}: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    cancelRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null

  const unanswered = Math.max(0, totalQuestions - answeredCount)

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-exam-title"
      aria-describedby="submit-exam-desc"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <h2
          id="submit-exam-title"
          className="text-lg font-semibold text-slate-900 dark:text-white"
        >
          Submit exam?
        </h2>
        <p
          id="submit-exam-desc"
          className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
        >
          You cannot change your answers after submitting. Your attempt will be
          finalised and scored according to the test rules.
        </p>
        <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          <span className="font-medium text-slate-900 dark:text-white">
            {answeredCount}
          </span>{' '}
          of{' '}
          <span className="font-medium text-slate-900 dark:text-white">
            {totalQuestions}
          </span>{' '}
          questions answered.
          {unanswered > 0 ? (
            <span className="block pt-1 text-amber-800 dark:text-amber-200">
              {unanswered} question{unanswered === 1 ? '' : 's'} still unanswered.
            </span>
          ) : null}
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            Submit exam
          </button>
        </div>
      </div>
    </div>
  )
}
