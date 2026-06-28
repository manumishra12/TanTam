import { forwardRef, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { A, diary } from '../data/content'
import { Section, Eyebrow } from './ui'

const Leaf = forwardRef(function Leaf({ children, tone = 'paper' }, ref) {
  const bg = tone === 'cover' ? '#7e1d1a' : tone === 'kraft' ? '#f1e7d2' : '#fcf8ee'
  return (
    <div ref={ref} className="diary-leaf" style={{ background: bg, boxShadow: 'inset 0 0 0 1px rgba(199,162,78,.18)' }}>
      <div className="leaf-bg" style={{ background: bg }} />
      <div className="diary-stitch">{children}</div>
    </div>
  )
})

function CoverFace({ data }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center p-8" style={{ color: 'var(--gold-light)' }}>
      <span className="text-[11px] tracking-[.4em] uppercase opacity-70">TanTam · Gifting Co</span>
      <h3 className="font-serif font-semibold text-[34px] md:text-[40px] leading-tight mt-6 whitespace-pre-line">{data.title}</h3>
      <div className="my-7 w-16 h-px" style={{ background: 'rgba(221,190,116,.5)' }} />
      <p className="font-hand text-2xl">{data.sub}</p>
      <span className="wax mt-8" style={{ width: 64, height: 64, fontSize: 24 }} aria-hidden="true">T</span>
    </div>
  )
}

function Spread({ data }) {
  return (
    <div className="h-full w-full flex flex-col p-6 md:p-7">
      <div className="flex items-center justify-between mb-3">
        <span className="font-hand text-accent text-2xl">{data.chapter}</span>
        <span className="text-gold-deep text-lg">✦</span>
      </div>
      <div className="rounded-[3px] h-[42%] bg-cover bg-center mb-4" style={{ backgroundImage: `url(${A(data.img)})`, border: '3px solid #fff', boxShadow: '0 14px 30px -16px rgba(44,19,16,.5)' }} />
      <h4 className="font-serif font-semibold text-[22px] md:text-[26px] leading-tight">{data.title}</h4>
      <p className="lead text-[14.5px] mt-2">{data.note}</p>
      <ul className="mt-3 space-y-1.5">
        {data.items.map((it) => (
          <li key={it} className="flex items-center gap-2 text-[14px] text-ink">
            <span className="text-gold-deep">✦</span>
            {it}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-3 text-[12px] text-muted flex justify-between" style={{ borderTop: '1px solid var(--line)' }}>
        <span>tantam.in</span>
        <span className="font-hand text-base text-accent">curated with care</span>
      </div>
    </div>
  )
}

function BackFace({ data }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center p-8">
      <h3 className="font-serif font-semibold text-[26px] md:text-[30px] leading-tight whitespace-pre-line">{data.title}</h3>
      <div className="my-6 w-16 h-px bg-gold" />
      <p className="lead">{data.sub}</p>
      <a href="/enquiry" className="btn btn-accent mt-7">Start your hamper →</a>
    </div>
  )
}

export function Diary() {
  const book = useRef(null)
  const [page, setPage] = useState(0)
  const total = diary.length
  const flip = (dir) => {
    const api = book.current?.pageFlip?.()
    if (!api) return
    dir > 0 ? api.flipNext() : api.flipPrev()
  }
  return (
    <Section id="catalog" tone="alt">
      <div className="text-center mb-12">
        <Eyebrow>The Gifting Diary</Eyebrow>
        <h2 className="h2 mt-3">Flip through our collections</h2>
        <p className="lead mx-auto max-w-[560px] mt-3">A page-turning catalog of curated gifting stories. Drag a corner, or use the arrows.</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="diary-wrap">
          <HTMLFlipBook
            ref={book}
            width={420}
            height={560}
            size="stretch"
            minWidth={280}
            maxWidth={520}
            minHeight={400}
            maxHeight={680}
            maxShadowOpacity={0.5}
            showCover
            mobileScrollSupport
            drawShadow
            flippingTime={800}
            className="diary-book"
            onFlip={(e) => setPage(e.data)}
          >
            {diary.map((d, i) => (
              <Leaf key={i} tone={d.kind === 'cover' ? 'cover' : d.kind === 'spread' && i % 2 ? 'kraft' : 'paper'}>
                {d.kind === 'cover' && <CoverFace data={d} />}
                {d.kind === 'spread' && <Spread data={d} />}
                {d.kind === 'back' && <BackFace data={d} />}
              </Leaf>
            ))}
          </HTMLFlipBook>
        </div>
        <div className="flex items-center gap-5 mt-8">
          <button onClick={() => flip(-1)} className="icon-round" aria-label="Previous page">←</button>
          <span className="font-hand text-accent text-xl tabular-nums">{Math.min(page + 1, total)} / {total}</span>
          <button onClick={() => flip(1)} className="icon-round" aria-label="Next page">→</button>
        </div>
      </div>
    </Section>
  )
}
