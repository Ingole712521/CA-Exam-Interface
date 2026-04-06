import { Link } from 'react-router-dom'
import { AppHeader } from '../components/layout/AppHeader'
import { loadLastResult } from '../utils/examSessionStorage'

export default function Result() {
  const result = loadLastResult()

  if (!result) {
    return (
      <div className="min-h-svh bg-slate-50 dark:bg-slate-950">
        <AppHeader />
        <main className="mx-auto max-w-2xl px-4 py-16 text-center">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
            No result yet
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Complete an exam to see your score here.
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            Go to dashboard
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-slate-50 dark:bg-slate-950">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Exam result
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">{result.examTitle}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Score
            </p>
            <p className="mt-2 text-4xl font-bold text-emerald-600 dark:text-emerald-400">
              {result.correct}/{result.totalQuestions}
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-800 dark:text-slate-200">
              {result.percentage}%
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Breakdown
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Correct</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {result.correct}
                </span>
              </li>
              <li className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Incorrect</span>
                <span className="font-semibold text-red-600 dark:text-red-400">
                  {result.incorrect}
                </span>
              </li>
              <li className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Unanswered</span>
                <span className="font-semibold text-slate-500">
                  {result.unanswered}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Section-wise
          </h2>
          <ul className="mt-4 space-y-3">
            {result.sections.map((s) => (
              <li
                key={s.sectionName}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
              >
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {s.sectionName}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {s.correct} / {s.total} correct
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12">
          <Link
            to="/dashboard"
            className="inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            Back to dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}
