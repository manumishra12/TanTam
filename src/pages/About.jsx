import { PageHero, Section, SectionHead } from '../components/ui'
import { FadeImage } from '../components/FadeImage'
import { PostcardLetter } from '../components/PostcardLetter'
import { Letter } from '../components/Letter'
import { Work } from '../components/Work'
import { Testimonials } from '../components/Testimonials'
import { about, stats } from '../data/content'
import { useReveal } from '../lib/motion'

export function About() {
  const storyRef = useReveal()
  const tlRef = useReveal({ stagger: 0.08 })
  const statRef = useReveal({ stagger: 0.08 })
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="About TanTam"
        title={'Gifting, with\nintention'}
        lead="A gifting partnernot a vendor. We make corporate gifts that arrive feeling personal."
      />

      {/* story over a blended photo */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-paper">
        <FadeImage img="hamper.jpg" side="right" bg={FadeImage.CREAM} parallax />
        <div className="container-x relative z-[1]">
          <div ref={storyRef} className="max-w-[520px] space-y-5">
            <span data-reveal>
              <span className="eyebrow">Our story</span>
            </span>
            {about.story.map((p, i) => (
              <p key={i} data-reveal className={i === 0 ? 'font-serif text-[22px] md:text-[26px] leading-snug text-ink' : 'lead'}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* timeline */}
      <Section tone="alt">
        <SectionHead eyebrow="The journey" title="Twelve years in the making" />
        <div ref={tlRef} className="grid md:grid-cols-4 gap-8">
          {about.timeline.map((t) => (
            <div key={t.y} data-reveal className="border-t border-line-2 pt-5">
              <div className="font-serif text-accent text-3xl font-semibold">{t.y}</div>
              <h4 className="font-serif text-[18px] font-semibold mt-2">{t.t}</h4>
              <p className="text-sm text-muted mt-1.5 leading-relaxed">{t.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* stats */}
      <Section>
        <div ref={statRef} className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-8">
          {stats.map((s) => (
            <div key={s.lbl} data-reveal className="border-t border-line pt-6">
              <div className="font-serif font-semibold text-accent leading-none" style={{ fontSize: 'clamp(34px,4vw,52px)' }}>
                {s.num}
                {s.suffix}
              </div>
              <div className="text-sm text-muted mt-2">{s.lbl}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* the brand note (envelope) */}
      <Letter />

      {/* past work + words */}
      <Work />
      <Testimonials />

      <PostcardLetter
        title="A NOTE FROM TANTAM"
        heading="Dear future partner,"
        body="We’d love to help you say thank you, welcome and well-donebeautifully. Tell us the occasion and we’ll take care of the rest, end to end."
      />
    </>
  )
}
