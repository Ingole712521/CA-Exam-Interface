/** How the item is framed in the UI (CA-style stems). */
export type QuestionFormat =
  | 'standard'
  | 'theoretical'
  | 'case_study'
  | 'image'
  | 'table'
  | 'upload'

/** Default grid table (e.g. trial balance excerpt, demand schedule). */
export interface QuestionStandardTableSpec {
  layout?: 'standard'
  caption?: string
  headers: string[]
  rows: string[][]
}

/**
 * Receipts and Payments account layout: two facing columns (particular + ₹)
 * with a total row, CA-style presentation.
 */
export interface QuestionReceiptsPaymentsTableSpec {
  layout: 'receipts_payments'
  caption?: string
  /** Defaults: "Receipts", "Payments" */
  receiptsHeading?: string
  paymentsHeading?: string
  receipts: { particular: string; amount: string }[]
  payments: { particular: string; amount: string }[]
  /** Omit both to hide the total row (e.g. dual-column particulars for P&L). */
  receiptsTotal?: string
  paymentsTotal?: string
}

export type QuestionTableSpec =
  | QuestionStandardTableSpec
  | QuestionReceiptsPaymentsTableSpec

export interface QuestionImageSpec {
  /** Public URL or Vite-resolved asset URL */
  src: string
  alt: string
}

/** One internal part of a CA-style compound question (OR groups, marks per part). */
export interface RawQuestionPart {
  id: string
  /** e.g. "(a)", "(b)" */
  label: string
  prompt: string
  marks: number
  /** Parts sharing the same id form an “answer any one” group. */
  orGroupId?: string
  format?: QuestionFormat
  passage?: string
  /** MCQ options; empty when `format === 'upload'`. */
  options: string[]
  /** 0-based correct index for MCQs; ignored for uploads. */
  correctAnswer: number
  table?: QuestionTableSpec
  image?: QuestionImageSpec
}

export interface RawQuestion {
  id: string
  /**
   * Optional long theory / case facts / directions (shown above the main question).
   */
  passage?: string
  /** Lead-in / directions (e.g. “Answer the following”). */
  question: string
  /** e.g. "Q2 (20 Marks)" */
  headline?: string
  /** e.g. "Q1 (Compulsory – Mixed Concepts)" */
  questionCategory?: string
  /**
   * Internal sub-parts with optional OR between groups.
   * When present, top-level `options` / `correctAnswer` are not used.
   */
  parts?: RawQuestionPart[]
  /**
   * For single-slot MCQs (no `parts`).
   * For upload-type questions, keep this empty.
   */
  options?: string[]
  /**
   * 0-based index into `options` before shuffle (MCQs only).
   * For upload-type questions, this value is ignored.
   */
  correctAnswer?: number
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
  /** CA programme level: Foundation → Intermediate → Final. */
  level: CaLevel
  /** Per-test fee label shown to students (each test has its own fee). */
  feeDisplay: string
  sections: RawSection[]
}

/** Answer state for one internal part of a compound question. */
export interface PartAnswerState {
  selectedAnswer: number | null
  uploadedAnswerImage: string | null
  uploadedAnswerFileName: string | null
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
  /** Present when this navigator slot is a compound (multi-part) question. */
  compound?: {
    /** For each OR group, which part id the student is answering. */
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
  /** Shuffled MCQ options per internal part (compound questions only). */
  optionsByPart: Record<string, Record<string, string[]>>
  correctIndexByPart: Record<string, Record<string, number>>
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
