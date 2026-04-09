import { useExamSession } from '../../context/ExamSessionContext'

export function ExamTabOverlays() {
  const {
    tabSwitchWarningVisible,
    dismissTabSwitchWarning,
    tabViolationSecondsLeft,
  } = useExamSession()

  return (
    <>
      {tabSwitchWarningVisible && (
        <div
          role="alert"
          className="fixed left-1/2 top-[72px] z-90 w-[min(100%-1.5rem,42rem)] -translate-x-1/2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950 shadow-lg dark:border-amber-600 dark:bg-amber-950/90 dark:text-amber-50"
        >
          <div className="flex items-start gap-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-200 text-sm font-bold text-amber-900 dark:bg-amber-800 dark:text-amber-100"
              aria-hidden
            >
              !
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">Please do not change the tab</p>
              <p className="mt-1 text-amber-900/90 dark:text-amber-100/90">
                Stay on this exam window until you finish. If you leave this tab
                too many times, your exam will be submitted automatically.
              </p>
            </div>
            <button
              type="button"
              onClick={dismissTabSwitchWarning}
              className="shrink-0 rounded-md p-1 text-amber-800 hover:bg-amber-200/80 dark:text-amber-100 dark:hover:bg-amber-800/80"
              aria-label="Dismiss warning"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {tabViolationSecondsLeft !== null && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="tab-violation-title"
          aria-describedby="tab-violation-desc"
        >
          <div className="max-w-md rounded-2xl border border-red-200 bg-white p-6 shadow-2xl dark:border-red-900/50 dark:bg-slate-900">
            <h2
              id="tab-violation-title"
              className="text-lg font-semibold text-red-700 dark:text-red-400"
            >
              Tab switch limit exceeded
            </h2>
            <p
              id="tab-violation-desc"
              className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
            >
              You have exceeded the allowed number of tab changes. For exam
              integrity, your attempt will be submitted automatically.
            </p>
            <p className="mt-6 text-center font-mono text-4xl font-bold tabular-nums text-slate-900 dark:text-white">
              {tabViolationSecondsLeft > 0
                ? tabViolationSecondsLeft
                : 'Submitting…'}
            </p>
            {tabViolationSecondsLeft > 0 ? (
              <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
                Submitting in {tabViolationSecondsLeft} second
                {tabViolationSecondsLeft === 1 ? '' : 's'}…
              </p>
            ) : null}
          </div>
        </div>
      )}
    </>
  )
}
