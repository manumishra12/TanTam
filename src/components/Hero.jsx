import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GiftBoxScene } from './GiftBoxScene'
import { FadeImage } from './FadeImage'
import { SketchDoodles } from './SketchDoodles'

gsap.registerPlugin(ScrollTrigger)

function canUseWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'))
  } catch (e) {
    return false
  }
}

// scattered confetti dots (percent positions + colour)
const CONFETTI = [
  [13, 22, '#c7a24e'], [26, 60, '#a8362c'], [40, 12, '#c7a24e'], [62, 78, '#c7a24e'],
  [86, 26, '#a8362c'], [90, 60, '#c7a24e'], [50, 88, '#c7a24e'], [76, 14, '#ddbe74'], [10, 74, '#ddbe74'],
]

// Festive swallowtail bunting draped across the hero — dips in the middle so it
// crosses over the headline, anchored on both the left and right (img-4 style).
const BUNT = ['#7e1d1a', '#c7a24e', '#a8362c', '#ddbe74']
function HeroBunting() {
  const W = 1440, n = 11
  // two draped strands that cross once in the middle (a single X, no loops)
  const yA = (x) => 50 + (x / W) * 80 + Math.sin((Math.PI * x) / W) * 30
  const yB = (x) => 130 - (x / W) * 80 + Math.sin((Math.PI * x) / W) * 30
  const pathOf = (fy) => {
    let d = `M0 ${fy(0).toFixed(1)}`
    for (let x = 30; x <= W; x += 30) d += ` L${x} ${fy(x).toFixed(1)}`
    return d
  }
  const flagsOf = (fy, off, cStart, key) => {
    const out = []
    for (let i = 0; i < n; i++) {
      const x = (i + 0.5 + off) * (W / (n + 1))
      if (x > W) continue
      const y = fy(x)
      const w = 31, h = 40
      out.push(
        <path
          key={`${key}-${i}`}
          d={`M${(x - w / 2).toFixed(1)} ${y.toFixed(1)} L${(x + w / 2).toFixed(1)} ${y.toFixed(1)} L${(x + w / 2).toFixed(1)} ${(y + h).toFixed(1)} L${x.toFixed(1)} ${(y + h - 12).toFixed(1)} L${(x - w / 2).toFixed(1)} ${(y + h).toFixed(1)} Z`}
          fill={BUNT[(i + cStart) % BUNT.length]}
          opacity="0.92"
        />,
      )
    }
    return out
  }
  return (
    <svg className="pointer-events-none absolute inset-0 w-full h-full" viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path d={pathOf(yA)} stroke="#b9923f" strokeWidth="2.2" fill="none" opacity="0.8" />
      <path d={pathOf(yB)} stroke="#caa25a" strokeWidth="2.2" fill="none" opacity="0.8" />
      {flagsOf(yA, 0, 0, 'a')}
      {flagsOf(yB, 0.5, 2, 'b')}
    </svg>
  )
}

