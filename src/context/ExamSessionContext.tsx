import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import type { ExamSessionState } from '../types/exam'
import { getExamById } from '../data/mockExams'
import { buildNewSession, ensureInitialVisit } from '../utils/buildExamSession'
import {
  loadExamSession,
  saveExamSession,
  saveLastResult,
} from '../utils/examSessionStorage'
import { computeResult } from '../utils/scoring'

export const TAB_SWITCH_LIMIT = 3

function normalizeSession(raw: ExamSessionState): ExamSessionState {
  const t = raw.tabHiddenCount
  const tabHiddenCount =
    typeof t === 'number' && Number.isFinite(t) ? Math.max(0, Math.floor(t)) : 0
  return { ...raw, tabHiddenCount }
}

type ExamSessionContextValue = {
  session: ExamSessionState | null
  examMissing: boolean
  remainingSeconds: number
  currentQuestionId: string | null
  currentSectionName: string
  answeredCount: number
  tabSwitchWarningVisible: boolean
  dismissTabSwitchWarning: () => void
  tabViolationSecondsLeft: number | null
  selectOption: (optionIndex: number) => void
  goToIndex: (index: number) => void
  next: () => void
  prev: () => void
  toggleMarkForReview: () => void
  clearResponse: () => void
  submitExam: () => void
}

const ExamSessionContext = createContext<ExamSessionContextValue | null>(null)

function endsAt(s: ExamSessionState): number {
  return s.startedAt + s.durationSeconds * 1000
}

