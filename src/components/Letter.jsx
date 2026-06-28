import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Eyebrow } from './ui'
import { Snowflake } from './GoldPattern'

// An envelope whose wax seal breaks, flap swings open, and the letter slides up
// out of the pocketthe brand's note. Scroll-scrubbed. Crimson & gold.
export function Letter() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'center 0.35'] })

  const flapRotate = useTransform(scrollYProgress, [0.08, 0.42], [0, 180])
  const flapZ = useTransform(scrollYProgress, [0.08, 0.2, 0.42], [40, 5, 0])
  const sealOpacity = useTransform(scrollYProgress, [0.04, 0.22], [1, 0])
  const sealScale = useTransform(scrollYProgress, [0.04, 0.26], [1, 1.4])
  const letterY = useTransform(scrollYProgress, [0.3, 0.92], ['14%', '-36%'])
  const letterScale = useTransform(scrollYProgress, [0.3, 0.8], [0.92, 1])
  const letterZ = useTransform(scrollYProgress, [0.28, 0.4], [1, 60])

  return (
    <section id="letter" ref={ref} className="relative py-28 md:py-36 overflow-hidden bg-paper-2">
      <div className="container-x">
        <div className="text-center mb-24 md:mb-32">
          <Eyebrow>A note from us</Eyebrow>
          <h2 className="h2 mt-3">Dear future partner,</h2>
        </div>

        <div className="relative mx-auto pt-8" style={{ maxWidth: 620, perspective: 1600 }}>
          <Snowflake size={54} className="hidden md:block absolute -left-24 top-6 opacity-60" />
          <Snowflake size={42} className="hidden md:block absolute -right-20 top-0 opacity-50" />

          <div className="relative mx-auto" style={{ width: '100%', maxWidth: 560, height: 360, transformStyle: 'preserve-3d' }}>
            <motion.div style={{ x: '-50%', y: letterY, scale: letterScale, zIndex: letterZ }} className="absolute left-1/2 bottom-6 origin-bottom">
              <div
                className="bg-card rounded-[6px] px-7 py-8 md:px-10 md:py-10 text-left"
                style={{
                  width: 'min(86vw, 480px)',
                  boxShadow: '0 40px 80px -36px rgba(44,19,16,.5)',
                  border: '1px solid var(--line)',
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(126,29,26,.06) 32px)',
                }}
              >
                <p className="font-hand text-accent text-2xl mb-3">with warm regards,</p>
                <p className="font-serif text-ink text-[19px] md:text-[21px] leading-relaxed">
                  For twelve years we’ve believed a gift is never just an objectit’s a moment of
                  appreciation, wrapped. We curate, brand, pack and deliver across 35+ countries, so
                  every box you send arrives feeling personal.
                </p>
                <p className="lead mt-4">
                  Welcome kits, festive hampers, leadership gifting and rewardsdesigned, packaged
                  and fulfilled, end to end.
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <span className="wax" style={{ width: 56, height: 56, fontSize: 23 }} aria-hidden="true">T</span>
                  <span className="font-hand text-2xl text-accent">— Team TanTam</span>
                </div>
              </div>
            </motion.div>

            <div className="absolute inset-0 rounded-[8px]" style={{ background: 'linear-gradient(160deg,#efe6cf,#e2d5b6)', border: '1px solid var(--line-2)' }} />
            <div className="absolute inset-0" style={{ zIndex: 30, clipPath: 'polygon(0 38%, 50% 78%, 100% 38%, 100% 100%, 0 100%)', background: 'linear-gradient(160deg,#e9dcbf,#d8c79f)', borderRadius: 8 }} />
            <div className="absolute inset-0" style={{ zIndex: 31, clipPath: 'polygon(0 0, 0 100%, 50% 50%)', background: 'linear-gradient(120deg,#e6d8b8,#d6c397)', borderRadius: 8, opacity: 0.92 }} />
            <div className="absolute inset-0" style={{ zIndex: 31, clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)', background: 'linear-gradient(240deg,#e6d8b8,#d6c397)', borderRadius: 8, opacity: 0.92 }} />

            <motion.div
              style={{ rotateX: flapRotate, zIndex: flapZ, transformOrigin: 'top center', transformStyle: 'preserve-3d', clipPath: 'polygon(0 0, 100% 0, 50% 62%)', background: 'linear-gradient(160deg,#e3d5b3,#d0bd92)', borderRadius: 8 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 62%)', boxShadow: 'inset 0 -2px 8px rgba(0,0,0,.08)' }} />
            </motion.div>

            <motion.div style={{ x: '-50%', opacity: sealOpacity, scale: sealScale, zIndex: 50 }} className="absolute left-1/2">
              <div style={{ position: 'relative', top: 200 }}>
                <span className="wax" style={{ width: 66, height: 66, fontSize: 26 }} aria-hidden="true">T</span>
              </div>
            </motion.div>
          </div>

          <p className="text-center font-hand text-accent text-xl mt-10">keep scrollingthe seal is already broken</p>
        </div>
      </div>
    </section>
  )
}
