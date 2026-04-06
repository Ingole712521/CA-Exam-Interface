import { formatCountdown } from '../../utils/formatCountdown'
import { ExamTimer } from './ExamTimer'

type Props = {
  examTitle: string
  sectionName: string
  remainingSeconds: number
  onToggleFullscreen?: () => void
  fullscreenActive?: boolean
}

export function ExamTopBar({
  examTitle,
  sectionName,
  remainingSeconds,
  onToggleFullscreen,
  fullscreenActive,
}: Props) {
  return (
    <div className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
          {examTitle}
        </h1>
        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
          Section: <span className="font-medium text-slate-700 dark:text-slate-300">{sectionName}</span>
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">
            Time left
          </p>
          <ExamTimer seconds={remainingSeconds} />
        </div>
        {onToggleFullscreen && (
          <button
            type="button"
            onClick={onToggleFullscreen}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            title="Fullscreen (F11)"
          >
            {fullscreenActive ? 'Exit full' : 'Fullscreen'}
          </button>
        )}
      </div>
      <span className="sr-only" aria-live="polite">
        Time remaining {formatCountdown(remainingSeconds)}
      </span>
    </div>
  )
}
