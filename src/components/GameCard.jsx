import { Link } from 'react-router-dom'
import Artwork from './Artwork.jsx'
import Badge from './Badge.jsx'
import { formatPrice } from '../data/games.js'

// A single game tile used in rows and grids.
// `w` lets callers set a fixed width for horizontal carousels.
export default function GameCard({ game, className = '' }) {
  return (
    <Link
      to={`/game/${game.id}`}
      className={`group block overflow-hidden rounded-lg bg-ink-800 shadow-card ring-1 ring-ink-600/60
                  transition duration-200 ease-out hover:-translate-y-1 hover:shadow-card-hover
                  hover:ring-accent-500/40 ${className}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Artwork
          hue={game.hue}
          seed={game.id}
          className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-105"
        />
        <div className="absolute left-2 top-2">
          <Badge type={game.type} />
        </div>
        {game.price === 0 && (
          <div className="absolute right-2 top-2 rounded bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
            Free
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="truncate font-semibold text-slate-100 group-hover:text-white">
          {game.title}
        </h3>
        <p className="mt-0.5 truncate text-xs text-slate-400">{game.publisher}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1 overflow-hidden">
            {game.genres.slice(0, 2).map((g) => (
              <span
                key={g}
                className="rounded bg-ink-700 px-1.5 py-0.5 text-[10px] text-slate-300"
              >
                {g}
              </span>
            ))}
          </div>
          <span className="shrink-0 text-sm font-semibold text-slate-100">
            {formatPrice(game.price)}
          </span>
        </div>
      </div>
    </Link>
  )
}
