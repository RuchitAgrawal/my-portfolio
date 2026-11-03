import { useEffect, useState, useRef } from 'react'

const BOOT_LINES = [
  { text: '> booting ruchit.selfintro ...', acc: false },
  { text: '> GATE CSE 2026: rank 4391 / 200,000+ applicants  ', acc: true, end: '[ top 2% ]' },
  { text: '> upstream PRs merged: meson 6500★ · oracle macaron 191★ · areg-sdk 345★', acc: false },
  { text: '> TheLastQuestion.io (Singapore · Remote): ', acc: true, end: '6,000+ users in 8 weeks' },
  { text: '> note: this site was built by speaking, not typing.', acc: false },
  { text: '> Wispr Flow → Emergent AI  ', acc: true, end: '[ meta ]' },
  { text: '> ready ', acc: false, cursor: true },
]

export default function CurtainLoader({ onEnter }) {
  const [state, setState] = useState('intro')
  const [visibleLines, setVisibleLines] = useState(0)
  const barRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => {
      if (barRef.current) barRef.current.dataset.run = 'true'
    }, 80)

    const lineTimers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), 120 + i * 280)
    )

    return () => {
      clearTimeout(t)
      lineTimers.forEach(clearTimeout)
    }
  }, [])

  const handleEnter = (withMusic) => {
    if (typeof onEnter === 'function') {
      onEnter(withMusic)
    }
    setState('lifting')
    setTimeout(() => setState('done'), 750)
  }

  if (state === 'done') return null

  return (
    <div className="rp-curtain" data-state={state} aria-hidden="true">
      <div className="rp-curtain__panel">
        <div className="rp-curtain__logo">● ruchit.selfintro</div>

        <div className="rp-curtain__boot">
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <div key={i}>
              <span className="wht">{line.text}</span>
              {line.acc && <span className="acc">{line.end}</span>}
              {line.cursor && i === visibleLines - 1 && <span className="rp-blink" />}
            </div>
          ))}
        </div>

        <div className="rp-curtain__bar">
          <div className="rp-curtain__bar-fill" ref={barRef} />
        </div>

        {visibleLines >= BOOT_LINES.length && (
          <div className="rp-curtain__music">
            <button
              className="rp-curtain__music-btn rp-curtain__music-btn--primary"
              onClick={() => handleEnter(true)}
            >
              ♫ enter with ambient music
            </button>
            <button
              className="rp-curtain__music-btn"
              onClick={() => handleEnter(false)}
            >
              enter silently
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
