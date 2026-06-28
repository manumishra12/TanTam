import { Link } from 'react-router-dom'
import { GoldPattern, GoldFrame, MotifBand } from './GoldPattern'
import { useReveal } from '../lib/motion'

// A big rounded festive carddeep red with gold line-art done properly
// (subtle pattern, inset gold frame, a symmetric motif band).
export function CtaBand({
  eyebrow = 'Let’s work together',
  title = 'Plan your bulk corporate gifting',
  body = 'Tell us your occasion, headcount and budgetwe’ll curate, brand and deliver. Volume pricing and a dedicated account manager included.',
  cta = 'Request a quote',
  to = '/enquiry',
  secondary,
}) {
  const ref = useReveal()
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="container-x">
        <div
          ref={ref}
          className="relative overflow-hidden text-cream on-red text-center px-6 py-16 md:py-24"
          style={{ background: 'linear-gradient(160deg,#7e1d1a,#571210)', borderRadius: 32 }}
        >
          <GoldPattern opacity={0.12} />
          <GoldFrame inset={18} />
          <div className="relative z-[1] max-w-[640px] mx-auto flex flex-col items-center">
            <MotifBand className="mb-8" color="#DDBE74" />
            <span data-reveal>
              <span className="eyebrow">{eyebrow}</span>
            </span>
            <h2 className="h2 mt-5 text-cream" data-reveal style={{ whiteSpace: 'pre-line' }}>
              {title}
            </h2>
            <p className="lead mt-4 text-cream/80" data-reveal>
              {body}
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-8" data-reveal>
              <Link to={to} className="btn btn-accent">
                {cta}
                <span className="arr">→</span>
              </Link>
              {secondary && (
                <Link to={secondary.to} className="btn btn-outline">
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
