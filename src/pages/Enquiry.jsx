import { useState } from 'react'
import { A } from '../data/content'
import { GoldPattern } from '../components/GoldPattern'

// ornate red corner flourish (one drawing, rotated into each corner)
function Corner({ style }) {
  return (
    <svg className="pc-corner" viewBox="0 0 40 40" fill="none" style={style} aria-hidden="true">
      <path d="M3 39 V15 C3 8 8 3 15 3 H39" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 39 V17 C9 12 12 9 17 9 H39" stroke="currentColor" strokeWidth="1" opacity=".8" />
      <path d="M9 9 c4 0 7 3 7 7 c0 3 -2 5 -5 5 c-2 0 -3 -1 -3 -3 c0 -1.5 1 -2.5 2.5 -2.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="9.5" cy="9.5" r="1.4" fill="currentColor" />
    </svg>
  )
}

// a small perforated postage stamp, brand colours
function Stamp() {
  return (
    <span className="pc-stamp inline-block" style={{ width: 76 }}>
      <svg viewBox="0 0 64 84" className="block w-full h-auto" aria-hidden="true">
        <rect x="2.5" y="2.5" width="59" height="79" fill="none" stroke="#a8362c" strokeWidth="1.8" />
        <text x="32" y="13" textAnchor="middle" fontFamily="'Special Elite',monospace" fontSize="6.4" fill="#a8362c" letterSpacing=".4">THE TANTAM</text>
        <text x="32" y="21" textAnchor="middle" fontFamily="'Special Elite',monospace" fontSize="6.4" fill="#a8362c" letterSpacing=".4">EXPRESS</text>
        <g stroke="#a8362c" strokeWidth="1.7" fill="none" strokeLinejoin="round">
          <rect x="19" y="34" width="26" height="21" rx="1.5" fill="#efd9b6" />
          <path d="M19 41.5h26M32 34v21" />
          <path d="M32 34c-5-1.6-8-6.6-3-8.6 3 1 3 4.8 3 8.6Zm0 0c5-1.6 8-6.6 3-8.6-3 1-3 4.8-3 8.6Z" fill="#e2c069" stroke="#9e7c30" />
        </g>
        <text x="9" y="76" fontFamily="'Special Elite',monospace" fontSize="11" fontWeight="700" fill="#a8362c">4</text>
        <text x="40" y="69" textAnchor="middle" fontFamily="'Special Elite',monospace" fontSize="4.4" fill="#a8362c" letterSpacing=".3">GIFTING</text>
        <text x="40" y="75" textAnchor="middle" fontFamily="'Special Elite',monospace" fontSize="4.4" fill="#a8362c" letterSpacing=".3">POST</text>
      </svg>
    </span>
  )
}

function Postmark({ className = '', style }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={{ color: 'var(--accent)', opacity: 0.4, ...style }} aria-hidden="true">
      <defs>
        <path id="pmEnq" d="M60,60 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
      </defs>
      <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 4" />
      <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <text fontSize="9" fontWeight="700" letterSpacing="2.4" fill="currentColor" fontFamily="Inter, sans-serif">
        <textPath href="#pmEnq" startOffset="3%">TANTAM · GIFTING CO · 2026 ·</textPath>
      </text>
      <text x="60" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="currentColor" fontFamily="Inter, sans-serif" letterSpacing="1">POST</text>
    </svg>
  )
}

// one dotted "address line" field
function Line({ label, name, type = 'text', placeholder, required }) {
  return (
    <label className="block">
      <span className="pc-label">{label}</span>
      <input className="pc-input mt-1" type={type} name={name} placeholder={placeholder} required={required} />
    </label>
  )
}

