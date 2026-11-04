import { useEffect, useRef, useState } from 'react'
import { playJetpackSound } from '../utils/audioEffects'

/* ============================================================
   Pixel Spaceman Journey — Scroll-Driven Mascot
   Adapted from InstaBiz PupJourney architecture:
   - Spring physics: k=150, d=28, m=0.35
   - Bezier curve path interpolation
   - Dynamic speech bubble responding to current section
   - Smooth walk & jetpack float cycles
   - Safe bounds (Y: 95px -> vh-115px) to prevent clipping under header
   ============================================================ */

const lerp = (a, b, t) => a + (b - a) * t
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
const exp = (dt, tau) => 1 - Math.exp(-dt / tau)
const smooth = (t) => t * t * (3 - 2 * t)

const bez = (p0, c1, c2, p1, t) => {
  const u = 1 - t
  return {
    x: u * u * u * p0.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * p1.x,
    y: u * u * u * p0.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * p1.y,
  }
}

// Human, contextual dialogues
const SECTION_BUBBLES = {
  hero: '',
  origin: 'Age 9 on Vice City... where it all began 🎮',
  comeback: 'Rejection is just high-res calibration ⚡',
  work: 'Shipped to 6,000+ real humans 🛠️',
  oss: 'Upstream PR merged in 6.5k★ Meson ✓',
  internships: 'Two internships shipped under real pressure 💼',
  beliefs: '"Giving up is not in my blood" 💡',
  voice: 'Voice removes the backspace filter 🎙️',
  contact: 'Bangalore relocation ready 📍',
}

const FRIENDLY_QUOTES = [
  'Always looking to connect with someone genuinely excited to build cool things 🚀',
  'Building late into the night? So am I ☕',
  'Rejection is just high-resolution calibration ⚡',
  'Code is the one place where pedigree doesn\'t matter 💻',
]

