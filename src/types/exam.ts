/** How the item is framed in the UI (CA-style stems). */
export type QuestionFormat =
  | 'standard'
  | 'theoretical'
  | 'case_study'
  | 'image'
  | 'table'
  | 'upload'

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
  /**
   * For MCQs, provide options.
   * For upload-type questions, keep this empty.
   */
  options: string[]
  /**
   * 0-based index into `options` before shuffle (MCQs only).
   * For upload-type questions, this value is ignored.
   */
  correctAnswer: number
  /** Presentation hint for badge and layout. */
  format?: QuestionFormat
  image?: QuestionImageSpec
  table?: QuestionTableSpec
}

/** Foundation syllabus: Accounts & Law are subjective papers; Economics & Mathematics are MCQ. */
export type SectionAssessmentType = 'subjective' | 'mcq'

export interface RawSection {
  id: string
  name: string
  /** How this subject is assessed per CA Foundation overview (UI copy). */
  assessmentType?: SectionAssessmentType
  questions: RawQuestion[]
}

export type CaLevel = 'foundation' | 'intermediate' | 'final'

export interface ExamDefinition {
  id: string
  title: string
  durationMinutes: number
  /** CA programme level (phase 1 targets Foundation only). */
  level: CaLevel
  /** Per-test fee label shown to students (each test has its own fee). */
  feeDisplay: string
  sections: RawSection[]
}

export interface QuestionResponse {
  selectedAnswer: number | null
  /**
   * Data URL for uploaded answer image (upload-type questions).
   * Stored in localStorage; keep uploads small to avoid quota issues.
   */
  uploadedAnswerImage: string | null
  uploadedAnswerFileName: string | null
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
  /** Questions auto-graded in the client (excludes upload / subjective file answers). */
  gradableQuestionCount: number
  /** Upload-type answers pending back-end admin evaluation. */
  uploadQuestionCount: number
  correct: number
  incorrect: number
  unanswered: number
  /** Share of auto-graded items answered correctly. */
  percentage: number
  sections: SectionScore[]
  completedAt: number
}
