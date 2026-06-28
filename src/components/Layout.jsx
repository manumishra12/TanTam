import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useLenis } from '../lib/useLenis'
import { Cursor } from './Cursor'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { EnvelopeIntro } from './EnvelopeIntro'

// Scrolls to top on route change (resets Lenis too).
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
  }, [pathname])
  return null
}

export function Layout() {
  useLenis()
  const { pathname } = useLocation()
  // the envelope launch screen — shows on every home-page load / refresh
  const [showIntro] = useState(() => pathname === '/')
  return (
    <div className="grain">
      {showIntro && <EnvelopeIntro />}
      <Cursor />
      <ScrollToTop />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
