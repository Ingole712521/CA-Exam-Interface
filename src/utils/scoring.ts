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

  function addMcqToSection(sectionName: string, isCorrect: boolean | null) {
    if (!sectionMap.has(sectionName)) {
      sectionMap.set(sectionName, { correct: 0, total: 0 })
    }
    const agg = sectionMap.get(sectionName)!
    agg.total += 1
    if (isCorrect === true) agg.correct += 1
  }

  for (const qid of session.questionIds) {
    const meta = session.questionMeta[qid]
    const resp = session.responses[qid]
    const sectionName = meta?.sectionName ?? 'Unknown'

    if (meta?.isCompound && meta.parts && resp?.compound) {
      const { orGroupChoice, partAnswers } = resp.compound
      const corrByPart = session.correctIndexByPart[qid] ?? {}

      const seenOrGroup = new Set<string>()
      for (const p of meta.parts) {
        if (p.orGroupId && !seenOrGroup.has(p.orGroupId)) {
          seenOrGroup.add(p.orGroupId)
          if (!orGroupChoice[p.orGroupId]) {
            unanswered += 1
            addMcqToSection(sectionName, null)
          }
        }
      }

      for (const p of meta.parts) {
        if (p.orGroupId && orGroupChoice[p.orGroupId] !== p.partId) continue

        if (p.format === 'upload') {
          uploadQuestionCount += 1
          continue
        }

        const pa = partAnswers[p.partId]
        const right = corrByPart[p.partId]
        if (right === undefined) continue

        if (!pa || pa.selectedAnswer === null) {
          unanswered += 1
          addMcqToSection(sectionName, null)
        } else if (pa.selectedAnswer === right) {
          correct += 1
          addMcqToSection(sectionName, true)
        } else {
          incorrect += 1
          addMcqToSection(sectionName, false)
        }
      }
      continue
    }

    if (meta?.format === 'upload') {
      uploadQuestionCount += 1
      continue
    }

    const right = session.correctIndexByQuestion[qid]

    if (resp?.selectedAnswer === null) {
      unanswered += 1
      addMcqToSection(sectionName, null)
    } else if (resp.selectedAnswer === right) {
      correct += 1
      addMcqToSection(sectionName, true)
    } else {
      incorrect += 1
      addMcqToSection(sectionName, false)
    }
  }

  const totalQuestions = session.questionIds.length
  const gradableQuestionCount = correct + incorrect + unanswered
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
