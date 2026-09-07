import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

type CursorMode = 'default' | 'view' | 'expand';

function readCursorMode(target: EventTarget | null): CursorMode {
  if (!(target instanceof Element)) return 'default';
  const host = target.closest('[data-cursor]');
  const value = host?.getAttribute('data-cursor');
  if (value === 'view' || value === 'expand') return value;
  if (target.closest('a, button, [role="button"]')) return 'expand';
  return 'default';
}

/** Magnetic ring + dot. Disabled on touch and prefers-reduced-motion. */
export const ShowcaseCursor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.35 });
  const rx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 140, damping: 22, mass: 0.5 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const wide = window.matchMedia('(min-width: 768px)').matches;
    if (!fine || !wide) return;

    setEnabled(true);
    document.documentElement.classList.add('has-showcase-cursor');

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setMode(readCursorMode(e.target));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.documentElement.classList.remove('has-showcase-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [shouldReduceMotion, x, y]);

  if (!enabled) return null;

  const expanded = mode !== 'default';

  return (
    <div className="showcase-cursor" aria-hidden>
      <motion.div
        className="showcase-cursor__ring"
        style={{ x: rx, y: ry }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: mode === 'view' ? 2.15 : mode === 'expand' ? 1.45 : 1,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={`showcase-cursor__label ${mode === 'view' ? 'opacity-100' : 'opacity-0'}`}>
          View
        </span>
      </motion.div>
      <motion.div
        className="showcase-cursor__dot"
        style={{ x: sx, y: sy }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: expanded ? 0.35 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};
