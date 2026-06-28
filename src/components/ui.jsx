import { Link } from 'react-router-dom'
import { A } from '../data/content'
import { useReveal } from '../lib/motion'
import { GoldPattern } from './GoldPattern'
import { SketchDoodles } from './SketchDoodles'

export function Eyebrow({ children, className = '' }) {
  return <span className={`eyebrow ${className}`}>{children}</span>
}

export function WaxSeal({ size = 64, letter = 'T', className = '', style }) {
  return (
    <span className={`wax ${className}`} style={{ width: size, height: size, fontSize: size * 0.42, ...style }} aria-hidden="true">
      {letter}
    </span>
  )
}

// Reveal-on-scroll wrapperchildren with [data-reveal] cascade in.
export function Reveal({ children, stagger = 0.09, className = '', as: Tag = 'div' }) {
  const ref = useReveal({ stagger })
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

// Section wrapper. tone: 'cream' (default) | 'alt' | 'red'. `pattern` overlays
// the gold line-art (auto-on for red).
export function Section({ id, tone = 'cream', pattern, doodles, doodleSeed = 0, className = '', children, py = 'py-24 md:py-32' }) {
  const bg = tone === 'red' ? 'bg-red text-cream on-red' : tone === 'alt' ? 'bg-paper-2' : 'bg-paper'
  const showPattern = pattern ?? tone === 'red'
  return (
    <section id={id} className={`relative overflow-hidden ${bg} ${py} ${className}`}>
      {showPattern && <GoldPattern opacity={tone === 'red' ? 0.14 : 0.08} />}
      {doodles && <SketchDoodles seed={doodleSeed} />}
      <div className="container-x relative z-[1]">{children}</div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, lead, center, light, className = '' }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className={`flex flex-col gap-4 ${center ? 'mx-auto text-center items-center' : 'max-w-[720px]'} ${className}`}
      style={{ marginBottom: 48 }}
    >
      {eyebrow && (
        <span data-reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </span>
      )}
      {title && (
        <h2 className={`h2 ${light ? 'text-cream' : ''}`} data-reveal style={{ whiteSpace: 'pre-line' }}>
          {title}
        </h2>
      )}
      {lead && (
        <p className={`lead max-w-[620px] ${light ? 'text-cream/80' : ''}`} data-reveal>
          {lead}
        </p>
      )}
    </div>
  )
}

// Inner-page hero: deep red field with gold line-art, breadcrumb, big title.
export function PageHero({ eyebrow, title, lead, crumb }) {
  const ref = useReveal()
  return (
    <header className="relative overflow-hidden bg-red text-cream on-red pt-36 pb-20 md:pt-44 md:pb-28">
      <GoldPattern opacity={0.16} />
      <div className="container-x relative z-[1]">
        <div ref={ref} className="max-w-[820px]">
          <nav data-reveal className="text-[12.5px] tracking-wide text-cream/60 mb-6">
            <Link to="/" className="hover:text-gold-light">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gold-light">{crumb || title}</span>
          </nav>
          {eyebrow && (
            <span data-reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </span>
          )}
          <h1 className="display mt-5 text-cream" data-reveal style={{ whiteSpace: 'pre-line' }}>
            {title}
          </h1>
          {lead && (
            <p data-reveal className="lead mt-6 max-w-[600px] text-cream/80">
              {lead}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}

// Bold gradient collection cardmatches the Solutions "How it works" step
// cards: cycling crimson/gold/cream palette, soft bubbles, a big index number,
// title + note at the foot. (Same visual language across category surfaces.)
const COLLECTION_GRADIENTS = [
  { bg: 'linear-gradient(160deg,#a8362c,#7e1d1a)', fg: '#f3e7c9', bubble: 'rgba(243,231,201,.14)' },
  { bg: 'linear-gradient(160deg,#e2c275,#c7a24e)', fg: '#571210', bubble: 'rgba(87,18,16,.12)' },
  { bg: 'linear-gradient(160deg,#f3e7c9,#e7cd8a)', fg: '#7e1d1a', bubble: 'rgba(126,29,26,.1)' },
  { bg: 'linear-gradient(160deg,#7e1d1a,#4f0f0d)', fg: '#ddbe74', bubble: 'rgba(221,190,116,.16)' },
]

export function CollectionCard({ img, title, to = '/products', index = 0, note }) {
  const g = COLLECTION_GRADIENTS[index % COLLECTION_GRADIENTS.length]
  return (
    <Link
      to={to}
      data-reveal
      className="group relative overflow-hidden rounded-[22px] p-5 md:p-6 flex flex-col transition-transform duration-300 hover:-translate-y-1"
      style={{ aspectRatio: '3 / 4', background: g.bg, color: g.fg }}
    >
      <span className="absolute -right-7 -top-7 w-28 h-28 rounded-full" style={{ background: g.bubble }} />
      <div className="relative mb-3.5">
        <span className="text-[11px] font-semibold uppercase tracking-[.16em] opacity-80">Collection</span>
      </div>
      {/* framed image panel (replaces the big index number) */}
      <div
        className="relative flex-1 rounded-[15px] overflow-hidden mb-4"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.16), 0 10px 24px -16px rgba(0,0,0,.5)' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[600ms] group-hover:scale-[1.06]"
          style={{ backgroundImage: `url(${A(img)})` }}
        />
      </div>
      <div className="relative">
        <h3 className="font-serif text-[18px] leading-snug">{title}</h3>
        {note && (
          <p className="text-[12.5px] mt-1 leading-snug" style={{ opacity: 0.85 }}>
            {note}
          </p>
        )}
        <span className="mt-2.5 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[.12em] opacity-90">
          Explore <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}

// A soft feature card with an icon chip (Finto-style).
export function FeatureCard({ icon, title, children }) {
  return (
    <div className="feature" data-reveal>
      <div className="icon-chip">{icon}</div>
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  )
}
