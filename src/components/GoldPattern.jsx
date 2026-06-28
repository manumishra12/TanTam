// Gold festive line-artornaments, poinsettia, candles, snowflakes, sprigs,
// fir treesin the spirit of the reference chocolate box. Used as elegant,
// symmetric accents (bands, frames, badges), never busy.

const GOLD = '#C7A24E'
const wrap = (children, size, vb = 100, color = GOLD, sw = 1.4) => (
  <svg width={size} height={size} viewBox={`0 0 ${vb} ${vb}`} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

export function Snowflake({ size = 56, className = '', style, color = GOLD }) {
  return (
    <span className={className} style={style}>
      {wrap(
        <g transform="translate(50 50)">
          {[0, 60, 120].map((a) => (
            <line key={a} x1="0" y1="-40" x2="0" y2="40" transform={`rotate(${a})`} />
          ))}
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <g key={a} transform={`rotate(${a})`}>
              <path d="M0 -40 L-7 -31 M0 -40 L7 -31" />
              <path d="M0 -24 L-6 -17 M0 -24 L6 -17" />
            </g>
          ))}
          <circle r="3.5" />
        </g>,
        size, 100, color,
      )}
    </span>
  )
}

export function Ornament({ size = 60, className = '', style, color = GOLD }) {
  return (
    <span className={className} style={style}>
      {wrap(
        <g>
          <rect x="44" y="6" width="12" height="8" rx="2" />
          <line x1="50" y1="14" x2="50" y2="22" />
          <circle cx="50" cy="56" r="30" />
          <path d="M20 56 H80" />
          <path d="M30 40 Q50 56 70 40 M30 72 Q50 56 70 72" />
          {/* vesica floral inside */}
          <path d="M50 38 Q62 56 50 74 Q38 56 50 38Z" />
          <path d="M32 56 Q50 44 68 56 Q50 68 32 56Z" />
          <circle cx="50" cy="56" r="3" fill={color} />
        </g>,
        size, 100, color,
      )}
    </span>
  )
}

export function Poinsettia({ size = 64, className = '', style, color = GOLD }) {
  return (
    <span className={className} style={style}>
      {wrap(
        <g transform="translate(50 50)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
            <path key={a} d={i % 2 ? 'M0 0 Q5 -22 0 -34 Q-5 -22 0 0' : 'M0 0 Q7 -28 0 -42 Q-7 -28 0 0'} transform={`rotate(${a})`} />
          ))}
          <circle r="5" />
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx="0" cy="-9" r="1.6" fill={color} transform={`rotate(${a})`} />
          ))}
        </g>,
        size, 100, color,
      )}
    </span>
  )
}

export function Candle({ size = 44, className = '', style, color = GOLD }) {
  return (
    <span className={className} style={style}>
      {wrap(
        <g>
          <path d="M50 14 Q44 24 50 32 Q56 24 50 14Z" fill={color} fillOpacity="0.5" />
          <line x1="50" y1="32" x2="50" y2="40" />
          <rect x="42" y="40" width="16" height="40" rx="2" />
          <path d="M40 84 H60 M44 84 V92 M56 84 V92 M40 92 H60" />
        </g>,
        size * 0.6, 100, color,
      )}
    </span>
  )
}

export function Sprig({ size = 80, className = '', style, color = GOLD }) {
  return (
    <span className={className} style={style}>
      <svg width={size} height={size * 0.5} viewBox="0 0 120 60" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
        <path d="M4 30 H116" />
        {[20, 40, 60, 80, 100].map((x, i) => (
          <g key={x}>
            <path d={`M${x} 30 Q${x + 8} ${18} ${x + 16} 16`} />
            <path d={`M${x} 30 Q${x + 8} ${42} ${x + 16} 44`} />
          </g>
        ))}
        <circle cx="116" cy="30" r="2.4" fill={color} />
      </svg>
    </span>
  )
}

export function FirTree({ size = 40, className = '', style, color = GOLD }) {
  return (
    <span className={className} style={style}>
      {wrap(
        <g>
          <line x1="50" y1="14" x2="50" y2="86" />
          <path d="M50 22 L34 40 M50 22 L66 40 M50 38 L30 58 M50 38 L70 58 M50 54 L26 76 M50 54 L74 76" />
        </g>,
        size * 0.7, 100, color, 1.3,
      )}
    </span>
  )
}

export function Sparkle({ size = 22, className = '', style, color = GOLD }) {
  return (
    <span className={className} style={style}>
      {wrap(
        <g transform="translate(50 50)">
          <path d="M0 -44 C6 -12 12 -6 44 0 C12 6 6 12 0 44 C-6 12 -12 6 -44 0 C-12 -6 -6 -12 0 -44Z" />
        </g>,
        size, 100, color, 1.2,
      )}
    </span>
  )
}

// Seamless subtle tiling background for red surfaces.
export function GoldPattern({ opacity = 0.14, scale = 150, className = '', style }) {
  const id = 'gp' + scale
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" style={style}>
      <defs>
        <pattern id={id} width={scale} height={scale} patternUnits="userSpaceOnUse">
          <g fill="none" stroke={GOLD} strokeWidth="1" opacity={opacity}>
            <g transform={`translate(${scale / 2} ${scale / 2})`}>
              {[0, 45, 90, 135].map((a) => (
                <line key={a} x1="0" y1="-15" x2="0" y2="15" transform={`rotate(${a})`} />
              ))}
              <circle r="4" />
            </g>
            {[[0, 0], [scale, 0], [0, scale], [scale, scale]].map(([x, y], i) => (
              <path key={i} d={`M${x} ${y - 6} L${x + 6} ${y} L${x} ${y + 6} L${x - 6} ${y} Z`} />
            ))}
            <circle cx={scale / 2} cy="8" r="1.3" fill={GOLD} stroke="none" />
            <circle cx="8" cy={scale / 2} r="1.3" fill={GOLD} stroke="none" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

// A symmetric horizontal arrangement of motifsa festive divider/accent row.
export function MotifBand({ className = '', color = GOLD, dim = false }) {
  const op = dim ? 0.5 : 0.9
  return (
    <div className={`flex items-center justify-center gap-6 sm:gap-9 ${className}`} style={{ opacity: op }} aria-hidden="true">
      <FirTree size={30} color={color} />
      <Sparkle size={16} color={color} />
      <Snowflake size={40} color={color} />
      <Ornament size={50} color={color} />
      <Poinsettia size={60} color={color} />
      <Ornament size={50} color={color} />
      <Snowflake size={40} color={color} />
      <Sparkle size={16} color={color} />
      <FirTree size={30} color={color} />
    </div>
  )
}

// Thin gold inset frame with corner sparklesthe chocolate-box border.
export function GoldFrame({ inset = 16, className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <div className="absolute" style={{ inset, border: '1px solid rgba(199,162,78,.45)', borderRadius: 10 }} />
      {[
        { top: inset - 11, left: inset - 11 },
        { top: inset - 11, right: inset - 11 },
        { bottom: inset - 11, left: inset - 11 },
        { bottom: inset - 11, right: inset - 11 },
      ].map((pos, i) => (
        <div key={i} className="absolute" style={pos}>
          <Sparkle size={20} />
        </div>
      ))}
    </div>
  )
}

// thin gold rule with a centred sparkle
export function GoldRule({ className = '', color = GOLD }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true" style={{ color }}>
      <span style={{ height: 1, width: 90, background: `linear-gradient(90deg,transparent,${color})` }} />
      <Sparkle size={16} color={color} />
      <span style={{ height: 1, width: 90, background: `linear-gradient(270deg,transparent,${color})` }} />
    </div>
  )
}
