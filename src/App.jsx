import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './styles/portfolio.css';

import { useGlobalReveal } from './hooks/useReveal';
import CurtainLoader from './components/CurtainLoader';
import CursorTrail from './components/CursorTrail';
import Header from './components/Header';
import SpacemanJourney from './components/SpacemanJourney';
import TerminalHero from './components/TerminalHero';
import { setAudioActive } from './utils/audioEffects';

export default function App() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Global intersection observer for all .reveal elements
  useGlobalReveal();

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    window.__lenis = lenis;
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    setAudioActive(playing);
    if (audioRef.current) {
      window.__bgAudio = audioRef.current;
    }
  }, [playing]);

  const onEnter = (withMusic) => {
    if (withMusic && audioRef.current) {
      audioRef.current.volume = 0.28;
      audioRef.current.loop = true;
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      {/* Background ambient music */}
      <audio
        ref={audioRef}
        src="/assets/audio/cyberpunk-piano.mp3"
        loop
        preload="auto"
      />

      {/* Boot Curtain Loader */}
      <CurtainLoader onEnter={onEnter} />

      {/* Neon Cursor Trail */}
      <CursorTrail />

      {/* Fixed Header */}
      <Header audioRef={audioRef} playing={playing} setPlaying={setPlaying} />

      {/* Floating Spaceman Mascot Layer */}
      <SpacemanJourney />

      {/* Main Content */}
      <main>
        <TerminalHero />
      </main>

      {/* Subtle Film Grain Layer */}
      <div className="grain-layer" />
    </>
  );
}
