import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { editorialEase } from './EditorialMotion';

const CHAPTERS = [
  {
    id: 'vision',
    number: '01',
    label: 'Vision',
    statement: 'Every business deserves to run digitally.',
    points: [
      { kicker: 'Found', text: 'Show up when people search.' },
      { kicker: 'Trusted', text: 'Look like the best in the field.' },
      { kicker: 'Ready', text: 'Make it easy to buy, book, or call.' },
    ],
    dark: true,
    entrance: 'drop' as const,
  },
  {
    id: 'mission',
    number: '02',
    label: 'Mission',
    statement: 'Digitize the way businesses work, sell, and grow.',
    points: [
      { kicker: 'Convert', text: 'Websites built to turn visitors into clients.' },
      { kicker: 'Reach', text: 'Marketing that finds the right customers.' },
      { kicker: 'Answer', text: 'Automation that replies without delay.' },
    ],
    dark: false,
    entrance: 'bounce' as const,
  },
] as const;

export const MissionVisionStory: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative z-20">
      {CHAPTERS.map((chapter) => (
        <Chapter key={chapter.id} chapter={chapter} reduce={!!shouldReduceMotion} />
      ))}
    </section>
  );
};

const TypeLine: React.FC<{
  text: string;
  active: boolean;
  className?: string;
  onDone?: () => void;
}> = ({ text, active, className, onDone }) => {
  const [count, setCount] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!active) return;
    if (count >= text.length) {
      if (!done.current) {
        done.current = true;
        onDone?.();
      }
      return;
    }
    const delay = count === 0 ? 40 : text[count - 1] === ' ' ? 18 : 32;
    const id = window.setTimeout(() => setCount((value) => value + 1), delay);
    return () => window.clearTimeout(id);
  }, [active, count, onDone, text]);

  return (
    <span className={className} aria-label={text}>
      {text.slice(0, count)}
      {active && count < text.length ? (
        <span className="inline-block w-[0.08em] h-[0.86em] ml-1 align-[-0.08em] bg-blue-500 type-caret" />
      ) : null}
    </span>
  );
};

const Chapter: React.FC<{
  chapter: (typeof CHAPTERS)[number];
  reduce: boolean;
}> = ({ chapter, reduce }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.42 });
  const [phase, setPhase] = useState<'idle' | 'label' | 'type' | 'done'>('idle');
  const dark = chapter.dark;

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setPhase('done');
      return;
    }
    setPhase('label');
    const id = window.setTimeout(() => setPhase('type'), chapter.entrance === 'drop' ? 780 : 920);
    return () => window.clearTimeout(id);
  }, [chapter.entrance, inView, reduce]);

  const labelMotion =
    chapter.entrance === 'drop'
      ? {
          initial: { y: -140, opacity: 0, rotateX: 28 },
          animate: inView ? { y: 0, opacity: 1, rotateX: 0 } : { y: -140, opacity: 0, rotateX: 28 },
          transition: { duration: 0.78, ease: editorialEase },
        }
      : {
          initial: { scale: 0.28, y: 48, opacity: 0 },
          animate: inView
            ? { scale: 1, y: 0, opacity: 1 }
            : { scale: 0.28, y: 48, opacity: 0 },
          transition: { type: 'spring', stiffness: 420, damping: 16, mass: 0.7 },
        };

  return (
    <div
      ref={ref}
      className={`relative min-h-[100svh] flex items-center overflow-hidden ${
        dark ? 'bg-[#0f131a] text-white' : 'bg-[#fafaf8] text-[#0f131a]'
      }`}
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-24 sm:py-28 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.32em] ${
            dark ? 'text-blue-400' : 'text-blue-600'
          }`}
        >
          {chapter.number} / {chapter.label}
        </motion.p>

        <motion.h2
          {...labelMotion}
          className="mt-8 sm:mt-10 font-display font-bold uppercase tracking-tight leading-none"
          style={{ fontSize: 'clamp(3.4rem, 14vw, 9.5rem)' }}
        >
          {chapter.label}
        </motion.h2>

        <div className="mt-8 sm:mt-10 min-h-[7.5rem] sm:min-h-[8.5rem] flex items-center justify-center">
          <h3 className="max-w-4xl font-display font-bold tracking-tight leading-[1.08] text-[clamp(1.6rem,4.4vw,3.4rem)]">
            {reduce || phase === 'done' ? (
              chapter.statement
            ) : (
              <TypeLine
                text={chapter.statement}
                active={phase === 'type' || phase === 'done'}
                onDone={() => setPhase('done')}
              />
            )}
          </h3>
        </div>

        <ul className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left">
          {chapter.points.map((point, i) => (
            <motion.li
              key={point.kicker}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={phase === 'done' ? { opacity: 1, y: 0 } : { opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: editorialEase }}
              className={`rounded-2xl px-5 py-5 ${
                dark ? 'bg-white/6 border border-white/10' : 'bg-white border border-black/[0.06] shadow-sm'
              }`}
            >
              <p className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dark ? 'text-blue-400' : 'text-blue-600'}`}>
                {point.kicker}
              </p>
              <p className={`mt-2 text-lg font-display font-bold leading-snug ${dark ? 'text-white' : 'text-[#0f131a]'}`}>
                {point.text}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};
