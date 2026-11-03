import { useState, useEffect, useRef } from 'react'

const NAV = [
  { href: '#origin',       label: 'Origin' },
  { href: '#comeback',     label: 'Comeback' },
  { href: '#work',         label: 'Work' },
  { href: '#beliefs',      label: 'Beliefs' },
  { href: '#contact',      label: 'Contact' },
]

export default function Header({ audioRef, playing, setPlaying }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const toggleAudio = () => {
    if (!audioRef?.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <header className="rp-header" data-scrolled={scrolled}>
      <div className="rp-header__logo">
        <span className="rp-header__logo-dot" />
        <span>ruchit.selfintro</span>
      </div>

      <nav className="rp-header__nav" aria-label="Primary">
        {NAV.map(({ href, label }) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Audio pill */}
        <button
          className="rp-audio-pill"
          data-playing={playing}
          onClick={toggleAudio}
          title={playing ? 'Pause ambient music' : 'Play ambient music'}
          aria-label={playing ? 'Pause ambient music' : 'Play Cyberpunk piano'}
        >
          <div className="eq-bars">
            <div className="eq-bar" style={{ height: playing ? undefined : '6px' }} />
            <div className="eq-bar" style={{ height: playing ? undefined : '10px' }} />
            <div className="eq-bar" style={{ height: playing ? undefined : '6px' }} />
            <div className="eq-bar" style={{ height: playing ? undefined : '8px' }} />
          </div>
          <span>{playing ? '♫ pause' : '♫ play'}</span>
        </button>

        <a href="#contact" className="rp-header__cta">Let's Talk →</a>
      </div>
    </header>
  )
}
