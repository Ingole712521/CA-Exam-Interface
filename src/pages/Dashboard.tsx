import { Link } from 'react-router-dom'
import { mockExams } from '../data/mockExams'
import { AppHeader } from '../components/layout/AppHeader'
import { loadExamSession, startFreshExamAttempt } from '../utils/examSessionStorage'

function sessionActive(examId: string): boolean {
  const s = loadExamSession(examId)
  if (!s || s.submittedAt) return false
  const end = s.startedAt + s.durationSeconds * 1000
  return Date.now() < end
}

export default function Dashboard() {
  return (
    <div className="min-h-svh bg-slate-50 dark:bg-slate-950">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Available exams
        </h1>
        <p className="mb-10 max-w-2xl text-slate-600 dark:text-slate-400">
          Pick a mock test. Questions and options are shuffled when you start.
          Progress and timer resume if you refresh.
        </p>
        <ul className="grid gap-6 md:grid-cols-2">
          {mockExams.map((exam) => {
            const totalQs = exam.sections.reduce(
              (n, s) => n + s.questions.length,
              0,
            )
            const canResume = sessionActive(exam.id)
            return (
              <li
                key={exam.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-800"
              >
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {exam.title}
                </h2>
                <dl className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                  <div>
                    <dt className="text-xs uppercase text-slate-400">Duration</dt>
                    <dd className="font-medium text-slate-800 dark:text-slate-200">
                      {exam.durationMinutes} min
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase text-slate-400">Questions</dt>
                    <dd className="font-medium text-slate-800 dark:text-slate-200">
                      {totalQs}
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-3">
                  {canResume ? (
                    <Link
                      to={`/exam/${exam.id}`}
                      className="inline-flex flex-1 justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                    >
                      Resume
                    </Link>
                  ) : null}
                  <Link
                    to={`/exam/${exam.id}`}
                    onClick={() => startFreshExamAttempt(exam.id)}
                    className={`inline-flex justify-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 ${
                      canResume ? 'flex-1' : 'w-full'
                    }`}
                  >
                    {canResume ? 'Start new' : 'Start'}
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}
