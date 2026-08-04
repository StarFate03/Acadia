import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Artwork from './Artwork.jsx'
import Badge from './Badge.jsx'
import { formatPrice } from '../data/games.js'

// Rotating featured-game hero banner with auto-advance + manual controls.
export default function HeroCarousel({ games, interval = 6000 }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = games.length

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count])

  useEffect(() => {
    if (paused || count <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), interval)
    return () => clearInterval(id)
  }, [paused, count, interval])

  if (!count) return null
  const game = games[index]

  return (
    <section
      className="mx-auto w-full max-w-7xl px-4 sm:px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl ring-1 ring-ink-600/70">
        <Link to={`/game/${game.id}`} className="block">
          <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
            <Artwork
              key={game.id}
              hue={game.hue}
              seed={game.id + '-hero'}
              src={game.cover}
              alt={game.title}
              className="h-full w-full animate-fade-in"
            />
            {/* Readability gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 lg:p-10">
              <div className="max-w-xl animate-fade-up">
                <div className="mb-3 flex items-center gap-2">
                  <Badge type={game.type} />
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-300">
                    Featured
                  </span>
                </div>
                <h1 className="text-2xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                  {game.title}
                </h1>
                <p className="mt-2 line-clamp-2 max-w-lg text-sm text-slate-300 sm:text-base">
                  {game.short}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="btn-accent pointer-events-none">
                    View game
                  </span>
                  <span className="text-lg font-semibold text-white">
                    {formatPrice(game.price)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Prev / next */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous featured game"
              className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink-900/70 text-white backdrop-blur hover:bg-ink-800 sm:flex"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next featured game"
              className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink-900/70 text-white backdrop-blur hover:bg-ink-800 sm:flex"
            >
              ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 right-5 flex gap-1.5">
              {games.map((g, i) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to featured game ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-6 bg-accent-500' : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
