import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import {
  Briefcase,
  Building2,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  Rocket,
  Scissors,
  ShoppingBag,
  Store,
  UtensilsCrossed,
} from 'lucide-react';
import { editorialEase } from './EditorialMotion';
import { SceneControls } from './SceneControls';

const INDUSTRIES = [
  {
    name: 'Real Estate',
    line: 'Listings, tours, and inquiry flows that turn browsers into site visits.',
    color: '#2f6bff',
    icon: Building2,
  },
  {
    name: 'Schools',
    line: 'Enrollment-ready websites parents can actually finish.',
    color: '#0ea5e9',
    icon: GraduationCap,
  },
  {
    name: 'E-Commerce',
    line: 'Stores built to sell — fast pages, clear offers, fewer abandoned carts.',
    color: '#ffb020',
    icon: ShoppingBag,
  },
  {
    name: 'Restaurants & Cafes',
    line: 'Menus, reservations, and a brand people remember after dinner.',
    color: '#f43f5e',
    icon: UtensilsCrossed,
  },
  {
    name: 'Startups',
    line: 'A launch-ready presence that looks funded on day one.',
    color: '#8b5cf6',
    icon: Rocket,
  },
  {
    name: 'Salons',
    line: 'Booking-first sites that keep the chair full.',
    color: '#ec4899',
    icon: Scissors,
  },
  {
    name: 'Hospitals & Clinics',
    line: 'Trust, clarity, and appointment-ready pages patients can follow.',
    color: '#14b8a6',
    icon: HeartPulse,
  },
  {
    name: 'Consultants',
    line: 'Authority sites that win the next retainer.',
    color: '#64748b',
    icon: Briefcase,
  },
  {
    name: 'Gyms',
    line: 'Memberships, schedules, and a brand that sweats.',
    color: '#22c55e',
    icon: Dumbbell,
  },
  {
    name: 'Local Business',
    line: 'Get found, get trusted, get the call.',
    color: '#f97316',
    icon: Store,
  },
] as const;

const COUNT = INDUSTRIES.length;
const STEP = 360 / COUNT;

