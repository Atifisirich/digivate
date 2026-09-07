import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';

export const editorialEase = [0.16, 1, 0.3, 1] as const;

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  stagger?: number;
  inView?: boolean;
}

/** Clip-mask word reveal — each word rises from below its own crop. */
export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className,
  delay = 0,
  as: Tag = 'span',
  stagger = 0.055,
  inView = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');
  const MotionTag = motion[Tag];

  const motionProps = inView
    ? {
        initial: shouldReduceMotion ? { y: '0%' } : { y: '115%' },
        whileInView: { y: '0%' },
        viewport: { once: true, amount: 0.45 },
      }
    : {
        initial: shouldReduceMotion ? { y: '0%' } : { y: '115%' },
        animate: { y: '0%' },
      };

  return (
    <MotionTag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="editorial-word" aria-hidden>
          <motion.span
            className="editorial-word__inner"
            {...motionProps}
            transition={{ duration: 0.72, delay: delay + i * stagger, ease: editorialEase }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};

interface LetterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

/** Sets copy onto the page one letter at a time. */
export const LetterReveal: React.FC<LetterRevealProps> = ({
  text,
  className,
  delay = 0,
  stagger = 0.024,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');
  let charIndex = 0;

  return (
    <span className={className} aria-label={text}>
      {words.map((word, w) => {
        const letters = Array.from(word).map((char) => ({ char, index: charIndex++ }));
        const isLast = w === words.length - 1;
        // Count the space so the stagger keeps the cadence of the original string.
        if (!isLast) charIndex += 1;

        return (
          <React.Fragment key={`${word}-${w}`}>
            {/* Letters are inline-block to animate, so a word needs its own no-wrap box —
                otherwise lines break between any two characters. */}
            <span className="inline-block whitespace-nowrap" aria-hidden>
              {letters.map(({ char, index }) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: '0.45em' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, delay: delay + index * stagger, ease: editorialEase }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {isLast ? null : ' '}
          </React.Fragment>
        );
      })}
    </span>
  );
};

interface InViewRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Clip rise used for in-view editorial blocks (not a generic fade). */
export const InViewReveal: React.FC<InViewRevealProps> = ({ children, className, delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span className={`editorial-word block ${className ?? ''}`}>
      <motion.span
        className="block"
        initial={shouldReduceMotion ? { y: 0, clipPath: 'inset(0 0 0 0)' } : { y: 28, clipPath: 'inset(12% 0 0 0)' }}
        whileInView={{ y: 0, clipPath: 'inset(0 0 0 0)' }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.75, delay, ease: editorialEase }}
      >
        {children}
      </motion.span>
    </span>
  );
};

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/** Pulls a row slightly toward the pointer — used on service lists. */
export const MagneticRow: React.FC<MagneticProps> = ({ children, className, strength = 10 }) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.35 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px * strength);
    y.set(py * (strength * 0.35));
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const useLineDraw = (reduce: boolean | null) => {
  const progress = useMotionValue(reduce ? 1 : 0);
  const width = useTransform(progress, [0, 1], ['0%', '100%']);
  return { progress, width };
};
