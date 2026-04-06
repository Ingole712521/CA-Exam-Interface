/** How the item is framed in the UI (CA-style stems). */
export type QuestionFormat =
  | 'standard'
  | 'theoretical'
  | 'case_study'
  | 'image'
  | 'table'

export interface QuestionTableSpec {
  caption?: string
  headers: string[]
  rows: string[][]
}

export interface QuestionImageSpec {
  /** Public URL or Vite-resolved asset URL */
  src: string
  alt: string
}

export interface RawQuestion {
  id: string
  /**
   * Optional long theory / case facts / directions (shown above the main question).
   */
  passage?: string
  /** The actual question line (or full stem if no passage). */
  question: string
  options: string[]
  /** 0-based index into `options` before shuffle */
  correctAnswer: number
  /** Presentation hint for badge and layout. */
  format?: QuestionFormat
  image?: QuestionImageSpec
  table?: QuestionTableSpec
}

export interface RawSection {
  id: string
  name: string
  questions: RawQuestion[]
}

export interface ExamDefinition {
  id: string
  title: string
  durationMinutes: number
  sections: RawSection[]
}

export interface QuestionResponse {
  selectedAnswer: number | null
  visited: boolean
  markedForReview: boolean
}

export interface ExamSessionState {
  examId: string
  examTitle: string
  durationSeconds: number
  startedAt: number
  submittedAt: number | null
  questionIds: string[]
  questionMeta: Record<
    string,
    {
      sectionId: string
      sectionName: string
      passage?: string
      text: string
      format?: QuestionFormat
      image?: QuestionImageSpec
      table?: QuestionTableSpec
    }
  >
  optionsByQuestion: Record<string, string[]>
  correctIndexByQuestion: Record<string, number>
  responses: Record<string, QuestionResponse>
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
  correct: number
  incorrect: number
  unanswered: number
  percentage: number
  sections: SectionScore[]
  completedAt: number
}
