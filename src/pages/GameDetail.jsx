import { useMemo, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Artwork from '../components/Artwork.jsx'
import Badge from '../components/Badge.jsx'
import { useLang } from '../i18n/LanguageProvider.jsx'
import { getGameById } from '../data/games.js'

function ReqColumn({ title, reqs }) {
  const { t } = useLang()
  const rows = [
    [t('req.os'), reqs.os],
    [t('req.cpu'), reqs.cpu],
    [t('req.ram'), reqs.ram],
    [t('req.gpu'), reqs.gpu],
    [t('req.storage'), reqs.storage],
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
  const { t, term, price, gameText, lang } = useLang()
  const { id } = useParams()
  const navigate = useNavigate()
  const game = getGameById(id)
  const [shot, setShot] = useState(0)

  // Deterministic screenshot set derived from the game id.
  // Use real screenshots when the game provides them; otherwise generate.
  const realShots = game?.screenshots?.length ? game.screenshots : null
  const screenshots = useMemo(
    () =>
      realShots ?? (game ? Array.from({ length: 4 }, (_, i) => `${game.id}-shot-${i}`) : []),
    [game, realShots],
  )

  if (!game) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-white">{t('detail.notFound')}</h1>
        <p className="mt-2 text-slate-400">{t('detail.notFoundBody')}</p>
        <Link to="/browse" className="btn-accent mt-6">
          {t('detail.backToStore')}
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
          <Artwork
            hue={game.hue}
            seed={`${game.id}-banner`}
            src={game.cover}
            alt={game.title}
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-transparent" />
        </div>
      </div>

      <div className="mx-auto -mt-16 max-w-7xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-slate-400">
          <Link to="/" className="hover:text-white">
            {t('breadcrumb.home')}
          </Link>
          <span className="mx-1.5 text-slate-600">/</span>
          <Link
            to={game.type === 'original' ? '/originals' : '/marketplace'}
            className="hover:text-white"
          >
            {game.type === 'original' ? t('nav.originals') : t('nav.marketplace')}
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
                seed={realShots ? undefined : screenshots[shot]}
                src={realShots ? screenshots[shot] : undefined}
                alt={`${game.title} screenshot ${shot + 1}`}
                className="aspect-video w-full animate-fade-in"
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {screenshots.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setShot(i)}
                  aria-label={`View screenshot ${i + 1}`}
                  className={`overflow-hidden rounded-lg ring-2 transition ${
                    i === shot ? 'ring-accent-500' : 'ring-transparent hover:ring-ink-500'
                  }`}
                >
                  <Artwork
                    hue={game.hue}
                    seed={realShots ? undefined : s}
                    src={realShots ? s : undefined}
                    alt={`${game.title} thumbnail ${i + 1}`}
                    className="aspect-video w-full"
                  />
                </button>
              ))}
            </div>

            {/* About */}
            <div className="mt-8">
              <h2 className="text-lg font-bold text-white">{t('detail.about')}</h2>
              <p className="mt-3 leading-relaxed text-slate-300">{gameText(game, 'description')}</p>
            </div>

            {/* Tags */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                {t('detail.tags')}
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/browse?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full bg-ink-700 px-3 py-1 text-xs text-slate-300 hover:bg-ink-600 hover:text-white"
                  >
                    {term(tag)}
                  </Link>
                ))}
              </div>
            </div>

            {/* System requirements */}
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-bold text-white">{t('detail.sysreq')}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <ReqColumn title={t('detail.min')} reqs={game.reqs.minimum} />
                <ReqColumn title={t('detail.recommended')} reqs={game.reqs.recommended} />
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
              <p className="text-sm text-slate-400">{gameText(game, 'short')}</p>

              <dl className="space-y-1.5 border-y border-ink-600/60 py-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">{t('detail.publisher')}</dt>
                  <dd className="text-slate-300">{game.publisher}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">{t('detail.releaseDate')}</dt>
                  <dd className="text-slate-300">
                    {new Date(game.releaseDate).toLocaleDateString(lang, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">{t('detail.genres')}</dt>
                  <dd className="text-right text-slate-300">{game.genres.map(term).join(', ')}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">{t('detail.platforms')}</dt>
                  <dd className="text-right text-slate-300">{game.platforms.map(term).join(', ')}</dd>
                </div>
              </dl>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{t('detail.price')}</span>
                <span className="text-2xl font-bold text-white">{price(game.price)}</span>
              </div>

              <button
                type="button"
                onClick={handlePrimary}
                className="btn-accent w-full py-3 text-base"
              >
                {playable ? t('detail.playNow') : isFree ? t('detail.getNow') : t('detail.buyNow')}
              </button>
              {playable && (
                <p className="text-center text-xs text-slate-500">{t('detail.playsHere')}</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
