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
import type { ExamSessionState, PartAnswerState } from '../types/exam'
import { getExamById } from '../data/mockExams'
import { buildNewSession, ensureInitialVisit } from '../utils/buildExamSession'
import {
  buildEmptyCompoundState,
  ensureSessionCompoundFields,
  isQuestionSlotAnswered,
} from '../utils/examQuestionHelpers'
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
  setUploadedAnswerImage: (dataUrl: string, fileName: string | null) => void
  selectCompoundOrGroup: (orGroupId: string, partId: string) => void
  selectCompoundPartOption: (partId: string, optionIndex: number) => void
  setCompoundPartUpload: (
    partId: string,
    dataUrl: string,
    fileName: string | null,
  ) => void
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

    const normalized = ensureSessionCompoundFields(normalizeSession(existing))
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
    return session.questionIds.filter((qid) =>
      isQuestionSlotAnswered(session, qid),
    ).length
  }, [session])

  const selectOption = useCallback(
    (optionIndex: number) => {
      if (!session || !currentQuestionId || session.submittedAt) return
      const meta = session.questionMeta[currentQuestionId]
      if (meta?.isCompound) return
      const r = session.responses[currentQuestionId]
      if (!r) return
      persist({
        ...session,
        responses: {
          ...session.responses,
          [currentQuestionId]: {
            ...r,
            selectedAnswer: optionIndex,
            // if they select MCQ now, clear any previously uploaded image for this question
            uploadedAnswerImage: null,
            uploadedAnswerFileName: null,
            visited: true,
          },
        },
      })
    },
    [session, currentQuestionId, persist],
  )

  const selectCompoundOrGroup = useCallback(
    (orGroupId: string, partId: string) => {
      if (!session || !currentQuestionId || session.submittedAt) return
      const meta = session.questionMeta[currentQuestionId]
      const r = session.responses[currentQuestionId]
      if (!meta?.isCompound || !meta.parts || !r?.compound) return

      const partAnswers: Record<string, PartAnswerState> = {
        ...r.compound.partAnswers,
      }
      for (const p of meta.parts) {
        if (p.orGroupId === orGroupId && p.partId !== partId) {
          partAnswers[p.partId] = {
            selectedAnswer: null,
            uploadedAnswerImage: null,
            uploadedAnswerFileName: null,
          }
        }
      }

      persist({
        ...session,
        responses: {
          ...session.responses,
          [currentQuestionId]: {
            ...r,
            compound: {
              ...r.compound,
              orGroupChoice: {
                ...r.compound.orGroupChoice,
                [orGroupId]: partId,
              },
              partAnswers,
            },
            visited: true,
          },
        },
      })
    },
    [session, currentQuestionId, persist],
  )

  const selectCompoundPartOption = useCallback(
    (partId: string, optionIndex: number) => {
      if (!session || !currentQuestionId || session.submittedAt) return
      const meta = session.questionMeta[currentQuestionId]
      const r = session.responses[currentQuestionId]
      if (!meta?.isCompound || !meta.parts || !r?.compound) return
      const part = meta.parts.find((p) => p.partId === partId)
      if (!part || part.format === 'upload') return
      if (
        part.orGroupId &&
        r.compound.orGroupChoice[part.orGroupId] !== partId
      ) {
        return
      }
      const prev = r.compound.partAnswers[partId] ?? {
        selectedAnswer: null,
        uploadedAnswerImage: null,
        uploadedAnswerFileName: null,
      }
      persist({
        ...session,
        responses: {
          ...session.responses,
          [currentQuestionId]: {
            ...r,
            compound: {
              ...r.compound,
              partAnswers: {
                ...r.compound.partAnswers,
                [partId]: {
                  ...prev,
                  selectedAnswer: optionIndex,
                  uploadedAnswerImage: null,
                  uploadedAnswerFileName: null,
                },
              },
            },
            visited: true,
          },
        },
      })
    },
    [session, currentQuestionId, persist],
  )

  const setCompoundPartUpload = useCallback(
    (partId: string, dataUrl: string, fileName: string | null) => {
      if (!session || !currentQuestionId || session.submittedAt) return
      const meta = session.questionMeta[currentQuestionId]
      const r = session.responses[currentQuestionId]
      if (!meta?.isCompound || !meta.parts || !r?.compound) return
      const part = meta.parts.find((p) => p.partId === partId)
      if (!part || part.format !== 'upload') return
      if (
        part.orGroupId &&
        r.compound.orGroupChoice[part.orGroupId] !== partId
      ) {
        return
      }
      const prev = r.compound.partAnswers[partId] ?? {
        selectedAnswer: null,
        uploadedAnswerImage: null,
        uploadedAnswerFileName: null,
      }
      persist({
        ...session,
        responses: {
          ...session.responses,
          [currentQuestionId]: {
            ...r,
            compound: {
              ...r.compound,
              partAnswers: {
                ...r.compound.partAnswers,
                [partId]: {
                  ...prev,
                  selectedAnswer: null,
                  uploadedAnswerImage: dataUrl,
                  uploadedAnswerFileName: fileName,
                },
              },
            },
            visited: true,
          },
        },
      })
    },
    [session, currentQuestionId, persist],
  )

  const setUploadedAnswerImage = useCallback(
    (dataUrl: string, fileName: string | null) => {
      if (!session || !currentQuestionId || session.submittedAt) return
      const meta = session.questionMeta[currentQuestionId]
      if (meta?.isCompound) return
      const r = session.responses[currentQuestionId]
      if (!r) return
      persist({
        ...session,
        responses: {
          ...session.responses,
          [currentQuestionId]: {
            ...r,
            uploadedAnswerImage: dataUrl,
            uploadedAnswerFileName: fileName,
            // upload questions aren’t MCQ; keep selectedAnswer empty
            selectedAnswer: null,
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
    const meta = session.questionMeta[currentQuestionId]
    const r = session.responses[currentQuestionId]
    if (!r) return
    if (meta?.isCompound && meta.parts) {
      persist({
        ...session,
        responses: {
          ...session.responses,
          [currentQuestionId]: {
            ...r,
            selectedAnswer: null,
            uploadedAnswerImage: null,
            uploadedAnswerFileName: null,
            compound: buildEmptyCompoundState(meta.parts),
            visited: true,
          },
        },
      })
      return
    }
    persist({
      ...session,
      responses: {
        ...session.responses,
        [currentQuestionId]: {
          ...r,
          selectedAnswer: null,
          uploadedAnswerImage: null,
          uploadedAnswerFileName: null,
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
      setUploadedAnswerImage,
      selectCompoundOrGroup,
      selectCompoundPartOption,
      setCompoundPartUpload,
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
      setUploadedAnswerImage,
      selectCompoundOrGroup,
      selectCompoundPartOption,
      setCompoundPartUpload,
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
