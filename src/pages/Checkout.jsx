import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Artwork from '../components/Artwork.jsx'
import Badge from '../components/Badge.jsx'
import QRCode from '../components/QRCode.jsx'
import { useLang } from '../i18n/LanguageProvider.jsx'
import { getGameById } from '../data/games.js'

const PAYMENT_METHODS = [
  { id: 'card', labelKey: 'pay.card', badge: '💳', badgeClass: 'bg-ink-700' },
  { id: 'unionpay', labelKey: 'pay.unionpay', badge: '银联', badgeClass: 'bg-red-600 text-white text-[10px]' },
  { id: 'alipay', labelKey: 'pay.alipay', badge: '支', badgeClass: 'bg-sky-500 text-white' },
  { id: 'wechat', labelKey: 'pay.wechat', badge: '微', badgeClass: 'bg-green-500 text-white' },
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
  const { t, price } = useLang()
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
        <h1 className="text-2xl font-bold text-white">{t('checkout.notFound')}</h1>
        <Link to="/browse" className="btn-accent mt-6">
          {t('detail.backToStore')}
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
        <h1 className="text-2xl font-extrabold text-white">{t('checkout.confirmed')}</h1>
        <p className="mt-2 text-slate-400">
          {t('checkout.confirmedBody', { title: game.title, order: orderNo })}
        </p>

        <div className="mx-auto mt-6 flex max-w-xs items-center gap-3 rounded-lg border border-ink-600/60 bg-ink-800 p-3 text-left">
          <Artwork hue={game.hue} seed={game.id} src={game.cover} alt={game.title} className="h-16 w-12 shrink-0 rounded" />
          <div className="min-w-0">
            <p className="truncate font-semibold text-white">{game.title}</p>
            <p className="truncate text-xs text-slate-400">{game.publisher}</p>
            <p className="mt-0.5 text-sm font-semibold text-slate-200">{price(game.price)}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {playable && (
            <Link to={`/play/${game.id}`} className="btn-accent">
              {t('checkout.playNow')}
            </Link>
          )}
          <Link to={`/game/${game.id}`} className="btn-ghost">
            {t('checkout.backToGame')}
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
          {t('breadcrumb.home')}
        </Link>
        <span className="mx-1.5 text-slate-600">/</span>
        <Link to={`/game/${game.id}`} className="hover:text-white">
          {game.title}
        </Link>
        <span className="mx-1.5 text-slate-600">/</span>
        <span className="text-slate-300">{t('breadcrumb.checkout')}</span>
      </nav>

      <h1 className="mb-6 text-2xl font-extrabold text-white sm:text-3xl">{t('checkout.title')}</h1>

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
              {t('checkout.account')}
            </h2>
            <Field label={t('checkout.email')}>
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
                {t('checkout.paymentMethod')}
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
                    <span className="truncate">{t(m.labelKey)}</span>
                  </button>
                ))}
              </div>

              {/* Card form (Credit Card + UnionPay) */}
              {(method === 'card' || method === 'unionpay') && (
                <div className="mt-5 space-y-4">
                  <Field label={t('checkout.cardName')}>
                    <input type="text" required placeholder="—" className={inputClass} autoComplete="cc-name" />
                  </Field>
                  <Field label={t('checkout.cardNumber')}>
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
                    <Field label={t('checkout.expiry')}>
                      <input type="text" required placeholder="12/28" maxLength={5} className={`${inputClass} font-mono`} autoComplete="cc-exp" />
                    </Field>
                    <Field label={t('checkout.cvc')}>
                      <input type="text" required inputMode="numeric" placeholder="123" maxLength={4} className={`${inputClass} font-mono`} autoComplete="cc-csc" />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label={t('checkout.country')}>
                      <input type="text" required placeholder="—" className={inputClass} autoComplete="country-name" />
                    </Field>
                    <Field label={t('checkout.postal')}>
                      <input type="text" required placeholder="—" className={inputClass} autoComplete="postal-code" />
                    </Field>
                  </div>
                </div>
              )}

              {/* QR panel (Alipay + WeChat Pay) */}
              {(method === 'alipay' || method === 'wechat') && (
                <div className="mt-5 flex flex-col items-center rounded-lg border border-ink-600/60 bg-ink-900/50 p-6 text-center">
                  <p className="text-sm font-medium text-slate-200">
                    {t('checkout.scan', { method: t(`pay.${method}`), price: price(total) })}
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
                    {t('checkout.openApp', { app: t(`pay.${method}`) })}
                  </div>
                </div>
              )}

            </section>
          )}
        </div>

        {/* Right: order summary */}
        <aside>
          <div className="lg:sticky lg:top-20 rounded-xl border border-ink-600/60 bg-ink-800 p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
              {t('checkout.orderSummary')}
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
                <dt className="text-slate-400">{t('checkout.subtotal')}</dt>
                <dd className="text-slate-200">{price(game.price)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">{t('checkout.tax')}</dt>
                <dd className="text-slate-200">{isFree ? '—' : `$${tax.toFixed(2)}`}</dd>
              </div>
              <div className="flex justify-between border-t border-ink-600/60 pt-2 text-base font-bold">
                <dt className="text-white">{t('checkout.total')}</dt>
                <dd className="text-white">{isFree ? t('price.free') : `$${total.toFixed(2)}`}</dd>
              </div>
            </dl>

            <button type="submit" className="btn-accent mt-5 w-full py-3 text-base">
              {isFree
                ? t('checkout.getGame')
                : method === 'alipay' || method === 'wechat'
                  ? t('checkout.completed')
                  : t('checkout.pay', { price: price(total) })}
            </button>
            <Link
              to={`/game/${game.id}`}
              className="mt-2 block text-center text-xs text-slate-400 hover:text-slate-200"
            >
              {t('checkout.cancel')}
            </Link>
          </div>
        </aside>
      </form>
    </div>
  )
}
