import { Link } from 'react-router-dom'
import { PageHero } from '../components/ui'
import { FadeImage } from '../components/FadeImage'
import { PostcardLetter } from '../components/PostcardLetter'
import { Eyebrow } from '../components/ui'
import { experiential } from '../data/content'
import { useReveal } from '../lib/motion'

function Block({ item }) {
  const ref = useReveal()
  return (
    <section className="relative min-h-[74vh] md:min-h-[82vh] flex items-center overflow-hidden bg-paper">
      <FadeImage img={item.img} side="right" bg={FadeImage.CREAM} parallax />
      <div className="container-x w-full relative z-[1]">
        <div ref={ref} className="max-w-[520px] text-left">
          <span data-reveal>
            <Eyebrow>{item.eyebrow || 'Experiential'}</Eyebrow>
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
          <Link to="/enquiry" data-reveal className="btn btn-primary mt-8">
            {item.cta || 'Plan this'} <span className="arr">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function Experiential() {
  return (
    <>
      <PageHero
        crumb="Experiential"
        eyebrow="Experiential Gifting"
        title={'Gifts that become\nmemories'}
        lead="Beyond the boxcurated experiences, gourmet moments and surprise-and-delight at scale."
      />
      {experiential.map((item) => (
        <Block key={item.title} item={item} />
      ))}
      <PostcardLetter
        tone="cream"
        title="DESIGN AN EXPERIENCE"
        heading="Let’s craft a memory,"
        body="Tastings, workshops, getaways and surprise-and-delight at scaletell us the vibe and the headcount, and we’ll orchestrate the rest."
        cta="Start designing"
      />
    </>
  )
}
