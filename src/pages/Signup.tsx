import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !name.trim()) {
      setError('Please fill all fields.')
      return
    }
    setError('')
    login({ email: email.trim(), name: name.trim() })
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="flex min-h-svh flex-col justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-900">
        <h1 className="mb-1 text-2xl font-semibold text-slate-900 dark:text-white">
          Create account
        </h1>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
          Details are stored only in this browser (localStorage).
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="signup-name"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Full name
            </label>
            <input
              id="signup-name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-emerald-500/30 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="signup-email"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-emerald-500/30 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            Sign up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
