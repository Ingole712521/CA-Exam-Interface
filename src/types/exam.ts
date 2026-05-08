
export type QuestionFormat =
  | 'standard'
  | 'theoretical'
  | 'case_study'
  | 'image'
  | 'table'
  | 'upload'

export interface QuestionStandardTableSpec {
  layout?: 'standard'
  caption?: string
  headers: string[]
  rows: string[][]
}

export interface QuestionReceiptsPaymentsTableSpec {
  layout: 'receipts_payments'
  caption?: string
  receiptsHeading?: string
  paymentsHeading?: string
  receipts: { particular: string; amount: string }[]
  payments: { particular: string; amount: string }[]
  receiptsTotal?: string
  paymentsTotal?: string
}

export type QuestionTableSpec =
  | QuestionStandardTableSpec
  | QuestionReceiptsPaymentsTableSpec

export interface QuestionImageSpec {
  src: string
  alt: string
}

export interface RawQuestionPart {
  id: string
  label: string
  prompt: string
  marks: number
  orGroupId?: string
  format?: QuestionFormat
  passage?: string
  options: string[]
  correctAnswer: number
  table?: QuestionTableSpec
  image?: QuestionImageSpec
}

export interface RawQuestion {
  id: string
  passage?: string
  question: string
  headline?: string
  questionCategory?: string
  parts?: RawQuestionPart[]
  
  options?: string[]
  
  correctAnswer?: number
  format?: QuestionFormat
  image?: QuestionImageSpec
  table?: QuestionTableSpec
}

export type SectionAssessmentType = 'subjective' | 'mcq'

export interface RawSection {
  id: string
  name: string
  assessmentType?: SectionAssessmentType
  questions: RawQuestion[]
}

export type CaLevel = 'foundation' | 'intermediate' | 'final'

export interface ExamDefinition {
  id: string
  title: string
  durationMinutes: number
  level: CaLevel
  feeDisplay: string
  sections: RawSection[]
}

export interface PartAnswerState {
  selectedAnswer: number | null
  uploadedAnswerImage: string | null
  uploadedAnswerFileName: string | null
}

export interface QuestionResponse {
  selectedAnswer: number | null
 
  uploadedAnswerImage: string | null
  uploadedAnswerFileName: string | null
  visited: boolean
  markedForReview: boolean
  compound?: {
    orGroupChoice: Record<string, string | null>
    partAnswers: Record<string, PartAnswerState>
  }
}

export interface QuestionPartMeta {
  partId: string
  label: string
  prompt: string
  marks: number
  orGroupId?: string
  format?: QuestionFormat
  passage?: string
  table?: QuestionTableSpec
  image?: QuestionImageSpec
}

export interface QuestionMeta {
  sectionId: string
  sectionName: string
  passage?: string
  text: string
  format?: QuestionFormat
  image?: QuestionImageSpec
  table?: QuestionTableSpec
  headline?: string
  questionCategory?: string
  isCompound?: boolean
  parts?: QuestionPartMeta[]
}

export interface ExamSessionState {
  examId: string
  examTitle: string
  durationSeconds: number
  startedAt: number
  submittedAt: number | null
  questionIds: string[]
  questionMeta: Record<string, QuestionMeta>
  optionsByQuestion: Record<string, string[]>
  correctIndexByQuestion: Record<string, number>
  optionsByPart: Record<string, Record<string, string[]>>
  correctIndexByPart: Record<string, Record<string, number>>
  responses: Record<string, QuestionResponse>
  submittedByName?: string
  submittedByEmail?: string
  currentIndex: number
  tabHiddenCount: number
}

export interface SectionScore {
  sectionName: string
  correct: number
  total: number
}

export interface ExamResult {
  examId: string
  examTitle: string
  totalQuestions: number
  gradableQuestionCount: number
  uploadQuestionCount: number
  correct: number
  incorrect: number
  unanswered: number
  percentage: number
  sections: SectionScore[]
  completedAt: number
}
