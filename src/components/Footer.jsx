import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-600/70 bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded bg-accent-500 text-xs font-black text-white">
                A
              </span>
              <span className="font-extrabold tracking-tight text-white">ACADIA</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              A storefront prototype for Acadia Originals and Marketplace titles.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:grid-cols-3">
            <Link to="/browse" className="text-slate-400 hover:text-white">
              Store
            </Link>
            <Link to="/originals" className="text-slate-400 hover:text-white">
              Originals
            </Link>
            <Link to="/marketplace" className="text-slate-400 hover:text-white">
              Marketplace
            </Link>
            <span className="cursor-default text-slate-600">Support</span>
            <span className="cursor-default text-slate-600">About</span>
            <span className="cursor-default text-slate-600">Careers</span>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-ink-700/70 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Acadia. All titles and publishers are fictional.</span>
          <span className="rounded bg-ink-800 px-2 py-1 font-medium text-slate-400 ring-1 ring-inset ring-ink-600">
            Internal Prototype — Not for Public Release
          </span>
        </div>
      </div>
    </footer>
  )
}
