import { useState, useEffect } from 'react'
import { playLaserNavSound } from '../utils/audioEffects'

export default function LaserNav() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return

      const targetEl = document.querySelector(href)
      if (!targetEl) return

      e.preventDefault()

      // 1. Subtle Web Audio synth laser chirp
      playLaserNavSound()

      // 2. Trigger top laser beam across viewport
      setActive(true)
      setTimeout(() => setActive(false), 320)

      // 3. Smooth scroll via Lenis or native smooth
      if (window.__lenis) {
        window.__lenis.scrollTo(targetEl, { offset: -20, duration: 1.1 })
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth' })
      }

      // 4. Gentle arrival glow pulse on target section
      targetEl.classList.add('nav-target-pulse')
      setTimeout(() => targetEl.classList.remove('nav-target-pulse'), 1400)
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return (
    <div
      className={`rp-laser-bar ${active ? 'is-active' : ''}`}
      aria-hidden="true"
    />
  )
}