export function Enquiry() {
  const [sent, setSent] = useState(false)
  return (
    <main data-nav-dark className="pc-bg relative min-h-screen overflow-hidden pt-28 pb-20 md:pt-32 md:pb-28">
      <GoldPattern opacity={0.06} />

      <div className="container-x relative z-[1]">
        {/* intro */}
        <div className="on-red text-center text-cream mb-10 md:mb-12">
          <span className="eyebrow">Enquire · Contact</span>
          <h1 className="display mt-4 text-cream" style={{ fontSize: 'clamp(34px,5.2vw,68px)' }}>Send us a postcard</h1>
          <p className="lead text-cream/75 mt-4 max-w-[560px] mx-auto">
            Tell us the occasion, headcount and budget — we’ll curate, brand and deliver. Volume pricing
            and a dedicated account manager included.
          </p>
        </div>

        {/* postcard (with a second card peeking behind for depth) */}
        <div className="relative mx-auto max-w-[1040px]">
          <div
            className="absolute inset-0 rounded-[4px] hidden sm:block"
            style={{ background: '#e7d8b6', transform: 'rotate(2.4deg) translate(6px,14px)', boxShadow: '0 40px 70px -42px rgba(0,0,0,.55)' }}
            aria-hidden="true"
          />
          <div className="pc-card relative rounded-[4px]" style={{ transform: 'rotate(-0.7deg)' }}>
            <div className="pc-frame relative m-3 md:m-4 p-5 sm:p-7 md:p-9">
              <Corner style={{ top: 4, left: 4 }} />
              <Corner style={{ top: 4, right: 4, transform: 'scaleX(-1)' }} />
              <Corner style={{ bottom: 4, left: 4, transform: 'scaleY(-1)' }} />
              <Corner style={{ bottom: 4, right: 4, transform: 'scale(-1,-1)' }} />

              <form
                className="relative grid md:grid-cols-2"
                onSubmit={(e) => { e.preventDefault(); setSent(true) }}
              >
                {/* centre divider */}
                <div className="pointer-events-none absolute left-1/2 top-1 bottom-1 hidden md:block" style={{ borderLeft: '2px solid var(--accent)' }} aria-hidden="true" />

                {/* ---------- LEFT : photo + typewritten message ---------- */}
                <div className="md:pr-9">
                  <div className="rounded-[2px] overflow-hidden" style={{ border: '2px solid var(--accent)', boxShadow: '0 8px 18px -12px rgba(44,19,16,.5)' }}>
                    <div
                      className="aspect-[16/10] bg-cover bg-center"
                      style={{ backgroundImage: `url(${A('gift-ribbon.jpg')})`, filter: 'sepia(.55) saturate(.85) contrast(1.02) brightness(.96)' }}
                    />
                  </div>
                  <p className="pc-type text-center text-accent text-[11px] tracking-wide mt-2 mb-5">
                    The TanTam Gifting Atelier — est. 2013
                  </p>

                  <div className="pc-type text-[13.5px] leading-[1.7] text-accent-deep/90">
                    <p>Dear future partner,</p>
                    <p className="mt-2.5">
                      &nbsp;&nbsp;&nbsp;&nbsp;Every great gift begins with a conversation. Tell us the occasion, the
                      headcount and the feeling you’d love to leave behind — and we’ll curate, brand, pack
                      and deliver it, beautifully, across 35+ countries.
                    </p>
                  </div>

                  <div className="mt-5 pl-1">
                    <p className="pc-type text-[13px] text-accent-deep/80">Warmly,</p>
                    <p className="script text-accent leading-none" style={{ fontSize: 34 }}>Team TanTam</p>
                    <p className="script text-accent-deep/70" style={{ fontSize: 21 }}>“Curators of corporate gifting”</p>
                  </div>

                  <p className="pc-type text-[12px] leading-[1.7] text-accent-deep/75 mt-5">
                    P.S. — Share your timeline &amp; budget and we’ll send ideas (and pricing) back within
                    one business day.
                  </p>
                </div>

                {/* ---------- RIGHT : "Postcard" + stamp + address form ---------- */}
                <div className="md:pl-9 mt-10 md:mt-0 relative">
                  <div className="flex items-start justify-between gap-3">
                    <span className="pc-blackletter text-accent leading-none" style={{ fontSize: 'clamp(40px,5vw,60px)' }}>
                      Postcard
                    </span>
                    <div className="relative shrink-0">
                      <Stamp />
                      <Postmark className="absolute -left-9 top-6 w-[88px] h-[88px]" />
                    </div>
                  </div>

                  <div className="mt-7 grid gap-4">
                    <Line label="To" name="name" placeholder="Your name" required />
                    <Line label="Company" name="company" placeholder="Company name" required />
                    <Line label="Work email" name="email" type="email" placeholder="you@company.com" required />
                    <Line label="Phone" name="phone" placeholder="+91 ·····" />
                    <Line label="Occasion" name="occasion" placeholder="Diwali · onboarding · R&R" />
                    <label className="block">
                      <span className="pc-label">Message</span>
                      <textarea className="pc-input mt-1" name="message" rows={2} placeholder="Quantity, budget, timeline…" />
                    </label>
                  </div>

                  <button className="btn btn-primary mt-7 w-full justify-center" disabled={sent}>
                    {sent ? 'Posted — we’ll write back ✦' : 'Post my enquiry'} <span className="arr">→</span>
                  </button>
                  <p className="pc-type text-center text-[11px] text-accent-deep/55 mt-3">
                    We typically reply within one business day.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
