import { Link } from 'react-router-dom'
import { PageHero, Section } from '../components/ui'
import { EnvelopeCta } from '../components/EnvelopeCta'
import { A, products } from '../data/content'
import { useReveal } from '../lib/motion'

export function Products() {
  const ref = useReveal({ stagger: 0.05 })
  return (
    <>
      <PageHero
        crumb="Shop"
        eyebrow="Product Listing"
        title="The catalog"
        lead="A considered edit of branded, customisable corporate giftsevery item ships with optional branding and premium packaging."
      />
      <Section>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <Link key={p.id} to={`/products/${p.id}`} data-reveal className="group block">
              <div className="overflow-hidden rounded-[4px]" style={{ boxShadow: '0 10px 30px -18px rgba(44,19,16,.35)' }}>
                <div
                  className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
                  style={{ backgroundImage: `url(${A(p.img)})` }}
                />
              </div>
              <div className="flex items-start justify-between mt-4 gap-4">
                <div>
                  <p className="text-[11px] tracking-[.16em] uppercase text-gold-deep">{p.cat}</p>
                  <h4 className="font-serif text-[19px] font-semibold mt-1 leading-tight">{p.name}</h4>
                  <p className="text-sm text-muted mt-1">{p.tagline}</p>
                </div>
                <span className="font-serif text-[17px] font-semibold whitespace-nowrap">{p.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <EnvelopeCta eyebrow="Bulk pricing" title="Ordering at volume? Let’s make it effortless" body="Tiered pricing, custom branding and a single dedicated point of contactfrom a hundred kits to a hundred thousand." />
    </>
  )
}
