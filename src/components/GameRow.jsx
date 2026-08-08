import { useRef } from 'react'
import { Link } from 'react-router-dom'
import GameCard from './GameCard.jsx'
import { useLang } from '../i18n/LanguageProvider.jsx'

// A titled, horizontally-scrolling row of game cards with arrow controls.
export default function GameRow({ title, subtitle, games, moreTo }) {
  const { t } = useLang()
  const scroller = useRef(null)

  const scrollBy = (dir) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  if (!games?.length) return null

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {moreTo && (
            <Link
              to={moreTo}
              className="text-sm font-medium text-accent-300 hover:text-accent-200"
            >
              {t('common.viewAll')}
            </Link>
          )}
          <div className="hidden gap-1 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="btn-ghost h-8 w-8 rounded-full p-0"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="btn-ghost h-8 w-8 rounded-full p-0"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
      >
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            className="w-40 shrink-0 snap-start sm:w-48"
          />
        ))}
      </div>
    </section>
  )
}
