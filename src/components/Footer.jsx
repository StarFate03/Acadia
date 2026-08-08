import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageProvider.jsx'

export default function Footer() {
  const { t } = useLang()
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
            <p className="mt-3 text-sm text-slate-400">{t('footer.tagline')}</p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:grid-cols-3">
            <Link to="/browse" className="text-slate-400 hover:text-white">
              {t('nav.store')}
            </Link>
            <Link to="/originals" className="text-slate-400 hover:text-white">
              {t('nav.originals')}
            </Link>
            <Link to="/marketplace" className="text-slate-400 hover:text-white">
              {t('nav.marketplace')}
            </Link>
            <span className="cursor-default text-slate-600">{t('footer.support')}</span>
            <span className="cursor-default text-slate-600">{t('footer.about')}</span>
            <span className="cursor-default text-slate-600">{t('footer.careers')}</span>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-ink-700/70 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <span>{t('footer.rights', { year: new Date().getFullYear() })}</span>
          <div className="flex gap-4">
            <span className="cursor-default hover:text-slate-300">{t('footer.privacy')}</span>
            <span className="cursor-default hover:text-slate-300">{t('footer.terms')}</span>
            <span className="cursor-default hover:text-slate-300">{t('footer.refunds')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
