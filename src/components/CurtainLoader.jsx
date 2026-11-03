import React, { useState, useEffect } from 'react';
import { playClickSound } from '../utils/audioEffects';

const DIAGNOSTIC_LINES = [
  'booting ruchit.selfintro ...',
  'GATE CSE 2026: rank 4391 / 200,000+ applicants [ top 2% ]',
  'upstream PRs merged: meson 6500★ · oracle macaron 191★ · areg-sdk 345★',
  'TheLastQuestion.io (Singapore · Remote): 6,000+ users in 8 weeks',
  'note: this site was built by speaking, not typing.',
  'Wispr Flow → Antigravity [ meta ]',
  'ready █'
];

export default function CurtainLoader({ onEnter }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (visibleCount < DIAGNOSTIC_LINES.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  const handleEnter = (withMusic) => {
    playClickSound();
    setDismissed(true);
    setTimeout(() => {
      onEnter(withMusic);
    }, 800);
  };

  return (
    <div className={`rp-curtain ${dismissed ? 'rp-curtain-dismissed' : ''}`}>
      <div className="rp-curtain-box">
        <div className="rp-curtain-header">
          <div className="rp-curtain-dot active" />
          <div className="rp-curtain-dot" />
          <div className="rp-curtain-dot" />
          <span style={{ fontSize: '12px', color: 'var(--ink-subtle)', marginLeft: '6px' }}>
            ruchit.selfintro — boot sequence
          </span>
        </div>

        <div className="rp-curtain-lines">
          {DIAGNOSTIC_LINES.slice(0, visibleCount).map((line, idx) => {
            const isHighlight = line.includes('top 2%') || line.includes('6,000+') || line.includes('meta') || line.includes('ready');
            return (
              <div key={idx} className={`rp-curtain-line ${isHighlight ? 'highlight' : ''}`}>
                <span style={{ color: 'var(--accent)', opacity: 0.7 }}>&gt;</span>
                <span>{line}</span>
              </div>
            );
          })}
        </div>

        <div className={`rp-curtain-actions ${visibleCount >= DIAGNOSTIC_LINES.length ? 'visible' : ''}`}>
          <button
            onClick={() => handleEnter(true)}
            className="rp-btn rp-btn-primary"
            style={{ fontSize: '13px' }}
          >
            ♫ Enter with Ambient Music
          </button>
          <button
            onClick={() => handleEnter(false)}
            className="rp-btn rp-btn-secondary"
            style={{ fontSize: '13px' }}
          >
            Enter Silently
          </button>
        </div>
      </div>
    </div>
  );
}

