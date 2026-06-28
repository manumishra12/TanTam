import { useEffect, useRef, useState } from 'react'

// a realistic crimson wax seal — irregular blob, glossy highlight, pressed
// impression ring, an embossed "T", and a soft cast shadow on the paper
function WaxSeal() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <radialGradient id="waxBody" cx="40%" cy="33%" r="80%">
          <stop offset="0" stopColor="#b53b48" />
          <stop offset="42%" stopColor="#8d1f2e" />
          <stop offset="100%" stopColor="#561120" />
        </radialGradient>
        <radialGradient id="waxGloss" cx="38%" cy="30%" r="44%">
          <stop offset="0" stopColor="rgba(255,206,197,.62)" />
          <stop offset="100%" stopColor="rgba(255,206,197,0)" />
        </radialGradient>
        <filter id="waxDrop" x="-35%" y="-35%" width="170%" height="170%">
          <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="rgba(58,14,22,.5)" />
        </filter>
      </defs>
      {/* irregular wax blob */}
      <path
        filter="url(#waxDrop)"
        fill="url(#waxBody)"
        d="M100 16 C129 13 152 31 157 58 C173 68 181 94 169 118 C178 143 158 169 128 169 C114 185 83 183 67 165 C42 162 27 138 35 112 C21 90 31 61 56 53 C64 28 84 13 100 16 Z"
      />
      {/* pressed impression ring */}
      <circle cx="100" cy="101" r="68" fill="none" stroke="rgba(58,13,22,.42)" strokeWidth="5" />
      <circle cx="100" cy="98" r="68" fill="none" stroke="rgba(216,112,112,.26)" strokeWidth="2" />
      {/* embossed T — light upper edge behind a darker recess */}
      <text x="100" y="131" textAnchor="middle" fontFamily="'Times New Roman', Georgia, serif" fontWeight="700" fontSize="104" fill="rgba(255,202,192,.34)" transform="translate(-2,-3)">T</text>
      <text x="100" y="131" textAnchor="middle" fontFamily="'Times New Roman', Georgia, serif" fontWeight="700" fontSize="104" fill="rgba(70,14,25,.8)">T</text>
      {/* glossy specular */}
      <ellipse cx="77" cy="66" rx="38" ry="26" fill="url(#waxGloss)" />
    </svg>
  )
}

// The launch screen: a sealed invitation envelope. Click/tap → the flap lifts,
// the wax seal breaks free, and the whole thing zooms away to reveal the site.
export function EnvelopeIntro() {
  const [opening, setOpening] = useState(false)
  const [gone, setGone] = useState(false)
  const timers = useRef([])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      timers.current.forEach(clearTimeout)
    }
  }, [])

  const open = () => {
    if (opening) return
    setOpening(true)
    timers.current.push(
      setTimeout(() => {
        setGone(true)
        document.body.style.overflow = ''
      }, 1550),
    )
  }

  if (gone) return null

  return (
    <div
      className={`env-intro ${opening ? 'opening' : ''}`}
      onClick={open}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') open() }}
      role="button"
      tabIndex={0}
      aria-label="Open the envelope to enter the site"
    >
      {/* faint paper grain */}
      <svg className="env-noise" aria-hidden="true">
        <filter id="envNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#envNoise)" />
      </svg>

      {/* envelope back creases (seams meeting at the seal) */}
      <svg className="env-creases" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <g stroke="rgba(120,80,40,.15)" strokeWidth="1" vectorEffect="non-scaling-stroke">
          <line x1="0" y1="0" x2="50" y2="50" />
          <line x1="100" y1="0" x2="50" y2="50" />
          <line x1="0" y1="100" x2="50" y2="50" />
          <line x1="100" y1="100" x2="50" y2="50" />
        </g>
      </svg>

      {/* the openable top flap */}
      <div className="env-flap" aria-hidden="true" />

      {/* brand (minimal — no details) */}
      <div className="env-brand">
        <p className="script" style={{ fontSize: 'clamp(22px,3.4vw,34px)', color: 'var(--accent)', lineHeight: 1 }}>
          You’re invited to open
        </p>
        <div
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 700,
            letterSpacing: '-0.03em',
            fontSize: 'clamp(46px,9vw,104px)',
            color: 'var(--accent-deep)',
            lineHeight: 1,
            marginTop: 6,
          }}
        >
          TanTam
        </div>
        <p className="mono" style={{ fontSize: '11px', letterSpacing: '.26em', color: 'var(--muted)', textTransform: 'uppercase', marginTop: 12 }}>
          The Art of Corporate Gifting
        </p>
      </div>

      {/* crimson wax seal */}
      <div className="env-seal">
        <WaxSeal />
      </div>

      {/* prompt */}
      <div className="env-prompt env-bob">
        <span className="mono" style={{ fontSize: '12px', letterSpacing: '.2em', color: 'var(--accent)', textTransform: 'uppercase' }}>
          Tap to open
        </span>
        <div style={{ marginTop: '6px', color: 'var(--accent)', fontSize: '14px' }} aria-hidden="true">✦</div>
      </div>
    </div>
  )
}