export function Hero() {
  const progress = useRef(0)
  const sectionRef = useRef(null)
  const introRef = useRef(null)
  const cornerRef = useRef(null)
  const barRef = useRef(null)
  const welcomeRef = useRef(null)
  const veilRef = useRef(null)
  const [cinematic, setCinematic] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setCinematic(canUseWebGL() && !reduce)
  }, [])

  useEffect(() => {
    if (!cinematic) return
    const section = sectionRef.current
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress
        progress.current = p
        const fade = (a, b) => Math.max(0, Math.min(1, (p - a) / (b - a)))
        if (introRef.current) {
          introRef.current.style.opacity = 1 - fade(0.03, 0.2)
          introRef.current.style.transform = `translateY(${-fade(0.03, 0.4) * 40}px)`
        }
        if (cornerRef.current) cornerRef.current.style.opacity = 1 - fade(0.03, 0.18)
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
        if (veilRef.current) veilRef.current.style.opacity = fade(0.84, 0.96)
        if (welcomeRef.current) {
          const o = fade(0.8, 0.92)
          welcomeRef.current.style.opacity = o
          welcomeRef.current.style.transform = `translateY(${(1 - o) * 24}px) scale(${0.95 + o * 0.05})`
        }
      },
    })
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => {
      clearTimeout(refresh)
      st.kill()
    }
  }, [cinematic])

  // ---------- static / reduced-motion fallback ----------
  if (!cinematic) {
    return (
      <section id="hero" className="relative flex items-center overflow-hidden bg-paper" style={{ minHeight: '100svh' }}>
        <FadeImage img="gift-ribbon.jpg" side="right" bg={FadeImage.CREAM} />
        <div className="container-x relative z-[1] pt-28">
          <div className="max-w-[600px]">
            <span className="eyebrow">Enterprise Gifting · Est. Relationships</span>
            <h1 className="display mt-5">Every gift, a moment<br />worth opening.</h1>
            <p className="lead max-w-[560px] mt-5">
              Curated corporate gifting that turns gestures into relationships —<br />
              designed, sourced and delivered with intent.
            </p>
            <div className="flex flex-wrap items-center gap-5 mt-7">
              <Link to="/enquiry" className="btn btn-primary">Enquire Now</Link>
              <Link to="/products" className="font-semibold text-ink inline-flex items-center gap-2 hover:text-accent">
                Explore the collection <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ---------- cinematic 3D unboxing intro ----------
  return (
    <section id="hero" ref={sectionRef} className="relative" style={{ height: '360vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <GiftBoxScene progressRef={progress} />

        {/* intro: badge + headline + subhead + CTAs */}
        <div ref={introRef} className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-[185px] md:pt-[200px] text-center px-6 will-change-transform">
          {/* hand-drawn gift doodles in the cream sky behind the headline */}
          <SketchDoodles seed={3} maxY={52} opacity={0.7} />

          {/* festive bunting draped across — crosses the words, left & right */}
          <HeroBunting />

          {/* swaying string ribbons weaving across the hero */}
          <svg
            className="hero-string pointer-events-none absolute inset-0 w-full h-full"
            viewBox="0 0 1440 820"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            aria-hidden="true"
          >
            <path
              className="draw"
              d="M-40 560 C 220 470, 360 660, 520 560 S 820 410, 980 540 S 1300 690, 1500 540"
              stroke="#cda14a"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.55"
            />
            <path
              d="M-40 680 C 280 640, 430 520, 610 630 S 910 740, 1090 600 S 1370 520, 1500 650"
              stroke="#efe2c4"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>

          {/* confetti */}
          {CONFETTI.map(([x, y, c], i) => (
            <span key={i} className="pointer-events-none absolute rounded-full" style={{ left: `${x}%`, top: `${y}%`, width: 7, height: 7, background: c, opacity: 0.55 }} />
          ))}

          <h1 className="display text-ink relative" style={{ fontSize: 'clamp(28px,5.3vw,74px)', letterSpacing: '-0.04em', lineHeight: 1.03 }}>
            Every gift, a moment<br />worth opening.
          </h1>
          <p className="lead relative mt-5 max-w-[640px]">
            Curated corporate gifting that turns gestures into relationships —<br />
            designed, sourced and delivered with intent.
          </p>
          <div className="relative flex flex-wrap items-center justify-center gap-5 mt-7 pointer-events-auto">
            <Link to="/enquiry" className="btn btn-primary">Enquire Now</Link>
            <Link to="/products" className="font-semibold text-ink inline-flex items-center gap-2 hover:text-accent">
              Explore the collection <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* mono corner label */}
        <div ref={cornerRef} className="absolute inset-0 z-10 pointer-events-none">
          <span className="mono absolute bottom-5 left-6 text-[11px] text-muted">( ◦ )SIGNATURE COLLECTION</span>
        </div>

        {/* progress bar */}
        <div className="absolute left-0 right-0 bottom-[60px] z-10 flex justify-center pointer-events-none px-6">
          <div className="w-[200px] h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(126,29,26,.14)' }}>
            <div ref={barRef} className="h-full w-full origin-left" style={{ background: 'var(--gold-deep)', transform: 'scaleX(0)' }} />
          </div>
        </div>

        {/* veil hand-off */}
        <div ref={veilRef} className="absolute inset-0 z-20 pointer-events-none opacity-0" style={{ background: 'linear-gradient(180deg, rgba(250,248,243,0) 40%, var(--paper) 100%), var(--paper)' }} />

        {/* welcome finale */}
        <div ref={welcomeRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 opacity-0 pointer-events-none will-change-transform">
          <span className="eyebrow mb-5">You’re in</span>
          <h2 className="display text-ink" style={{ fontSize: 'clamp(40px,7vw,96px)' }}>Welcome to TanTam</h2>
          <p className="lead max-w-[460px] mt-4">
            The art of corporate giftingcurated, branded, packed and delivered with care, across 35+ countries.
          </p>
          <div className="mono mt-8 flex items-center gap-2 text-gold-deep text-[12px] uppercase tracking-[.18em]">
            Scroll to explore <span aria-hidden className="animate-bounce">↓</span>
          </div>
        </div>
      </div>
    </section>
  )
}
