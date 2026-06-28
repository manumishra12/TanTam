import { Link } from 'react-router-dom'
import { GeoMosaic } from './GeoMosaic'
import { Bunting, Squiggle, Burst } from './Festive'
import { useReveal } from '../lib/motion'

// A bold, modern festive graphic bandheavy condensed type, a swallowtail
// bunting, a squiggle, and a geometric festive mosaic that DISSOLVES into the
// red on the right (no boxed cardthe editorial blend used across the site).
export function FestiveBand() {
  const ref = useReveal()
  return (
    <section className="relative overflow-hidden bg-red on-red text-cream">
      <Bunting className="absolute top-0 left-0 w-full z-[2]" style={{ height: 72 }} />

      {/* festive mosaic, full-bleed on the right, melting into the section red
          on the text sidesits below the bunting so the flags stay clean */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 top-[84px] overflow-hidden" aria-hidden="true">
        <GeoMosaic cols={6} rows={5} cover />
        {/* dissolve into the red on the LEFTthe side the text sits onso the
            mosaic only emerges on the far right and never crowds the copy */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, #7e1d1a 0%, #7e1d1a 50%, rgba(126,29,26,.82) 64%, rgba(126,29,26,.35) 80%, rgba(126,29,26,0) 96%)' }}
        />
        {/* gentle top/bottom settle so the mosaic never hard-edges the band */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #7e1d1a 0%, rgba(126,29,26,.45) 10%, transparent 26%, transparent 80%, rgba(126,29,26,.85) 100%)' }}
        />
      </div>

      <div className="container-x pt-28 pb-20 md:pt-32 md:pb-28 relative z-[1] min-h-[78vh] flex items-center" ref={ref}>
        <div className="max-w-[540px]" data-reveal>
          <div className="flex items-center gap-3 mb-5">
            <Burst size={34} color="#ddbe74" />
            <span className="eyebrow">Festive &amp; Diwali gifting</span>
          </div>
          <h2 className="festive-display text-cream">
            Where the
            <br />
            season feels
            <br />
            <span className="text-gold-light">special</span>
          </h2>
          <Squiggle color="#ddbe74" className="w-44 h-8 mt-4" />
          <p className="lead text-cream/80 mt-5 max-w-[440px]">
            Branded hampers, festive kits and seasonal goodiesassembled with care and shipped to
            every doorstep on your list, across India and beyond.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/diwali" className="btn btn-accent">
              Explore festive <span className="arr">→</span>
            </Link>
            <Link to="/enquiry" className="btn btn-outline">
              Plan a campaign
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