export const IndustriesWeServe: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.28 });
  const rawFront = useMotionValue(0);
  const front = useSpring(rawFront, { stiffness: 80, damping: 20, mass: 0.55 });
  const [active, setActive] = useState(0);
  const [depth, setDepth] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 640 ? 118 : 400,
  );
  const [tilt, setTilt] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 640 ? 8 : 26,
  );

  useEffect(() => {
    const measure = () => {
      const width = window.innerWidth;
      setDepth(width < 640 ? 118 : width < 1024 ? 260 : 400);
      setTilt(width < 640 ? 8 : width < 1024 ? 18 : 26);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (inView) {
        rawFront.set(rawFront.get() + dt / 1.65);
      }
      const next = ((Math.round(rawFront.get()) % COUNT) + COUNT) % COUNT;
      setActive((current) => (current === next ? current : next));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, rawFront, shouldReduceMotion]);

  const jump = (index: number) => {
    const current = rawFront.get();
    const cycle = Math.round(current / COUNT) * COUNT;
    let target = cycle + index;
    if (target - current > COUNT / 2) target -= COUNT;
    if (current - target > COUNT / 2) target += COUNT;
    rawFront.set(target);
  };

  if (shouldReduceMotion) {
    return (
      <section className="relative z-20 py-20 sm:py-28 bg-[#0f131a] text-white">
        <IndustryHeading />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-3">
          {INDUSTRIES.map((industry) => {
            const Icon = industry.icon;
            return (
              <article key={industry.name} className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                  style={{ backgroundColor: industry.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold">{industry.name}</h3>
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  const current = INDUSTRIES[active];

  return (
    <section ref={sectionRef} className="relative z-20 py-16 sm:py-28 bg-[#0f131a] text-white">
      <IndustryHeading />

      <div className="relative mt-10 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 items-start lg:items-center gap-10 lg:gap-8 px-4 sm:px-8 lg:px-12">
        <div className="relative z-10 order-2 lg:order-1 lg:col-span-5 text-center lg:text-left overflow-hidden" style={{ perspective: '900px' }}>
          <div className="min-h-[4.5rem] sm:min-h-[9rem]">
            <AnimatePresence mode="wait">
              <motion.h3
                key={current.name}
                initial={{ rotateY: 55, x: 80, opacity: 0 }}
                animate={{ rotateY: 0, x: 0, opacity: 1 }}
                exit={{ rotateY: -55, x: -80, opacity: 0 }}
                transition={{ duration: 0.48, ease: editorialEase }}
                className="text-3xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[0.92]"
              >
                {current.name}
              </motion.h3>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={`${current.name}-line`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: editorialEase }}
              className="mt-4 max-w-md mx-auto lg:mx-0 text-base sm:text-lg text-white/65 leading-relaxed"
            >
              {current.line}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="relative z-0 order-1 lg:order-2 lg:col-span-7 h-[340px] sm:h-[400px] lg:h-[480px] pt-2 lg:pt-0">
          <IndustryRing front={front} depth={depth} tilt={tilt} />
        </div>
      </div>

      <SceneControls
        dark
        onPrev={() => jump((active - 1 + COUNT) % COUNT)}
        onNext={() => jump((active + 1) % COUNT)}
      />
    </section>
  );
};

const IndustryHeading: React.FC = () => (
  <header className="text-center px-4 mb-2">
    <span className="inline-flex items-center gap-3 text-[10px] sm:text-xs font-mono font-bold tracking-[0.28em] uppercase text-blue-400">
      <span className="w-8 h-px bg-blue-400/70" />
      Who we work with
      <span className="w-8 h-px bg-blue-400/70" />
    </span>
    <h2 className="mt-3 font-display font-bold tracking-tight text-3xl sm:text-6xl">
      Industries we serve.
    </h2>
  </header>
);

const IndustryRing: React.FC<{ front: MotionValue<number>; depth: number; tilt: number }> = ({
  front,
  depth,
  tilt,
}) => {
  return (
    <div className="relative h-full w-full" style={{ perspective: '1400px', perspectiveOrigin: '50% 58%' }}>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d', transform: `rotateX(${tilt}deg)` }}
      >
        {INDUSTRIES.map((industry, index) => (
          <IndustryOrb key={industry.name} industry={industry} index={index} front={front} depth={depth} />
        ))}
      </div>
    </div>
  );
};

const IndustryOrb: React.FC<{
  industry: (typeof INDUSTRIES)[number];
  index: number;
  front: MotionValue<number>;
  depth: number;
}> = ({ industry, index, front, depth }) => {
  const Icon = industry.icon;
  const rotateY = useTransform(front, (value) => (index - Number(value)) * STEP);
  const opacity = useTransform(front, (value) => {
    const distance = Math.abs(((index - Number(value)) % COUNT + COUNT) % COUNT);
    const nearest = Math.min(distance, COUNT - distance);
    if (nearest < 0.45) return 1;
    if (nearest < 1.35) return 0.88;
    if (nearest < 2.4) return 0.55;
    return 0.28;
  });
  const scale = useTransform(front, (value) => {
    const distance = Math.abs(((index - Number(value)) % COUNT + COUNT) % COUNT);
    const nearest = Math.min(distance, COUNT - distance);
    return 0.78 + 0.32 * Math.max(0, 1 - nearest / 2.2);
  });
  const zIndex = useTransform(front, (value) => {
    const distance = Math.abs(((index - Number(value)) % COUNT + COUNT) % COUNT);
    const nearest = Math.min(distance, COUNT - distance);
    return Math.round(20 - nearest * 4);
  });

  return (
    <motion.div
      style={{ rotateY, zIndex, transformStyle: 'preserve-3d' }}
      className="absolute left-1/2 top-[58%] sm:top-1/2 -ml-[48px] -mt-[48px] sm:-ml-[58px] sm:-mt-[58px] will-change-transform"
    >
      <div
        style={{
          transform: `translateZ(${depth}px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          style={{ opacity, scale }}
          className="w-[96px] h-[96px] sm:w-[116px] sm:h-[116px] rounded-[1.6rem] flex items-center justify-center text-white shadow-[0_22px_50px_-18px_rgba(0,0,0,0.7)]"
        >
          <div
            className="w-full h-full rounded-[1.6rem] flex items-center justify-center"
            style={{ backgroundColor: industry.color, backfaceVisibility: 'hidden' }}
          >
            <Icon className="w-9 h-9 sm:w-11 sm:h-11" strokeWidth={1.6} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
