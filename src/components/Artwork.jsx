// Deterministic, self-contained placeholder artwork.
// Generates a gradient + geometric shapes from a `hue` and `seed` string,
// so the app needs no external image assets or network requests.

function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

// A tiny seeded PRNG (mulberry32) for repeatable shape layouts.
function rng(seedInt) {
  let a = seedInt
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function Artwork({
  hue = 210,
  seed = 'acadia',
  label,
  showLabel = false,
  className = '',
  rounded = 'rounded-none',
}) {
  const r = rng(hash(seed))
  const gid = `g-${hash(seed + hue).toString(36)}`

  // Two-stop diagonal gradient anchored on the game's hue.
  const c1 = `hsl(${hue}, 55%, 22%)`
  const c2 = `hsl(${(hue + 40) % 360}, 60%, 12%)`
  const glow = `hsl(${hue}, 85%, 60%)`

  // A few decorative blobs/rings placed deterministically.
  const shapes = Array.from({ length: 5 }, () => ({
    cx: 10 + r() * 80,
    cy: 10 + r() * 80,
    rad: 6 + r() * 26,
    op: 0.06 + r() * 0.14,
    ring: r() > 0.5,
  }))

  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
          <radialGradient id={`${gid}-glow`} cx="30%" cy="20%" r="70%">
            <stop offset="0%" stopColor={glow} stopOpacity="0.28" />
            <stop offset="100%" stopColor={glow} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#${gid})`} />
        <rect width="100" height="100" fill={`url(#${gid}-glow)`} />
        {shapes.map((s, i) =>
          s.ring ? (
            <circle
              key={i}
              cx={s.cx}
              cy={s.cy}
              r={s.rad}
              fill="none"
              stroke="#fff"
              strokeWidth="0.6"
              opacity={s.op}
            />
          ) : (
            <circle key={i} cx={s.cx} cy={s.cy} r={s.rad} fill="#fff" opacity={s.op} />
          ),
        )}
      </svg>

      {showLabel && label && (
        <div className="absolute inset-0 flex items-end p-3">
          <span className="text-sm font-semibold text-white/90 drop-shadow">
            {label}
          </span>
        </div>
      )}
    </div>
  )
}
