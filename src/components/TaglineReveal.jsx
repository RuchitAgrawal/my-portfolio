import { useEffect, useRef, useState, useCallback } from 'react'

const WORDS = [
  "The", "machine", "doesn't", "care", "which", "school", "you", "went", "to.",
  "Type", "the", "right", "logic", "and", "it", "listens."
]

export default function TaglineReveal() {
  const sectionRef = useRef(null)
  const wordRefs = useRef([])
  const [litWords, setLitWords] = useState(new Set())

  const checkWords = useCallback(() => {
    const viewH = window.innerHeight
    wordRefs.current.forEach((el, i) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const mid = rect.top + rect.height / 2
      if (mid < viewH * 0.85) {
        setLitWords(prev => {
          if (prev.has(i)) return prev
          const next = new Set(prev)
          next.add(i)
          return next
        })
      }
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', checkWords, { passive: true })
    checkWords()
    return () => window.removeEventListener('scroll', checkWords)
  }, [checkWords])

  return (
    <section className="rp-tagline-section" ref={sectionRef} aria-label="Core belief">
      <div className="rp-container">
        <div className="rp-tagline-eyebrow">the core truth</div>
        <div className="rp-tagline-text">
          {WORDS.map((word, i) => (
            <span
              key={i}
              ref={el => wordRefs.current[i] = el}
              className={`rp-tagline-word${litWords.has(i) ? ' is-lit' : ''}`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

