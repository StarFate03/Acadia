import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LANGUAGES, UI, TERMS } from './translations.js'
import { GAME_TEXT } from '../data/gameText.js'

const STORAGE_KEY = 'acadia_lang'
const LanguageContext = createContext(null)

function interpolate(str, params) {
  if (!params) return str
  return str.replace(/\{(\w+)\}/g, (m, k) => (k in params ? params[k] : m))
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'en'
    } catch {
      return 'en'
    }
  })

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

  // Reflect the language on <html> (lang + text direction) and persist it.
  useEffect(() => {
    document.documentElement.lang = current.code
    document.documentElement.dir = current.dir || 'ltr'
    try {
      localStorage.setItem(STORAGE_KEY, current.code)
    } catch {
      /* ignore */
    }
  }, [current])

  // Translate a UI key, with {token} interpolation. Falls back to English,
  // then to the raw key.
  const t = useCallback(
    (key, params) => {
      const dict = UI[lang] || UI.en
      const str = dict[key] ?? UI.en[key] ?? key
      return interpolate(str, params)
    },
    [lang],
  )

  // Translate a catalog term (genre / tag / platform), falling back to the
  // original English value.
  const term = useCallback((value) => TERMS[lang]?.[value] ?? value, [lang])

  // Localized game copy (short / description), falling back to the English
  // text stored on the game object itself.
  const gameText = useCallback(
    (game, field) => GAME_TEXT[game.id]?.[lang]?.[field] ?? game[field],
    [lang],
  )

  // Localized price string.
  const price = useCallback(
    (p) => (p === 0 ? t('price.free') : `$${p.toFixed(2)}`),
    [t],
  )

  const value = useMemo(
    () => ({ lang, setLang, t, term, gameText, price }),
    [lang, t, term, gameText, price],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}
