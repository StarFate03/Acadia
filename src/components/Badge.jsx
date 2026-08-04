// Visual badge distinguishing Acadia Originals from Marketplace titles.
// Two clearly different colors so the source of a game is obvious at a glance.

export default function Badge({ type, className = '' }) {
  const isOriginal = type === 'original'
  const styles = isOriginal
    ? 'bg-accent-500/15 text-accent-300 ring-1 ring-inset ring-accent-500/40'
    : 'bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/40'

  return (
    <span
      className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${styles} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isOriginal ? 'bg-accent-400' : 'bg-emerald-400'
        }`}
      />
      {isOriginal ? 'Acadia Original' : 'Marketplace'}
    </span>
  )
}
