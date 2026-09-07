import React, { useRef } from 'react';
import { cubicBezier, motion, useReducedMotion, useSpring, useTransform, type MotionValue } from 'motion/react';
import { SCROLL_OFFSETS, useScrollProgress } from '../hooks/useScrollProgress';

const CHAPTERS = [
  {
    num: '01',
    title: 'Search & Discovery',
    text: 'Putting your business in front of customers who are actively searching for your services through targeted campaigns, search visibility, and regional marketing.',
  },
  {
    num: '02',
    title: 'High-Conversion Websites',
    text: 'Engineering fast, mobile-first websites designed with clear inquiry pathways, transparent service presentation, and frictionless booking experiences.',
  },
  {
    num: '03',
    title: 'Automated Workflows',
    text: 'Eliminating manual administrative overhead with automated email sequences, instant WhatsApp inquiry responses, and synchronized calendar scheduling.',
  },
];

/** Pinned 3D cards — each zooms in from depth, then flies toward the camera and off-screen. */
export const StickyGrowthStory: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(pinRef, { offset: SCROLL_OFFSETS.pin });
  // Takes the step out of coarse wheel deltas without lagging behind the scrollbar.
  const progress = useSpring(scrollProgress, { stiffness: 260, damping: 44, mass: 0.32 });

  if (shouldReduceMotion) {
    return (
      <section className="relative z-20 py-20 sm:py-28 bg-[#f6f6f3] border-y border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <header className="max-w-3xl space-y-4">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.22em] uppercase text-blue-600">
              How growth happens
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-[#0f131a]">
              We help businesses attract, convert, and retain clients.
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CHAPTERS.map((item) => (
              <article key={item.num} className="rounded-3xl bg-white border border-black/[0.07] p-6 space-y-3">
                <span className="font-display text-3xl font-bold text-blue-600">{item.num}</span>
                <h3 className="text-2xl font-display font-bold text-[#0f131a]">{item.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={pinRef} className="relative z-20 h-[280vh]">
      <div className="sticky top-0 h-svh overflow-hidden bg-[#f6f6f3] flex flex-col">
        <div className="h-20 shrink-0" aria-hidden />
        <div className="flex-1 min-h-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6 relative z-10">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.22em] uppercase text-blue-600">
                How growth happens
              </span>
              <h2 className="text-3xl sm:text-5xl xl:text-[3.25rem] font-display font-bold tracking-tight text-[#0f131a] leading-[1.08]">
                We help businesses attract, convert, and retain clients.
              </h2>
              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-md">
                Digivate is a digital growth agency. We partner with businesses to build high-performance websites, capture high-intent customers on Google, automate repetitive inquiry follow-ups, and run high-return digital campaigns.
              </p>
            </div>

            <div
              className="lg:col-span-7 relative h-[340px] sm:h-[420px]"
              style={{ perspective: '1400px', perspectiveOrigin: '50% 45%' }}
            >
              {CHAPTERS.map((item, i) => (
                <ZoomCard key={item.num} item={item} index={i} progress={progress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/** Length of a card handover, in units of overall scroll progress. */
const HANDOVER = 0.13;
/** Where the handover sits relative to the boundary — mostly before it, so the incoming card leads. */
const HANDOVER_LEAD = 0.8;

type Easing = (t: number) => number;

const settleEase: Easing = cubicBezier(0.22, 1, 0.36, 1);
const departEase: Easing = cubicBezier(0.55, 0, 0.85, 0.35);
const linearEase: Easing = (t) => t;

/** Depth pose a card holds before it arrives and after it leaves. */
const APPROACHING = { scale: 0.74, opacity: 0, z: -420, y: 56, rotateX: 12 };
const SETTLED = { scale: 1, opacity: 1, z: 0, y: 0, rotateX: 0 };
/** Drift at the end of the hold, so a card is never completely frozen. */
const DRIFTED = { scale: 1.05, opacity: 1, z: 26, y: -10, rotateX: -1.5 };
/** Kept modest so a card is transparent well before it could reach the headline column. */
const DEPARTED = { scale: 1.46, opacity: 0, z: 300, y: -42, rotateX: -11 };

type Pose = typeof SETTLED;

const ZoomCard: React.FC<{
  item: (typeof CHAPTERS)[number];
  index: number;
  progress: MotionValue<number>;
}> = ({ item, index, progress }) => {
  const count = CHAPTERS.length;
  const segment = 1 / count;
  const enterAt = index * segment;
  const exitAt = (index + 1) * segment;
  const isFirst = index === 0;
  const isLast = index === count - 1;

  const times: number[] = [];
  const poses: Pose[] = [];
  const motionEase: Easing[] = [];
  const fadeEase: Easing[] = [];

  // A card's exit window is exactly the next card's entry window, so the two cross-fade
  // against each other and the stage is never empty.
  if (isFirst) {
    times.push(0);
    poses.push(SETTLED);
  } else {
    times.push(enterAt - HANDOVER * HANDOVER_LEAD, enterAt + HANDOVER * (1 - HANDOVER_LEAD));
    poses.push(APPROACHING, SETTLED);
    motionEase.push(settleEase);
    fadeEase.push(settleEase);
  }

  if (isLast) {
    times.push(1);
    poses.push(DRIFTED);
    motionEase.push(linearEase);
    fadeEase.push(linearEase);
  } else {
    times.push(exitAt - HANDOVER * HANDOVER_LEAD, exitAt + HANDOVER * (1 - HANDOVER_LEAD));
    poses.push(DRIFTED, DEPARTED);
    motionEase.push(linearEase, departEase);
    // Fades early in the window so a departing card is transparent before it grows large.
    fadeEase.push(linearEase, settleEase);
  }

  const pick = (key: keyof Pose) => poses.map((pose) => pose[key]);

  const scale = useTransform(progress, times, pick('scale'), { ease: motionEase });
  const z = useTransform(progress, times, pick('z'), { ease: motionEase });
  const y = useTransform(progress, times, pick('y'), { ease: motionEase });
  const rotateX = useTransform(progress, times, pick('rotateX'), { ease: motionEase });
  const opacity = useTransform(progress, times, pick('opacity'), { ease: fadeEase });

  // A transparent card still covers the headline at 1.4x, so keep it out of the way.
  const pointerEvents = useTransform(opacity, (value) => (value > 0.9 ? 'auto' : 'none'));

  return (
    <motion.article
      style={{
        scale,
        opacity,
        y,
        rotateX,
        z,
        pointerEvents,
        transformStyle: 'preserve-3d',
      }}
      className="absolute inset-0 rounded-3xl bg-white border border-black/[0.08] px-6 py-8 sm:px-10 sm:py-12 shadow-[0_28px_80px_-36px_rgba(15,19,26,0.35)] flex flex-col justify-center space-y-4 will-change-transform origin-center"
    >
      <span className="block font-display text-5xl sm:text-7xl font-bold tracking-tight text-blue-600 leading-none">
        {item.num}
      </span>
      <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#0f131a] tracking-tight">
        {item.title}
      </h3>
      <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl">
        {item.text}
      </p>
    </motion.article>
  );
};
