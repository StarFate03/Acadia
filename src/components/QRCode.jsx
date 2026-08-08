// A dummy, non-functional QR-style graphic for the demo checkout.
// It looks like a QR code (finder patterns + random modules) but encodes
// nothing — it is purely decorative for the Alipay / WeChat Pay mockups.

function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

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

const N = 25 // modules per side

// True where (r,c) falls inside one of the three 7×7 finder patterns
// (top-left, top-right, bottom-left) or its 1-module separator.
function inFinderZone(r, c) {
  const zones = [
    [0, 0],
    [0, N - 7],
    [N - 7, 0],
  ]
  return zones.some(([zr, zc]) => r >= zr - 1 && r <= zr + 7 && c >= zc - 1 && c <= zc + 7)
}

function finderModule(r, c) {
  // Returns true if this cell is dark, for a finder pattern anchored at (zr,zc).
  const zones = [
    [0, 0],
    [0, N - 7],
    [N - 7, 0],
  ]
  for (const [zr, zc] of zones) {
    if (r >= zr && r < zr + 7 && c >= zc && c < zc + 7) {
      const rr = r - zr
      const cc = c - zc
      const border = rr === 0 || rr === 6 || cc === 0 || cc === 6
      const core = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4
      return border || core
    }
  }
  return false
}

export default function QRCode({ value = 'demo', size = 176, className = '' }) {
  const rand = rng(hash(value))
  const cells = []
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      let dark
      if (inFinderZone(r, c)) dark = finderModule(r, c)
      else dark = rand() > 0.5
      if (dark) cells.push([c, r])
    }
  }

  const quiet = 2
  const dim = N + quiet * 2

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${dim} ${dim}`}
      className={className}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Payment QR code (demo)"
    >
      <rect width={dim} height={dim} fill="#ffffff" />
      {cells.map(([c, r], i) => (
        <rect key={i} x={c + quiet} y={r + quiet} width={1} height={1} fill="#0a0a0d" />
      ))}
    </svg>
  )
}
