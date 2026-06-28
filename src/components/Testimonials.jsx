import { A, testimonials } from '../data/content'
import { Section, SectionHead } from './ui'
import { useReveal } from '../lib/motion'

export function Testimonials() {
  const grid = useReveal({ stagger: 0.1 })
  return (
    <Section tone="alt">
      <SectionHead center eyebrow="Testimonials" title="Words that mean the most" />
      <div ref={grid} className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <figure key={t.name} data-reveal className="card p-7 md:p-8 flex flex-col gap-5">
            <div className="text-gold tracking-[.18em] text-sm">★★★★★</div>
            <blockquote className="text-[17px] leading-relaxed text-ink">“{t.q}”</blockquote>
            <figcaption className="flex items-center gap-3 mt-auto pt-2">
              <span className="w-11 h-11 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${A(t.avatar)})` }} />
              <span>
                <b className="text-sm block font-semibold">{t.name}</b>
                <small className="text-muted text-[13px]">{t.role}</small>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
