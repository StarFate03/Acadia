import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import GameCard from '../components/GameCard.jsx'
import FilterBar, { SORT_OPTIONS } from '../components/FilterBar.jsx'
import { useLang } from '../i18n/LanguageProvider.jsx'
import { GAMES, GENRES } from '../data/games.js'

// Heading + blurb translation keys for each browse variant.
const HEADINGS = {
  all: ['browse.store', 'browse.storeBlurb'],
  original: ['browse.originals', 'browse.originalsBlurb'],
  marketplace: ['browse.marketplace', 'browse.marketplaceBlurb'],
}

// Unique tag list across the catalog, sorted alphabetically.
const ALL_TAGS = [...new Set(GAMES.flatMap((g) => g.tags))].sort()

function matchesPrice(price, bucket) {
  switch (bucket) {
    case 'free':
      return price === 0
    case 'under20':
      return price < 20
    case 'under40':
      return price < 40
    case '40plus':
      return price >= 40
    default:
      return true
  }
}

function sortGames(list, sort) {
  const copy = [...list]
  switch (sort) {
    case 'newest':
      return copy.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price)
    case 'title':
      return copy.sort((a, b) => a.title.localeCompare(b.title))
    case 'featured':
    default:
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured))
  }
}

export default function Browse({ initialType = 'all' }) {
  const { t } = useLang()
  const [searchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [headingKey, blurbKey] = HEADINGS[initialType] || HEADINGS.all

  const [filters, setFilters] = useState({
    type: initialType,
    genre: 'all',
    price: 'all',
    tags: searchParams.get('tag') ? [searchParams.get('tag')] : [],
    sort: searchParams.get('sort') || 'featured',
    q: searchParams.get('q') || '',
  })

  // Keep filters in sync when navigating between /browse, /originals, /marketplace
  // or arriving with new query params (e.g. from search or a tag link).
  useEffect(() => {
    setFilters((f) => ({
      ...f,
      type: initialType,
      q: searchParams.get('q') || '',
      sort: searchParams.get('sort') || f.sort,
      tags: searchParams.get('tag') ? [searchParams.get('tag')] : f.tags,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialType, searchParams])

  const results = useMemo(() => {
    const q = filters.q.trim().toLowerCase()
    const filtered = GAMES.filter((g) => {
      if (filters.type !== 'all' && g.type !== filters.type) return false
      if (filters.genre !== 'all' && !g.genres.includes(filters.genre)) return false
      if (!matchesPrice(g.price, filters.price)) return false
      if (filters.tags.length && !filters.tags.every((t) => g.tags.includes(t)))
        return false
      if (q) {
        const hay = `${g.title} ${g.publisher} ${g.genres.join(' ')} ${g.tags.join(
          ' ',
        )}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
    return sortGames(filtered, filters.sort)
  }, [filters])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-white sm:text-3xl">{t(headingKey)}</h1>
        <p className="mt-1 text-slate-400">{t(blurbKey)}</p>
        {filters.q && (
          <p className="mt-2 text-sm text-slate-400">
            {t('browse.showingFor')}{' '}
            <span className="font-medium text-slate-200">“{filters.q}”</span>
          </p>
        )}
      </div>

      {/* Sort + mobile filter toggle */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setShowFilters((s) => !s)}
          className="btn-ghost lg:hidden"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M3 5a1 1 0 011-1h12a1 1 0 010 2H4a1 1 0 01-1-1zm2 5a1 1 0 011-1h8a1 1 0 010 2H6a1 1 0 01-1-1zm3 5a1 1 0 011-1h2a1 1 0 010 2H9a1 1 0 01-1-1z" />
          </svg>
          {t('browse.filters')}
        </button>

        <label className="ml-auto flex items-center gap-2 text-sm text-slate-400">
          {t('browse.sortBy')}
          <select
            value={filters.sort}
            onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
            className="rounded-md border border-ink-600 bg-ink-800 px-2 py-1.5 text-sm text-slate-200 focus:border-accent-500 focus:outline-none"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {t(o.key)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Sidebar filters */}
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="lg:sticky lg:top-20">
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              genres={GENRES}
              tags={ALL_TAGS}
              resultCount={results.length}
            />
          </div>
        </aside>

        {/* Results grid */}
        <div>
          {results.length === 0 ? (
            <div className="rounded-xl border border-dashed border-ink-600 bg-ink-800/40 py-24 text-center">
              <p className="text-lg font-semibold text-white">{t('browse.noResults.title')}</p>
              <p className="mt-1 text-sm text-slate-400">{t('browse.noResults.body')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {results.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
