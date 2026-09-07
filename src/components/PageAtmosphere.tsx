import React, { useEffect, useRef } from 'react';

/** Shared editorial paper field — mesh wash, grain, cursor glow. Applied once in App. */
export const PageAtmosphere: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mx = 0.5;
    let my = 0.28;
    let tx = 0.5;
    let ty = 0.28;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth;
      ty = e.clientY / window.innerHeight;
    };

    const tick = () => {
      mx += (tx - mx) * 0.055;
      my += (ty - my) * 0.055;
      glow.style.transform = `translate3d(${mx * 100}vw, ${my * 100}vh, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div className="page-atmosphere" aria-hidden>
      <div className="page-atmosphere__paper" />
      <div className="page-atmosphere__mesh" />
      <div className="page-atmosphere__dots" />
      <div className="page-atmosphere__grain" />
      <div className="page-atmosphere__blob page-atmosphere__blob--a" />
      <div className="page-atmosphere__blob page-atmosphere__blob--b" />
      <div className="page-atmosphere__blob page-atmosphere__blob--c" />
      <div ref={glowRef} className="page-atmosphere__cursor-glow" />
    </div>
  );
};
