import { Link } from 'react-router-dom'
import { mockExams } from '../data/mockExams'
import { AppHeader } from '../components/layout/AppHeader'
import { loadExamSession, startFreshExamAttempt } from '../utils/examSessionStorage'
import type { CaLevel, ExamDefinition, SectionAssessmentType } from '../types/exam'

const LEVEL_ORDER: CaLevel[] = ['foundation', 'intermediate', 'final']

const LEVEL_LABEL: Record<CaLevel, string> = {
  foundation: 'Foundation',
  intermediate: 'Intermediate',
  final: 'Final',
}

const LEVEL_SHORT: Record<CaLevel, string> = {
  foundation: 'Level I',
  intermediate: 'Level II',
  final: 'Level III',
}

const LEVEL_ROMAN: Record<CaLevel, string> = {
  foundation: 'I',
  intermediate: 'II',
  final: 'III',
}

const LEVEL_DESCRIPTION: Record<CaLevel, string> = {
  foundation:
    'First stage of the CA course — papers typically include Principles & Practice of Accounting, Business Laws, Quantitative Aptitude, and Business Economics.',
  intermediate:
    'Second stage — builds on Foundation with eight papers across two groups (Advanced Accounting, Law, Costing, Taxation, and more).',
  final:
    'Final stage before membership — illustrative coverage includes financial reporting, strategic financial management, advanced auditing, and direct tax / international tax style MCQs.',
}

const LEVEL_SUBJECT_LIST: Record<CaLevel, string[]> = {
  foundation: [
    'Accounts (Subjective)',
    'Law (Subjective)',
    'Economics (MCQs)',
    'Mathematics (MCQs)',
  ],
  intermediate: [
    'Advanced Accounting',
    'Corporate Law',
    'Cost & Management Accounting',
    'Taxation',
  ],
  final: [
    'Financial Reporting',
    'Strategic Financial Management',
    'Advanced Auditing',
    'Professional Ethics',
  ],
}

const LEVEL_STYLE: Record<
  CaLevel,
  {
    gradient: string
    chip: string
    dot: string
  }
> = {
  foundation: {
    gradient: 'from-emerald-500 to-teal-600',
    chip: 'bg-emerald-500/10 text-emerald-800 ring-emerald-500/20 dark:text-emerald-200 dark:ring-emerald-400/25',
    dot: 'bg-emerald-500',
  },
  intermediate: {
    gradient: 'from-indigo-500 to-violet-600',
    chip: 'bg-indigo-500/10 text-indigo-800 ring-indigo-500/20 dark:text-indigo-200 dark:ring-indigo-400/25',
    dot: 'bg-indigo-500',
  },
  final: {
    gradient: 'from-amber-500 to-rose-600',
    chip: 'bg-amber-500/10 text-amber-900 ring-amber-500/25 dark:text-amber-100 dark:ring-amber-400/20',
    dot: 'bg-amber-500',
  },
}

type DashboardStudentAnalytics = {
  totalStudents: number
  passStudents: number
  failStudents: number
  liveTestStudents: number
}

const STUDENT_ANALYTICS: DashboardStudentAnalytics = {
  totalStudents: 1280,
  passStudents: 842,
  failStudents: 438,
  liveTestStudents: 173,
}

function examsByLevel(exams: ExamDefinition[]): Record<CaLevel, ExamDefinition[]> {
  const map: Record<CaLevel, ExamDefinition[]> = {
    foundation: [],
    intermediate: [],
    final: [],
  }
  for (const e of exams) {
    map[e.level].push(e)
  }
  return map
}

function assessmentLabel(t: SectionAssessmentType | undefined): string {
  if (t === 'mcq') return 'MCQ'
  if (t === 'subjective') return 'Subjective'
  return 'Mixed'
}

function sessionActive(examId: string): boolean {
  const s = loadExamSession(examId)
  if (!s || s.submittedAt) return false
  const end = s.startedAt + s.durationSeconds * 1000
  return Date.now() < end
}

