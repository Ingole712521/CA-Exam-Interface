export interface RawQuestion {
  id: string
  question: string
  options: string[]
  /** 0-based index into `options` before shuffle */
  correctAnswer: number
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
      text: string
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
