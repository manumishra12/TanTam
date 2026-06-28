import { Link } from 'react-router-dom'
import { Section, SectionHead } from './ui'
import { Snowflake, Ornament, Sprig } from './GoldPattern'
import { stats } from '../data/content'
import { useReveal, useCountUp } from '../lib/motion'
import { useRef } from 'react'

const items = [
  { icon: <Snowflake size={26} color="#9E7C30" />, title: 'Curate & customise', body: 'On-brand gifting ideas, personalised to your team, brand and budgetno guesswork.' },
  { icon: <Ornament size={26} color="#9E7C30" />, title: 'Brand & pack', body: 'In-house branding and premium packaging, kitted and quality-checked by hand.' },
  { icon: <Sprig size={28} color="#9E7C30" />, title: 'Deliver anywhere', body: 'Warehousing, redemption portals and doorstep delivery across 35+ countries.' },
]

function Stat({ s }) {
  const ref = useRef(null)
  useCountUp(ref, s.num)
  return (
    <div data-reveal className="text-center">
      <div className="font-serif text-accent leading-none" style={{ fontSize: 'clamp(30px,3.4vw,46px)' }}>
        <span ref={ref}>0</span>
        {s.suffix}
      </div>
      <div className="text-[13px] text-muted mt-2">{s.lbl}</div>
    </div>
  )
}

export function Highlights() {
  const grid = useReveal({ stagger: 0.08 })
  const statRef = useReveal({ stagger: 0.08 })
  return (
    <Section doodles doodleSeed={0}>
      <SectionHead
        center
        eyebrow="How we help"
        title="An end-to-end gifting partner"
        lead="From the first idea to the doorstepwe make corporate gifts that arrive feeling personal."
      />
      <div ref={grid} className="grid md:grid-cols-3 gap-6">
        {items.map((it) => (
          <div key={it.title} data-reveal className="card card-hover p-7 md:p-8 flex flex-col gap-4">
            <div className="icon-chip">{it.icon}</div>
            <h4 className="font-serif text-[19px]">{it.title}</h4>
            <p className="lead text-[15px]">{it.body}</p>
            <Link to="/solutions" className="text-[14px] font-semibold text-accent mt-1 inline-flex items-center gap-1.5">
              Learn more <span aria-hidden>→</span>
            </Link>
          </div>
        ))}
      </div>
      <div ref={statRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-12" style={{ borderTop: '1px solid var(--line)' }}>
        {stats.map((s) => (
          <Stat key={s.lbl} s={s} />
        ))}
      </div>
    </Section>
  )
}
