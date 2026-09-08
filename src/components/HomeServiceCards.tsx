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
import { SceneControls, scrollSnapToIndex, useHorizontalProgress } from './SceneControls';

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
  const spread = useMotionValue(280);
  const [active, setActive] = useState(0);

  const [coverflow, setCoverflow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  );

  useEffect(() => {
    const measure = () => {
      const width = window.innerWidth;
      spread.set(width < 640 ? 148 : width < 1024 ? 240 : 320);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [spread]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const sync = () => setCoverflow(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !coverflow) return;

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
  }, [inView, rawProgress, shouldReduceMotion, coverflow]);

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
    <section ref={sectionRef} className="relative z-20 py-16 sm:py-28 bg-[#fafaf8] overflow-x-hidden">
      <ServiceHeading />

      {coverflow ? (
        <>
          <div
            className="relative mt-8 sm:mt-12 h-[420px] sm:h-[500px] lg:h-[540px]"
            style={{ perspective: '1100px', perspectiveOrigin: '50% 40%' }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d', transform: 'rotateX(14deg)' }}
            >
              {SERVICES.map((service, index) => (
                <CoverflowCard
                  key={service.id}
                  service={service}
                  index={index}
                  progress={progress}
                  spread={spread}
                />
              ))}
            </div>
          </div>
          <SceneControls
            onPrev={() => jump((active - 1 + TOTAL) % TOTAL)}
            onNext={() => jump((active + 1) % TOTAL)}
          />
        </>
      ) : (
        <MobileServiceStrip />
      )}
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

const MobileServiceStrip: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { active } = useHorizontalProgress(scrollerRef, TOTAL);

  return (
    <>
      <div
        ref={scrollerRef}
        className="scene-h-scroll mt-8 px-[12vw] sm:px-[18vw]"
      >
        <div className="flex gap-4 w-max pr-[12vw] sm:pr-[18vw]">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="w-[min(76vw,320px)] h-[340px] shrink-0 snap-center"
            >
              <ServiceCardBody service={service} />
            </div>
          ))}
        </div>
      </div>
      <SceneControls
        onPrev={() => scrollSnapToIndex(scrollerRef.current, Math.max(0, active - 1))}
        onNext={() => scrollSnapToIndex(scrollerRef.current, Math.min(TOTAL - 1, active + 1))}
      />
    </>
  );
};

const CoverflowCard: React.FC<{
  service: (typeof SERVICES)[number];
  index: number;
  progress: MotionValue<number>;
  spread: MotionValue<number>;
}> = ({ service, index, progress, spread }) => {
  const rotateY = useTransform(progress, (value) => {
    const slot = relativeSlot(index, Number(value));
    return Math.max(-70, Math.min(70, -slot * 44));
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
  const opacity = useTransform(progress, (value) => {
    const slot = Math.abs(relativeSlot(index, Number(value)));
    return 1 - smoothstep(1.05, 1.78, slot);
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
        opacity,
        scale,
        zIndex,
        pointerEvents,
      }}
      className="absolute left-1/2 top-1/2 -ml-[140px] -mt-[180px] sm:-ml-[160px] sm:-mt-[200px] w-[280px] h-[360px] sm:w-[320px] sm:h-[400px] will-change-transform"
    >
      <ServiceCardBody service={service} />
    </motion.div>
  );
};

const ServiceCardBody: React.FC<{ service: (typeof SERVICES)[number] }> = ({ service }) => {
  const theme = THEMES[service.id];
  const Icon = theme.icon;

  return (
    <article
      className="h-full min-h-[300px] sm:min-h-[400px] rounded-[1.7rem] sm:rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8 flex flex-col shadow-[0_30px_80px_-28px_rgba(15,19,26,0.45)]"
      style={{ backgroundColor: theme.bg, color: theme.ink }}
    >
      <div className="flex items-start justify-end">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: theme.pill }}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <h3 className="mt-8 text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight leading-[0.92]">
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
