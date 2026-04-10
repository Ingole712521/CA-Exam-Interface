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

const LEVEL_DESCRIPTION: Record<CaLevel, string> = {
  foundation:
    'First stage of the CA course — papers typically include Principles & Practice of Accounting, Business Laws, Quantitative Aptitude, and Business Economics.',
  intermediate:
    'Second stage — builds on Foundation with eight papers across two groups (Advanced Accounting, Law, Costing, Taxation, and more).',
  final:
    'Final stage before membership — illustrative coverage includes financial reporting, strategic financial management, advanced auditing, and direct tax / international tax style MCQs.',
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
  if (t === 'mcq') return 'MCQs'
  if (t === 'subjective') return 'Subjective'
  return 'Mixed'
}

function sessionActive(examId: string): boolean {
  const s = loadExamSession(examId)
  if (!s || s.submittedAt) return false
  const end = s.startedAt + s.durationSeconds * 1000
  return Date.now() < end
}

function ExamCard({ exam }: { exam: ExamDefinition }) {
  const totalQs = exam.sections.reduce((n, s) => n + s.questions.length, 0)
  const canResume = sessionActive(exam.id)
  return (
    <li className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-800">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {exam.title}
        </h3>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200">
          {LEVEL_LABEL[exam.level]}
        </span>
      </div>
      <dl className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
        <div>
          <dt className="text-xs uppercase text-slate-400">Duration</dt>
          <dd className="font-medium text-slate-800 dark:text-slate-200">
            {exam.durationMinutes} min
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-400">Questions</dt>
          <dd className="font-medium text-slate-800 dark:text-slate-200">{totalQs}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-400">Test fee</dt>
          <dd className="font-medium text-slate-800 dark:text-slate-200">
            {exam.feeDisplay}
          </dd>
        </div>
      </dl>
      <ul className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-400">
        {exam.sections.map((s) => (
          <li
            key={s.id}
            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 dark:border-slate-600 dark:bg-slate-800/80"
          >
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {s.name}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              {' '}
              · {assessmentLabel(s.assessmentType)}
            </span>
          </li>
        ))}
      </ul>
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
}

export default function Dashboard() {
  const grouped = examsByLevel(mockExams)

  return (
    <div className="min-h-svh bg-slate-50 dark:bg-slate-950">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Chartered Accountancy practice tests
        </h1>
        <p className="mb-3 max-w-3xl text-slate-600 dark:text-slate-400">
          This platform is for students pursuing{' '}
          <span className="font-medium text-slate-800 dark:text-slate-200">
            Chartered Accountancy
          </span>{' '}
          in India. The CA qualification has{' '}
          <span className="font-medium text-slate-800 dark:text-slate-200">
            three levels
          </span>
          , which must be cleared in order — starting with{' '}
          <span className="font-medium text-slate-800 dark:text-slate-200">
            Foundation
          </span>
          , then{' '}
          <span className="font-medium text-slate-800 dark:text-slate-200">
            Intermediate
          </span>
          , and finally{' '}
          <span className="font-medium text-slate-800 dark:text-slate-200">
            Final
          </span>
          . Completing all three levels (and practical training requirements) is
          part of the path to becoming a qualified Chartered Accountant.
        </p>
        <p className="mb-10 max-w-3xl text-sm text-slate-500 dark:text-slate-400">
          Each level has its own mock test below. Each test has its own fee. After
          you submit, subjective uploads are evaluated by the administrator; you
          see scores for a test only after payment for that test (demo uses a local
          unlock). MCQ options are shuffled when you start; timer and progress resume
          if you refresh. Tabular questions keep table layout in the attempt view.
        </p>

        {LEVEL_ORDER.map((level) => {
          const list = grouped[level]
          if (list.length === 0) return null
          return (
            <section key={level} className="mb-12 last:mb-0">
              <h2 className="mb-1 text-xl font-semibold text-slate-900 dark:text-white">
                {LEVEL_LABEL[level]}
              </h2>
              <p className="mb-6 max-w-3xl text-sm text-slate-600 dark:text-slate-400">
                {LEVEL_DESCRIPTION[level]}
              </p>
              <ul className="grid gap-6 md:grid-cols-2">
                {list.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </ul>
            </section>
          )
        })}
      </main>
    </div>
  )
}
