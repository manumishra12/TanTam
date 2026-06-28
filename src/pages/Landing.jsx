import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { Highlights } from '../components/Highlights'
import { Featured } from '../components/Featured'
import { FestiveBand } from '../components/FestiveBand'
import { Marquee } from '../components/Marquee'
import { CtaBand } from '../components/CtaBand'
import { Section, SectionHead, CollectionCard } from '../components/ui'
import { categories } from '../data/content'
import { useReveal } from '../lib/motion'

// A lean home: hero → how we help → featured collections → trusted-by → CTA.
// Everything else lives on its own route.
function CollectionStrip() {
  const ref = useReveal({ stagger: 0.06 })
  return (
    <Section tone="alt" doodles doodleSeed={1}>
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
        <SectionHead className="!mb-0" eyebrow="Collections" title="Find the gift, create the moment" />
        <Link to="/categories" className="btn btn-outline">
          All collections <span className="arr">→</span>
        </Link>
      </div>
      <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {categories.slice(0, 4).map((c, i) => (
          <CollectionCard key={c.slug} index={i} img={c.img} title={c.title} note={c.note} to="/categories" />
        ))}
      </div>
    </Section>
  )
}

export function Landing() {
  return (
    <>
      <Hero />
      <Highlights />
      <Featured />
      <CollectionStrip />
      <FestiveBand />
      <Marquee />
      <CtaBand secondary={{ label: 'Browse the catalog', to: '/products' }} />
    </>
  )
}
