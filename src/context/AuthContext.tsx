import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  clearUser,
  loadUser,
  saveUser,
  type StoredUser,
} from '../utils/examSessionStorage'

type AuthContextValue = {
  user: StoredUser | null
  login: (user: StoredUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(() => loadUser())

  const login = useCallback((u: StoredUser) => {
    saveUser(u)
    setUser(u)
  }, [])

  const logout = useCallback(() => {
    clearUser()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
