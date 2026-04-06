type Props = {
  canPrev: boolean
  canNext: boolean
  onPrev: () => void
  onNext: () => void
}

export function ExamBottomControls({
  canPrev,
  canNext,
  onPrev,
  onNext,
}: Props) {
  return (
    <div className="sticky bottom-0 z-20 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
      <div className="mx-auto flex max-w-5xl justify-between gap-4">
        <button
          type="button"
          disabled={!canPrev}
          onClick={onPrev}
          className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={!canNext}
          onClick={onNext}
          className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          Next
        </button>
      </div>
    </div>
  )
}
