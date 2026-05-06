import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isLaunching, setIsLaunching] = useState(false)

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isLaunching) return
    if (!email.trim() || !name.trim()) {
      setError('Please fill all fields.')
      return
    }
    setError('')
    setIsLaunching(true)
    login({ email: email.trim(), name: name.trim(), role: 'student' })
    window.setTimeout(() => {
      navigate('/dashboard', { replace: true })
    }, 900)
  }

  return (
    <div className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-slate-950 px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-20 h-48 w-48 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="absolute -right-10 bottom-16 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>
      <div className="relative mx-auto w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="mb-1 text-2xl font-semibold text-slate-900 dark:text-white">
          Create account
        </h1>
        <p className="mb-6 text-sm text-slate-200">
          In the full system, registration is approved by an administrator before you
          can sign in. This demo stores your details only in this browser
          (localStorage).
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="signup-name"
              className="mb-1 block text-sm font-medium text-slate-100"
            >
              Full name
            </label>
            <input
              id="signup-name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white shadow-sm outline-none placeholder:text-slate-300 ring-emerald-400/40 focus:ring-2"
            />
          </div>
          <div>
            <label
              htmlFor="signup-email"
              className="mb-1 block text-sm font-medium text-slate-100"
            >
              Email
            </label>
            <input
              id="signup-email"
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
            className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-90"
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
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-emerald-200 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
