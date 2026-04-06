import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { loadTheme, saveTheme, type ThemeMode } from '../utils/examSessionStorage'

type ThemeContextValue = {
  mode: ThemeMode
  toggle: () => void
  setMode: (m: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyDom(mode: ThemeMode) {
  document.documentElement.classList.toggle('dark', mode === 'dark')
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const saved = loadTheme()
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    applyDom(mode)
    saveTheme(mode)
  }, [mode])

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m)
  }, [])

  const toggle = useCallback(() => {
    setModeState((m) => (m === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({ mode, toggle, setMode }),
    [mode, toggle, setMode],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
