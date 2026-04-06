import type { ExamDefinition, ExamSessionState, QuestionResponse } from '../types/exam'
import { shuffleArray, shuffleOptions } from './shuffle'

export function buildNewSession(exam: ExamDefinition): ExamSessionState {
  const flat: {
    id: string
    sectionId: string
    sectionName: string
    text: string
    options: string[]
    correctAnswer: number
  }[] = []

  for (const sec of exam.sections) {
    for (const q of sec.questions) {
      flat.push({
        id: q.id,
        sectionId: sec.id,
        sectionName: sec.name,
        text: q.question,
        options: [...q.options],
        correctAnswer: q.correctAnswer,
      })
    }
  }

  const shuffledQs = shuffleArray(flat)
  const questionIds = shuffledQs.map((q) => q.id)
  const questionMeta: ExamSessionState['questionMeta'] = {}
  const optionsByQuestion: Record<string, string[]> = {}
  const correctIndexByQuestion: Record<string, number> = {}
  const responses: Record<string, QuestionResponse> = {}

  for (const q of shuffledQs) {
    const { options, correctIndex } = shuffleOptions(
      q.options,
      q.correctAnswer,
    )
    questionMeta[q.id] = {
      sectionId: q.sectionId,
      sectionName: q.sectionName,
      text: q.text,
    }
    optionsByQuestion[q.id] = options
    correctIndexByQuestion[q.id] = correctIndex
    responses[q.id] = {
      selectedAnswer: null,
      visited: false,
      markedForReview: false,
    }
  }

  const startedAt = Date.now()
  const durationSeconds = exam.durationMinutes * 60

  return {
    examId: exam.id,
    examTitle: exam.title,
    durationSeconds,
    startedAt,
    submittedAt: null,
    questionIds,
    questionMeta,
    optionsByQuestion,
    correctIndexByQuestion,
    responses,
    currentIndex: 0,
    tabHiddenCount: 0,
  }
}

export function ensureInitialVisit(state: ExamSessionState): ExamSessionState {
  const firstId = state.questionIds[0]
  if (!firstId) return state
  const r = state.responses[firstId]
  if (r && !r.visited) {
    return {
      ...state,
      responses: {
        ...state.responses,
        [firstId]: { ...r, visited: true },
      },
    }
  }
  return state
}
