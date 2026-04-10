import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppHeader } from '../components/layout/AppHeader'
import { getExamById } from '../data/mockExams'
import { payForTestResult } from '../services/dummyPaymentService'
import {
  getPaidTransactionIdForExam,
  isResultPaidForExam,
  loadLastResult,
  setResultPaidForExam,
} from '../utils/examSessionStorage'

export default function Result() {
  const result = loadLastResult()
  const [paid, setPaid] = useState(
    () => result != null && isResultPaidForExam(result.examId),
  )
  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState<string | null>(null)

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

  const gradable = result.gradableQuestionCount
  const uploads = result.uploadQuestionCount
  const examId = result.examId
  const examTitle = result.examTitle
  const feeDisplay = getExamById(examId)?.feeDisplay ?? '—'
  const dummyPaymentRef = getPaidTransactionIdForExam(examId)

  async function handlePayForResults() {
    setPayError(null)
    setPaying(true)
    const outcome = await payForTestResult({
      examId,
      examTitle,
      amountDisplay: feeDisplay,
    })
    setPaying(false)
    if (outcome.ok === false) {
      setPayError(outcome.message)
      return
    }
    setResultPaidForExam(examId, outcome.transactionId)
    setPaid(true)
  }

  if (!paid) {
    return (
      <div className="min-h-svh bg-slate-50 dark:bg-slate-950">
        <AppHeader />
        <main className="mx-auto max-w-2xl px-4 py-10">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Test submitted
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">{result.examTitle}</p>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
            <p className="font-medium">What happens next</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Subjective answers (including uploaded images) are reviewed by the
                back-end administrator. Your final score is released only after that
                evaluation.
              </li>
              <li>
                In this product model, you unlock performance details for a given test
                after payment of that test&apos;s fee ({feeDisplay} for this paper).
              </li>
              {gradable > 0 ? (
                <li>
                  Multiple-choice items can be scored automatically; those numbers are
                  still hidden here until you unlock results for this test.
                </li>
              ) : null}
            </ul>
          </div>

          <div className="mt-8">
            <button
              type="button"
              disabled={paying}
              onClick={() => void handlePayForResults()}
              className="w-full rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto dark:bg-emerald-500 dark:hover:bg-emerald-600"
            >
              {paying ? 'Processing payment…' : `Pay ${feeDisplay} — unlock results (dummy)`}
            </button>
            {payError ? (
              <p className="mt-3 text-sm text-red-600 dark:text-red-400" role="alert">
                {payError}
              </p>
            ) : null}
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Dummy gateway only: no card or UPI data is collected; unlock is stored in
              this browser after a simulated delay.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="mt-10 inline-block text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
            Back to dashboard
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

        {dummyPaymentRef ? (
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Dummy payment reference:{' '}
            <span className="font-mono text-slate-700 dark:text-slate-300">
              {dummyPaymentRef}
            </span>
          </p>
        ) : null}

        {uploads > 0 ? (
          <p className="mt-4 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            You have {uploads} subjective upload{uploads === 1 ? '' : 's'} in this
            attempt. Marks for those items will appear after the administrator finishes
            evaluation; the figures below reflect auto-graded (MCQ) items only.
          </p>
        ) : null}

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Auto-graded score (MCQ)
            </p>
            <p className="mt-2 text-4xl font-bold text-emerald-600 dark:text-emerald-400">
              {result.correct}/{gradable || result.totalQuestions}
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-800 dark:text-slate-200">
              {gradable > 0 ? `${result.percentage}%` : '—'}
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
                <span>Unanswered (MCQ)</span>
                <span className="font-semibold text-slate-500">
                  {result.unanswered}
                </span>
              </li>
              {uploads > 0 ? (
                <li className="flex justify-between text-slate-700 dark:text-slate-300">
                  <span>Subjective uploads (pending)</span>
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    {uploads}
                  </span>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Section-wise (auto-graded)
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
