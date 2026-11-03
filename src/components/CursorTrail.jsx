import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (matchMedia('(pointer: coarse)').matches) return
    const container = containerRef.current
    if (!container) return

    let lastX = 0, lastY = 0, count = 0

    const onMove = (e) => {
      const x = e.clientX, y = e.clientY
      const dist = Math.hypot(x - lastX, y - lastY)
      if (dist < 30) return
      lastX = x; lastY = y; count++

      const dot = document.createElement('span')
      dot.className = 'rp-cursor-dot'
      const sz = 3 + Math.random() * 3
      dot.style.cssText = `left:${x}px;top:${y}px;width:${sz}px;height:${sz}px;`
      container.appendChild(dot)
      setTimeout(() => dot.remove(), 850)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return <div ref={containerRef} className="rp-cursor-trail" aria-hidden="true" />
}
