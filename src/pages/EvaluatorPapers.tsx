import { Link, Navigate } from 'react-router-dom'
import { AppHeader } from '../components/layout/AppHeader'
import { useAuth } from '../context/AuthContext'
import {
  loadReviewedPapers,
  loadSubmittedPapers,
} from '../utils/examSessionStorage'

export default function EvaluatorPapers() {
  const { user } = useAuth()
  if (user?.role !== 'evaluator') {
    return <Navigate to="/dashboard" replace />
  }
  const papers = loadSubmittedPapers()
  const reviewed = loadReviewedPapers().filter(
    (record) => record.evaluatorEmail === user?.email,
  )
  const reviewedKeys = new Set(reviewed.map((record) => record.reviewKey))

  return (
    <div className="min-h-svh bg-slate-50 dark:bg-slate-950">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Student papers
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Open a paper to check student answers against the answer key.
        </p>

        <ul className="mt-6 space-y-3">
          {papers.map((paper) => {
            const checked = reviewedKeys.has(paper.reviewKey)
            return (
              <li
                key={paper.reviewKey}
                className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {paper.submittedByName} ({paper.submittedByEmail})
                  </p>
                  <p className="truncate text-sm text-slate-600 dark:text-slate-400">
                    {paper.examTitle}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    Submitted: {new Date(paper.submittedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      checked
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                    }`}
                  >
                    {checked ? 'Checked' : 'Unchecked'}
                  </span>
                  <Link
                    to={`/evaluator/papers/${encodeURIComponent(paper.reviewKey)}`}
                    className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                  >
                    Open paper
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>

        {papers.length === 0 ? (
          <p className="mt-6 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            No submitted student papers found yet.
          </p>
        ) : null}
      </main>
    </div>
  )
}
