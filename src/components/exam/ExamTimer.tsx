import { formatCountdown } from '../../utils/formatCountdown'

type Props = {
  seconds: number
  className?: string
  large?: boolean
}

export function ExamTimer({ seconds, className = '', large }: Props) {
  const urgent = seconds <= 300
  return (
    <div
      className={`font-mono tabular-nums ${
        large ? 'text-2xl font-semibold' : 'text-lg font-medium'
      } ${
        urgent
          ? 'text-red-600 dark:text-red-400'
          : 'text-slate-800 dark:text-slate-100'
      } ${className}`}
      role="timer"
      aria-live="polite"
      aria-atomic="true"
    >
      {formatCountdown(seconds)}
    </div>
  )
}
