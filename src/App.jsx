import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './styles/portfolio.css';
import CursorTrail from './components/CursorTrail';
import CurtainLoader from './components/CurtainLoader';
import Header from './components/Header';
import { setAudioActive } from './utils/audioEffects';
import { useGlobalReveal } from './hooks/useReveal';

export default function App() {
  const [curtainEntered, setCurtainEntered] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  // Hook global scroll reveal observer
  useGlobalReveal();

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

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
        .catch((err) => {
          console.warn('Autoplay prevented by browser:', err);
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

      {/* Fixed Top Navigation Header */}
      <Header
        audioRef={audioRef}
        playing={audioPlaying}
        setPlaying={setAudioPlaying}
      />

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

      {/* Main Shell (Milestone 2 Preview) */}
      <main className="rp-container" style={{ paddingTop: '140px', paddingBottom: '120px' }}>
        <div className="reveal" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <div className="rp-eyebrow">
            <span className="rp-eyebrow-dot" />
            <span>HEADER MOUNTED · GLASSMORPHISM &amp; EQ ACTIVE</span>
          </div>
          <h1 className="rp-hero-title">
            I build things because I can't help it.
          </h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '18px', lineHeight: '1.6', margin: '0 0 32px 0' }}>
            Final-Year B.Tech CSE · PDEU, Gujarat · Class of '27. Fixed glass header and reactive EQ audio pill established.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span className="rp-pill rp-pill-accent">GATE 4391 / TOP 2%</span>
            <span className="rp-pill rp-pill-accent">MESON 6.5K★ PR MERGED</span>
            <span className="rp-pill rp-pill-accent">6,000+ USERS SHIPPED</span>
            <span className="rp-pill rp-pill-success">EQ AUDIO PILL READY</span>
          </div>
        </div>
      </main>
    </div>
  );
}
