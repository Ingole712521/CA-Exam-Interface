type Props = {
  questionNumber: number
  total: number
  text: string
  options: string[]
  selectedIndex: number | null
  onSelect: (index: number) => void
}

export function QuestionCard({
  questionNumber,
  total,
  text,
  options,
  selectedIndex,
  onSelect,
}: Props) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-400">
        Question {questionNumber} of {total}
      </p>
      <h2 className="mb-6 text-base font-medium leading-relaxed text-slate-900 dark:text-slate-100">
        {text}
      </h2>
      <ul className="space-y-3" role="radiogroup" aria-label="Answer choices">
        {options.map((opt, i) => {
          const selected = selectedIndex === i
          return (
            <li key={i}>
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onSelect(i)}
                className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${
                  selected
                    ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 dark:border-emerald-400 dark:bg-emerald-950/40 dark:ring-emerald-400'
                    : 'border-slate-200 bg-slate-50/80 hover:border-slate-300 hover:bg-white dark:border-slate-600 dark:bg-slate-800/50 dark:hover:border-slate-500 dark:hover:bg-slate-800'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                    selected
                      ? 'border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-slate-900'
                      : 'border-slate-300 text-slate-500 dark:border-slate-500 dark:text-slate-400'
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-slate-800 dark:text-slate-200">{opt}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
