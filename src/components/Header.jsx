import React, { useState, useEffect } from 'react';
import { playClickSound } from '../utils/audioEffects';

const NAV_ITEMS = [
  { href: '#origin', label: 'Origin' },
  { href: '#comeback', label: 'Comeback' },
  { href: '#work', label: 'Work' },
  { href: '#beliefs', label: 'Beliefs' },
  { href: '#contact', label: 'Contact' },
];

export default function Header({ audioRef, playing, setPlaying }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    playClickSound();
    if (!audioRef?.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  const handleNavClick = (e, href) => {
    playClickSound();
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -64 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="rp-header" data-scrolled={scrolled}>
      {/* Brand Logo */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="rp-header__logo"
      >
        <span className="rp-header__logo-dot" />
        <span>ruchit.selfintro</span>
      </a>

      {/* Navigation Links */}
      <nav className="rp-header__nav" aria-label="Primary navigation">
        {NAV_ITEMS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            className="rp-header__link"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Audio Pill */}
        <button
          className="rp-audio-pill"
          data-playing={playing}
          onClick={toggleAudio}
          title={playing ? 'Pause ambient music' : 'Play ambient music'}
          aria-label={playing ? 'Pause ambient music' : 'Play ambient music'}
        >
          <div className="eq-bars">
            <div className="eq-bar" />
            <div className="eq-bar" />
            <div className="eq-bar" />
            <div className="eq-bar" />
          </div>
          <span>{playing ? '♫ pause' : '♫ play'}</span>
        </button>

        {/* CTA Button */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="rp-header__cta"
        >
          Let's Talk →
        </a>
      </div>
    </header>
  );
}
