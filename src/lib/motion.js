import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const EASE = 'cubic-bezier(.22,1,.36,1)'

// Reveal children of a container when it scrolls into view. Driven by an
// IntersectionObserver (NOT ScrollTrigger) so it stays reliable after the very
// tall sticky 3D hero + Lenisotherwise ScrollTrigger's stale position math
// can leave content stuck at opacity:0. Any [data-reveal] element animates in.
export function useReveal(opts = {}) {
  const ref = useRef(null)
  const { y = 28, stagger = 0.08, once = true } = opts
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const items = root.hasAttribute('data-reveal')
      ? [root]
      : Array.from(root.querySelectorAll('[data-reveal]'))
    if (!items.length) return

    const show = () =>
      items.forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })

    if (reduced()) {
      show()
      return
    }

    items.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = `translateY(${y}px)`
      el.style.transition = `opacity .8s ${EASE} ${i * stagger}s, transform .8s ${EASE} ${i * stagger}s`
      el.style.willChange = 'opacity, transform'
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show()
            if (once) io.disconnect()
          }
        })
      },
      { threshold: 0.06, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(root)

    // safety net: if anything is still hidden after a beat (e.g. observer never
    // fired because already on-screen at an odd time), force it visible.
    const safety = setTimeout(() => {
      const r = root.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) show()
    }, 1200)

    return () => {
      io.disconnect()
      clearTimeout(safety)
    }
  }, [y, stagger, once])
  return ref
}

// Scroll-scrubbed parallax on an element (ScrollTrigger; visual-only, never
// hides content).
export function useParallax(ref, { distance = 70 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return
    const tween = gsap.fromTo(
      el,
      { yPercent: -distance / 10 },
      {
        yPercent: distance / 10,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )
    return () => {
      tween.scrollTrigger && tween.scrollTrigger.kill()
      tween.kill()
    }
  }, [ref, distance])
}

// Count-up number when it enters view (IntersectionObserver-driven).
export function useCountUp(ref, target, { duration = 1.8 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced()) {
      el.textContent = String(target)
      return
    }
    let done = false
    const run = () => {
      if (done) return
      done = true
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = target >= 100 ? Math.round(obj.v) : obj.v.toFixed(0)
        },
      })
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (run(), io.disconnect())),
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, target, duration])
}
