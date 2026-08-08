import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Artwork from '../components/Artwork.jsx'
import Badge from '../components/Badge.jsx'
import QRCode from '../components/QRCode.jsx'
import { getGameById, formatPrice } from '../data/games.js'

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit Card', badge: '💳', badgeClass: 'bg-ink-700' },
  { id: 'unionpay', label: 'UnionPay', badge: '银联', badgeClass: 'bg-red-600 text-white text-[10px]' },
  { id: 'alipay', label: 'Alipay', badge: '支', badgeClass: 'bg-sky-500 text-white' },
  { id: 'wechat', label: 'WeChat Pay', badge: '微', badgeClass: 'bg-green-500 text-white' },
]

function Field({ label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-slate-400">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-md border border-ink-600 bg-ink-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:border-accent-500 focus:outline-none'

export default function Checkout() {
  const { id } = useParams()
  const game = getGameById(id)
  const [done, setDone] = useState(false)
  const [method, setMethod] = useState('card')
  const [orderNo] = useState(
    () => 'AC-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
  )

  if (!game) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-white">Item not found</h1>
        <Link to="/browse" className="btn-accent mt-6">
          Back to Store
        </Link>
      </div>
    )
  }

  const isFree = game.price === 0
  const tax = +(game.price * 0.0).toFixed(2) // no tax applied in this demo store
  const total = game.price + tax
  const playable = id === 'nova-sweeper'

  // ── Order confirmation ─────────────────────────────────────
  if (done) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/40">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Order confirmed</h1>
        <p className="mt-2 text-slate-400">
          {game.title} has been added to your library. A receipt for order{' '}
          <span className="font-mono text-slate-300">{orderNo}</span> was sent to your
          email.
        </p>

        <div className="mx-auto mt-6 flex max-w-xs items-center gap-3 rounded-lg border border-ink-600/60 bg-ink-800 p-3 text-left">
          <Artwork hue={game.hue} seed={game.id} src={game.cover} alt={game.title} className="h-16 w-12 shrink-0 rounded" />
          <div className="min-w-0">
            <p className="truncate font-semibold text-white">{game.title}</p>
            <p className="truncate text-xs text-slate-400">{game.publisher}</p>
            <p className="mt-0.5 text-sm font-semibold text-slate-200">
              {formatPrice(game.price)}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {playable && (
            <Link to={`/play/${game.id}`} className="btn-accent">
              ▶ Play now
            </Link>
          )}
          <Link to={`/game/${game.id}`} className="btn-ghost">
            Back to game page
          </Link>
        </div>
      </div>
    )
  }

  // ── Checkout form ──────────────────────────────────────────
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <nav className="mb-4 text-sm text-slate-400">
        <Link to="/" className="hover:text-white">
          Home
        </Link>
        <span className="mx-1.5 text-slate-600">/</span>
        <Link to={`/game/${game.id}`} className="hover:text-white">
          {game.title}
        </Link>
        <span className="mx-1.5 text-slate-600">/</span>
        <span className="text-slate-300">Checkout</span>
      </nav>

      <h1 className="mb-6 text-2xl font-extrabold text-white sm:text-3xl">Checkout</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          setDone(true)
        }}
        className="grid gap-8 lg:grid-cols-[1fr_360px]"
      >
        {/* Left: details */}
        <div className="space-y-6">
          <section className="rounded-xl border border-ink-600/60 bg-ink-800/50 p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Account
            </h2>
            <Field label="Email address">
              <input
                type="email"
                required
                placeholder="you@example.com"
                className={inputClass}
                autoComplete="email"
              />
            </Field>
          </section>

          {!isFree && (
            <section className="rounded-xl border border-ink-600/60 bg-ink-800/50 p-5">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
                Payment method
              </h2>

              {/* Method selector */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    aria-pressed={method === m.id}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                      method === m.id
                        ? 'border-accent-500 bg-accent-500/10 text-white'
                        : 'border-ink-600 bg-ink-900/40 text-slate-300 hover:border-ink-500'
                    }`}
                  >
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded font-bold ${m.badgeClass}`}
                    >
                      {m.badge}
                    </span>
                    <span className="truncate">{m.label}</span>
                  </button>
                ))}
              </div>

              {/* Card form (Credit Card + UnionPay) */}
              {(method === 'card' || method === 'unionpay') && (
                <div className="mt-5 space-y-4">
                  <Field label="Cardholder name">
                    <input type="text" required placeholder="Full name on card" className={inputClass} autoComplete="cc-name" />
                  </Field>
                  <Field label="Card number">
                    <input
                      type="text"
                      required
                      inputMode="numeric"
                      placeholder={method === 'unionpay' ? '6212 3456 7890 1234' : '4242 4242 4242 4242'}
                      maxLength={19}
                      className={`${inputClass} font-mono`}
                      autoComplete="cc-number"
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Expiry (MM/YY)">
                      <input type="text" required placeholder="12/28" maxLength={5} className={`${inputClass} font-mono`} autoComplete="cc-exp" />
                    </Field>
                    <Field label="CVC / CVN">
                      <input type="text" required inputMode="numeric" placeholder="123" maxLength={4} className={`${inputClass} font-mono`} autoComplete="cc-csc" />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Country / Region">
                      <input type="text" required placeholder="Country" className={inputClass} autoComplete="country-name" />
                    </Field>
                    <Field label="Postal code">
                      <input type="text" required placeholder="ZIP / Postcode" className={inputClass} autoComplete="postal-code" />
                    </Field>
                  </div>
                </div>
              )}

              {/* QR panel (Alipay + WeChat Pay) */}
              {(method === 'alipay' || method === 'wechat') && (
                <div className="mt-5 flex flex-col items-center rounded-lg border border-ink-600/60 bg-ink-900/50 p-6 text-center">
                  <p className="text-sm font-medium text-slate-200">
                    Scan with {method === 'alipay' ? 'Alipay' : 'WeChat Pay'} to pay{' '}
                    <span className="font-bold text-white">{formatPrice(total)}</span>
                  </p>
                  <div className="my-4 rounded-xl bg-white p-3 shadow-lg">
                    <QRCode value={`${method}-${game.id}-${orderNo}`} size={180} />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span
                      className={`grid h-5 w-5 place-items-center rounded font-bold ${
                        method === 'alipay' ? 'bg-sky-500' : 'bg-green-500'
                      } text-white`}
                    >
                      {method === 'alipay' ? '支' : '微'}
                    </span>
                    Open the {method === 'alipay' ? 'Alipay' : 'WeChat'} app → Scan, then confirm below.
                  </div>
                </div>
              )}

              <p className="mt-4 flex items-start gap-2 rounded-md bg-ink-900/70 px-3 py-2 text-xs text-slate-400">
                <svg viewBox="0 0 20 20" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a5 5 0 00-5 5v2H4a1 1 0 00-1 1v6a1 1 0 001 1h12a1 1 0 001-1v-6a1 1 0 00-1-1h-1V7a5 5 0 00-5-5zm3 7V7a3 3 0 10-6 0v2h6z" clipRule="evenodd" />
                </svg>
                Demo store — payment is simulated for showcase purposes. The QR code is a
                placeholder and nothing is charged. Please don’t enter real payment details.
              </p>
            </section>
          )}
        </div>

        {/* Right: order summary */}
        <aside>
          <div className="lg:sticky lg:top-20 rounded-xl border border-ink-600/60 bg-ink-800 p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Order summary
            </h2>

            <div className="flex items-center gap-3">
              <Artwork hue={game.hue} seed={game.id} src={game.cover} alt={game.title} className="h-20 w-16 shrink-0 rounded" />
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">{game.title}</p>
                <p className="truncate text-xs text-slate-400">{game.publisher}</p>
                <div className="mt-1">
                  <Badge type={game.type} />
                </div>
              </div>
            </div>

            <dl className="mt-5 space-y-2 border-t border-ink-600/60 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-400">Subtotal</dt>
                <dd className="text-slate-200">{formatPrice(game.price)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Tax</dt>
                <dd className="text-slate-200">{isFree ? '—' : `$${tax.toFixed(2)}`}</dd>
              </div>
              <div className="flex justify-between border-t border-ink-600/60 pt-2 text-base font-bold">
                <dt className="text-white">Total</dt>
                <dd className="text-white">{isFree ? 'Free' : `$${total.toFixed(2)}`}</dd>
              </div>
            </dl>

            <button type="submit" className="btn-accent mt-5 w-full py-3 text-base">
              {isFree
                ? 'Get game'
                : method === 'alipay' || method === 'wechat'
                  ? "I've completed payment"
                  : `Pay ${formatPrice(total)}`}
            </button>
            <Link
              to={`/game/${game.id}`}
              className="mt-2 block text-center text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </Link>
          </div>
        </aside>
      </form>
    </div>
  )
}
