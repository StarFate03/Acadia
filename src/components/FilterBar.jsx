import { useLang } from '../i18n/LanguageProvider.jsx'

// Presentational, controlled filter/sort panel for the Browse page.
// All state lives in the parent; this just renders controls and calls setters.

const TYPE_OPTIONS = [
  { value: 'all', key: 'filter.allTitles' },
  { value: 'original', key: 'browse.originals' },
  { value: 'marketplace', key: 'nav.marketplace' },
]

const PRICE_OPTIONS = [
  { value: 'all', key: 'filter.anyPrice' },
  { value: 'free', key: 'price.free' },
  { value: 'under20', key: 'filter.under20' },
  { value: 'under40', key: 'filter.under40' },
  { value: '40plus', key: 'filter.40plus' },
]

export const SORT_OPTIONS = [
  { value: 'featured', key: 'sort.featured' },
  { value: 'newest', key: 'sort.newest' },
  { value: 'price-asc', key: 'sort.priceAsc' },
  { value: 'price-desc', key: 'sort.priceDesc' },
  { value: 'title', key: 'sort.title' },
]

function Section({ title, children }) {
  return (
    <div className="border-b border-ink-600/60 py-4 first:pt-0">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </h3>
      {children}
    </div>
  )
}

export default function FilterBar({ filters, setFilters, genres, tags, resultCount }) {
  const { t, term } = useLang()

  const update = (patch) => setFilters((f) => ({ ...f, ...patch }))

  const toggleTag = (tag) =>
    setFilters((f) => ({
      ...f,
      tags: f.tags.includes(tag)
        ? f.tags.filter((t) => t !== tag)
        : [...f.tags, tag],
    }))

  const reset = () =>
    setFilters({ type: 'all', genre: 'all', price: 'all', tags: [], sort: 'featured', q: '' })

  const hasActive =
    filters.type !== 'all' ||
    filters.genre !== 'all' ||
    filters.price !== 'all' ||
    filters.tags.length > 0 ||
    filters.q

  return (
    <div className="rounded-xl border border-ink-600/60 bg-ink-800/50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-slate-400">{t('browse.count', { n: resultCount })}</span>
        {hasActive && (
          <button
            type="button"
            onClick={reset}
            className="text-xs font-medium text-accent-300 hover:text-accent-200"
          >
            {t('browse.clearAll')}
          </button>
        )}
      </div>

      <Section title={t('filter.type')}>
        <div className="flex flex-col gap-1.5">
          {TYPE_OPTIONS.map((o) => (
            <label key={o.value} className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
              <input
                type="radio"
                name="type"
                checked={filters.type === o.value}
                onChange={() => update({ type: o.value })}
                className="accent-accent-500"
              />
              {t(o.key)}
            </label>
          ))}
        </div>
      </Section>

      <Section title={t('filter.genre')}>
        <select
          value={filters.genre}
          onChange={(e) => update({ genre: e.target.value })}
          className="w-full rounded-md border border-ink-600 bg-ink-800 px-2 py-1.5 text-sm text-slate-200 focus:border-accent-500 focus:outline-none"
        >
          <option value="all">{t('filter.allGenres')}</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {term(g)}
            </option>
          ))}
        </select>
      </Section>

      <Section title={t('filter.price')}>
        <div className="flex flex-col gap-1.5">
          {PRICE_OPTIONS.map((o) => (
            <label key={o.value} className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
              <input
                type="radio"
                name="price"
                checked={filters.price === o.value}
                onChange={() => update({ price: o.value })}
                className="accent-accent-500"
              />
              {t(o.key)}
            </label>
          ))}
        </div>
      </Section>

      <Section title={t('filter.tags')}>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => {
            const active = filters.tags.includes(tag)
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                  active
                    ? 'bg-accent-500 text-white'
                    : 'bg-ink-700 text-slate-300 hover:bg-ink-600'
                }`}
              >
                {term(tag)}
              </button>
            )
          })}
        </div>
      </Section>
    </div>
  )
}
