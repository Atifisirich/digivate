import React, { forwardRef, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

interface ZoomSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/** Section enters zoomed-out, settles, then flies toward the camera on the way out. */
export const ZoomSection = forwardRef<HTMLElement, ZoomSectionProps>(function ZoomSection(
  { children, className, id },
  forwardedRef,
) {
  const localRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: localRef,
    offset: ['start 0.92', 'end 0.08'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.78, 1, 1, 1.14]);
  const opacity = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [0.12, 1, 1, 0.18]);
  const z = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [-160, 0, 0, 140]);
  const rotateX = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [10, 0, 0, -7]);

  const setRefs = (node: HTMLElement | null) => {
    localRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  if (shouldReduceMotion) {
    return (
      <section ref={setRefs} id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <section
      ref={setRefs}
      id={id}
      className={`[perspective:1400px] ${className ?? ''}`}
    >
      <motion.div
        style={{
          scale,
          opacity,
          rotateX,
          z,
          transformPerspective: 1400,
          transformStyle: 'preserve-3d',
        }}
        className="will-change-transform origin-center w-full"
      >
        {children}
      </motion.div>
    </section>
  );
});
