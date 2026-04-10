import type {
  ExamSessionState,
  PartAnswerState,
  QuestionMeta,
  QuestionPartMeta,
  QuestionResponse,
} from '../types/exam'

const EMPTY_PART: PartAnswerState = {
  selectedAnswer: null,
  uploadedAnswerImage: null,
  uploadedAnswerFileName: null,
}

export function buildEmptyCompoundState(parts: QuestionPartMeta[]): NonNullable<
  QuestionResponse['compound']
> {
  const orGroupChoice: Record<string, string | null> = {}
  const seen = new Set<string>()
  for (const p of parts) {
    if (p.orGroupId && !seen.has(p.orGroupId)) {
      seen.add(p.orGroupId)
      orGroupChoice[p.orGroupId] = null
    }
  }
  const partAnswers: Record<string, PartAnswerState> = {}
  for (const p of parts) {
    partAnswers[p.partId] = { ...EMPTY_PART }
  }
  return { orGroupChoice, partAnswers }
}

export function isCompoundFullyAnswered(
  meta: QuestionMeta,
  r: QuestionResponse | undefined,
): boolean {
  if (!meta.isCompound || !meta.parts?.length || !r?.compound) return false
  const { orGroupChoice, partAnswers } = r.compound
  const groupIds = new Set(
    meta.parts.map((p) => p.orGroupId).filter(Boolean) as string[],
  )
  for (const g of groupIds) {
    if (!orGroupChoice[g]) return false
  }
  for (const p of meta.parts) {
    if (p.orGroupId) {
      if (orGroupChoice[p.orGroupId] !== p.partId) continue
    }
    const pa = partAnswers[p.partId]
    if (!pa) return false
    if (p.format === 'upload') {
      if (!pa.uploadedAnswerImage) return false
    } else {
      if (pa.selectedAnswer === null) return false
    }
  }
  return true
}

export function isQuestionSlotAnswered(
  state: Pick<ExamSessionState, 'questionIds' | 'responses' | 'questionMeta'>,
  qid: string,
): boolean {
  const meta = state.questionMeta[qid]
  const r = state.responses[qid]
  if (!r) return false
  if (meta?.isCompound) return isCompoundFullyAnswered(meta, r)
  return r.selectedAnswer !== null || r.uploadedAnswerImage !== null
}

export function ensureSessionCompoundFields(
  state: ExamSessionState,
): ExamSessionState {
  let responses = state.responses
  let changed = false
  for (const qid of state.questionIds) {
    const meta = state.questionMeta[qid]
    if (!meta?.isCompound || !meta.parts?.length) continue
    const r = responses[qid]
    if (!r) continue
    if (!r.compound) {
      responses = {
        ...responses,
        [qid]: {
          ...r,
          compound: buildEmptyCompoundState(meta.parts),
        },
      }
      changed = true
    }
  }
  return changed ? { ...state, responses } : state
}
