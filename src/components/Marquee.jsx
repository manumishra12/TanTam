import { brands } from '../data/content'
import { Eyebrow } from './ui'
import { SketchDoodles } from './SketchDoodles'

export function Marquee() {
  const loop = [...brands, ...brands]
  return (
    <section className="relative overflow-hidden py-16 md:py-20 bg-paper">
      <SketchDoodles seed={2} opacity={0.85} />
      <div className="container-x relative z-[1] text-center mb-8">
        <Eyebrow>Trusted by leaders</Eyebrow>
      </div>
      <div className="marquee relative z-[1]">
        <div className="marquee-track">
          {loop.map((b, i) => (
            <span className="logo-chip" key={i}>
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
