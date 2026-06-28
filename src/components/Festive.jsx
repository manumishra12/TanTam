// Flat festive graphic accents inspired by the reference postersswallowtail
// bunting, a thin squiggle line, a radiating burst-star, and confetti dots.

const RED = '#7e1d1a'
const GOLD = '#c7a24e'
const CREAM = '#f3e7c9'

// Draped swallowtail bunting (img-4 style). Stretches to its container width.
export function Bunting({ className = '', style, colors = [RED, GOLD, CREAM, '#a8362c'] }) {
  const n = 13
  const flags = []
  for (let i = 0; i < n; i++) {
    const x = i * 62 + 8
    const dip = Math.sin((i / (n - 1)) * Math.PI) * 10
    const y = 18 + dip
    flags.push(
      <path
        key={i}
        d={`M${x} ${y} L${x + 48} ${y} L${x + 48} ${y + 50} L${x + 24} ${y + 36} L${x} ${y + 50} Z`}
        fill={colors[i % colors.length]}
      />,
    )
  }
  return (
    <svg viewBox="0 0 800 90" preserveAspectRatio="none" className={className} style={style} aria-hidden="true">
      <path d="M0 22 Q400 36 800 22" stroke={GOLD} strokeWidth="2" fill="none" opacity="0.7" />
      {flags}
    </svg>
  )
}

// Thin hand-drawn squiggle line.
export function Squiggle({ color = CREAM, className = '', style, width = 3 }) {
  return (
    <svg viewBox="0 0 320 80" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M4 40 C 36 6, 64 74, 104 40 S 168 6, 208 40 S 280 74, 316 40"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
      />
    </svg>
  )
}

// A radiating burst-star (the festive sunburst used as a divider mark).
export function Burst({ size = 40, color = GOLD, className = '', style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <g fill={color}>
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d="M50 50 L46 8 L54 8 Z" transform={`rotate(${i * 30} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="9" />
      </g>
    </svg>
  )
}

// Scattered confetti dots (decorative).
export function Confetti({ className = '', color = GOLD }) {
  const dots = [
    [8, 18, 4], [22, 60, 3], [40, 12, 5], [60, 70, 3], [78, 24, 4],
    [90, 58, 5], [50, 40, 3], [30, 86, 4], [70, 10, 3], [95, 84, 4],
  ]
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={`pointer-events-none ${className}`} aria-hidden="true">
      {dots.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={0.5} />
      ))}
    </svg>
  )
}
