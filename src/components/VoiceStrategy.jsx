import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Mic, Cpu, Code2, ArrowRight, Check } from 'lucide-react'
import { playClickSound, playTerminalSound } from '../utils/audioEffects'

const PROMPT_WORDS = [
  'Hey', 'Wispr,', 'draft', 'a', 'section', 'about', 'my', 'GSoC', 'experience',
  '—', 'the', 'real', 'one', 'where', 'I', 'reached', 'the', 'finalist', 'shortlist',
  'but', "didn't", 'make', 'the', 'cut,', 'and', 'how', 'I', 'opened', 'VS', 'Code',
  'at', '8', 'AM', 'the', 'next', 'morning', 'to', 'ship', 'upstream', 'PRs',
  'to', 'Oracle', 'and', 'Meson.',
]

export default function VoiceStrategy() {
  const [activeTab, setActiveTab] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeWordIdx, setActiveWordIdx] = useState(-1)
  const timerRef = useRef(null)
  const autoAdvanceRef = useRef(null)

  const stopPlayback = () => {
    setIsPlaying(false)
    setActiveWordIdx(-1)
    if (timerRef.current) clearInterval(timerRef.current)
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    // Restore ambient background music if ducked
    if (window.__bgAudio) {
      window.__bgAudio.volume = 0.28
    }
  }

  const handleAudioFinished = () => {
    stopPlayback()
    playTerminalSound()
    // Auto-advance to Tab 2
    setActiveTab(2)

    // Auto-advance to Tab 3 after 3.8s
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current)
    autoAdvanceRef.current = setTimeout(() => {
      playTerminalSound()
      setActiveTab(3)
    }, 3800)
  }

  const togglePlayback = () => {
    playClickSound()

    if (isPlaying) {
      stopPlayback()
      return
    }

    setActiveTab(1)
    setIsPlaying(true)
    setActiveWordIdx(0)

    // Duck background ambient music
    if (window.__bgAudio) {
      window.__bgAudio.volume = 0.08
    }

    const textToSpeak = PROMPT_WORDS.join(' ')
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(textToSpeak)
      utter.rate = 1.05
      utter.pitch = 1.0
      utter.onend = handleAudioFinished
      utter.onerror = handleAudioFinished

      let idx = 0
      timerRef.current = setInterval(() => {
        idx += 1
        if (idx < PROMPT_WORDS.length) {
          setActiveWordIdx(idx)
        } else {
          clearInterval(timerRef.current)
        }
      }, 280)

      window.speechSynthesis.speak(utter)
    } else {
      let idx = 0
      timerRef.current = setInterval(() => {
        idx += 1
        if (idx < PROMPT_WORDS.length) {
          setActiveWordIdx(idx)
        } else {
          handleAudioFinished()
        }
      }, 290)
    }
  }

  const switchTab = (tabId) => {
    playClickSound()
    setActiveTab(tabId)
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current)
  }

  useEffect(() => {
    return () => {
      stopPlayback()
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current)
    }
  }, [])

  return (
    <section id="voice" className="rp-section">
      <div className="rp-container">

        {/* Section Header */}
        <div className="reveal" style={{ maxWidth: '68ch', marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
          <div className="rp-eyebrow">The creative workflow</div>
          <h2 className="rp-display-lg">
            I built this entire portfolio by speaking not typing.
          </h2>
          <p className="rp-subhead" style={{ marginTop: '0.85rem' }}>
            Every section, story, and prompt was dictated through Wispr Flow directly into Antigravity, and voice was the entire engineering medium.
          </p>
        </div>

        {/* 3-Stage Interactive Pipeline Card */}
        <div className="rp-pipeline-frame reveal reveal-delay-1">

          {/* Top Interactive Stepper / Tab Bar */}
          <div className="rp-pipeline-nav">
            <button
              onClick={() => switchTab(1)}
              className={`rp-pipeline-tab ${activeTab === 1 ? 'is-active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mic size={14} style={{ color: activeTab === 1 ? 'var(--accent)' : 'inherit' }} />
                <span>01. What I spoke with raw voice</span>
              </div>
              <span className="rp-pill rp-pill--muted">RAW VOICE</span>
            </button>

            <button
              onClick={() => switchTab(2)}
              className={`rp-pipeline-tab ${activeTab === 2 ? 'is-active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Cpu size={14} style={{ color: activeTab === 2 ? 'var(--accent)' : 'inherit' }} />
                <span>02. Wispr Flow decipher with an intent parser build</span>
              </div>
              <span className="rp-pill rp-pill--accent">INTENT PARSER</span>
            </button>

            <button
              onClick={() => switchTab(3)}
              className={`rp-pipeline-tab ${activeTab === 3 ? 'is-active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Code2 size={14} style={{ color: activeTab === 3 ? 'var(--accent)' : 'inherit' }} />
                <span>03. anti-gravity build with a React code file</span>
              </div>
              <span className="rp-pill rp-pill--muted">REACT CODE</span>
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="rp-pipeline-content">

            {/* TAB 1: What I Spoke */}
            {activeTab === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)' }}>
                      Raw Spoken Voice Stream
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginTop: '0.2rem' }}>
                      Spoken directly into Wispr Flow with zero pre-writing and zero backspaces.
                    </p>
                  </div>

                  <button
                    onClick={togglePlayback}
                    className="btn-primary"
                    style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
                  >
                    {isPlaying ? (
                      <>
                        <Pause size={13} fill="currentColor" />
                        <span>Stop Voice</span>
                      </>
                    ) : (
                      <>
                        <Play size={13} fill="currentColor" />
                        <span>Play Voice &amp; Watch Workflow</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Animated Audio Waveform */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3.5,
                    height: 52,
                    background: 'var(--surface-2)',
                    borderRadius: 'var(--radius-btn)',
                    border: '1px solid var(--hairline)',
                    padding: '0.5rem 1rem',
                  }}
                >
                  {Array.from({ length: 32 }, (_, i) => {
                    const h = isPlaying
                      ? 12 + Math.abs(Math.sin(i * 0.65 + Date.now() / 200)) * 32
                      : 8 + Math.abs(Math.sin(i * 0.45)) * 12
                    return (
                      <div
                        key={i}
                        style={{
                          width: 3,
                          borderRadius: 1.5,
                          background: isPlaying ? 'var(--accent)' : 'var(--hairline-strong)',
                          height: `${h}px`,
                          transition: 'height 0.15s ease',
                        }}
                      />
                    )
                  })}
                </div>

                {/* Word by Word Live Transcript */}
                <div
                  className="rp-pipeline-code-block"
                  style={{ borderColor: isPlaying ? 'rgba(127,255,0,0.4)' : 'var(--hairline)' }}
                >
                  <span style={{ color: 'var(--accent)', marginRight: '0.35rem' }}>"</span>
                  {PROMPT_WORDS.map((word, i) => (
                    <span
                      key={i}
                      style={{
                        marginRight: '0.3rem',
                        color:
                          i === activeWordIdx
                            ? 'var(--accent)'
                            : i < activeWordIdx
                            ? 'var(--ink)'
                            : 'var(--ink-muted)',
                        textShadow: i === activeWordIdx ? '0 0 10px rgba(127,255,0,0.75)' : 'none',
                        transition: 'color 0.15s ease',
                      }}
                    >
                      {word}
                    </span>
                  ))}
                  <span style={{ color: 'var(--accent)', marginLeft: '0.15rem' }}>"</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-subtle)' }}>
                  <span>Source: Laptop / Phone Mic via Wispr Flow</span>
                  <button
                    onClick={() => switchTab(2)}
                    style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
                  >
                    <span>See Wispr Flow Deciphered Prompt</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Wispr Flow Decipher */}
            {activeTab === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)' }}>
                      How Wispr Flow Deciphered The Spoken Intent
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginTop: '0.2rem' }}>
                      Wispr Flow removed filler speech, recognized developer terminology, and structured an executable prompt for the comeback section.
                    </p>
                  </div>
                  <span className="rp-pill rp-pill--accent">3× SPEED VS TYPING</span>
                </div>

                <div className="rp-pipeline-code-block">
                  <div style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 600 }}>
                    // Wispr Flow Intent Transformation:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    <div><span style={{ color: 'var(--ink)' }}>• Component Request:</span> Linear 3-step Comeback ladder (JourneyComeback.jsx)</div>
                    <div><span style={{ color: 'var(--ink)' }}>• Narrative Calibration:</span> Card 1: GSoC finalist shortlist &bull; Card 2: 40+ silent summer rejections &bull; Card 3: 8 AM morning after commit to Meson (6.5k★) &amp; Oracle Labs</div>
                    <div><span style={{ color: 'var(--ink)' }}>• Design System Rules:</span> Near-black #010102 canvas &bull; Surface ladder (surface-1 to surface-4) &bull; Electric Lime #7fff00 accents &bull; 12px border radius</div>
                    <div><span style={{ color: 'var(--ink)' }}>• Voice Constraint:</span> High-conviction human writing &bull; Zero corporate buzzwords</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-subtle)' }}>
                  <span>Disfluency Removal: 100% &bull; Latency: 260ms</span>
                  <button
                    onClick={() => switchTab(3)}
                    style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
                  >
                    <span>See Antigravity Implementation</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Antigravity Build */}
            {activeTab === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)' }}>
                      How Antigravity Compiled The Component
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginTop: '0.2rem' }}>
                      Antigravity took the structured Wispr prompt and synthesized production-grade React code into the project in a single generation.
                    </p>
                  </div>
                  <span className="rp-pill rp-pill--muted">0 ERRORS &bull; 1 PASS</span>
                </div>

                <div className="rp-pipeline-code-block">
                  <div style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 600 }}>
                    // Antigravity Compilation Manifest:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Check size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      <span>Created <code>src/components/JourneyComeback.jsx</code> with 3-card surface grid</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Check size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      <span>Configured hairline grid (<code>1px</code> gap on <code>var(--hairline)</code> background)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Check size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      <span>Applied status badge pills: <code>[FINALIST]</code>, <code>[FAILED]</code>, <code>[RELENTLESS]</code></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Check size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      <span>Hooked <code>useGlobalReveal()</code> IntersectionObserver for one-time full opacity reveal</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-subtle)' }}>
                  <span>Artifact: Verified Production React Code</span>
                  <a
                    href="#comeback"
                    style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    <span>Inspect Live Comeback Section Above</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  )
}

