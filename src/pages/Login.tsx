import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function resolveRole(email: string, name: string): 'admin' | 'evaluator' | 'student' {
  const emailText = email.toLowerCase()
  const nameText = name.toLowerCase()
  const combined = `${emailText} ${nameText}`
  if (combined.includes('admin')) return 'admin'
  if (combined.includes('evaluator') || combined.includes('eval')) return 'evaluator'
  return 'student'
}

export default function Login() {
  const { user, login, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from
    ?.pathname

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isLaunching, setIsLaunching] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isLaunching) return
    if (!email.trim() || !name.trim()) {
      setError('Please enter your name and email.')
      return
    }
    setError('')
    setIsLaunching(true)
    const normalizedEmail = email.trim()
    const normalizedName = name.trim()
    login({
      email: normalizedEmail,
      name: normalizedName,
      role: resolveRole(normalizedEmail, normalizedName),
    })
    window.setTimeout(() => {
      navigate(from || '/dashboard', { replace: true })
    }, 900)
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
          Online examination portal for CA students — local demo (no server). Admin
          approval is skipped here. Role is inferred from credentials: use{' '}
          <span className="font-semibold">admin</span> or{' '}
          <span className="font-semibold">evaluator</span> in name/email for those dashboards;
          otherwise student mode opens.
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
              htmlFor="login-name"
              className="mb-1 block text-sm font-medium text-slate-100"
            >
              Full name
            </label>
            <input
              id="login-name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white shadow-sm outline-none placeholder:text-slate-300 ring-emerald-400/40 focus:ring-2"
            />
          </div>
          <div>
            <label
              htmlFor="login-email"
              className="mb-1 block text-sm font-medium text-slate-100"
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
