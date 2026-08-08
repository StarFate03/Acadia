import { Link, useParams } from 'react-router-dom'
import Minesweeper from '../components/Minesweeper.jsx'
import Badge from '../components/Badge.jsx'
import { useLang } from '../i18n/LanguageProvider.jsx'
import { getGameById } from '../data/games.js'

// Registry of playable in-browser titles → their game component.
const PLAYABLE = {
  'nova-sweeper': Minesweeper,
}

export default function Play() {
  const { t } = useLang()
  const { id } = useParams()
  const game = getGameById(id)
  const Game = PLAYABLE[id]

  if (!game || !Game) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-white">{t('play.notPlayable.title')}</h1>
        <p className="mt-2 text-slate-400">{t('play.notPlayable.body')}</p>
        <Link to="/browse" className="btn-accent mt-6">
          {t('detail.backToStore')}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <nav className="mb-1 text-sm text-slate-400">
            <Link to="/" className="hover:text-white">
              {t('breadcrumb.home')}
            </Link>
            <span className="mx-1.5 text-slate-600">/</span>
            <Link to={`/game/${game.id}`} className="hover:text-white">
              {game.title}
            </Link>
            <span className="mx-1.5 text-slate-600">/</span>
            <span className="text-slate-300">{t('play.play')}</span>
          </nav>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-white">{game.title}</h1>
            <Badge type={game.type} />
          </div>
          <p className="mt-1 text-sm text-slate-400">{t('play.by', { publisher: game.publisher })}</p>
        </div>
        <Link to={`/game/${game.id}`} className="btn-ghost">
          {t('play.back')}
        </Link>
      </div>

      <div className="rounded-2xl border border-ink-600/60 bg-ink-800/40 p-4 sm:p-8">
        <Game />
      </div>
    </div>
  )
}
