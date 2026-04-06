type Props = {
  answered: number
  total: number
}

export function ExamProgressBar({ answered, total }: Props) {
  const pct = total === 0 ? 0 : Math.round((answered / total) * 100)
  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Progress</span>
        <span>
          {answered} / {total} answered ({pct}%)
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-300 dark:bg-emerald-400"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
