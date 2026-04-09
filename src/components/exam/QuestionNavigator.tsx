import type { QuestionResponse } from '../../types/exam'

type Props = {
  questionIds: string[]
  responses: Record<string, QuestionResponse>
  currentIndex: number
  onSelect: (index: number) => void
}

function cellClass(
  index: number,
  currentIndex: number,
  r: QuestionResponse | undefined,
): string {
  const base =
    'flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900'
  const isCurrent = index === currentIndex

  let state =
    'border border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300'

  if (r?.markedForReview) {
    state =
      'border-amber-400 bg-amber-100 text-amber-900 dark:border-amber-500 dark:bg-amber-900/40 dark:text-amber-100'
  } else if (r?.selectedAnswer !== null || r?.uploadedAnswerImage !== null) {
    state =
      'border-emerald-500 bg-emerald-100 text-emerald-900 dark:border-emerald-400 dark:bg-emerald-900/40 dark:text-emerald-100'
  } else if (r?.visited) {
    state =
      'border-red-400 bg-red-50 text-red-800 dark:border-red-500 dark:bg-red-900/30 dark:text-red-100'
  }

  const ring = isCurrent
    ? ' ring-2 ring-emerald-600 ring-offset-2 dark:ring-emerald-400 dark:ring-offset-slate-900'
    : ''

  return `${base} ${state}${ring}`
}

export function QuestionNavigator({
  questionIds,
  responses,
  currentIndex,
  onSelect,
}: Props) {
  return (
    <div className="sticky top-[52px] max-h-[calc(100vh-8rem)] overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Question palette
      </h2>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
        {questionIds.map((qid, i) => (
          <button
            key={qid}
            type="button"
            aria-label={`Question ${i + 1}`}
            aria-current={i === currentIndex ? 'true' : undefined}
            className={cellClass(i, currentIndex, responses[qid])}
            onClick={() => onSelect(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs dark:border-slate-700">
        <li className="flex items-center gap-2 dark:text-white">
          <span className="h-3 w-3 rounded border border-slate-300 bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white" />
          Not visited
        </li>
        <li className="flex items-center gap-2 dark:text-white ">
          <span className="h-3 w-3 rounded border border-emerald-500 bg-emerald-100 dark:bg-emerald-900/40" />
          Answered
        </li>
        <li className="flex items-center gap-2 dark:text-white">
          <span className="h-3 w-3 rounded border border-red-400 bg-red-50 dark:bg-red-900/30" />
          Visited, not answered
        </li>
        <li className="flex items-center gap-2 dark:text-white">
          <span className="h-3 w-3 rounded border border-amber-400 bg-amber-100 dark:bg-amber-900/40" />
          Marked for review
        </li>
      </ul>
    </div>
  )
}
