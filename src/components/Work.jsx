import { useRef } from 'react'
import { A, work } from '../data/content'
import { Section, SectionHead } from './ui'
import { useReveal, useParallax } from '../lib/motion'

function Tile({ w, tall }) {
  const bg = useRef(null)
  useParallax(bg, { distance: 60 })
  return (
    <figure data-reveal className={`relative overflow-hidden rounded-[4px] ${tall ? 'row-span-2' : ''}`} style={{ minHeight: tall ? 480 : 232 }}>
      <div ref={bg} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${A(w.img)})`, transform: 'scale(1.18)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(44,19,16,.82))' }} />
      <figcaption className="absolute left-5 bottom-5 right-5 font-hand text-[18px] text-cream">{w.label}</figcaption>
    </figure>
  )
}

export function Work() {
  const ref = useReveal()
  return (
    <Section>
      <SectionHead eyebrow="Past work" title="The moments we helped create" />
      <div ref={ref} className="grid md:grid-cols-3 gap-5 md:auto-rows-[232px]">
        <Tile w={work[0]} tall />
        <Tile w={work[1]} />
        <Tile w={work[2]} />
      </div>
    </Section>
  )
}
