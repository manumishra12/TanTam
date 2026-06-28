import { Link } from 'react-router-dom'
import { GoldPattern, MotifBand } from './GoldPattern'

const cols = [
  { h: 'Shop', links: [['Categories', '/categories'], ['Occasions', '/occasions'], ['Diwali Gifting', '/diwali'], ['Shop All', '/products']] },
  { h: 'Company', links: [['About Us', '/about'], ['Our Solutions', '/solutions'], ['Experiential', '/experiential'], ['Enquire', '/enquiry']] },
  { h: 'Connect', links: [['hello@tantam.in', '/enquiry'], ['+91 98000 00000', '/enquiry'], ['Bulk Enquiry', '/enquiry']] },
]

export function Footer() {
  return (
    <footer className="relative z-[2] overflow-hidden text-cream on-red" style={{ background: 'var(--red-deep)' }}>
      <GoldPattern opacity={0.1} />
      <div className="relative z-[1] px-6 md:px-10 pt-16">
        <MotifBand className="max-w-[1280px] mx-auto mb-12" color="#DDBE74" dim />
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 pb-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid place-items-center w-8 h-8 rounded-full text-[14px] font-bold" style={{ background: 'radial-gradient(circle at 35% 30%,#9e2b22,#3a100e)', color: 'var(--gold-light)' }}>
                T
              </span>
              <span className="font-serif font-semibold text-3xl">TanTam</span>
            </div>
            <p className="text-[14px] leading-relaxed mt-4 max-w-[300px] text-cream/70">
              Your enterprise gifting &amp; merchandise partner. Thoughtfully curated gifting for every relationship, occasion &amp; celebration.
            </p>
            <p className="font-hand text-2xl mt-5 text-gold-light">every gift, a moment worth opening.</p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h5 className="text-[12px] tracking-[.18em] uppercase mb-4 text-gold-light/80">{c.h}</h5>
              {c.links.map(([l, to]) => (
                <Link key={l} to={to} className="block text-[14px] mb-2.5 text-cream/75 transition-all hover:text-gold-light hover:pl-1">
                  {l}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="max-w-[1280px] mx-auto flex flex-wrap justify-between gap-2.5 pt-6 text-[13px] text-cream/55" style={{ borderTop: '1px solid rgba(199,162,78,.25)' }}>
          <span>© 2026 TanTam Gifting. Best Corporate Gifting Agency of the YearKTCC.</span>
          <span>Privacy · Terms · Sitemap</span>
        </div>
        <div className="h-9" />
      </div>
    </footer>
  )
}
