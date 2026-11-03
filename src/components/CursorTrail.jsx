import React, { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const dotsRef = useRef([]);
  const mousePos = useRef({ x: -100, y: -100 });
  const points = useRef(Array.from({ length: 12 }, () => ({ x: -100, y: -100 })));

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animId;
    const animate = () => {
      let leader = { ...mousePos.current };

      points.current.forEach((pt, index) => {
        pt.x += (leader.x - pt.x) * 0.35;
        pt.y += (leader.y - pt.y) * 0.35;
        leader = { ...pt };

        const dot = dotsRef.current[index];
        if (dot) {
          const scale = (12 - index) / 12;
          const opacity = ((12 - index) / 12) * 0.75;
          dot.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0) translate(-50%, -50%) scale(${scale})`;
          dot.style.opacity = `${opacity}`;
        }
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          className="rp-cursor-dot"
          style={{ willChange: 'transform, opacity' }}
        />
      ))}
    </div>
  );
}
