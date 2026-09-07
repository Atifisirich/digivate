import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SHOWCASE_WORK } from '../config/siteConfig';
import { WordReveal } from './EditorialMotion';
import { WorkDistortCard } from './WorkDistortCard';
import { SCROLL_OFFSETS, useScrollProgress } from '../hooks/useScrollProgress';

/**
 * Parallax travel in each direction. `--gallery-gutter` (see `.showcase-h-scroll`)
 * reserves this much extra side padding so drifting never pushes a card out of reach.
 */
const DRIFT = 28;

export const HomeWorkGallery: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useScrollProgress(trackRef, { offset: SCROLL_OFFSETS.cover });
  const x = useTransform(scrollYProgress, [0, 1], [DRIFT, -DRIFT]);

  return (
    <section className="relative z-10 py-20 sm:py-28 overflow-hidden border-b border-black/[0.08] bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-4">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.22em] uppercase text-blue-600">
            Selected work
          </span>
          <WordReveal
            as="h2"
            text="Sites built to convert."
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[#0f131a] leading-[1.05]"
          />
        </div>
        <Link
          to="/portfolio"
          data-cursor="expand"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#0f131a] hover:text-blue-600 transition-colors"
        >
          Open the full gallery
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* The parallax sits on the track, not the scroll container — transforming the
          scroller itself shifted its viewport and cut off the first and last cards. */}
      <div ref={trackRef} className="relative overflow-x-auto showcase-h-scroll pb-4">
        <motion.div
          style={shouldReduceMotion ? undefined : { x }}
          className="flex w-max gap-4 sm:gap-6 px-[var(--gallery-gutter)]"
        >
          {SHOWCASE_WORK.map((project, index) => (
            <WorkDistortCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