export default function SpacemanJourney() {
  const layerRef = useRef(null)
  const actorRef = useRef(null)
  const bubbleRef = useRef(null)
  const [bubbleText, setBubbleText] = useState('')
  const [showBubble, setShowBubble] = useState(false)
  const [bubbleBelow, setBubbleBelow] = useState(false)
  const [flipping, setFlipping] = useState(false)
  const quoteIdxRef = useRef(0)

  const handleMascotClick = (e) => {
    e.stopPropagation()
    playJetpackSound()
    setFlipping(true)
    setTimeout(() => setFlipping(false), 700)

    const next = (quoteIdxRef.current + 1) % FRIENDLY_QUOTES.length
    quoteIdxRef.current = next
    setBubbleText(FRIENDLY_QUOTES[next])
    setShowBubble(true)
  }

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (matchMedia('(max-width: 768px)').matches) return // hidden on mobile screens

    const layer = layerRef.current
    const actor = actorRef.current
    const bubble = bubbleRef.current
    if (!layer || !actor) return

    const state = {
      px: 80,
      py: 130,
      vx: 0,
      vy: 0,
      tx: 80,
      ty: 130,
      facing: 1,
      phase: 0,
      speed: 0,
      last: performance.now(),
      scrollY: window.scrollY,
      currentSection: 'hero',
    }

    const stopsConfig = [
      { id: 'hero', xFrac: 0.88, yOff: 130 },
      { id: 'origin', xFrac: 0.08, yOff: 110 },
      { id: 'comeback', xFrac: 0.90, yOff: 110 },
      { id: 'work', xFrac: 0.07, yOff: 110 },
      { id: 'oss', xFrac: 0.89, yOff: 110 },
      { id: 'internships', xFrac: 0.08, yOff: 110 },
      { id: 'beliefs', xFrac: 0.90, yOff: 110 },
      { id: 'voice', xFrac: 0.08, yOff: 110 },
      { id: 'contact', xFrac: 0.85, yOff: 100 },
    ]

    function getStops() {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const list = []

      stopsConfig.forEach((cfg) => {
        const el = document.getElementById(cfg.id)
        if (!el) return
        const r = el.getBoundingClientRect()
        const top = r.top + window.scrollY
        list.push({
          id: cfg.id,
          x: clamp(vw * cfg.xFrac, 36, vw - 100),
          pageY: top + cfg.yOff,
          holdFrom: top - vh * 0.15,
          holdTo: top + r.height * 0.45,
        })
      })
      return list
    }

    let stops = getStops()
    const onResize = () => { stops = getStops() }
    window.addEventListener('resize', onResize, { passive: true })

    const onScroll = () => {
      state.scrollY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Hide bubble during high-speed travel, show when resting
    let bubbleTimeout = null
    const updateBubble = (sectionId) => {
      if (state.currentSection !== sectionId) {
        state.currentSection = sectionId
        const txt = SECTION_BUBBLES[sectionId] || ''
        setBubbleText(txt)
        setShowBubble(false)
        clearTimeout(bubbleTimeout)
        if (txt) {
          bubbleTimeout = setTimeout(() => setShowBubble(true), 350)
        }
      }
    }

    let rafId
    function loop(now) {
      rafId = requestAnimationFrame(loop)
      const dt = Math.min(now - state.last, 40) / 1000
      state.last = now

      if (!stops.length) return

      const y = state.scrollY
      const vh = window.innerHeight

      // Locate position along stops
      let targetX = stops[0].x
      let targetY = stops[0].pageY - y
      let activeSection = stops[0].id

      for (let i = 0; i < stops.length; i++) {
        const s = stops[i]
        if (y >= s.holdFrom && y <= s.holdTo) {
          targetX = s.x
          targetY = s.pageY - y
          activeSection = s.id
          break
        }
        if (i < stops.length - 1) {
          const next = stops[i + 1]
          if (y > s.holdTo && y < next.holdFrom) {
            const span = Math.max(1, next.holdFrom - s.holdTo)
            const t = clamp((y - s.holdTo) / span, 0, 1)
            const easeT = smooth(t)

            const p0 = { x: s.x, y: s.pageY - y }
            const p1 = { x: next.x, y: next.pageY - y }
            const dx = p1.x - p0.x

            const c1 = { x: p0.x + dx * 0.45, y: lerp(p0.y, p1.y, 0.15) }
            const c2 = { x: p1.x - dx * 0.45, y: lerp(p0.y, p1.y, 0.85) }
            const pt = bez(p0, c1, c2, p1, easeT)

            targetX = pt.x
            targetY = pt.y
            activeSection = t > 0.5 ? next.id : s.id
            break
          }
        }
        if (i === stops.length - 1 && y > s.holdTo) {
          targetX = s.x
          targetY = s.pageY - y
          activeSection = s.id
        }
      }

      updateBubble(activeSection)

      // Spring physics (InstaBiz constants: k=150, d=28, m=0.35)
      const k = 150, d = 28, m = 0.35
      // Clamped safely away from top header (56px) and bottom
      const safeX = clamp(targetX, 36, window.innerWidth - 90)
      const safeY = clamp(targetY, 95, vh - 115)

      // Check if near top to flip speech bubble below
      setBubbleBelow(safeY < 130)

      const fx = -k * (state.px - safeX) - d * state.vx
      const fy = -k * (state.py - safeY) - d * state.vy
      state.vx += (fx / m) * dt
      state.vy += (fy / m) * dt
      state.px += state.vx * dt
      state.py += state.vy * dt

      const spd = Math.hypot(state.vx, state.vy)
      state.speed = lerp(state.speed, clamp(spd / 180, 0, 1), exp(dt, 0.12))

      // Facing
      if (state.vx > 18) state.facing = 1
      else if (state.vx < -18) state.facing = -1

      // Limb swing phase
      if (state.speed > 0.04) {
        state.phase += state.speed * dt * 9
      } else {
        state.phase = lerp(state.phase, 0, exp(dt, 0.2))
      }

      // Write transform to DOM
      actor.style.transform = `translate3d(${Math.round(state.px)}px, ${Math.round(state.py)}px, 0)`

      // Animate limbs via direct SVG manipulation
      const svg = actor.querySelector('svg')
      if (svg) {
        const legL = svg.getElementById('sm-leg-l')
        const legR = svg.getElementById('sm-leg-r')
        const armL = svg.getElementById('sm-arm-l')
        const armR = svg.getElementById('sm-arm-r')
        const flame = svg.getElementById('sm-flame')

        const legSwing = Math.sin(state.phase) * (state.speed > 0.08 ? 14 : 0)
        const armSwing = Math.cos(state.phase) * (state.speed > 0.08 ? 12 : 0)
        const bounce = state.speed > 0.08 ? Math.abs(Math.sin(state.phase)) * 2.5 : 0

        svg.style.transform = `scaleX(${state.facing}) translateY(${-bounce}px)`

        if (legL) legL.setAttribute('transform', `rotate(${legSwing}, 24, 52)`)
        if (legR) legR.setAttribute('transform', `rotate(${-legSwing}, 36, 52)`)
        if (armL) armL.setAttribute('transform', `rotate(${-armSwing}, 18, 38)`)
        if (armR) armR.setAttribute('transform', `rotate(${armSwing}, 42, 38)`)
        if (flame) flame.setAttribute('opacity', state.speed > 0.2 ? '0.85' : '0.2')
      }
    }

    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      clearTimeout(bubbleTimeout)
    }
  }, [])

  return (
    <div ref={layerRef} className="rp-spaceman-layer" aria-hidden="true">
      <div
        ref={actorRef}
        className="rp-spaceman-actor"
        onClick={handleMascotClick}
        title="Click me!"
        style={{ cursor: 'pointer', pointerEvents: 'auto' }}
      >
        
        {/* Interactive Speech Bubble with auto-flip when near top */}
        {bubbleText && (
          <div
            ref={bubbleRef}
            className="rp-spaceman-bubble"
            style={{
              position: 'absolute',
              ...(bubbleBelow ? { top: '100%', marginTop: '8px' } : { bottom: '100%', marginBottom: '8px' }),
              left: '50%',
              transform: `translateX(-50%) scale(${showBubble ? 1 : 0.6})`,
              opacity: showBubble ? 1 : 0,
              transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              padding: '0.35rem 0.75rem',
              background: 'var(--surface-2, #141418)',
              border: '1px solid var(--accent, #7fff00)',
              borderRadius: '999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--ink, #f7f8f8)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.7), 0 0 12px rgba(127,255,0,0.22)',
              zIndex: 10,
            }}
          >
            {bubbleText}
            <div
              style={{
                position: 'absolute',
                ...(bubbleBelow
                  ? { bottom: '100%', borderBottom: '5px solid var(--accent, #7fff00)', borderTop: 'none' }
                  : { top: '100%', borderTop: '5px solid var(--accent, #7fff00)', borderBottom: 'none' }),
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
              }}
            />
          </div>
        )}

        {/* 360 Spin Flip Wrapper */}
        <div
          style={{
            transform: flipping ? 'rotate(360deg) scale(1.18)' : 'none',
            transition: 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformOrigin: '30px 38px',
            display: 'inline-block',
          }}
        >
          {/* Handcrafted Pixel Spaceman SVG */}
          <svg
            viewBox="0 0 60 76"
            width="54"
            height="68"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible', filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.6))' }}
          >
            {/* Jetpack thruster flame */}
            <ellipse
              id="sm-flame"
              cx="43"
              cy="52"
              rx={flipping ? 5 : 3.5}
              ry={flipping ? 10 : 7}
              fill="var(--accent, #7fff00)"
              opacity={flipping ? 1 : 0.3}
            />

            {/* Jetpack */}
            <rect x="40" y="32" width="7" height="15" rx="3" fill="#18181c" stroke="#303038" strokeWidth="1.2" />

            {/* Left Leg */}
            <g id="sm-leg-l">
              <rect x="20" y="50" width="8" height="15" rx="3" fill="#18181c" stroke="#303038" strokeWidth="1.2" />
              <ellipse cx="23" cy="65" rx="5" ry="2.5" fill="#09090b" stroke="#303038" strokeWidth="1" />
            </g>

            {/* Right Leg */}
            <g id="sm-leg-r">
              <rect x="32" y="50" width="8" height="15" rx="3" fill="#18181c" stroke="#303038" strokeWidth="1.2" />
              <ellipse cx="37" cy="65" rx="5" ry="2.5" fill="#09090b" stroke="#303038" strokeWidth="1" />
            </g>

            {/* Body suit */}
            <rect x="18" y="32" width="24" height="21" rx="5" fill="#18181c" stroke="#303038" strokeWidth="1.5" />
            {/* Neon chest insignia */}
            <circle cx="25" cy="40" r="2.5" fill="var(--accent, #7fff00)" opacity="0.9" />
            <rect x="31" y="39" width="7" height="2" rx="1" fill="#303038" />
            <rect x="31" y="43" width="5" height="1.5" rx="0.75" fill="#222228" />

            {/* Left Arm */}
            <g id="sm-arm-l">
              <rect x="11" y="34" width="8" height="13" rx="3.5" fill="#18181c" stroke="#303038" strokeWidth="1.2" />
              <circle cx="15" cy="47" r="2" fill="#303038" />
            </g>

            {/* Right Arm */}
            <g id="sm-arm-r">
              <rect x="41" y="34" width="8" height="13" rx="3.5" fill="#18181c" stroke="#303038" strokeWidth="1.2" />
              <circle cx="45" cy="47" r="2" fill="#303038" />
            </g>

            {/* Helmet Dome */}
            <ellipse cx="30" cy="18" rx="14" ry="15" fill="#18181c" stroke="#303038" strokeWidth="1.5" />
            {/* Glowing Visor */}
            <ellipse cx="30" cy="18" rx="9" ry="8" fill="rgba(127,255,0,0.12)" stroke="var(--accent, #7fff00)" strokeWidth="1.2" />
            {/* Reflection */}
            <ellipse cx="27" cy="16" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.6)" />

            {/* Antenna */}
            <line x1="30" y1="3" x2="30" y2="0" stroke="#303038" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="30" cy="0" r="2" fill="var(--accent, #7fff00)">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

      </div>
    </div>
  )
}