function IconClock(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 8v4l2.5 2.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconQuestions(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 12h6m-6 4h4M8 6h8M7 3h10a2 2 0 012 2v14l-4-2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconFee(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 6v12m-3-9h4.5a1.5 1.5 0 010 3H9m6 3h-3a1.5 1.5 0 010-3H15"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ExamCard({ exam, level }: { exam: ExamDefinition; level: CaLevel }) {
  const totalQs = exam.sections.reduce((n, s) => n + s.questions.length, 0)
  const canResume = sessionActive(exam.id)
  const st = LEVEL_STYLE[level]

  return (
    <li className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-slate-300/90 dark:bg-slate-900/90 dark:ring-white/10 dark:hover:ring-white/20">
      <div
        className={`h-1.5 w-full bg-linear-to-r ${st.gradient}`}
        aria-hidden
      />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {LEVEL_SHORT[level]}
            </p>
            <h3 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-slate-900 dark:text-white">
              {exam.title}
            </h3>
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${st.chip}`}
          >
            {LEVEL_LABEL[level]}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl bg-slate-50/90 p-3 dark:bg-slate-800/50">
          <div className="flex flex-col items-center gap-1 border-r border-slate-200/80 pr-2 text-center dark:border-slate-700/80">
            <IconClock className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            <span className="text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Duration
            </span>
            <span className="text-sm font-semibold tabular-nums text-slate-900 dark:text-white">
              {exam.durationMinutes}m
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 border-r border-slate-200/80 px-1 text-center dark:border-slate-700/80">
            <IconQuestions className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            <span className="text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Items
            </span>
            <span className="text-sm font-semibold tabular-nums text-slate-900 dark:text-white">
              {totalQs}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 pl-2 text-center">
            <IconFee className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            <span className="text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Fee
            </span>
            <span className="text-sm font-semibold tabular-nums text-slate-900 dark:text-white">
              {exam.feeDisplay}
            </span>
          </div>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {exam.sections.map((s) => (
            <li
              key={s.id}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/90 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-200"
            >
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${st.dot}`} />
              <span>{s.name}</span>
              <span className="text-slate-400 dark:text-slate-500">·</span>
              <span className="text-slate-500 dark:text-slate-400">
                {assessmentLabel(s.assessmentType)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          {canResume ? (
            <Link
              to={`/exam/${exam.id}`}
              className={`inline-flex flex-1 min-w-32 items-center justify-center rounded-xl bg-linear-to-r px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition hover:opacity-95 active:scale-[0.98] dark:shadow-black/30 ${st.gradient}`}
            >
              Resume attempt
            </Link>
          ) : null}
          <Link
            to={`/exam/${exam.id}`}
            onClick={() => startFreshExamAttempt(exam.id)}
            className={`inline-flex flex-1 min-w-32 items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-700/80 ${
              canResume ? '' : 'w-full'
            }`}
          >
            {canResume ? 'New attempt' : 'Start test'}
          </Link>
        </div>
      </div>
    </li>
  )
}

export default function Dashboard() {
  const grouped = examsByLevel(mockExams)
  const totalTests = mockExams.length
  const totalSubjects = new Set(
    mockExams.flatMap((exam) => exam.sections.map((section) => section.name)),
  ).size
  const totalQuestions = mockExams.reduce(
    (n, e) => n + e.sections.reduce((m, s) => m + s.questions.length, 0),
    0,
  )
  const activeAttempts = mockExams.filter((e) => sessionActive(e.id)).length

  return (
    <div className="relative min-h-svh overflow-hidden bg-slate-100 dark:bg-slate-950">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.12),transparent)] dark:bg-[radial-gradient(ellipse_70%_45%_at_50%_-15%,rgba(52,211,153,0.08),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-112 w-112 translate-x-1/3 rounded-full bg-indigo-500/6 blur-3xl dark:bg-indigo-500/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 -translate-x-1/4 translate-y-1/4 rounded-full bg-teal-500/5 blur-3xl dark:bg-teal-500/10"
        aria-hidden
      />

      <AppHeader />

      <main className="relative mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        {/* Hero */}
        <div className="mb-12 overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none dark:ring-white/10">
          <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-emerald-950 px-6 py-10 sm:px-10 sm:py-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
              aria-hidden
            />
            <div className="relative max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/90">
                Student workspace
              </p>
              <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
                Chartered Accountancy
                <span className="block text-emerald-300/95">practice & mock tests</span>
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-slate-300 sm:text-base">
                Built for CA students in India. Clear{' '}
                <strong className="font-semibold text-white">Foundation</strong>, then{' '}
                <strong className="font-semibold text-white">Intermediate</strong>, then{' '}
                <strong className="font-semibold text-white">Final</strong>
                — the three levels on the path to qualification, alongside ICAI training
                requirements.
              </p>
            </div>
          </div>

          <div className="grid divide-y divide-slate-100 bg-slate-50/90 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3 dark:divide-slate-800 dark:bg-slate-900/60">
            <div className="flex flex-col px-6 py-5 sm:py-6">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Number of students
              </span>
              <span className="mt-1 text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
                {STUDENT_ANALYTICS.totalStudents}
              </span>
              <span className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Registered learners
              </span>
            </div>
            <div className="flex flex-col px-6 py-5 sm:py-6">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Number of subjects
              </span>
              <span className="mt-1 text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
                {totalSubjects}
              </span>
              <span className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Across all CA levels
              </span>
            </div>
            <div className="flex flex-col px-6 py-5 sm:py-6">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Number of tests
              </span>
              <span className="mt-1 text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
                {totalTests}
              </span>
              <span className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Across all levels
              </span>
            </div>
            <div className="flex flex-col px-6 py-5 sm:py-6">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Students pass
              </span>
              <span className="mt-1 text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
                {STUDENT_ANALYTICS.passStudents}
              </span>
              <span className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Cleared assessment criteria
              </span>
            </div>
            <div className="flex flex-col px-6 py-5 sm:py-6">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Students fail
              </span>
              <span className="mt-1 text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
                {STUDENT_ANALYTICS.failStudents}
              </span>
              <span className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Did not clear minimum score
              </span>
            </div>
            <div className="flex flex-col px-6 py-5 sm:py-6">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Students giving live test
              </span>
              <span className="mt-1 text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
                {STUDENT_ANALYTICS.liveTestStudents}
              </span>
              <span className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Active right now
              </span>
            </div>
          </div>
        </div>

        <p className="mb-12 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Each test has its own fee. Subjective uploads are reviewed by an administrator; scores
          unlock after payment (demo uses a local unlock). MCQ options shuffle on start; timer and
          progress persist if you refresh. Tables and account layouts render in exam view. Question
          bank: {totalQuestions} total items. Current in-progress attempts: {activeAttempts}.
        </p>

        {LEVEL_ORDER.map((level) => {
          const list = grouped[level]
          if (list.length === 0) return null
          const st = LEVEL_STYLE[level]

          return (
            <section key={level} className="mb-16 last:mb-0">
              <div className="mb-8 flex flex-col gap-4 border-b border-slate-200/90 pb-6 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br shadow-lg ${st.gradient} shadow-slate-900/15 ring-2 ring-white dark:ring-slate-900`}
                    aria-hidden
                  >
                    <span className="text-xl font-bold tabular-nums text-white">
                      {LEVEL_ROMAN[level]}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {LEVEL_LABEL[level]}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {LEVEL_DESCRIPTION[level]}
                    </p>
                    <ul className="mt-3 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                      {LEVEL_SUBJECT_LIST[level].map((subject) => (
                        <li key={subject} className="flex items-start gap-2">
                          <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" />
                          <span>{subject}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <span className="shrink-0 self-start rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300 sm:self-auto">
                  {list.length} test{list.length === 1 ? '' : 's'}
                </span>
              </div>

              <ul className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                {list.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} level={level} />
                ))}
              </ul>
            </section>
          )
        })}
      </main>
    </div>
  )
}
