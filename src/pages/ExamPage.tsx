import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ExamSessionProvider, useExamSession } from '../context/ExamSessionContext'
import { ExamTopBar } from '../components/exam/ExamTopBar'
import { QuestionNavigator } from '../components/exam/QuestionNavigator'
import { CompoundQuestionCard } from '../components/exam/CompoundQuestionCard'
import { QuestionCard } from '../components/exam/QuestionCard'
import { ExamRightPanel } from '../components/exam/ExamRightPanel'
import { ExamBottomControls } from '../components/exam/ExamBottomControls'
import { ExamTabOverlays } from '../components/exam/ExamTabOverlays'

function ExamLayout() {
  const {
    session,
    examMissing,
    remainingSeconds,
    currentQuestionId,
    currentSectionName,
    answeredCount,
    selectOption,
    setUploadedAnswerImage,
    selectCompoundOrGroup,
    selectCompoundPartOption,
    setCompoundPartUpload,
    goToIndex,
    next,
    prev,
    toggleMarkForReview,
    clearResponse,
    submitExam,
  } = useExamSession()

  const rootRef = useRef<HTMLDivElement>(null)
  const [fs, setFs] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const onFs = () => setFs(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  const toggleFullscreen = useCallback(async () => {
    const el = rootRef.current
    if (!el) return
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
        return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  if (examMissing) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-slate-100 px-4 dark:bg-slate-900">
        <p className="text-slate-700 dark:text-slate-300">Exam not found.</p>
        <Link
          to="/dashboard"
          className="mt-4 text-emerald-600 hover:underline dark:text-emerald-400"
        >
          Back to dashboard
        </Link>
      </div>
    )
  }

  if (!session || !currentQuestionId) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    )
  }

  const meta = session.questionMeta[currentQuestionId]
  const options = session.optionsByQuestion[currentQuestionId] ?? []
  const resp = session.responses[currentQuestionId]
  const total = session.questionIds.length
  const qNum = session.currentIndex + 1

  return (
    <div
      ref={rootRef}
      className="flex min-h-svh flex-col bg-slate-100 dark:bg-slate-950"
    >
      <ExamTabOverlays />
      <ExamTopBar
        examTitle={session.examTitle}
        sectionName={currentSectionName || meta?.sectionName || '—'}
        remainingSeconds={remainingSeconds}
        onToggleFullscreen={toggleFullscreen}
        fullscreenActive={fs}
      />

      <div className="mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 gap-4 px-3 py-4 lg:grid-cols-[260px_1fr_280px] lg:gap-6 lg:px-6">
        <aside className="order-2 lg:order-1">
          <QuestionNavigator
            palette={{
              questionIds: session.questionIds,
              responses: session.responses,
              questionMeta: session.questionMeta,
            }}
            currentIndex={session.currentIndex}
            onSelect={goToIndex}
          />
        </aside>

        <section className="order-1 min-w-0 lg:order-2">
          {meta?.isCompound && meta.parts && resp?.compound ? (
            <CompoundQuestionCard
              questionNumber={qNum}
              total={total}
              meta={meta}
              optionsByPart={session.optionsByPart[currentQuestionId] ?? {}}
              orGroupChoice={resp.compound.orGroupChoice}
              partAnswers={resp.compound.partAnswers}
              onSelectOrGroup={selectCompoundOrGroup}
              onSelectPartOption={selectCompoundPartOption}
              onUploadPart={setCompoundPartUpload}
            />
          ) : (
            <QuestionCard
              questionNumber={qNum}
              total={total}
              passage={meta?.passage}
              text={meta?.text ?? ''}
              format={meta?.format}
              image={meta?.image}
              table={meta?.table}
              options={options}
              selectedIndex={resp?.selectedAnswer ?? null}
              onSelect={selectOption}
              uploadedAnswerImage={resp?.uploadedAnswerImage ?? null}
              uploadedAnswerFileName={resp?.uploadedAnswerFileName ?? null}
              onUploadAnswerImage={setUploadedAnswerImage}
            />
          )}
        </section>

        <aside className="order-3">
          <ExamRightPanel
            remainingSeconds={remainingSeconds}
            answeredCount={answeredCount}
            totalQuestions={total}
            markedForReview={!!resp?.markedForReview}
            onToggleMark={toggleMarkForReview}
            onClear={clearResponse}
            onSubmit={() => {
              if (
                window.confirm(
                  'Submit the exam? You cannot change answers after submitting.',
                )
              ) {
                submitExam()
              }
            }}
          />
        </aside>
      </div>

      <ExamBottomControls
        canPrev={session.currentIndex > 0}
        canNext={session.currentIndex < total - 1}
        onPrev={prev}
        onNext={next}
      />
    </div>
  )
}

export default function ExamPage() {
  const { id } = useParams<{ id: string }>()
  if (!id) return <Navigate to="/dashboard" replace />

  return (
    <ExamSessionProvider key={id} examId={id}>
      <ExamLayout />
    </ExamSessionProvider>
  )
}
