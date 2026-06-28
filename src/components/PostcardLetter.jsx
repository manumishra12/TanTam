import { Link } from 'react-router-dom'
import { Section } from './ui'
import { useReveal } from '../lib/motion'

// A small illustrated postage stamp (perforated, brand colours).
function MiniStamp({ kind = 'gift' }) {
  return (
    <span className="stamp-mini inline-block" style={{ padding: '6px 7px', width: 62 }}>
      <span className="block">
        <svg viewBox="0 0 48 48" className="w-full h-auto" aria-hidden="true">
          {kind === 'gift' ? (
            <g fill="none" stroke="#a8362c" strokeWidth="2">
              <rect x="9" y="20" width="30" height="20" rx="2" fill="#f0d9c2" />
              <path d="M9 26h30M24 20v20" />
              <path d="M24 20c-6-2-10-8-4-10 4 1 4 6 4 10Zm0 0c6-2 10-8 4-10-4 1-4 6-4 10Z" fill="#e2c069" stroke="#9e7c30" />
            </g>
          ) : (
            <g fill="none" stroke="#a8362c" strokeWidth="2">
              <circle cx="24" cy="24" r="13" fill="#e2c069" stroke="#9e7c30" />
              <text x="24" y="29" textAnchor="middle" fontFamily="Inter Tight, serif" fontWeight="700" fontSize="14" fill="#7e1d1a" stroke="none">
                T
              </text>
            </g>
          )}
        </svg>
        <span className="block text-center mt-1 text-[7px] font-bold tracking-[.12em] text-accent">POSTAGE</span>
      </span>
    </span>
  )
}

function Postmark() {
  return (
    <svg viewBox="0 0 120 120" width="92" height="92" aria-hidden="true" style={{ color: 'var(--accent)', opacity: 0.42 }}>
      <defs>
        <path id="pmc" d="M60,60 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
      </defs>
      <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 4" />
      <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <text fontSize="9" fontWeight="700" letterSpacing="2.5" fill="currentColor" fontFamily="Inter, sans-serif">
        <textPath href="#pmc" startOffset="4%">TANTAM · GIFTING CO ·</textPath>
      </text>
      {[18, 26, 34].map((y, i) => (
        <path key={i} d={`M82 ${42 + i * 9} q14 -5 28 0`} fill="none" stroke="currentColor" strokeWidth="1.3" />
      ))}
    </svg>
  )
}

// A postage-stamp "letter" cardvaried closing element. Configurable so each
// page can show a different note (no two routes use the same card).
export function PostcardLetter({
  tone = 'alt',
  title = 'A NOTE FROM TANTAM',
  to = 'A future partner',
  from = 'Team TanTam',
  heading = 'Dear future partner,',
  body = 'For twelve years we’ve believed a gift is never just an objectit’s a moment of appreciation, wrapped. Tell us the occasion, and we’ll curate, brand and deliver it beautifully.',
  date = 'EST. 2013',
  cta = 'Start a conversation',
  ctaTo = '/enquiry',
}) {
  const ref = useReveal()
  return (
    <Section tone={tone}>
      <div ref={ref} className="max-w-[720px] mx-auto" data-reveal>
        <div
          className="stamp-edge"
          style={{
            padding: 'clamp(26px,4.5vw,52px)',
            boxShadow: '0 34px 70px -40px rgba(44,19,16,.4)',
            '--sb': tone === 'cream' ? 'var(--paper)' : 'var(--paper-2)',
          }}
        >
          <div style={{ border: '1px dashed rgba(168,54,44,.3)', padding: 'clamp(18px,3vw,30px)' }}>
            <h3 className="font-serif text-accent text-center" style={{ fontSize: 'clamp(26px,4vw,44px)', letterSpacing: '.04em' }}>
              {title}
            </h3>

            <div className="flex items-start justify-between gap-6 mt-7">
              <div className="flex-1 max-w-[260px]">
                {[['TO', to], ['FROM', from]].map(([k, v]) => (
                  <div key={k} className="flex items-end gap-3 mb-3">
                    <span className="text-[11px] font-bold tracking-[.12em] text-accent pb-1">{k}:</span>
                    <span className="script text-accent-deep text-[26px] leading-none flex-1" style={{ borderBottom: '1.5px solid var(--line-2)' }}>
                      {v}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2.5 shrink-0">
                <MiniStamp kind="gift" />
                <MiniStamp kind="seal" />
              </div>
            </div>

            <p className="script text-accent-deep mt-6" style={{ fontSize: 'clamp(28px,3.6vw,40px)', lineHeight: 1 }}>
              {heading}
            </p>
            <p className="script text-accent-deep/90 mt-3" style={{ fontSize: 'clamp(19px,2.2vw,24px)', lineHeight: 1.5 }}>
              {body}
            </p>

            <div className="flex items-end justify-between gap-4 mt-8">
              <div>
                <div className="font-serif text-accent text-2xl tracking-wider">{date}</div>
                <Link to={ctaTo} className="btn btn-primary mt-3">
                  {cta} <span className="arr">→</span>
                </Link>
              </div>
              <div className="-mr-2 -mb-2">
                <Postmark />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
