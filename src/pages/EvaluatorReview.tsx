import { Link, Navigate, useParams } from 'react-router-dom'
import { AppHeader } from '../components/layout/AppHeader'
import { useAuth } from '../context/AuthContext'
import {
  loadExamSession,
  markPaperReviewed,
} from '../utils/examSessionStorage'

function parseReviewKey(reviewKey: string): { examId: string; submittedAt: number } | null {
  const parts = reviewKey.split('__')
  if (parts.length !== 2) return null
  const submittedAt = Number(parts[1])
  if (!Number.isFinite(submittedAt)) return null
  return { examId: parts[0], submittedAt }
}

export default function EvaluatorReview() {
  const { reviewKey } = useParams<{ reviewKey: string }>()
  const { user } = useAuth()
  if (user?.role !== 'evaluator') return <Navigate to="/dashboard" replace />
  if (!reviewKey) return <Navigate to="/evaluator/papers" replace />

  const decodedKey = decodeURIComponent(reviewKey)
  const parsed = parseReviewKey(decodedKey)
  if (!parsed) return <Navigate to="/evaluator/papers" replace />

  const session = loadExamSession(parsed.examId)
  if (!session || session.submittedAt !== parsed.submittedAt) {
    return <Navigate to="/evaluator/papers" replace />
  }

  return (
    <div className="min-h-svh bg-slate-50 dark:bg-slate-950">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Paper review
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {session.submittedByName ?? 'Student'} ({session.submittedByEmail ?? 'student@example.com'}) - {session.examTitle}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                if (!user?.email) return
                markPaperReviewed(decodedKey, user.email)
              }}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
            >
              Mark as checked
            </button>
            <Link
              to="/evaluator/papers"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Back to list
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {session.questionIds.map((qid, index) => {
            const meta = session.questionMeta[qid]
            const response = session.responses[qid]
            const options = session.optionsByQuestion[qid] ?? []
            const correct = session.correctIndexByQuestion[qid]

            return (
              <section
                key={qid}
                className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-2 dark:border-slate-700 dark:bg-slate-900"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Student answer
                  </p>
                  <h2 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                    Q{index + 1}. {meta?.text ?? 'Question'}
                  </h2>
                  {meta?.passage ? (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      {meta.passage}
                    </p>
                  ) : null}

                  {meta?.isCompound && meta.parts ? (
                    <div className="mt-3 space-y-3">
                      {meta.parts.map((part) => {
                        const partAnswer = response?.compound?.partAnswers?.[part.partId]
                        const chosen = partAnswer?.selectedAnswer
                        const partOptions = session.optionsByPart[qid]?.[part.partId] ?? []
                        const hasUpload = !!partAnswer?.uploadedAnswerImage
                        return (
                          <div key={part.partId} className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                              {part.label} {part.prompt}
                            </p>
                            {hasUpload ? (
                              <div className="mt-2">
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  Uploaded answer: {partAnswer?.uploadedAnswerFileName ?? 'image'}
                                </p>
                                <img
                                  src={partAnswer?.uploadedAnswerImage ?? ''}
                                  alt="Student uploaded answer"
                                  className="mt-2 max-h-56 w-full rounded-lg border border-slate-200 object-contain dark:border-slate-700"
                                />
                              </div>
                            ) : (
                              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                                Selected: {chosen !== null && chosen !== undefined ? partOptions[chosen] ?? `Option ${chosen + 1}` : 'No answer'}
                              </p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ) : meta?.format === 'upload' ? (
                    <div className="mt-3">
                      {response?.uploadedAnswerImage ? (
                        <>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Uploaded answer: {response.uploadedAnswerFileName ?? 'image'}
                          </p>
                          <img
                            src={response.uploadedAnswerImage}
                            alt="Student uploaded answer"
                            className="mt-2 max-h-64 w-full rounded-lg border border-slate-200 object-contain dark:border-slate-700"
                          />
                        </>
                      ) : (
                        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                          No upload submitted.
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                      Selected: {response?.selectedAnswer !== null && response?.selectedAnswer !== undefined ? options[response.selectedAnswer] ?? `Option ${response.selectedAnswer + 1}` : 'No answer'}
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Answer key
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                    Correct response
                  </h3>

                  {meta?.isCompound && meta.parts ? (
                    <div className="mt-3 space-y-3">
                      {meta.parts.map((part) => {
                        const partOptions = session.optionsByPart[qid]?.[part.partId] ?? []
                        const correctPart = session.correctIndexByPart[qid]?.[part.partId]
                        return (
                          <div key={part.partId} className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                              {part.label} {part.prompt}
                            </p>
                            <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-300">
                              {part.format === 'upload'
                                ? 'Manual evaluation required (upload type question).'
                                : `Correct: ${
                                    correctPart !== undefined && correctPart !== null
                                      ? partOptions[correctPart] ?? `Option ${correctPart + 1}`
                                      : 'N/A'
                                  }`}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  ) : meta?.format === 'upload' ? (
                    <p className="mt-3 text-sm text-emerald-700 dark:text-emerald-300">
                      Upload/subjective question: evaluate using rubric and model answer manually.
                    </p>
                  ) : (
                    <p className="mt-3 text-sm text-emerald-700 dark:text-emerald-300">
                      Correct: {options[correct] ?? 'N/A'}
                    </p>
                  )}
                </div>
              </section>
            )
          })}
        </div>
      </main>
    </div>
  )
}
