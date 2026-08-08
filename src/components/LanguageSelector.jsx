import { useEffect, useRef, useState } from 'react'
import { LANGUAGES } from '../i18n/translations.js'
import { useLang } from '../i18n/LanguageProvider.jsx'

export default function LanguageSelector({ className = '' }) {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('lang.change')}
        className="flex items-center gap-1.5 rounded-md border border-ink-600 bg-ink-800 px-2.5 py-1.5 text-sm text-slate-200 hover:bg-ink-700"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4 text-slate-400" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.3 8h2.06c.14-1.2.4-2.3.77-3.2A6.02 6.02 0 004.3 8zm0 2a6.02 6.02 0 002.83 3.2c-.36-.9-.63-2-.77-3.2H4.3zM10 3.6c.6.72 1.15 2.1 1.36 4.4H8.64C8.85 5.7 9.4 4.32 10 3.6zm0 12.8c-.6-.72-1.15-2.1-1.36-4.4h2.72c-.21 2.3-.76 3.68-1.36 4.4zM13.64 8h2.06a6.02 6.02 0 00-2.83-3.2c.36.9.63 2 .77 3.2zm0 2c-.14 1.2-.4 2.3-.77 3.2A6.02 6.02 0 0015.7 10h-2.06z" clipRule="evenodd" />
        </svg>
        <span className="hidden sm:inline">{current.native}</span>
        <span className="sm:hidden">{current.flag}</span>
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-slate-500" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 max-h-80 w-56 overflow-auto rounded-lg border border-ink-600 bg-ink-800 p-1 shadow-card-hover"
        >
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === lang}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm ${
                  l.code === lang ? 'bg-ink-700 text-white' : 'text-slate-300 hover:bg-ink-700/60'
                }`}
              >
                <span className="text-base leading-none">{l.flag}</span>
                <span className="flex-1">{l.native}</span>
                <span className="text-xs text-slate-500">{l.label}</span>
                {l.code === lang && (
                  <svg viewBox="0 0 20 20" className="h-4 w-4 text-accent-400" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 111.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
