import { useEffect, useRef } from 'react'

// A wax-seal cursor (dot) trailed by a soft ring. Disabled on touch / coarse
// pointers and when reduced-motion is requested.
export function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    document.body.classList.add('has-cursor')
    const d = dot.current
    const r = ring.current
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      d.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      const t = e.target
      const interactive = t.closest('a, button, .tilt, input, textarea, [data-cursor]')
      document.body.classList.toggle('cursor-hover', !!interactive)
    }
    const onDown = () => d && (d.style.filter = 'brightness(.85)')
    const onUp = () => d && (d.style.filter = '')

    let raf
    const loop = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      if (r) r.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    loop()

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      cancelAnimationFrame(raf)
      document.body.classList.remove('has-cursor', 'cursor-hover')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true">
        T
      </div>
    </>
  )
}
