import { useRef } from 'react'
import { A } from '../data/content'
import { useParallax } from '../lib/motion'

// Full-bleed photo that dissolves into the section background ONLY on the text
// sidethe editorial blend used across the site instead of boxed cards.
// `bg` must be the section's background as an "r,g,b" string so the fade is
// seamless. `side` = where the photo is strongest; text sits opposite.
const CREAM = '247,240,225' // --paper #F7F0E1
const RED = '126,29,26' // --red #7E1D1A

export function FadeImage({
  img,
  side = 'right',
  bg = CREAM,
  flip = false,
  darken = 0.08,
  parallax = false,
  grade = 'sepia(.05) saturate(1.02) contrast(1.02)',
}) {
  const ref = useRef(null)
  useParallax(parallax ? ref : { current: null }, { distance: 90 })
  const dir = side === 'right' ? '90deg' : '270deg'
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        ref={ref}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${A(img)})`,
          transform: `${flip ? 'scaleX(-1) ' : ''}${parallax ? 'scale(1.15)' : ''}`,
          filter: grade,
        }}
      />
      <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${darken})` }} />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${dir}, rgba(${bg},1) 0%, rgba(${bg},1) 40%, rgba(${bg},0.72) 58%, rgba(${bg},0) 84%)`,
        }}
      />
      {/* gentle top/bottom settle so the photo never hard-edges the section */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(180deg, rgba(${bg},0.5), transparent 18%, transparent 82%, rgba(${bg},0.5))` }}
      />
    </div>
  )
}

FadeImage.CREAM = CREAM
FadeImage.RED = RED
