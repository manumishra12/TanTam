import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { routes } from '../data/content'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [light, setLight] = useState(false) // true when the nav sits over a red/dark region
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Detect whether a red/dark surface is directly behind the navbar so the
  // logo + links can flip to white. Works on scroll too (flips back over cream).
  useEffect(() => {
    const compute = () => {
      const h = headerRef.current
      if (!h) return
      const bar = h.firstElementChild
      const y = Math.max(10, (bar ? bar.offsetHeight : 56) / 2)
      const x = Math.round(window.innerWidth / 2)
      const els = document.elementsFromPoint(x, y)
      const dark = els.some((el) => el.closest && el.closest('.on-red, [data-nav-dark]'))
      setLight(dark)
    }
    const raf = requestAnimationFrame(compute)
    const t = setTimeout(compute, 300)
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t)
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [pathname])

  return (
    <header
      ref={headerRef}
      className="fixed top-0 inset-x-0 z-[100] transition-all duration-300"
      style={{
        background: 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
      }}
    >
      <div className="relative flex items-center justify-between px-5 md:px-10 py-3.5">
        {/* logo (left) */}
        <Link to="/" title="TanTam — The Art of Corporate Gifting" aria-label="TanTam — home" className="flex items-center gap-2.5 shrink-0">
          <span
            className="grid place-items-center w-7 h-7 rounded-full text-[13px] font-bold transition-colors duration-300"
            style={
              light
                ? { background: 'var(--cream)', color: 'var(--red-deep)', boxShadow: 'inset 0 0 0 1.5px rgba(221,190,116,.7)' }
                : { background: 'radial-gradient(circle at 35% 30%,#9e2b22,var(--red-deep))', color: 'var(--gold-light)', boxShadow: 'inset 0 0 0 1.5px rgba(221,190,116,.45)' }
            }
          >
            T
          </span>
          <span
            className="font-serif font-semibold text-[22px] tracking-tight transition-colors duration-300"
            style={{ color: light ? 'var(--cream)' : 'var(--ink)' }}
          >
            TanTam
          </span>
        </Link>

        {/* tabs (centred) */}
        <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {routes.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `nav-link text-[14px] font-medium transition-colors duration-300 ${
                  light
                    ? isActive
                      ? 'text-gold-light'
                      : 'text-cream/80 hover:text-cream'
                    : isActive
                      ? 'text-accent'
                      : 'text-ink/85 hover:text-ink'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        {/* actions (right) */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/enquiry" className="btn btn-accent hidden md:inline-flex">
            Enquire Now
          </Link>
          <button
            className="lg:hidden icon-round w-10 h-10 transition-colors duration-300"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            style={light ? { background: 'transparent', borderColor: 'rgba(243,231,201,.5)', color: 'var(--cream)' } : undefined}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? 480 : 0, background: 'rgba(247,240,225,.98)', backdropFilter: 'blur(14px)', borderBottom: open ? '1px solid var(--line)' : 'none' }}
      >
        <div className="flex flex-col px-5 py-2">
          {routes.map((n) => (
            <NavLink key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 border-b border-line/60 text-[15px] font-medium">
              {n.label}
            </NavLink>
          ))}
          <Link to="/enquiry" onClick={() => setOpen(false)} className="btn btn-accent justify-center my-4">
            Enquire Now
          </Link>
        </div>
      </div>
    </header>
  )
}
