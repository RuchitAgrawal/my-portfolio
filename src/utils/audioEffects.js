/* ============================================================
   Web Audio API Synthesizer — Zero-Latency Micro Sounds
   Synthesized mathematically — 0 KB external file size.
   Mutes automatically if user turned off audio in header.
   ============================================================ */

let audioCtx = null

function getAudioContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (AudioCtx) audioCtx = new AudioCtx()
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

// Master audio enabled check (synced with header audio state)
export function isAudioActive() {
  if (typeof window === 'undefined') return false
  return window.__audioEnabled === true
}

export function setAudioActive(enabled) {
  if (typeof window !== 'undefined') {
    window.__audioEnabled = enabled
  }
}

/**
 * Ultra-subtle tactile click (buttons, links)
 */
export function playClickSound() {
  if (!isAudioActive()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(1100, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.018)

    gain.gain.setValueAtTime(0.04, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.018)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.02)
  } catch {}
}

/**
 * Sci-fi matrix optics sweep (profile ASCII toggle)
 */
export function playToggleSound() {
  if (!isAudioActive()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(380, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(1450, ctx.currentTime + 0.075)

    gain.gain.setValueAtTime(0.045, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.075)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.08)
  } catch {}
}

/**
 * Terminal keystroke blip
 */
export function playTerminalSound() {
  if (!isAudioActive()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'square'
    osc.frequency.setValueAtTime(750, ctx.currentTime)

    gain.gain.setValueAtTime(0.025, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.016)
  } catch {}
}

/**
 * Jetpack thruster burst (Spaceman mascot flip)
 */
export function playJetpackSound() {
  if (!isAudioActive()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(260, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12)
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.22)

    gain.gain.setValueAtTime(0.04, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.23)
  } catch {}
}

/**
 * Cyberpunk laser nav sweep (on navigation jump)
 */
export function playLaserNavSound() {
  if (!isAudioActive()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(1400, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.12)

    gain.gain.setValueAtTime(0.035, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.13)
  } catch {}
}

