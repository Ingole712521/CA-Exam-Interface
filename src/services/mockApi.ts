import { mockExams } from '../data/mockExams'
import type { CaLevel, ExamDefinition, SectionAssessmentType } from '../types/exam'

const API_BASE_URL = 'http://localhost:3001'

export type DashboardAnalytics = {
  totalStudents: number
  passStudents: number
  failStudents: number
  liveTestStudents: number
}

export type ExamCatalogItem = {
  id: string
  title: string
  durationMinutes: number
  level: CaLevel
  feeDisplay: string
  sections: {
    id: string
    name: string
    assessmentType?: SectionAssessmentType
    questionCount: number
  }[]
}

const fallbackCatalog: ExamCatalogItem[] = mockExams.map((exam: ExamDefinition) => ({
  id: exam.id,
  title: exam.title,
  durationMinutes: exam.durationMinutes,
  level: exam.level,
  feeDisplay: exam.feeDisplay,
  sections: exam.sections.map((section) => ({
    id: section.id,
    name: section.name,
    assessmentType: section.assessmentType,
    questionCount: section.questions.length,
  })),
}))

const fallbackAnalytics: DashboardAnalytics = {
  totalStudents: 1280,
  passStudents: 842,
  failStudents: 438,
  liveTestStudents: 173,
}

export async function fetchDashboardAnalytics(): Promise<DashboardAnalytics> {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboardAnalytics`)
    if (!response.ok) throw new Error('dashboard analytics fetch failed')
    return (await response.json()) as DashboardAnalytics
  } catch {
    return fallbackAnalytics
  }
}

export async function fetchExamCatalog(): Promise<ExamCatalogItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/examCatalog`)
    if (!response.ok) throw new Error('exam catalog fetch failed')
    const catalog = (await response.json()) as ExamCatalogItem[]
    if (!Array.isArray(catalog) || catalog.length === 0) return fallbackCatalog
    return catalog
  } catch {
    return fallbackCatalog
  }
}
