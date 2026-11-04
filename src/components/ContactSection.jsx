import { useState } from 'react'
import { Mail, Phone, MapPin, Check } from 'lucide-react'
import { playClickSound } from '../utils/audioEffects'

export default function ContactSection() {
  const [copied, setCopied] = useState(false)

  const copyPhone = () => {
    playClickSound()
    navigator.clipboard.writeText('+919601462320').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <section id="contact" className="rp-section">
        <div className="rp-container">
          <div className="rp-contact reveal">

            {/* Eyebrow Label */}
            <div
              className="rp-eyebrow"
              style={{ justifyContent: 'center', marginBottom: '1rem' }}
            >
              Open for opportunities
            </div>

            {/* Heading */}
            <h2 className="rp-display-lg">
              Ready to build something undeniable.<br />
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>So am I.</em>
            </h2>

            {/* Subhead */}
            <p
              className="rp-subhead"
              style={{ marginInline: 'auto', marginTop: '1rem', textAlign: 'center', maxWidth: '62ch' }}
            >
              Final-Year Computer Engineering at PDEU, immediately available to travel,
              relocate, or hit the ground running in Bangalore.
            </p>

            {/* Centered Action Buttons */}
            <div className="rp-contact__links">
              {/* Primary Electric Lime Email Button */}
              <a
                href="mailto:rragrawal16@gmail.com"
                className="btn-primary"
                onClick={playClickSound}
              >
                <Mail size={15} />
                <span>rragrawal16@gmail.com</span>
              </a>

              {/* Secondary LinkedIn Button */}
              <a
                href="https://linkedin.com/in/ruchit-agrawal16"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                onClick={playClickSound}
              >
                <svg
                  width={15}
                  height={15}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              {/* Secondary GitHub Button */}
              <a
                href="https://github.com/RuchitAgrawal"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                onClick={playClickSound}
              >
                <svg
                  width={15}
                  height={15}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>

              {/* Secondary Phone Button with 1-Click Copy */}
              <button
                onClick={copyPhone}
                className="btn-secondary"
                title="Click to copy phone number"
              >
                {copied ? (
                  <>
                    <Check size={14} style={{ color: 'var(--accent)' }} />
                    <span style={{ color: 'var(--accent)' }}>Copied!</span>
                  </>
                ) : (
                  <>
                    <Phone size={14} />
                    <span>+91 96014 62320</span>
                  </>
                )}
              </button>
            </div>

            {/* Location Meta */}
            <div className="rp-contact__meta">
              <MapPin size={13} style={{ color: 'var(--accent)' }} />
              <span>Gujarat, India</span>
              <span style={{ color: 'var(--hairline-strong)' }}>·</span>
              <span>Open to relocate to Bangalore</span>
            </div>

          </div>
        </div>
      </section>

      {/* Clean Site Footer */}
      <footer className="rp-footer">
        <div>ruchit.selfintro</div>
        <div>
          <em>Built by speaking into Wispr Flow</em> · React + Vite · Deployed on Vercel
        </div>
      </footer>
    </>
  )
}