export function ExamSessionProvider({
  examId,
  children,
}: {
  examId: string
  children: ReactNode
}) {
  const navigate = useNavigate()
  const examDef = useMemo(() => getExamById(examId), [examId])
  const examMissing = !examDef
  const [session, setSession] = useState<ExamSessionState | null>(null)
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [tabSwitchWarningVisible, setTabSwitchWarningVisible] = useState(false)
  const [tabViolationSecondsLeft, setTabViolationSecondsLeft] = useState<
    number | null
  >(null)
  const submittedRef = useRef(false)
  const tabViolationStartedRef = useRef(false)
  const sessionRef = useRef<ExamSessionState | null>(null)
  useEffect(() => {
    sessionRef.current = session
  }, [session])
  const submitExamRef = useRef<() => void>(() => {})
  const persist = useCallback((s: ExamSessionState) => {
    setSession(s)
  }, [])

  useEffect(() => {
    submittedRef.current = false
    if (!examDef) return

    const existing = loadExamSession(examId)
    if (existing?.submittedAt) {
      navigate('/result', { replace: true })
      return
    }

    if (!existing) {
      tabViolationStartedRef.current = false
      setTabViolationSecondsLeft(null)
      setTabSwitchWarningVisible(false)
      const fresh = ensureInitialVisit(buildNewSession(examDef))
      setSession(fresh)
      const rem = Math.max(
        0,
        Math.floor((endsAt(fresh) - Date.now()) / 1000),
      )
      setRemainingSeconds(rem)
      return
    }

    const normalized = normalizeSession(existing)
    const rawStored = existing as ExamSessionState & { tabHiddenCount?: number }
    const hadTabCount = typeof rawStored.tabHiddenCount === 'number'
    if (!hadTabCount) {
      saveExamSession(normalized)
    }

    const end = endsAt(normalized)
    if (Date.now() >= end) {
      if (!submittedRef.current) {
        submittedRef.current = true
        const finished: ExamSessionState = {
          ...normalized,
          submittedAt: Date.now(),
        }
        saveExamSession(finished)
        saveLastResult(computeResult(normalized))
        navigate('/result', { replace: true })
      }
      return
    }

    setSession(normalized)
    setRemainingSeconds(Math.max(0, Math.floor((end - Date.now()) / 1000)))

    const th = normalized.tabHiddenCount ?? 0
    if (th > TAB_SWITCH_LIMIT && !normalized.submittedAt) {
      tabViolationStartedRef.current = true
      setTabViolationSecondsLeft(5)
    } else {
      tabViolationStartedRef.current = false
      setTabViolationSecondsLeft(null)
    }
  }, [examId, examDef, navigate])

  useEffect(() => {
    if (!session || session.submittedAt) return

    const tick = () => {
      const end = endsAt(session)
      const rem = Math.max(0, Math.floor((end - Date.now()) / 1000))
      setRemainingSeconds(rem)
      if (rem <= 0 && !submittedRef.current) {
        const s = sessionRef.current
        if (!s || s.submittedAt) return
        submittedRef.current = true
        const finished: ExamSessionState = {
          ...s,
          submittedAt: Date.now(),
        }
        saveExamSession(finished)
        saveLastResult(computeResult(s))
        navigate('/result', { replace: true })
      }
    }

    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [session, navigate])

  useEffect(() => {
    if (!session || session.submittedAt) return
    saveExamSession(session)
  }, [session])

  useEffect(() => {
    if (!tabSwitchWarningVisible) return
    const t = window.setTimeout(() => setTabSwitchWarningVisible(false), 8000)
    return () => window.clearTimeout(t)
  }, [tabSwitchWarningVisible])

  useEffect(() => {
    if (!session || session.submittedAt) return

    const onVisibility = () => {
      if (document.visibilityState !== 'hidden') return
      const s = sessionRef.current
      if (!s || s.submittedAt || submittedRef.current) return
      if (tabViolationStartedRef.current) return

      const next = (s.tabHiddenCount ?? 0) + 1
      setSession({ ...s, tabHiddenCount: next })
      console.log('next', next)
      if (next > TAB_SWITCH_LIMIT) {
        tabViolationStartedRef.current = true
        setTabViolationSecondsLeft(5)
      } else {
        setTabSwitchWarningVisible(true)
      }
    }

    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [session, session?.submittedAt])

  const dismissTabSwitchWarning = useCallback(() => {
    setTabSwitchWarningVisible(false)
  }, [])

  const currentQuestionId =
    session && session.questionIds.length > 0
      ? session.questionIds[session.currentIndex] ?? null
      : null

  const currentSectionName =
    currentQuestionId && session
      ? session.questionMeta[currentQuestionId]?.sectionName ?? ''
      : ''

  const answeredCount = useMemo(() => {
    if (!session) return 0
    return session.questionIds.filter(
      (qid) => session.responses[qid]?.selectedAnswer !== null,
    ).length
  }, [session])

  const selectOption = useCallback(
    (optionIndex: number) => {
      if (!session || !currentQuestionId || session.submittedAt) return
      const r = session.responses[currentQuestionId]
      if (!r) return
      persist({
        ...session,
        responses: {
          ...session.responses,
          [currentQuestionId]: {
            ...r,
            selectedAnswer: optionIndex,
            visited: true,
          },
        },
      })
    },
    [session, currentQuestionId, persist],
  )

  const goToIndex = useCallback(
    (index: number) => {
      if (!session || session.submittedAt) return
      const max = session.questionIds.length - 1
      const i = Math.max(0, Math.min(max, index))
      const qid = session.questionIds[i]
      const r = session.responses[qid]
      persist({
        ...session,
        currentIndex: i,
        responses: r
          ? {
              ...session.responses,
              [qid]: { ...r, visited: true },
            }
          : session.responses,
      })
    },
    [session, persist],
  )

  const next = useCallback(() => {
    if (!session) return
    goToIndex(session.currentIndex + 1)
  }, [session, goToIndex])

  const prev = useCallback(() => {
    if (!session) return
    goToIndex(session.currentIndex - 1)
  }, [session, goToIndex])

  const toggleMarkForReview = useCallback(() => {
    if (!session || !currentQuestionId || session.submittedAt) return
    const r = session.responses[currentQuestionId]
    if (!r) return
    persist({
      ...session,
      responses: {
        ...session.responses,
        [currentQuestionId]: {
          ...r,
          markedForReview: !r.markedForReview,
          visited: true,
        },
      },
    })
  }, [session, currentQuestionId, persist])

  const clearResponse = useCallback(() => {
    if (!session || !currentQuestionId || session.submittedAt) return
    const r = session.responses[currentQuestionId]
    if (!r) return
    persist({
      ...session,
      responses: {
        ...session.responses,
        [currentQuestionId]: {
          ...r,
          selectedAnswer: null,
          visited: true,
        },
      },
    })
  }, [session, currentQuestionId, persist])

  const submitExam = useCallback(() => {
    if (!session || session.submittedAt || submittedRef.current) return
    submittedRef.current = true
    setTabViolationSecondsLeft(null)
    const finished: ExamSessionState = {
      ...session,
      submittedAt: Date.now(),
    }
    saveExamSession(finished)
    saveLastResult(computeResult(session))
    navigate('/result', { replace: true })
  }, [session, navigate])

  useEffect(() => {
    submitExamRef.current = submitExam
  }, [submitExam])

  useEffect(() => {
    if (tabViolationSecondsLeft === null) return
    if (tabViolationSecondsLeft <= 0) {
      submitExamRef.current()
      return
    }
    const t = window.setTimeout(() => {
      setTabViolationSecondsLeft((c) =>
        c === null || c <= 0 ? null : c - 1,
      )
    }, 1000)
    return () => window.clearTimeout(t)
  }, [tabViolationSecondsLeft])

  const value = useMemo<ExamSessionContextValue>(
    () => ({
      session,
      examMissing,
      remainingSeconds,
      currentQuestionId,
      currentSectionName,
      answeredCount,
      tabSwitchWarningVisible,
      dismissTabSwitchWarning,
      tabViolationSecondsLeft,
      selectOption,
      goToIndex,
      next,
      prev,
      toggleMarkForReview,
      clearResponse,
      submitExam,
    }),
    [
      session,
      examMissing,
      remainingSeconds,
      currentQuestionId,
      currentSectionName,
      answeredCount,
      tabSwitchWarningVisible,
      dismissTabSwitchWarning,
      tabViolationSecondsLeft,
      selectOption,
      goToIndex,
      next,
      prev,
      toggleMarkForReview,
      clearResponse,
      submitExam,
    ],
  )

  return (
    <ExamSessionContext.Provider value={value}>
      {children}
    </ExamSessionContext.Provider>
  )
}

export function useExamSession(): ExamSessionContextValue {
  const ctx = useContext(ExamSessionContext)
  if (!ctx) throw new Error('useExamSession must be used within ExamSessionProvider')
  return ctx
}
