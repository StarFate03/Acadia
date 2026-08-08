import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import LanguageSelector from './LanguageSelector.jsx'

const navLinks = [
  { to: '/browse', label: 'Store' },
  { to: '/originals', label: 'Originals' },
  { to: '/marketplace', label: 'Marketplace' },
]

export default function Header() {
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const submitSearch = (e) => {
    e.preventDefault()
    navigate(`/browse?q=${encodeURIComponent(query.trim())}`)
    setMobileOpen(false)
  }

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-white' : 'text-slate-300 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-ink-600/70 bg-ink-900/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Wordmark (text-based for now) */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-accent-500 text-sm font-black text-white">
            A
          </span>
          <span className="text-lg font-extrabold tracking-tight text-white">
            ACADIA
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="ml-4 hidden items-center gap-5 md:flex">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Search + language */}
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <form onSubmit={submitSearch}>
            <div className="relative">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search games…"
                aria-label="Search games"
                className="w-40 rounded-md border border-ink-600 bg-ink-800 py-1.5 pl-8 pr-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-accent-500 focus:outline-none lg:w-56"
              />
              <svg
                className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.45 4.39l3.08 3.08a1 1 0 01-1.42 1.42l-3.08-3.08A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </form>
          <LanguageSelector />
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="ml-auto grid h-9 w-9 place-items-center rounded-md text-slate-200 hover:bg-ink-700 md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-ink-600/70 bg-ink-900 px-4 py-3 md:hidden">
          <form onSubmit={submitSearch} className="mb-3">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search games…"
              aria-label="Search games"
              className="w-full rounded-md border border-ink-600 bg-ink-800 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-accent-500 focus:outline-none"
            />
          </form>
          <nav className="flex flex-col">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-2 py-2 text-sm font-medium ${
                    isActive ? 'bg-ink-700 text-white' : 'text-slate-300 hover:bg-ink-800'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-3 border-t border-ink-600/70 pt-3">
            <span className="mb-1.5 block text-xs font-medium text-slate-500">Language</span>
            <LanguageSelector />
          </div>
        </div>
      )}
    </header>
  )
}
