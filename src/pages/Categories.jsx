import { PageHero, Section, CollectionCard } from '../components/ui'
import { CtaBand } from '../components/CtaBand'
import { Diary } from '../components/Diary'
import { categories } from '../data/content'
import { useReveal } from '../lib/motion'

export function Categories() {
  const ref = useReveal({ stagger: 0.05 })
  return (
    <>
      <PageHero
        crumb="Categories"
        eyebrow="Shop by Category"
        title={'A collection for\nevery connection'}
        lead="Thoughtfully curated gifting solutions for every relationship, occasion and celebration."
      />
      <Section>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((c, i) => (
            <CollectionCard key={c.slug} index={i} img={c.img} title={c.title} note={c.note} to="/products" />
          ))}
        </div>
      </Section>
      <Diary />
      <CtaBand title="Can’t find the right fit?" body="Tell us your briefwe’ll build a custom collection around your team, brand and budget." cta="Brief our team" />
    </>
  )
}
