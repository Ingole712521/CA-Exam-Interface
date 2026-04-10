import type {
  ExamDefinition,
  ExamSessionState,
  QuestionFormat,
  QuestionImageSpec,
  QuestionMeta,
  QuestionPartMeta,
  QuestionResponse,
  QuestionTableSpec,
  RawQuestion,
  RawQuestionPart,
} from '../types/exam'
import { buildEmptyCompoundState } from './examQuestionHelpers'
import { shuffleArray, shuffleOptions } from './shuffle'

type FlatSimple = {
  kind: 'simple'
  id: string
  sectionId: string
  sectionName: string
  passage?: string
  text: string
  format?: QuestionFormat
  image?: QuestionImageSpec
  table?: QuestionTableSpec
  options: string[]
  correctAnswer: number
}

type FlatCompound = {
  kind: 'compound'
  id: string
  sectionId: string
  sectionName: string
  passage?: string
  text: string
  headline?: string
  questionCategory?: string
  parts: RawQuestionPart[]
}

function normalizeRawQuestion(q: RawQuestion): FlatSimple | FlatCompound {
  if (q.parts && q.parts.length > 0) {
    return {
      kind: 'compound',
      id: q.id,
      sectionId: '',
      sectionName: '',
      passage: q.passage,
      text: q.question,
      headline: q.headline,
      questionCategory: q.questionCategory,
      parts: q.parts,
    }
  }
  const options = q.options ?? []
  const correctAnswer = q.correctAnswer ?? 0
  return {
    kind: 'simple',
    id: q.id,
    sectionId: '',
    sectionName: '',
    passage: q.passage,
    text: q.question,
    format: q.format,
    image: q.image,
    table: q.table,
    options: [...options],
    correctAnswer,
  }
}

export function buildNewSession(exam: ExamDefinition): ExamSessionState {
  const flat: (FlatSimple | FlatCompound)[] = []

  for (const sec of exam.sections) {
    for (const q of sec.questions) {
      const n = normalizeRawQuestion(q)
      if (n.kind === 'simple') {
        flat.push({
          ...n,
          sectionId: sec.id,
          sectionName: sec.name,
        })
      } else {
        flat.push({
          ...n,
          sectionId: sec.id,
          sectionName: sec.name,
        })
      }
    }
  }

  const shuffledQs = shuffleArray(flat)
  const questionIds = shuffledQs.map((q) => q.id)
  const questionMeta: Record<string, QuestionMeta> = {}
  const optionsByQuestion: Record<string, string[]> = {}
  const correctIndexByQuestion: Record<string, number> = {}
  const optionsByPart: Record<string, Record<string, string[]>> = {}
  const correctIndexByPart: Record<string, Record<string, number>> = {}
  const responses: Record<string, QuestionResponse> = {}

  for (const q of shuffledQs) {
    if (q.kind === 'simple') {
      const isUpload = q.format === 'upload'
      const { options, correctIndex } = isUpload
        ? { options: q.options, correctIndex: q.correctAnswer }
        : shuffleOptions(q.options, q.correctAnswer)
      questionMeta[q.id] = {
        sectionId: q.sectionId,
        sectionName: q.sectionName,
        ...(q.passage !== undefined ? { passage: q.passage } : {}),
        text: q.text,
        ...(q.format !== undefined ? { format: q.format } : {}),
        ...(q.image !== undefined ? { image: q.image } : {}),
        ...(q.table !== undefined ? { table: q.table } : {}),
      }
      optionsByQuestion[q.id] = options
      correctIndexByQuestion[q.id] = correctIndex
      optionsByPart[q.id] = {}
      correctIndexByPart[q.id] = {}
      responses[q.id] = {
        selectedAnswer: null,
        uploadedAnswerImage: null,
        uploadedAnswerFileName: null,
        visited: false,
        markedForReview: false,
      }
    } else {
      const partMetas: QuestionPartMeta[] = []
      const optByPart: Record<string, string[]> = {}
      const corrByPart: Record<string, number> = {}

      for (const p of q.parts) {
        const isUpload = p.format === 'upload'
        const { options, correctIndex } = isUpload
          ? { options: p.options, correctIndex: p.correctAnswer }
          : shuffleOptions([...p.options], p.correctAnswer)
        partMetas.push({
          partId: p.id,
          label: p.label,
          prompt: p.prompt,
          marks: p.marks,
          ...(p.orGroupId !== undefined ? { orGroupId: p.orGroupId } : {}),
          ...(p.format !== undefined ? { format: p.format } : {}),
          ...(p.passage !== undefined ? { passage: p.passage } : {}),
          ...(p.table !== undefined ? { table: p.table } : {}),
          ...(p.image !== undefined ? { image: p.image } : {}),
        })
        optByPart[p.id] = options
        corrByPart[p.id] = correctIndex
      }

      questionMeta[q.id] = {
        sectionId: q.sectionId,
        sectionName: q.sectionName,
        ...(q.passage !== undefined ? { passage: q.passage } : {}),
        text: q.text,
        isCompound: true,
        parts: partMetas,
        ...(q.headline !== undefined ? { headline: q.headline } : {}),
        ...(q.questionCategory !== undefined
          ? { questionCategory: q.questionCategory }
          : {}),
      }
      optionsByQuestion[q.id] = []
      correctIndexByQuestion[q.id] = 0
      optionsByPart[q.id] = optByPart
      correctIndexByPart[q.id] = corrByPart
      responses[q.id] = {
        selectedAnswer: null,
        uploadedAnswerImage: null,
        uploadedAnswerFileName: null,
        visited: false,
        markedForReview: false,
        compound: buildEmptyCompoundState(partMetas),
      }
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
    optionsByPart,
    correctIndexByPart,
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
