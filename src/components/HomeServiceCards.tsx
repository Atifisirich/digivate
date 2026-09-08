import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { ArrowRight, Globe, Smartphone, Target, Zap } from 'lucide-react';
import { SERVICES } from '../config/siteConfig';
import { SceneControls } from './SceneControls';

const TOTAL = SERVICES.length;

const THEMES = {
  'web-dev': {
    bg: '#2f6bff',
    ink: '#ffffff',
    muted: 'rgba(255,255,255,0.78)',
    pill: 'rgba(255,255,255,0.16)',
    icon: Globe,
  },
  'digital-marketing': {
    bg: '#ffb020',
    ink: '#16120a',
    muted: 'rgba(22,18,10,0.72)',
    pill: 'rgba(22,18,10,0.08)',
    icon: Target,
  },
  'ai-automation': {
    bg: '#7c3aed',
    ink: '#ffffff',
    muted: 'rgba(255,255,255,0.78)',
    pill: 'rgba(255,255,255,0.16)',
    icon: Zap,
  },
  'app-dev': {
    bg: '#12b886',
    ink: '#ffffff',
    muted: 'rgba(255,255,255,0.78)',
    pill: 'rgba(255,255,255,0.16)',
    icon: Smartphone,
  },
} as const;

/** Shortest signed distance from the front slot, in card units (−2 … 2). */
function relativeSlot(index: number, progress: number) {
  let slot = index - progress;
  slot = ((slot % TOTAL) + TOTAL) % TOTAL;
  if (slot > TOTAL / 2) slot -= TOTAL;
  return slot;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export const HomeServiceCards: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.22 });
  const rawProgress = useMotionValue(0);
  const progress = useSpring(rawProgress, { stiffness: 78, damping: 20, mass: 0.55 });
  const isPhone = typeof window !== 'undefined' && window.innerWidth < 640;
  const spread = useMotionValue(isPhone ? 148 : 280);
  const rotateStep = useMotionValue(isPhone ? 26 : 44);
  const fadeFrom = useMotionValue(isPhone ? 0.7 : 1.05);
  const fadeTo = useMotionValue(isPhone ? 1.22 : 1.78);
  const [tilt, setTilt] = useState(() => (isPhone ? 6 : 14));
  const [active, setActive] = useState(0);

  useEffect(() => {
    const measure = () => {
      const width = window.innerWidth;
      const phone = width < 640;
      spread.set(phone ? 148 : width < 1024 ? 200 : 320);
      rotateStep.set(phone ? 26 : 44);
      fadeFrom.set(phone ? 0.7 : 1.05);
      fadeTo.set(phone ? 1.22 : 1.78);
      setTilt(phone ? 6 : 14);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [spread, rotateStep, fadeFrom, fadeTo]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (inView) {
        rawProgress.set(rawProgress.get() + dt * 0.32);
      }
      const next = ((Math.round(rawProgress.get()) % TOTAL) + TOTAL) % TOTAL;
      setActive((current) => (current === next ? current : next));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, rawProgress, shouldReduceMotion]);

  const jump = (index: number) => {
    const current = rawProgress.get();
    const cycle = Math.round(current / TOTAL) * TOTAL;
    let target = cycle + index;
    if (target - current > TOTAL / 2) target -= TOTAL;
    if (current - target > TOTAL / 2) target += TOTAL;
    rawProgress.set(target);
  };

  if (shouldReduceMotion) {
    return (
      <section className="relative z-20 py-20 sm:py-28 bg-[#fafaf8]">
        <ServiceHeading />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((service) => (
            <ServiceCardBody key={service.id} service={service} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative z-20 py-16 sm:py-28 bg-[#fafaf8]">
      <ServiceHeading />

      <div
        className="relative mt-6 sm:mt-12 h-[400px] sm:h-[500px] lg:h-[540px]"
        style={{ perspective: '1100px', perspectiveOrigin: '50% 42%' }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d', transform: `rotateX(${tilt}deg)` }}
        >
          {SERVICES.map((service, index) => (
            <CoverflowCard
              key={service.id}
              service={service}
              index={index}
              progress={progress}
              spread={spread}
              rotateStep={rotateStep}
              fadeFrom={fadeFrom}
              fadeTo={fadeTo}
            />
          ))}
        </div>
      </div>
      <SceneControls
        onPrev={() => jump((active - 1 + TOTAL) % TOTAL)}
        onNext={() => jump((active + 1) % TOTAL)}
      />
    </section>
  );
};

const ServiceHeading: React.FC = () => (
  <header className="text-center px-4 max-w-4xl mx-auto">
    <span className="inline-flex items-center gap-3 text-[10px] sm:text-xs font-mono font-bold tracking-[0.28em] uppercase text-blue-600">
      <span className="w-8 h-px bg-blue-600/70" />
      What we build
      <span className="w-8 h-px bg-blue-600/70" />
    </span>
    <h2 className="mt-5 text-3xl sm:text-6xl lg:text-[4.75rem] font-display font-bold tracking-tight text-[#0f131a] leading-[0.94]">
      Services designed
      <span className="block text-blue-600">to grow a business.</span>
    </h2>
    <p className="mt-6 max-w-xl mx-auto text-base sm:text-lg text-zinc-600 leading-relaxed">
      Website development, app development, AI workflows, CRM automation, and digital marketing — each built as a system, not a one-off page.
    </p>
    <Link
      to="/services"
      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0f131a] hover:text-blue-600 transition-colors"
    >
      View all services
      <ArrowRight className="w-4 h-4" />
    </Link>
  </header>
);

const CoverflowCard: React.FC<{
  service: (typeof SERVICES)[number];
  index: number;
  progress: MotionValue<number>;
  spread: MotionValue<number>;
  rotateStep: MotionValue<number>;
  fadeFrom: MotionValue<number>;
  fadeTo: MotionValue<number>;
}> = ({ service, index, progress, spread, rotateStep, fadeFrom, fadeTo }) => {
  const rotateY = useTransform([progress, rotateStep], ([value, step]) => {
    const slot = relativeSlot(index, Number(value));
    return Math.max(-55, Math.min(55, -slot * Number(step)));
  });
  const x = useTransform([progress, spread], ([value, width]) => {
    const slot = relativeSlot(index, Number(value));
    const drift = 1 + Math.max(0, Math.abs(slot) - 1) * 0.55;
    return slot * Number(width) * drift;
  });
  const z = useTransform(progress, (value) => {
    const slot = Math.abs(relativeSlot(index, Number(value)));
    return 140 - slot * 180;
  });
  const y = useTransform(progress, (value) => Math.abs(relativeSlot(index, Number(value))) * 14);
  const opacity = useTransform([progress, fadeFrom, fadeTo], ([value, from, to]) => {
    const slot = Math.abs(relativeSlot(index, Number(value)));
    return 1 - smoothstep(Number(from), Number(to), slot);
  });
  const scale = useTransform(progress, (value) => {
    const slot = Math.abs(relativeSlot(index, Number(value)));
    return 1 - Math.min(slot, 1.15) * 0.07;
  });
  const zIndex = useTransform(progress, (value) => {
    const slot = Math.abs(relativeSlot(index, Number(value)));
    return Math.round(20 - slot * 8);
  });
  const pointerEvents = useTransform(progress, (value) =>
    Math.abs(relativeSlot(index, Number(value))) < 0.38 ? 'auto' : 'none',
  );

  return (
    <motion.div
      style={{
        x,
        y,
        z,
        rotateY,
        scale,
        zIndex,
        pointerEvents,
        transformStyle: 'preserve-3d',
      }}
      className="absolute left-1/2 top-1/2 -ml-[105px] -mt-[140px] sm:-ml-[160px] sm:-mt-[200px] w-[210px] h-[280px] sm:w-[320px] sm:h-[400px] will-change-transform"
    >
      <motion.div style={{ opacity }} className="h-full w-full">
        <ServiceCardBody service={service} />
      </motion.div>
    </motion.div>
  );
};

const ServiceCardBody: React.FC<{ service: (typeof SERVICES)[number] }> = ({ service }) => {
  const theme = THEMES[service.id];
  const Icon = theme.icon;

  return (
    <article
      className="h-full min-h-0 sm:min-h-[400px] rounded-[1.5rem] sm:rounded-[2rem] px-5 py-5 sm:px-8 sm:py-8 flex flex-col shadow-[0_30px_80px_-28px_rgba(15,19,26,0.45)]"
      style={{ backgroundColor: theme.bg, color: theme.ink }}
    >
      <div className="flex items-start justify-end">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: theme.pill }}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <h3 className="mt-5 sm:mt-8 text-xl sm:text-3xl font-display font-bold uppercase tracking-tight leading-[0.92]">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed" style={{ color: theme.muted }}>
        {service.tagline}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {service.capabilities.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium"
            style={{ backgroundColor: theme.pill, color: theme.ink }}
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        to={service.path}
        className="mt-auto pt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] hover:gap-3 transition-all"
        style={{ color: theme.ink }}
      >
        Explore capability
        <ArrowRight className="w-4 h-4" />
      </Link>
    </article>
  );
};
