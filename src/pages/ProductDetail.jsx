import { Link, useParams } from 'react-router-dom'
import { Section, WaxSeal } from '../components/ui'
import { GoldRule, Snowflake } from '../components/GoldPattern'
import { A, products } from '../data/content'
import { useReveal } from '../lib/motion'

const specs = [
  ['Branding', 'Logo print, deboss or engrave'],
  ['Packaging', 'Premium rigid box + sleeve'],
  ['MOQ', '50 units'],
  ['Lead time', '7–14 working days'],
]

export function ProductDetail() {
  const { id } = useParams()
  const ref = useReveal()
  const p = products.find((x) => x.id === id) || products[0]
  const related = products.filter((x) => x.id !== p.id).slice(0, 3)

  return (
    <>
      <div className="pt-28 md:pt-32 bg-paper">
        <div className="container-x" ref={ref}>
          <nav className="text-[12.5px] text-muted mb-8" data-reveal>
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-accent">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-accent">{p.name}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div data-reveal className="rounded-[4px] overflow-hidden" style={{ boxShadow: '0 30px 70px -34px rgba(44,19,16,.45)' }}>
              <div className="aspect-[4/5] bg-cover bg-center" style={{ backgroundImage: `url(${A(p.img)})` }} />
            </div>
            <div data-reveal className="lg:pt-6">
              <Snowflake size={40} className="mb-4 opacity-70" />
              <p className="text-[11px] tracking-[.18em] uppercase text-gold-deep">{p.cat}</p>
              <h1 className="display text-[clamp(34px,4.6vw,58px)] mt-3">{p.name}</h1>
              <p className="lead mt-4">{p.tagline}. Considered, brandable and beautifully packedbuilt to make your team or partners feel genuinely valued.</p>
              <div className="flex items-center gap-4 mt-6">
                <span className="font-serif text-[28px] font-semibold">{p.price}</span>
                <span className="text-sm text-muted">per unit · before branding</span>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-5 mt-8">
                {specs.map(([k, v]) => (
                  <div key={k} className="border-t border-line pt-3">
                    <div className="text-[11px] tracking-[.14em] uppercase text-muted">{k}</div>
                    <div className="text-[15px] mt-1">{v}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3.5 mt-9">
                <Link to="/enquiry" className="btn btn-primary">Request a quote →</Link>
                <Link to="/products" className="btn btn-outline">Back to catalog</Link>
              </div>
              <div className="flex items-center gap-3 mt-8">
                <WaxSeal size={44} />
                <span className="font-hand text-accent text-xl">customised to your brand</span>
              </div>
            </div>
          </div>
          <GoldRule className="mt-20" label="✦  you may also like  ✦" />
        </div>
      </div>
      <Section py="py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {related.map((r) => (
            <Link key={r.id} to={`/products/${r.id}`} className="group block">
              <div className="overflow-hidden rounded-[4px]" style={{ boxShadow: '0 10px 30px -18px rgba(44,19,16,.35)' }}>
                <div className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]" style={{ backgroundImage: `url(${A(r.img)})` }} />
              </div>
              <h4 className="font-serif text-[18px] font-semibold mt-3">{r.name}</h4>
              <p className="text-sm text-muted">{r.price}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
