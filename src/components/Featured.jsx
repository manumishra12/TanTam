import { Link } from 'react-router-dom'
import { featured } from '../data/content'
import { FadeImage } from './FadeImage'
import { Eyebrow } from './ui'
import { useReveal } from '../lib/motion'

// Editorial blocks: a photo dissolves into the cream on the RIGHT, text sits on
// the LEFT, left-aligned (consistent — no centering, no alternating).
function Block({ item }) {
  const ref = useReveal()
  return (
    <div className="relative min-h-[78vh] md:min-h-[86vh] flex items-center overflow-hidden">
      <FadeImage img={item.img} side="right" bg={FadeImage.CREAM} parallax />
      <div className="container-x w-full relative z-[1]">
        <div ref={ref} className="max-w-[520px] text-left">
          <span data-reveal>
            <Eyebrow>{item.eyebrow}</Eyebrow>
          </span>
          <h3 className="h2 mt-5" data-reveal>
            {item.title}
          </h3>
          <p className="lead mt-5" data-reveal>
            {item.body}
          </p>
          {item.extra && (
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink/70" data-reveal>
              {item.extra}
            </p>
          )}
          {item.points && (
            <ul className="mt-6 grid gap-2.5" data-reveal>
              {item.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] text-ink/80">
                  <span className="mt-[7px] h-2 w-2 shrink-0 rotate-45 rounded-[1px]" style={{ background: 'var(--gold)' }} />
                  {p}
                </li>
              ))}
            </ul>
          )}
          <Link to={item.to} data-reveal className="btn btn-primary mt-8">
            {item.cta || 'Explore collection'} <span className="arr">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export function Featured() {
  return (
    <section className="relative bg-paper">
      {featured.map((item) => (
        <Block key={item.title} item={item} />
      ))}
    </section>
  )
}
