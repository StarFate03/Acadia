import { useMemo, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Artwork from '../components/Artwork.jsx'
import Badge from '../components/Badge.jsx'
import { getGameById, formatPrice } from '../data/games.js'

function ReqColumn({ title, reqs }) {
  const rows = [
    ['OS', reqs.os],
    ['Processor', reqs.cpu],
    ['Memory', reqs.ram],
    ['Graphics', reqs.gpu],
    ['Storage', reqs.storage],
  ]
  return (
    <div className="rounded-lg border border-ink-600/60 bg-ink-800/50 p-4">
      <h4 className="mb-3 text-sm font-semibold text-white">{title}</h4>
      <dl className="space-y-2 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <dt className="shrink-0 text-slate-500">{k}</dt>
            <dd className="text-right text-slate-300">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function GameDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const game = getGameById(id)
  const [shot, setShot] = useState(0)

  // Deterministic screenshot set derived from the game id.
  const screenshots = useMemo(
    () => (game ? Array.from({ length: 4 }, (_, i) => `${game.id}-shot-${i}`) : []),
    [game],
  )

  if (!game) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-white">Game not found</h1>
        <p className="mt-2 text-slate-400">
          We couldn’t find that title in the catalog.
        </p>
        <Link to="/browse" className="btn-accent mt-6">
          Back to Store
        </Link>
      </div>
    )
  }

  const isFree = game.price === 0
  const playable = Boolean(game.playable)

  const handlePrimary = () => {
    if (playable) navigate(`/play/${game.id}`)
    else navigate(`/checkout/${game.id}`)
  }

  return (
    <div className="pb-10">
      {/* Banner */}
      <div className="relative">
        <div className="relative h-56 w-full sm:h-72 lg:h-96">
          <Artwork hue={game.hue} seed={`${game.id}-banner`} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-transparent" />
        </div>
      </div>

      <div className="mx-auto -mt-16 max-w-7xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-slate-400">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-1.5 text-slate-600">/</span>
          <Link
            to={game.type === 'original' ? '/originals' : '/marketplace'}
            className="hover:text-white"
          >
            {game.type === 'original' ? 'Originals' : 'Marketplace'}
          </Link>
          <span className="mx-1.5 text-slate-600">/</span>
          <span className="text-slate-300">{game.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: gallery + description */}
          <div className="lg:col-span-2">
            {/* Screenshot gallery */}
            <div className="overflow-hidden rounded-xl border border-ink-600/60 bg-ink-800">
              <Artwork
                key={shot}
                hue={game.hue}
                seed={screenshots[shot]}
                className="aspect-video w-full animate-fade-in"
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {screenshots.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setShot(i)}
                  aria-label={`View screenshot ${i + 1}`}
                  className={`overflow-hidden rounded-lg ring-2 transition ${
                    i === shot ? 'ring-accent-500' : 'ring-transparent hover:ring-ink-500'
                  }`}
                >
                  <Artwork hue={game.hue} seed={s} className="aspect-video w-full" />
                </button>
              ))}
            </div>

            {/* About */}
            <div className="mt-8">
              <h2 className="text-lg font-bold text-white">About this game</h2>
              <p className="mt-3 leading-relaxed text-slate-300">{game.description}</p>
            </div>

            {/* Tags */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Tags
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {game.tags.map((t) => (
                  <Link
                    key={t}
                    to={`/browse?tag=${encodeURIComponent(t)}`}
                    className="rounded-full bg-ink-700 px-3 py-1 text-xs text-slate-300 hover:bg-ink-600 hover:text-white"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>

            {/* System requirements */}
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-bold text-white">System Requirements</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <ReqColumn title="Minimum" reqs={game.reqs.minimum} />
                <ReqColumn title="Recommended" reqs={game.reqs.recommended} />
              </div>
            </div>
          </div>

          {/* Right: purchase panel */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-20 space-y-4 rounded-xl border border-ink-600/60 bg-ink-800 p-5">
              <div className="flex items-center gap-2">
                <Badge type={game.type} />
              </div>
              <h1 className="text-2xl font-extrabold text-white">{game.title}</h1>
              <p className="text-sm text-slate-400">{game.short}</p>

              <dl className="space-y-1.5 border-y border-ink-600/60 py-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Publisher</dt>
                  <dd className="text-slate-300">{game.publisher}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Release date</dt>
                  <dd className="text-slate-300">
                    {new Date(game.releaseDate).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Genres</dt>
                  <dd className="text-right text-slate-300">{game.genres.join(', ')}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Platforms</dt>
                  <dd className="text-right text-slate-300">{game.platforms.join(', ')}</dd>
                </div>
              </dl>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Price</span>
                <span className="text-2xl font-bold text-white">
                  {formatPrice(game.price)}
                </span>
              </div>

              <button
                type="button"
                onClick={handlePrimary}
                className="btn-accent w-full py-3 text-base"
              >
                {playable ? '▶ Play Now' : isFree ? 'Get Now' : 'Buy Now'}
              </button>
              {playable && (
                <p className="text-center text-xs text-slate-500">
                  Plays right here in your browser — free, no download.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
