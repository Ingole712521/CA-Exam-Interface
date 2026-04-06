import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const linkClass =
  'rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
const activeClass = 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'

export function AppHeader() {
  const { user, logout } = useAuth()
  const { mode, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          to="/dashboard"
          className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white"
        >
          CA Exam<span className="text-emerald-600 dark:text-emerald-400">Lab</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ''}`
            }
          >
            Dashboard
          </NavLink>
          <button
            type="button"
            onClick={toggle}
            className={linkClass}
            title="Toggle theme"
            aria-label="Toggle dark mode"
          >
            {mode === 'dark' ? 'Light' : 'Dark'}
          </button>
          {user && (
            <>
              <span className="hidden px-2 text-sm text-slate-500 sm:inline dark:text-slate-400">
                {user.name}
              </span>
              <button type="button" onClick={logout} className={linkClass}>
                Log out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
