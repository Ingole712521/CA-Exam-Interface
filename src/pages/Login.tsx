import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type LoginApiUser = {
  id: number
  loginId: string
  password: string
  name: string
  email: string
  role: 'admin' | 'evaluator' | 'student'
}

export default function Login() {
  const { user, login, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from
    ?.pathname

  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLaunching, setIsLaunching] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isLaunching) return
    if (!loginId.trim() || !password.trim()) {
      setError('Please enter login ID and password.')
      return
    }
    setError('')
    setIsLaunching(true)

    try {
      const normalizedLoginId = loginId.trim()
      const normalizedPassword = password.trim()
      const query = new URLSearchParams({
        loginId: normalizedLoginId,
        password: normalizedPassword,
      })
      const response = await fetch(`http://localhost:3001/users?${query.toString()}`)
      if (!response.ok) {
        throw new Error('Login service unavailable')
      }
      const matchedUsers = (await response.json()) as LoginApiUser[]
      const matchedUser = matchedUsers[0]
      if (!matchedUser) {
        setError('Invalid login ID or password.')
        setIsLaunching(false)
        return
      }
      login({
        email: matchedUser.email,
        name: matchedUser.name,
        role: matchedUser.role,
      })
      window.setTimeout(() => {
        navigate(from || '/dashboard', { replace: true })
      }, 900)
    } catch {
      setError('Unable to reach login server. Start json-server and try again.')
      setIsLaunching(false)
    }
  }

  return (
    <div className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-slate-950 px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-20 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -right-10 bottom-16 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>
      <div className="relative mx-auto w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="mb-1 text-2xl font-semibold text-slate-900 dark:text-white">
          Sign in
        </h1>
        <p className="mb-6 text-sm text-slate-200">
          Online examination portal for CA students. This login now validates credentials
          from local JSON server data.
        </p>
        {user ? (
          <div className="mb-4 rounded-xl border border-amber-200/60 bg-amber-100/10 p-3 text-sm text-amber-100">
            <p>
              Currently signed in as <span className="font-semibold">{user.name}</span> (
              {user.role}). You can switch account by continuing below.
            </p>
            <button
              type="button"
              onClick={logout}
              className="mt-2 text-xs font-semibold text-amber-200 underline-offset-2 hover:underline"
            >
              Clear current session
            </button>
          </div>
        ) : null}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="login-id"
              className="mb-1 block text-sm font-medium text-slate-100"
            >
              Login ID
            </label>
            <input
              id="login-id"
              autoComplete="username"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white shadow-sm outline-none placeholder:text-slate-300 ring-emerald-400/40 focus:ring-2"
            />
          </div>
          <div>
            <label
              htmlFor="login-password"
              className="mb-1 block text-sm font-medium text-slate-100"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white shadow-sm outline-none placeholder:text-slate-300 ring-emerald-400/40 focus:ring-2"
            />
          </div>
          {error && (
            <p className="text-sm text-red-300">{error}</p>
          )}
          <button
            type="submit"
            disabled={isLaunching}
            className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-90"
          >
            <span
              className={`inline-flex items-center gap-2 transition-all duration-700 ${
                isLaunching ? '-translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
              }`}
            >
              Continue to dashboard
            </span>
            <span
              className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 transition-all duration-700 ${
                isLaunching ? '-translate-y-12 opacity-100' : 'translate-y-3 opacity-0'
              }`}
            >
              🚀
            </span>
            <span
              className={`pointer-events-none absolute left-1/2 top-[62%] -translate-x-1/2 text-xs transition-opacity duration-500 ${
                isLaunching ? 'opacity-100' : 'opacity-0'
              }`}
            >
              ✨✨
            </span>
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-200">
          No account?{' '}
          <Link
            to="/signup"
            className="font-medium text-emerald-200 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
