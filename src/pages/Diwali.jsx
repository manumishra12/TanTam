import { Link } from 'react-router-dom'
import { PageHero, Section, SectionHead } from '../components/ui'
import { CtaBand } from '../components/CtaBand'
import { GoldPattern } from '../components/GoldPattern'
import { Bunting } from '../components/Festive'
import { A, diwali } from '../data/content'
import { useReveal } from '../lib/motion'

export function Diwali() {
  const ref = useReveal({ stagger: 0.06 })
  return (
    <>
      <PageHero
        crumb="Diwali Gifting"
        eyebrow="Festive · Diwali"
        title={'The festival of lights,\nthoughtfully gifted'}
        lead="Hampers and festive kits that travel beautifully and arrive feeling like a celebration."
      />
      <Section>
        <SectionHead center eyebrow="This season’s picks" title="Diwali collections" />
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {diwali.picks.map((p) => (
            <Link key={p.title} to="/products" data-reveal className="group block">
              <div className="overflow-hidden rounded-[4px]" style={{ boxShadow: '0 10px 30px -18px rgba(44,19,16,.35)' }}>
                <div className="aspect-[4/5] bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]" style={{ backgroundImage: `url(${A(p.img)})` }} />
              </div>
              <h4 className="font-serif text-[17px] font-semibold mt-3 leading-tight">{p.title}</h4>
            </Link>
          ))}
        </div>
      </Section>
      {/* festive feature band */}
      <section className="relative overflow-hidden bg-red text-cream on-red pt-28 pb-24 md:pt-32 md:pb-28">
        <GoldPattern opacity={0.14} />
        <Bunting className="absolute top-0 left-0 w-full" style={{ height: 64 }} />
        <div className="container-x relative z-[1] text-center max-w-[640px] mx-auto">
          <span className="eyebrow">Custom festive gifting</span>
          <h2 className="h2 text-cream mt-4">Branded hampers, delivered across India &amp; beyond</h2>
          <p className="lead text-cream/80 mt-5">Add your logo, a handwritten note and premium packagingassembled and shipped to every doorstep on your list.</p>
          <Link to="/enquiry" className="btn btn-accent mt-8">Plan Diwali gifting →</Link>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
