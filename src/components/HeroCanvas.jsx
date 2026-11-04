import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let rafId
    let isVisible = true
    let width = 0
    let height = 0

    // Particle nodes
    const NUM_PARTICLES = 42
    let particles = []
    const mouse = { x: -9999, y: -9999, active: false }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          r: 1.2 + Math.random() * 1.6,
          baseAlpha: 0.18 + Math.random() * 0.42,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      if (particles.length === 0) initParticles()
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Track mouse over hero
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }

    const onMouseLeave = () => {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }

    const parent = canvas.parentElement
    if (parent) {
      parent.addEventListener('mousemove', onMouseMove, { passive: true })
      parent.addEventListener('mouseleave', onMouseLeave, { passive: true })
    }

    // Pause when hero is off-screen
    const obs = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    }, { threshold: 0.05 })
    obs.observe(canvas)

    let lastTime = performance.now()

    const animate = (now) => {
      rafId = requestAnimationFrame(animate)
      if (!isVisible) return

      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      ctx.clearRect(0, 0, width, height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.phase += dt * 1.5

        // Boundary wrap
        if (p.x < 0) p.x = width
        else if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        else if (p.y > height) p.y = 0

        // Mouse interaction (elastic push)
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < 130 && dist > 0) {
            const force = (130 - dist) / 130
            p.x += (dx / dist) * force * 1.8
            p.y += (dy / dist) * force * 1.8

            // Draw laser thread to mouse
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(127, 255, 0, ${(1 - dist / 130) * 0.28})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.hypot(dx, dy)
          if (dist < 115) {
            const alpha = (1 - dist / 115) * 0.16
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(127, 255, 0, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }

        // Draw particle node
        const pulse = 0.8 + 0.2 * Math.sin(p.phase)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(127, 255, 0, ${p.baseAlpha * pulse})`
        ctx.fill()
      }
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      if (parent) {
        parent.removeEventListener('mousemove', onMouseMove)
        parent.removeEventListener('mouseleave', onMouseLeave)
      }
      obs.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="rp-hero-canvas"
      aria-hidden="true"
    />
  )
}
