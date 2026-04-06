import { ExamTimer } from './ExamTimer'
import { ExamProgressBar } from './ExamProgressBar'

type Props = {
  remainingSeconds: number
  answeredCount: number
  totalQuestions: number
  markedForReview: boolean
  onToggleMark: () => void
  onClear: () => void
  onSubmit: () => void
}

export function ExamRightPanel({
  remainingSeconds,
  answeredCount,
  totalQuestions,
  markedForReview,
  onToggleMark,
  onClear,
  onSubmit,
}: Props) {
  return (
    <div className="sticky top-[52px] space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:hidden">
        <p className="text-[10px] uppercase tracking-wider text-slate-400">
          Time left
        </p>
        <ExamTimer seconds={remainingSeconds} large />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <ExamProgressBar answered={answeredCount} total={totalQuestions} />
      </div>

      <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <button
          type="button"
          onClick={onToggleMark}
          className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
            markedForReview
              ? 'bg-amber-100 text-amber-900 ring-1 ring-amber-400 dark:bg-amber-900/40 dark:text-amber-100'
              : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          {markedForReview ? 'Unmark review' : 'Mark for review'}
        </button>
        <button
          type="button"
          onClick={onClear}
          className="rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          Clear response
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
        >
          Submit exam
        </button>
      </div>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500">
        ← → to move · changes save automatically
      </p>
    </div>
  )
}
