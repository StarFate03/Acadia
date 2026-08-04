import { useEffect } from 'react'

// Shown when a user clicks "Buy Now". There is no payment flow in this
// prototype — this modal makes that explicit.
export default function BuyModal({ open, onClose, game }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="buy-modal-title"
    >
      <div
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md animate-fade-up rounded-xl border border-ink-600 bg-ink-800 p-6 shadow-card-hover">
        <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-accent-500/15 text-accent-300 ring-1 ring-inset ring-accent-500/40">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.3 3.86l-8.1 14A2 2 0 004 21h16a2 2 0 001.73-3.14l-8.1-14a2 2 0 00-3.46 0z" />
          </svg>
        </div>

        <h2 id="buy-modal-title" className="text-lg font-bold text-white">
          Prototype Preview — Purchasing Not Yet Available
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          {game ? (
            <>
              <span className="font-medium text-slate-300">{game.title}</span> can’t be
              purchased yet. This is an internal build with no checkout or payment
              processing wired up.
            </>
          ) : (
            'This is an internal build with no checkout or payment processing wired up.'
          )}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="btn-accent">
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
