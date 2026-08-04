import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Browse from './pages/Browse.jsx'
import GameDetail from './pages/GameDetail.jsx'

// Reset scroll position on route change.
function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname, search])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-900">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/browse"
            element={<Browse initialType="all" heading="Store" blurb="Browse every Acadia Original and Marketplace title." />}
          />
          <Route
            path="/originals"
            element={
              <Browse
                initialType="original"
                heading="Acadia Originals"
                blurb="Games developed in-house by Acadia’s own studios."
              />
            }
          />
          <Route
            path="/marketplace"
            element={
              <Browse
                initialType="marketplace"
                heading="Marketplace"
                blurb="Third-party titles from independent publishers, sold through Acadia."
              />
            }
          />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route
            path="*"
            element={
              <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
                <h1 className="text-3xl font-extrabold text-white">404</h1>
                <p className="mt-2 text-slate-400">This page doesn’t exist.</p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
