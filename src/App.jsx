import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { useLang } from './i18n/LanguageProvider.jsx'
import Home from './pages/Home.jsx'
import Browse from './pages/Browse.jsx'
import GameDetail from './pages/GameDetail.jsx'
import Checkout from './pages/Checkout.jsx'
import Play from './pages/Play.jsx'

// Reset scroll position on route change.
function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname, search])
  return null
}

export default function App() {
  const { t } = useLang()
  return (
    <div className="flex min-h-screen flex-col bg-ink-900">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse initialType="all" />} />
          <Route path="/originals" element={<Browse initialType="original" />} />
          <Route path="/marketplace" element={<Browse initialType="marketplace" />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/play/:id" element={<Play />} />
          <Route
            path="*"
            element={
              <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
                <h1 className="text-3xl font-extrabold text-white">{t('notfound.title')}</h1>
                <p className="mt-2 text-slate-400">{t('notfound.body')}</p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
