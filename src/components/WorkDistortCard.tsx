import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { ShowcaseWorkItem } from '../types';
import { editorialEase } from './EditorialMotion';

interface WorkDistortCardProps {
  project: ShowcaseWorkItem;
  index: number;
  variant?: 'gallery' | 'editorial';
}

/** Case card with magnetic tilt + image drift — reduced-motion stays flat. */
export const WorkDistortCard: React.FC<WorkDistortCardProps> = ({
  project,
  index,
  variant = 'gallery',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 160, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 160, damping: 18, mass: 0.4 });
  const rotateY = useTransform(sx, (v) => v * 7);
  const rotateX = useTransform(sy, (v) => v * -5);
  const imgX = useTransform(sx, (v) => v * 10);
  const imgY = useTransform(sy, (v) => v * 8);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const wide = variant === 'gallery';

  return (
    <motion.a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="view"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: editorialEase }}
      style={shouldReduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      className={`work-distort group relative block overflow-hidden bg-[#0f131a] ${
        wide
          ? 'min-w-[82vw] sm:min-w-[58vw] lg:min-w-[42vw] aspect-[16/10] rounded-[1.6rem] sm:rounded-[2rem]'
          : 'w-full aspect-[16/10] rounded-[1.4rem]'
      }`}
    >
      <motion.img
        src={project.image}
        alt={`${project.title} website by Digivate — ${project.category}`}
        style={shouldReduceMotion ? undefined : { x: imgX, y: imgY }}
        className="absolute inset-0 h-[112%] w-[112%] -left-[6%] -top-[6%] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f131a]/85 via-[#0f131a]/15 to-transparent" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-blue-600/10 mix-blend-overlay" />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 flex items-end justify-between gap-4">
        <div className="space-y-1.5">
          <span className="block text-[10px] sm:text-xs font-mono font-bold tracking-[0.22em] uppercase text-blue-300">
            {String(index + 1).padStart(2, '0')} · {project.category}
          </span>
          <h3 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm text-white/70 max-w-md leading-relaxed hidden sm:block">
            {project.description}
          </p>
        </div>
        <span className="shrink-0 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </motion.a>
  );
};
