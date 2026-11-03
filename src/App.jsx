import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './styles/portfolio.css';
import CursorTrail from './components/CursorTrail';
import CurtainLoader from './components/CurtainLoader';
import Header from './components/Header';
import TerminalHero from './components/TerminalHero';
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

      {/* Main Content Sections */}
      <main>
        {/* Terminal Hero Section */}
        <TerminalHero />
      </main>
    </div>
  );
}
