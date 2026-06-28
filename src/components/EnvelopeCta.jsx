import { Link } from 'react-router-dom'
import { Section, Eyebrow } from './ui'
import { useReveal } from '../lib/motion'

// A flat airmail-envelope illustration paired with a CTAanother distinct
// closing element (brand red / gold / cream, no green).
function Envelope() {
  return (
    <svg viewBox="0 0 380 250" className="w-full h-auto" aria-hidden="true">
      <rect x="6" y="6" width="368" height="238" rx="10" fill="#fbf5e8" stroke="#d8c49c" strokeWidth="2" />
      {/* airmail dashes border */}
      <rect x="16" y="16" width="348" height="218" rx="6" fill="none" stroke="#a8362c" strokeWidth="2" strokeDasharray="10 7" opacity="0.5" />
      {/* flap */}
      <path d="M6 16 L190 140 L374 16" fill="none" stroke="#9e7c30" strokeWidth="2" />
      {/* stamp */}
      <g>
        <rect x="296" y="34" width="52" height="62" rx="3" fill="#f0d9c2" stroke="#a8362c" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="322" cy="58" r="13" fill="#e2c069" stroke="#9e7c30" strokeWidth="1.5" />
        <text x="322" y="63" textAnchor="middle" fontFamily="Inter Tight, serif" fontWeight="700" fontSize="15" fill="#7e1d1a">T</text>
        <text x="322" y="86" textAnchor="middle" fontFamily="Inter" fontWeight="700" fontSize="7" letterSpacing="1" fill="#a8362c">POSTAGE</text>
      </g>
      {/* address lines */}
      <g stroke="#c8a8a0" strokeWidth="2.5" strokeLinecap="round">
        <line x1="210" y1="150" x2="330" y2="150" />
        <line x1="210" y1="168" x2="350" y2="168" />
        <line x1="210" y1="186" x2="300" y2="186" />
      </g>
      {/* wax seal */}
      <g>
        <circle cx="120" cy="178" r="26" fill="#7e1d1a" />
        <circle cx="120" cy="178" r="20" fill="none" stroke="#ddbe74" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="120" y="186" textAnchor="middle" fontFamily="Inter Tight, serif" fontWeight="700" fontSize="22" fill="#ddbe74">T</text>
      </g>
    </svg>
  )
}

export function EnvelopeCta({
  eyebrow = 'Bulk & enterprise',
  title = 'One brief, one partner, every gift handled',
  body = 'Tiered pricing, custom branding, a redemption portal and a single dedicated account managerfrom a hundred kits to a hundred thousand.',
  cta = 'Get a quote',
  ctaTo = '/enquiry',
  tone = 'alt',
}) {
  const ref = useReveal()
  return (
    <Section tone={tone}>
      <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div data-reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="h2 mt-4">{title}</h2>
          <p className="lead mt-4 max-w-[460px]">{body}</p>
          <Link to={ctaTo} className="btn btn-primary mt-7">
            {cta} <span className="arr">→</span>
          </Link>
        </div>
        <div data-reveal className="relative">
          <div className="max-w-[440px] mx-auto" style={{ filter: 'drop-shadow(0 30px 50px rgba(44,19,16,.25))' }}>
            <Envelope />
          </div>
        </div>
      </div>
    </Section>
  )
}
