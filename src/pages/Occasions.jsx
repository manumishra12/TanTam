import { Link } from 'react-router-dom'
import { PageHero, Section } from '../components/ui'
import { PostcardLetter } from '../components/PostcardLetter'
import { A, occasions } from '../data/content'
import { useReveal } from '../lib/motion'

export function Occasions() {
  const ref = useReveal({ stagger: 0.05 })
  return (
    <>
      <PageHero
        crumb="Occasions"
        eyebrow="Shop by Occasion"
        title={'For every moment\nthat matters'}
        lead="From day-one onboarding to festive celebrations and big-win milestonesgifting matched to the moment."
      />
      <Section>
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {occasions.map((o) => (
            <Link key={o.title} to="/products" data-reveal className="group block">
              <div className="relative overflow-hidden rounded-[4px]" style={{ boxShadow: '0 10px 30px -18px rgba(44,19,16,.35)' }}>
                <div className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]" style={{ backgroundImage: `url(${A(o.img)})` }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,transparent 50%,rgba(44,19,16,.78))' }} />
                <div className="absolute left-5 bottom-5 right-5 text-cream">
                  <h4 className="font-serif text-[20px] font-semibold">{o.title}</h4>
                  <p className="text-[13px] text-cream/75 mt-0.5">{o.note}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <PostcardLetter
        title="GIFT ANY OCCASION"
        to="Your team"
        from="TanTam"
        heading="Whatever the moment…"
        body="Onboarding, festivals, milestones or just-becausetell us who it’s for and the feeling you want, and we’ll design the gift around it."
        cta="Plan an occasion"
      />
    </>
  )
}
