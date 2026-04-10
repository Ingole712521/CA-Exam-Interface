import type {
  ExamResult,
  ExamSessionState,
  SectionScore,
} from '../types/exam'

export function computeResult(session: ExamSessionState): ExamResult {
  let correct = 0
  let incorrect = 0
  let unanswered = 0
  let uploadQuestionCount = 0
  const sectionMap = new Map<string, { correct: number; total: number }>()

  for (const qid of session.questionIds) {
    const meta = session.questionMeta[qid]
    const resp = session.responses[qid]
    const right = session.correctIndexByQuestion[qid]
    const sectionName = meta?.sectionName ?? 'Unknown'

    // Upload-type answers are evaluated by admin; not auto-graded here.
    if (meta?.format === 'upload') {
      uploadQuestionCount += 1
      continue
    }

    if (!sectionMap.has(sectionName)) {
      sectionMap.set(sectionName, { correct: 0, total: 0 })
    }
    const agg = sectionMap.get(sectionName)!
    agg.total += 1

    if (resp.selectedAnswer === null) {
      unanswered += 1
    } else if (resp.selectedAnswer === right) {
      correct += 1
      agg.correct += 1
    } else {
      incorrect += 1
    }
  }

  const totalQuestions = session.questionIds.length
  const gradableQuestionCount = totalQuestions - uploadQuestionCount
  const percentage =
    gradableQuestionCount === 0
      ? 0
      : Math.round((correct / gradableQuestionCount) * 1000) / 10

  const sections: SectionScore[] = Array.from(sectionMap.entries()).map(
    ([name, { correct: c, total }]) => ({
      sectionName: name,
      correct: c,
      total,
    }),
  )

  return {
    examId: session.examId,
    examTitle: session.examTitle,
    totalQuestions,
    gradableQuestionCount,
    uploadQuestionCount,
    correct,
    incorrect,
    unanswered,
    percentage,
    sections,
    completedAt: Date.now(),
  }
}
