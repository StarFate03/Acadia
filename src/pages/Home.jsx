import HeroCarousel from '../components/HeroCarousel.jsx'
import GameRow from '../components/GameRow.jsx'
import { useLang } from '../i18n/LanguageProvider.jsx'
import {
  getFeatured,
  getOriginals,
  getMarketplace,
  getNewReleases,
  getTrending,
} from '../data/games.js'

export default function Home() {
  const { t } = useLang()
  const featured = getFeatured()
  const originals = getOriginals()
  const marketplace = getMarketplace()
  const newReleases = getNewReleases()
  const trending = getTrending()

  return (
    <div className="space-y-12 py-6">
      {/* Hero */}
      <div>
        <div className="mx-auto mb-4 max-w-7xl px-4 sm:px-6">
          <h1 className="text-sm font-medium uppercase tracking-widest text-accent-300">
            {t('home.tagline')}
          </h1>
        </div>
        <HeroCarousel games={featured} />
      </div>

      {/* Acadia Originals */}
      <GameRow
        title={t('home.originals.title')}
        subtitle={t('home.originals.subtitle')}
        games={originals}
        moreTo="/originals"
      />

      {/* Marketplace — clearly separated + labeled */}
      <div className="border-t border-ink-600/40 pt-12">
        <div className="mx-auto mb-1 max-w-7xl px-4 sm:px-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {t('home.marketplace.tag')}
          </span>
        </div>
        <GameRow
          title={t('home.marketplace.title')}
          subtitle={t('home.marketplace.subtitle')}
          games={marketplace}
          moreTo="/marketplace"
        />
      </div>

      {/* New Releases */}
      <GameRow
        title={t('home.new.title')}
        subtitle={t('home.new.subtitle')}
        games={newReleases}
        moreTo="/browse?sort=newest"
      />

      {/* Trending */}
      <GameRow
        title={t('home.trending.title')}
        subtitle={t('home.trending.subtitle')}
        games={trending}
        moreTo="/browse"
      />
    </div>
  )
}
