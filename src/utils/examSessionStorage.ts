import type { ExamSessionState, ExamResult } from '../types/exam'

const PREFIX = 'ca_exam_'
const SUFFIX = '_session'
const USER_KEY = 'ca_user'
const THEME_KEY = 'ca_theme'
const LAST_RESULT_KEY = 'ca_last_result'

export function sessionStorageKey(examId: string): string {
  return `${PREFIX}${examId}${SUFFIX}`
}

export function loadExamSession(examId: string): ExamSessionState | null {
  try {
    const raw = localStorage.getItem(sessionStorageKey(examId))
    if (!raw) return null
    return JSON.parse(raw) as ExamSessionState
  } catch {
    return null
  }
}

export function saveExamSession(state: ExamSessionState): void {
  localStorage.setItem(sessionStorageKey(state.examId), JSON.stringify(state))
}

export function clearExamSession(examId: string): void {
  localStorage.removeItem(sessionStorageKey(examId))
}

/** Clears saved progress so the next visit starts a new attempt */
export function startFreshExamAttempt(examId: string): void {
  clearExamSession(examId)
}

export interface StoredUser {
  email: string
  name: string
}

export function loadUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredUser
  } catch {
    return null
  }
}

export function saveUser(user: StoredUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearUser(): void {
  localStorage.removeItem(USER_KEY)
}

export type ThemeMode = 'light' | 'dark'

export function loadTheme(): ThemeMode | null {
  const v = localStorage.getItem(THEME_KEY)
  if (v === 'light' || v === 'dark') return v
  return null
}

export function saveTheme(mode: ThemeMode): void {
  localStorage.setItem(THEME_KEY, mode)
}

export function loadLastResult(): ExamResult | null {
  try {
    const raw = localStorage.getItem(LAST_RESULT_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ExamResult
  } catch {
    return null
  }
}

export function saveLastResult(result: ExamResult): void {
  localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(result))
}
