// Hand-drawn, gift-themed doodles scattered as a faint background layer on the
// cream home sections — like ink sketches in the margins of a gifting journal.
const INK = '#9e7c30' // antique-gold ink

const P = (d, w = 2.2) => (
  <path d={d} fill="none" stroke={INK} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
)
const Dot = (cx, cy, r = 2) => <circle cx={cx} cy={cy} r={r} fill={INK} />

// each doodle lives in a 0..100 box, centred
const DOODLES = {
  gift: (
    <svg viewBox="0 0 100 100" className="w-full h-auto">
      {P('M24 50 Q23 48 26 48 L74 47 Q77 47 76 50 L77 83 Q77 85 74 84 L26 85 Q23 85 24 83 Z')}
      {P('M19 49 Q50 44 81 49')}
      {P('M50 49 L50 84')}
      {P('M24 65 Q50 62 76 65', 1.8)}
      {P('M50 48 C43 39 27 40 33 47 C37 52 47 51 50 48')}
      {P('M50 48 C57 39 73 40 67 47 C63 52 53 51 50 48')}
      {P('M50 48 L47 43 M50 48 L53 43', 1.8)}
    </svg>
  ),
  bow: (
    <svg viewBox="0 0 100 100" className="w-full h-auto">
      {P('M50 50 C35 33 16 40 27 53 C36 63 47 55 50 50')}
      {P('M50 50 C65 33 84 40 73 53 C64 63 53 55 50 50')}
      {P('M50 51 C46 64 40 76 33 85')}
      {P('M50 51 C54 64 60 76 67 85')}
      {P('M45 47 Q50 43 55 47 Q53 54 50 54 Q47 54 45 47 Z', 1.8)}
    </svg>
  ),
  balloon: (
    <svg viewBox="0 0 100 100" className="w-full h-auto">
      {P('M50 16 C67 16 71 38 60 53 C56 59 52 61 50 63 C48 61 44 59 40 53 C29 38 33 16 50 16 Z')}
      {P('M47 63 L53 63 L50 68 Z', 1.8)}
      {P('M50 68 Q57 76 49 82 Q42 88 50 96')}
    </svg>
  ),
  star: (
    <svg viewBox="0 0 100 100" className="w-full h-auto">
      {P('M50 20 L58 41 L80 43 L64 58 L69 80 L50 68 L31 80 L36 58 L20 43 L42 41 Z')}
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 100 100" className="w-full h-auto">
      {P('M50 80 C18 58 22 30 41 34 C49 36 50 45 50 45 C50 45 51 36 59 34 C78 30 82 58 50 80 Z')}
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 100 100" className="w-full h-auto">
      {P('M50 22 C52 44 56 48 78 50 C56 52 52 56 50 78 C48 56 44 52 22 50 C44 48 48 44 50 22 Z')}
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 100 100" className="w-full h-auto">
      {P('M40 34 L72 34 L72 74 L40 74 L28 54 Z')}
      <circle cx="42" cy="54" r="3.2" fill="none" stroke={INK} strokeWidth="1.8" />
      {P('M42 50 Q30 40 34 26', 1.8)}
    </svg>
  ),
  candy: (
    <svg viewBox="0 0 100 100" className="w-full h-auto">
      {P('M42 32 C42 18 66 18 66 32 L66 80')}
      {P('M45 34 L60 30', 1.8)}
      {P('M43 46 L64 42', 1.8)}
      {P('M66 56 L48 60', 1.8)}
      {P('M66 70 L57 72', 1.8)}
    </svg>
  ),
  popper: (
    <svg viewBox="0 0 100 100" className="w-full h-auto">
      {P('M22 78 L50 54 L42 46 Z')}
      {P('M52 50 L64 38')}
      {P('M55 53 L72 49')}
      {P('M54 60 L70 66')}
      {P('M50 46 L60 30')}
      {Dot(64, 32)}
      {Dot(76, 49)}
      {Dot(73, 68)}
    </svg>
  ),
  swirl: (
    <svg viewBox="0 0 100 100" className="w-full h-auto">
      {P('M16 52 Q28 34 40 52 T64 52 T88 52')}
    </svg>
  ),
}

// edge-biased scatter so doodles frame the content rather than sit on it
const LAYOUT = [
  { k: 'gift', x: 7, y: 16, s: 110, r: -12, o: 0.16 },
  { k: 'sparkle', x: 22, y: 9, s: 44, r: 0, o: 0.2 },
  { k: 'balloon', x: 90, y: 13, s: 92, r: 10, o: 0.14 },
  { k: 'star', x: 80, y: 33, s: 56, r: -8, o: 0.16 },
  { k: 'bow', x: 5, y: 56, s: 96, r: 8, o: 0.14 },
  { k: 'heart', x: 13, y: 85, s: 56, r: -6, o: 0.16 },
  { k: 'candy', x: 93, y: 62, s: 76, r: 14, o: 0.14 },
  { k: 'tag', x: 86, y: 87, s: 88, r: -10, o: 0.15 },
  { k: 'popper', x: 49, y: 7, s: 82, r: 6, o: 0.13 },
  { k: 'swirl', x: 42, y: 93, s: 128, r: 0, o: 0.12 },
  { k: 'sparkle', x: 64, y: 80, s: 36, r: 0, o: 0.2 },
  { k: 'star', x: 30, y: 42, s: 40, r: 12, o: 0.12 },
]

export function SketchDoodles({ seed = 0, opacity = 1, count = LAYOUT.length, maxY = 100 }) {
  const n = LAYOUT.length
  const start = (((seed * 5) % n) + n) % n
  const arr = [...LAYOUT.slice(start), ...LAYOUT.slice(0, start)].filter((it) => it.y <= maxY).slice(0, count)
  const flip = seed % 2 === 1
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ opacity }}>
      {arr.map((it, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${flip ? 100 - it.x : it.x}%`,
            top: `${it.y}%`,
            width: it.s,
            transform: `translate(-50%, -50%) rotate(${it.r}deg)`,
            opacity: it.o,
          }}
        >
          {DOODLES[it.k]}
        </div>
      ))}
    </div>
  )
}
