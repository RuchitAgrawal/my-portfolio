import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { playTerminalSound, playClickSound } from '../utils/audioEffects';

const BOOT_LINES = [
  { text: '> kernel.init("ruchit.selfintro")', acc: null },
  { text: '> Identity: ', acc: 'Builder. Relentless. From Gujarat.' },
  { text: '> GATE CSE 2026: rank 4391 / 200k+  ', acc: '[ top 2% ]' },
  { text: '> Status: Final-Year B.Tech CSE · PDEU · Class of \'27', acc: null },
  { text: '> Objective: ', acc: 'Build undeniable software with Wispr Flow.', cursor: true },
];

export default function TerminalHero() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [commandHistory, setCommandHistory] = useState([]);
  const sectionRef = useReveal(0.1);

  useEffect(() => {
    const timers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setVisibleCount(i + 1), 600 + i * 320)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const runCommand = (cmd) => {
    playTerminalSound();
    if (cmd === 'wispr') {
      setCommandHistory((prev) => [
        ...prev,
        { cmd: 'wispr --meta', out: 'Wispr Flow speech dictation → 100% voice driven → zero keyboard backspace filter.' },
      ]);
    } else if (cmd === 'stack') {
      setCommandHistory((prev) => [
        ...prev,
        { cmd: 'stack', out: 'TypeScript · React · Python · PySpark · FAISS · Docker · Gemini API · PostgreSQL' },
      ]);
    } else if (cmd === 'contact') {
      setCommandHistory((prev) => [
        ...prev,
        { cmd: 'contact', out: 'Routing to contact card...' },
      ]);
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        if (window.__lenis) {
          window.__lenis.scrollTo(contactEl, { offset: -20 });
        } else {
          contactEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleSmoothScroll = (e, targetId) => {
    playClickSound();
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -60 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="hero" ref={sectionRef} className="rp-hero rp-container">
      {/* Terminal Card */}
      <div className="rp-terminal reveal">
        <div className="rp-terminal__bar">
          <div className="rp-terminal__dots">
            <span className="rp-terminal__dot rp-terminal__dot--r" />
            <span className="rp-terminal__dot rp-terminal__dot--y" />
            <span className="rp-terminal__dot rp-terminal__dot--g" />
          </div>
          <span>bash — ruchit.selfintro</span>
          <div className="rp-terminal__live">
            <span />
            LIVE
          </div>
        </div>

        <div className="rp-terminal__body">
          {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
            <div key={i}>
              <span>{line.text}</span>
              {line.acc && <span className="acc">{line.acc}</span>}
              {line.cursor && i === visibleCount - 1 && commandHistory.length === 0 && (
                <span className="rp-blink" />
              )}
            </div>
          ))}

          {/* Appended interactive outputs */}
          {commandHistory.map((item, idx) => (
            <div key={idx} style={{ marginTop: '8px' }}>
              <span style={{ color: 'var(--ink-subtle)' }}>$ {item.cmd}</span>
              <div style={{ color: 'var(--accent)', marginLeft: '12px' }}>&gt; {item.out}</div>
            </div>
          ))}

          {/* Clickable Command Pills */}
          {visibleCount >= BOOT_LINES.length && (
            <div
              style={{
                marginTop: '14px',
                paddingTop: '10px',
                borderTop: '1px solid var(--hairline)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              <span style={{ fontSize: '11px', color: 'var(--ink-subtle)' }}>try:</span>
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

      {/* Hero Headline */}
      <div className="reveal" style={{ maxWidth: '840px' }}>
        <h1 className="rp-hero-title">
          I build things<br />because I can't help it.
        </h1>

        <p style={{ color: 'var(--ink-muted)', fontSize: '18px', lineHeight: '1.6', margin: '0 0 28px 0', maxWidth: '680px' }}>
          Final-year computer engineering at PDEU, Gujarat · Class of '27. I didn't come from an elite college,
          so I made sure my code got into ones people with those colleges work at. Upstream contributor to a 6,500-star build system.
          6,000 real users shipped. Relocating to Bangalore whenever the right thing shows up.
        </p>

        {/* Action CTAs */}
        <div className="rp-hero-actions">
          <a
            href="#comeback"
            onClick={(e) => handleSmoothScroll(e, '#comeback')}
            className="btn-primary"
          >
            Read the real story <ArrowDown size={14} />
          </a>
          <a
            href="#beliefs"
            onClick={(e) => handleSmoothScroll(e, '#beliefs')}
            className="btn-secondary"
          >
            How I think
          </a>
          <a
            href="https://github.com/RuchitAgrawal"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ padding: '9px 12px' }}
            title="GitHub profile"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
