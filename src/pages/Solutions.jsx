import { PageHero, Section, SectionHead, FeatureCard } from '../components/ui'
import { FadeImage } from '../components/FadeImage'
import { EnvelopeCta } from '../components/EnvelopeCta'
import { solutions, why } from '../data/content'
import { useReveal } from '../lib/motion'

const STEP_GRADIENTS = [
  { bg: 'linear-gradient(160deg,#a8362c,#7e1d1a)', fg: '#f3e7c9', bubble: 'rgba(243,231,201,.14)' },
  { bg: 'linear-gradient(160deg,#e2c275,#c7a24e)', fg: '#571210', bubble: 'rgba(87,18,16,.12)' },
  { bg: 'linear-gradient(160deg,#f3e7c9,#e7cd8a)', fg: '#7e1d1a', bubble: 'rgba(126,29,26,.1)' },
  { bg: 'linear-gradient(160deg,#7e1d1a,#4f0f0d)', fg: '#ddbe74', bubble: 'rgba(221,190,116,.16)' },
]

export function Solutions() {
  const stepRef = useReveal({ stagger: 0.08 })
  const whyRef = useReveal({ stagger: 0.05 })
  return (
    <>
      <PageHero
        crumb="Our Solutions"
        eyebrow="Our Solutions"
        title={'Curate. Brand.\nPack. Fulfil.'}
        lead="An end-to-end gifting operationfrom the first idea to the doorstep, in 35+ countries."
      />

      {/* four-step processbold gradient number cards */}
      <Section>
        <SectionHead eyebrow="How it works" title="From idea to doorstep" />
        <div ref={stepRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {solutions.map((s, i) => {
            const g = STEP_GRADIENTS[i % STEP_GRADIENTS.length]
            return (
              <div
                key={s.n}
                data-reveal
                className="relative overflow-hidden rounded-[22px] p-6 md:p-7 flex flex-col justify-between"
                style={{ aspectRatio: '3 / 4', background: g.bg, color: g.fg }}
              >
                <span className="absolute -right-7 -top-7 w-28 h-28 rounded-full" style={{ background: g.bubble }} />
                <span className="absolute right-7 bottom-12 w-9 h-9 rounded-full" style={{ background: g.bubble }} />
                <div className="relative">
                  <span className="text-[11px] font-semibold uppercase tracking-[.16em] opacity-80">Step</span>
                  <div className="festive-display mt-1" style={{ fontSize: 'clamp(52px,7vw,80px)' }}>
                    {s.n}
                  </div>
                </div>
                <div className="relative">
                  <h3 className="font-serif text-[18px]">{s.title}</h3>
                  <p className="text-[13px] mt-1.5 leading-snug" style={{ opacity: 0.85 }}>
                    {s.body}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* blended capability image */}
      <section className="relative min-h-[60vh] md:min-h-[64vh] flex items-center overflow-hidden bg-paper-2">
        <FadeImage img="premium-gifts.jpg" side="right" bg="242,238,228" parallax />
        <div className="container-x w-full relative z-[1]">
          <div className="max-w-[480px] text-left">
            <span className="eyebrow">In-house studio</span>
            <h2 className="h2 mt-4">Branding &amp; packaging, done under one roof</h2>
            <p className="lead mt-5">Design, customisation, kitting and quality controlso the details stay consistent at any scale.</p>
          </div>
        </div>
      </section>

      {/* why grid */}
      <Section>
        <SectionHead eyebrow="Why teams choose us" title="Built for scale, obsessed with detail" />
        <div ref={whyRef} className="feature-grid">
          {why.map((w) => (
            <FeatureCard key={w.h} icon={w.ic} title={w.h}>
              {w.p}
            </FeatureCard>
          ))}
        </div>
      </Section>

      <EnvelopeCta />
    </>
  )
}
