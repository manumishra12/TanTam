// A bold geometric festive mosaica grid of flat Bauhaus-style holiday shapes
// (snowflakes, stars, baubles, trees, arcs, circles) in the TanTam red/gold/
// cream palette. Inspired by the reference geometric Christmas posters.

const PAL = { red: '#7e1d1a', redDark: '#571210', gold: '#c7a24e', goldLt: '#ddbe74', cream: '#f3e7c9' }

// each shape draws inside a 0..100 cell with a single fill colour `c`
const SHAPES = {
  snowflake: (c) => (
    <g stroke={c} strokeWidth="4" fill="none" strokeLinecap="round">
      {[0, 60, 120].map((a) => (
        <line key={a} x1="50" y1="16" x2="50" y2="84" transform={`rotate(${a} 50 50)`} />
      ))}
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <path key={a} d="M50 20 l-8 8 M50 20 l8 8" transform={`rotate(${a} 50 50)`} />
      ))}
    </g>
  ),
  star8: (c) => (
    <g fill={c}>
      {[0, 45].map((a) => (
        <path key={a} d="M50 12 L58 42 L88 50 L58 58 L50 88 L42 58 L12 50 L42 42 Z" transform={`rotate(${a} 50 50)`} opacity={a ? 0.85 : 1} />
      ))}
    </g>
  ),
  bauble: (c) => (
    <g fill="none" stroke={c} strokeWidth="3.5">
      <rect x="45" y="10" width="10" height="7" rx="1.5" fill={c} />
      <line x1="50" y1="17" x2="50" y2="24" />
      <circle cx="50" cy="56" r="28" />
      <path d="M22 56 H78 M28 42 Q50 56 72 42 M28 70 Q50 56 72 70" />
    </g>
  ),
  quatrefoil: (c) => (
    <g fill={c}>
      {[0, 90, 180, 270].map((a) => (
        <path key={a} d="M50 50 Q30 30 50 14 Q70 30 50 50Z" transform={`rotate(${a} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="6" fill={PAL.redDark} />
    </g>
  ),
  tree: (c) => (
    <g fill={c}>
      <path d="M50 12 L66 40 L34 40Z" />
      <path d="M50 30 L72 62 L28 62Z" />
      <path d="M50 48 L80 84 L20 84Z" />
      <rect x="45" y="84" width="10" height="8" />
    </g>
  ),
  quarter: (c) => <path d="M6 94 A88 88 0 0 1 94 6 L94 94 Z" fill={c} />,
  circle: (c) => <circle cx="50" cy="50" r="34" fill={c} />,
  ring: (c) => (
    <g fill="none" stroke={c} strokeWidth="6">
      <circle cx="50" cy="50" r="34" />
      <circle cx="50" cy="50" r="16" />
    </g>
  ),
  half: (c) => <path d="M14 50 A36 36 0 0 1 86 50 Z" fill={c} />,
  diamondGrid: (c) => (
    <g fill={c}>
      {[[50, 24], [26, 50], [74, 50], [50, 76]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 12} L${x + 12} ${y} L${x} ${y + 12} L${x - 12} ${y} Z`} />
      ))}
    </g>
  ),
  cross: (c) => (
    <g fill={c}>
      <rect x="44" y="14" width="12" height="72" rx="3" />
      <rect x="14" y="44" width="72" height="12" rx="3" />
    </g>
  ),
  dots: (c) => (
    <g fill={c}>
      {[[34, 34], [66, 34], [34, 66], [66, 66]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="12" />
      ))}
    </g>
  ),
  stripeBauble: (c) => (
    <g>
      <circle cx="50" cy="54" r="30" fill="none" stroke={c} strokeWidth="3.5" />
      <path d="M50 24 V84 M28 42 H72 M28 66 H72" stroke={c} strokeWidth="3.5" />
    </g>
  ),
}

const SHAPE_KEYS = Object.keys(SHAPES)
const VARIANTS = [
  { bg: 'none', fg: PAL.gold },
  { bg: PAL.gold, fg: PAL.redDark },
  { bg: 'none', fg: PAL.cream },
  { bg: PAL.redDark, fg: PAL.goldLt },
  { bg: PAL.cream, fg: PAL.red },
  { bg: 'none', fg: PAL.goldLt },
]

// Fills its parent (absolute) as a sliced background mosaic, OR inline as a panel.
export function GeoMosaic({ cols = 8, rows = 3, className = '', cover = false, style }) {
  const cells = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c
      const v = VARIANTS[(c * 2 + r * 3 + ((c * r) % 4)) % VARIANTS.length]
      const Shape = SHAPES[SHAPE_KEYS[(c * 3 + r * 5 + c + 1) % SHAPE_KEYS.length]]
      cells.push(
        <g key={i} transform={`translate(${c * 100} ${r * 100})`}>
          {v.bg !== 'none' && <rect width="100" height="100" fill={v.bg} />}
          {Shape(v.fg)}
        </g>,
      )
    }
  }
  return (
    <svg
      viewBox={`0 0 ${cols * 100} ${rows * 100}`}
      preserveAspectRatio={cover ? 'xMidYMid slice' : 'xMidYMid meet'}
      className={cover ? `absolute inset-0 h-full w-full ${className}` : className}
      style={style}
      aria-hidden="true"
    >
      {cells}
    </svg>
  )
}
