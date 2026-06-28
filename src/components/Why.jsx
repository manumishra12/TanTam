import { why } from '../data/content'
import { Section, SectionHead, FeatureCard } from './ui'
import { useReveal } from '../lib/motion'

export function Why() {
  const grid = useReveal({ stagger: 0.06 })
  return (
    <Section id="why">
      <SectionHead
        eyebrow="Why TanTam"
        title="Behind every great gift is a thoughtful strategy"
        lead="Eight reasons teams trust us with their most important moments of appreciation."
      />
      <div ref={grid} className="feature-grid">
        {why.map((w) => (
          <FeatureCard key={w.h} icon={w.ic} title={w.h}>
            {w.p}
          </FeatureCard>
        ))}
      </div>
    </Section>
  )
}
