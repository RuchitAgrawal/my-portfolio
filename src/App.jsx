import React, { useState, useEffect, useRef } from 'react';
import './styles/portfolio.css';
import CursorTrail from './components/CursorTrail';
import CurtainLoader from './components/CurtainLoader';
import { setAudioActive } from './utils/audioEffects';

export default function App() {
  const [curtainEntered, setCurtainEntered] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleCurtainEnter = (withMusic) => {
    setCurtainEntered(true);
    if (withMusic && audioRef.current) {
      audioRef.current.volume = 0.28;
      audioRef.current
        .play()
        .then(() => {
          setAudioPlaying(true);
          setAudioActive(true);
        })
        .catch(() => {
          console.warn('Autoplay prevented by browser.');
        });
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      window.__bgAudio = audioRef.current;
    }
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--canvas)' }}>
      {/* Background Animated Layers */}
      <div className="rp-dot-grid" />
      <div className="rp-film-grain" />

      {/* Neon Cursor Trail */}
      <CursorTrail />

      {/* Background Cyberpunk Audio Engine */}
      <audio
        ref={audioRef}
        src="/assets/audio/cyberpunk-piano.mp3"
        loop
        preload="auto"
      />

      {/* Initial Boot Curtain Loader */}
      {!curtainEntered && (
        <CurtainLoader onEnter={handleCurtainEnter} />
      )}

      {/* Main Shell (Milestone 1 Preview) */}
      <main className="rp-container" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <div className="rp-eyebrow">
            <span className="rp-eyebrow-dot" />
            <span>FOUNDATION INITIALIZED · LINEAR × CYBERPUNK</span>
          </div>
          <h1 className="rp-hero-title">
            I build things because I can't help it.
          </h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '18px', lineHeight: '1.6', margin: '0 0 32px 0' }}>
            Final-Year B.Tech CSE · PDEU, Gujarat · Class of '27. Audio engine, surface ladder, and design tokens established.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <span className="rp-pill rp-pill-accent">GATE 4391 / TOP 2%</span>
            <span className="rp-pill rp-pill-accent">MESON 6.5K★ PR MERGED</span>
            <span className="rp-pill rp-pill-accent">6,000+ USERS SHIPPED</span>
          </div>
        </div>
      </main>
    </div>
  );
}
