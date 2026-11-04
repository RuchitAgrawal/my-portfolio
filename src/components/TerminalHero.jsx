import { useState, useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { useCountUp } from '../hooks/useCountUp'
import { playTerminalSound } from '../utils/audioEffects'

const BOOT = [
  { text: '> kernel.init("ruchit.selfintro")', acc: null },
  { text: '> Identity: ', acc: 'Builder. Relentless. From Gujarat.' },
  { text: '> GATE CSE 2026: rank 4391 / 200k+  ', acc: '[ top 2% ]' },
  { text: '> Status: Final-Year B.Tech CSE · PDEU · Bangalore Ready', acc: null },
  { text: '> Objective: ', acc: 'Build undeniable software with Wispr Flow.', cursor: true },
]

const HEADLINE_LINE1 = ["I", "build", "things"]
const HEADLINE_LINE2 = ["because", "I", "can't", "help", "it."]

// Floating code particles
const PARTICLES = [
  { glyph: '</', top: '12%', left: '8%', delay: '0s', dur: '7s' },
  { glyph: '{', top: '30%', left: '75%', delay: '1.2s', dur: '9s' },
  { glyph: '}', top: '55%', left: '15%', delay: '2.5s', dur: '8s' },
  { glyph: '//', top: '70%', left: '80%', delay: '0.8s', dur: '11s' },
  { glyph: '=>', top: '20%', left: '55%', delay: '3s', dur: '6s' },
  { glyph: '[]', top: '80%', left: '40%', delay: '1.5s', dur: '10s' },
  { glyph: '&&', top: '45%', left: '90%', delay: '4s', dur: '8.5s' },
  { glyph: '()', top: '8%', left: '45%', delay: '0.3s', dur: '7.5s' },
]

const HERO_STATS = [
  { value: 4391, suffix: '', label: 'GATE CSE Rank', sub: 'Top 2% / 200,000+' },
  { value: 6000, suffix: '+', label: 'Live Users', sub: 'TheLastQuestion.io SG' },
  { value: 6500, suffix: '★', label: 'GitHub Stars', sub: 'Meson Build System' },
  { value: 2, suffix: '%', label: 'Percentile', sub: 'National Engineering' },
]

function StatCard({ stat, inView }) {
  const count = useCountUp(stat.value, 1600, inView)
  return (
    <div className="rp-hero-stat">
      <div className="rp-hero-stat__num">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="rp-hero-stat__label">{stat.label}</div>
      <div className="rp-hero-stat__sub">{stat.sub}</div>
    </div>
  )
}

export default function TerminalHero() {
  const [visible, setVisible] = useState(0)
  const [commandHistory, setCommandHistory] = useState([])
  const [statsInView, setStatsInView] = useState(false)
  const sectionRef = useRef(null)
  const rightPanelRef = useRef(null)
  useReveal(sectionRef)

  useEffect(() => {
    const timers = BOOT.map((_, i) =>
      setTimeout(() => setVisible(i + 1), 1900 + i * 350)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  // Trigger count-up after a short delay (let curtain fade out)
  useEffect(() => {
    const t = setTimeout(() => setStatsInView(true), 2800)
    return () => clearTimeout(t)
  }, [])

  const runCommand = (cmd) => {
    playTerminalSound()
    if (cmd === 'wispr') {
      setCommandHistory((prev) => [
        ...prev,
        { cmd: 'wispr --meta', out: 'Wispr Flow speech-to-text → 60 Emergent AI credits → Zero manual typing.' },
      ])
    } else if (cmd === 'stack') {
      setCommandHistory((prev) => [
        ...prev,
        { cmd: 'stack', out: 'TypeScript · React · PySpark · FAISS · Docker · Python · Redis · PostgreSQL' },
      ])
    } else if (cmd === 'contact') {
      setCommandHistory((prev) => [
        ...prev,
        { cmd: 'contact', out: 'Routing to contact card...' },
      ])
      const contactEl = document.getElementById('contact')
      if (contactEl) {
        if (window.__lenis) window.__lenis.scrollTo(contactEl, { offset: -20 })
        else contactEl.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="rp-hero rp-container"
      style={{ maxWidth: 'var(--max-w)', marginInline: 'auto' }}
    >
      {/* LEFT COLUMN */}
      <div className="rp-hero__left">
        {/* Terminal card */}
        <div className="rp-terminal reveal" style={{ animationDelay: '0.1s' }}>
          <div className="rp-terminal__bar">
            <div className="rp-terminal__dots">
              <span className="rp-terminal__dot rp-terminal__dot--r" />
              <span className="rp-terminal__dot rp-terminal__dot--y" />
              <span className="rp-terminal__dot rp-terminal__dot--g" />
            </div>
            <span>bash — ruchit.selfintro</span>
            <div className="rp-terminal__live"><span />LIVE</div>
          </div>
          <div className="rp-terminal__body">
            {BOOT.slice(0, visible).map((line, i) => (
              <div key={i}>
                <span>{line.text}</span>
                {line.acc && <span className="acc">{line.acc}</span>}
                {line.cursor && i === visible - 1 && commandHistory.length === 0 && <span className="rp-blink" />}
              </div>
            ))}

            {/* Interactive appended commands */}
            {commandHistory.map((item, idx) => (
              <div key={idx} style={{ marginTop: '0.35rem' }}>
                <span style={{ color: 'var(--ink-subtle)' }}>$ {item.cmd}</span>
                <div style={{ color: 'var(--accent)', marginLeft: '0.75rem' }}>&gt; {item.out}</div>
              </div>
            ))}

            {/* Clickable Quick Command Pills */}
            {visible >= BOOT.length && (
              <div
                style={{
                  marginTop: '0.85rem',
                  paddingTop: '0.65rem',
                  borderTop: '1px solid var(--hairline)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontSize: '0.65rem', color: 'var(--ink-subtle)' }}>try:</span>
                <button
                  className="rp-tag"
                  style={{ cursor: 'pointer', background: 'var(--surface-2)', color: 'var(--accent)' }}
                  onClick={() => runCommand('wispr')}
                >
                  wispr --meta
                </button>
                <button
                  className="rp-tag"
                  style={{ cursor: 'pointer', background: 'var(--surface-2)', color: 'var(--ink)' }}
                  onClick={() => runCommand('stack')}
                >
                  stack
                </button>
                <button
                  className="rp-tag"
                  style={{ cursor: 'pointer', background: 'var(--surface-2)', color: 'var(--ink)' }}
                  onClick={() => runCommand('contact')}
                >
                  contact
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Headline with word stagger */}
        <h1 className="rp-display-xl rp-hero-headline">
          <span style={{ display: 'inline-block' }}>
            {HEADLINE_LINE1.map((word, i) => (
              <span
                key={i}
                className="hero-word"
                style={{ animationDelay: `${2100 + i * 80}ms`, marginRight: '0.28em' }}
              >
                {word}
              </span>
            ))}
          </span>
          <br />
          <span style={{ display: 'inline-block' }}>
            {HEADLINE_LINE2.map((word, i) => (
              <span
                key={i}
                className="hero-word"
                style={{ animationDelay: `${2100 + (HEADLINE_LINE1.length + i) * 80}ms`, marginRight: '0.28em' }}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        <p className="rp-subhead reveal reveal-delay-2">
          Final-year computer engineering at PDEU, Gujarat. I didn't come from an elite college,
          so I made sure my code got into ones people with those colleges work at.
          Upstream contributor to a 6,500-star build system. 6,000 real users shipped.
          Relocating to Bangalore whenever the right thing shows up.
        </p>

        <div className="reveal reveal-delay-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
          <a href="#comeback" className="btn-primary">
            Read the real story <ArrowDown size={14} />
          </a>
          <a href="#beliefs" className="btn-secondary">
            How I think
          </a>
          <a
            href="https://github.com/RuchitAgrawal"
            target="_blank" rel="noreferrer"
            className="btn-secondary"
            style={{ padding: '0.55rem 0.7rem' }}
            title="GitHub"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>

      {/* RIGHT COLUMN — animated stats panel */}
      <div className="rp-hero__right" ref={rightPanelRef}>
        {/* Floating code particles */}
        <div className="rp-code-particles" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="rp-code-particle"
              style={{ top: p.top, left: p.left, animationDelay: p.delay, animationDuration: p.dur }}
            >
              {p.glyph}
            </span>
          ))}
        </div>

        {/* Stats 2×2 grid */}
        <div className="rp-hero-stats-grid">
          {HERO_STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} inView={statsInView} />
          ))}
        </div>

        {/* Currently building card */}
        <div className="rp-hero-building">
          <div className="rp-hero-building__dot" />
          <div>
            <div className="rp-hero-building__label">currently building</div>
            <div className="rp-hero-building__text">AI tools that ship real products to real users</div>
          </div>
        </div>
      </div>
    </section>
  )
}
