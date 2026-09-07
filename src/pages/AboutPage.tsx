import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WordReveal, LetterReveal, editorialEase } from '../components/EditorialMotion';
import { MagneticDotField } from '../components/MagneticDotField';
import { MissionVisionStory } from '../components/MissionVisionStory';
import { ZoomSection } from '../components/ZoomStage';
import { PAGE_SEO } from '../config/seo';
import { PageBreadcrumb, PageFaq, Seo } from '../components/Seo';

interface AboutPageProps {
  onOpenBooking: () => void;
}

const easeOut = editorialEase;

const heroLines = [
  'WE BUILD DIGITAL',
  'SYSTEMS',
  'THAT HELP',
  'BUSINESSES',
  'MOVE FORWARD.',
];

const PROCESS_VB = { w: 800, h: 1280 };
const PROCESS_PATH =
  'M 200 160 C 40 300, 760 340, 600 480 C 440 620, 40 660, 200 800 C 360 940, 760 980, 600 1120';

const workSteps = [
  { num: '01', title: 'DISCOVER', text: 'Understand the business, audience and goals.', x: 200, y: 160, side: 'left' as const, at: 0.08 },
  { num: '02', title: 'BUILD', text: 'Design and develop the right digital foundation.', x: 600, y: 480, side: 'right' as const, at: 0.34 },
  { num: '03', title: 'CONNECT', text: 'Integrate the channels and systems that keep everything working together.', x: 200, y: 800, side: 'left' as const, at: 0.62 },
  { num: '04', title: 'GROW', text: 'Track results and scale what\'s working.', x: 600, y: 1120, side: 'right' as const, at: 0.9 },
];

const team = [
  {
    name: 'ATIF KHAN',
    role: 'Founder',
    initials: 'AK',
    text: 'As the Founder of Digivate, Atif handles the overarching vision, strategy, and direction of the agency. He is responsible for building client relationships, guiding the company\'s growth, and ensuring every digital system we deliver aligns with our high standards for performance and design.',
  },
  {
    name: 'HAJIRA BI',
    role: 'Co-Founder',
    initials: 'HB',
    text: 'As Co-Founder, Hajira helps shape the strategy, creativity, and daily execution behind Digivate. She oversees operational processes, contributes to the agency\'s creative direction, and ensures projects are delivered with precision and impact.',
  },
];

const CountUp: React.FC<{ value: number; suffix?: string; className?: string }> = ({
  value,
  suffix = '',
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(shouldReduceMotion ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (shouldReduceMotion) {
      setDisplay(value);
      return;
    }

    const duration = 1400;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, shouldReduceMotion]);

  return (
    <div ref={ref} className={className}>
      {display}
      {suffix}
    </div>
  );
};

const TeamCard: React.FC<{
  member: (typeof team)[number];
  index: number;
  shouldReduceMotion: boolean | null;
}> = ({ member, index, shouldReduceMotion }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x: y, y: x });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: easeOut }}
    >
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: shouldReduceMotion
          ? undefined
          : `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
      className="group relative bg-white border border-black/[0.07] p-8 md:p-10 space-y-6 overflow-hidden rounded-3xl hover:border-blue-600/25 hover:shadow-[0_28px_60px_-32px_rgba(37,99,235,0.28)]"
    >
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-start justify-between gap-4 relative">
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-zinc-400">
            0{index + 1}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold font-display text-[#0f131a]">{member.name}</h3>
          <div className="text-sm font-mono text-blue-600 tracking-wider uppercase">{member.role}</div>
        </div>
        <motion.div
          whileHover={shouldReduceMotion ? undefined : { scale: 1.08, rotate: -4 }}
          className="w-14 h-14 rounded-full bg-[#0f131a] text-white font-mono text-sm font-bold flex items-center justify-center shrink-0"
        >
          {member.initials}
        </motion.div>
      </div>
      <motion.div
        className="h-px bg-black/[0.06] w-full origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 + index * 0.1, ease: easeOut }}
      />
      <p className="text-base text-zinc-600 leading-relaxed relative">{member.text}</p>
    </div>
    </motion.div>
  );
};

const HowWeWorkProcess: React.FC<{ shouldReduceMotion: boolean | null }> = ({
  shouldReduceMotion,
}) => {
  const processRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduceMotion = Boolean(shouldReduceMotion);

  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ['start 0.75', 'end 0.45'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.001,
  });
  const pathLength = useTransform(smoothProgress, (value) => {
    if (reduceMotion) return 1;
    return Math.min(1, Math.max(0, value));
  });

  const [reached, setReached] = useState<boolean[]>(() => workSteps.map(() => reduceMotion));
  const [head, setHead] = useState({ x: workSteps[0].x, y: workSteps[0].y });

  useEffect(() => {
    const sync = (value: number) => {
      if (reduceMotion) {
        setReached(workSteps.map(() => true));
        return;
      }
      const next = workSteps.map((step) => value >= step.at);
      setReached((prev) => (prev.every((flag, i) => flag === next[i]) ? prev : next));

      const path = pathRef.current;
      if (!path) return;
      const len = path.getTotalLength();
      const point = path.getPointAtLength(len * Math.min(1, Math.max(0, value)));
      setHead({ x: point.x, y: point.y });
    };

    sync(smoothProgress.get());
    return smoothProgress.on('change', sync);
  }, [reduceMotion, smoothProgress]);

  return (
    <div
      ref={processRef}
      className="relative mx-auto w-full max-w-5xl"
      style={{ aspectRatio: `${PROCESS_VB.w} / ${PROCESS_VB.h}` }}
    >
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${PROCESS_VB.w} ${PROCESS_VB.h}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <path
          d={PROCESS_PATH}
          fill="none"
          stroke="#d4d4d8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <motion.path
          ref={pathRef}
          d={PROCESS_PATH}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3.5"
          strokeLinecap="round"
          style={{ pathLength: reduceMotion ? 1 : pathLength }}
        />
        {!reduceMotion && (
          <motion.circle
            r="7"
            fill="#2563eb"
            cx={head.x}
            cy={head.y}
            className="how-we-work-head"
            style={{ opacity: pathLength }}
          />
        )}
      </svg>

      {workSteps.map((item, index) => {
        const active = reached[index];
        const isLeft = item.side === 'left';

        return (
          <div
            key={item.num}
            className="absolute z-10"
            style={{
              top: `${(item.y / PROCESS_VB.h) * 100}%`,
              left: `${(item.x / PROCESS_VB.w) * 100}%`,
            }}
          >
            <motion.div
              animate={{
                borderColor: active ? '#2563eb' : '#d4d4d8',
                backgroundColor: '#ffffff',
                color: active ? '#0f131a' : '#a1a1aa',
                scale: active ? 1 : 0.94,
              }}
              transition={{ duration: 0.45, ease: easeOut }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full border-[2.5px] flex items-center justify-center ${
                active
                  ? 'shadow-[0_0_0_6px_#fafaf8,0_0_28px_rgba(37,99,235,0.32)]'
                  : 'shadow-[0_0_0_6px_#fafaf8]'
              }`}
            >
              <span className="text-sm font-mono font-bold">{item.num}</span>
            </motion.div>

            <div
              className={`absolute -translate-y-1/2 w-[42vw] max-w-[280px] lg:max-w-[340px] transition-[opacity,filter,color] duration-500 ease-out ${
                isLeft ? 'left-8 md:left-12 text-left' : 'right-8 md:right-12 text-right'
              } ${active ? 'opacity-100 blur-0' : 'opacity-35 blur-[5px]'}`}
            >
              <h3
                className={`text-2xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-1 md:mb-2 ${
                  active ? 'text-[#0f131a]' : 'text-zinc-400'
                }`}
              >
                {item.title}
              </h3>
              <p className={`text-sm lg:text-base leading-relaxed ${active ? 'text-zinc-600' : 'text-zinc-400'}`}>
                {item.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  const shouldReduceMotion = useReducedMotion();
  const [heroGlow, setHeroGlow] = useState({ x: 50, y: 30 });

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
  };

  const handleHeroMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setHeroGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="pt-24 pb-0 selection:bg-blue-100 selection:text-blue-900">
      <Seo page={PAGE_SEO.about} />
      <section
        className="relative min-h-[78svh] md:min-h-[86svh] flex flex-col justify-end pt-28 pb-16 md:pb-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden"
        onMouseMove={handleHeroMove}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-24 w-[520px] h-[520px] rounded-full bg-blue-500/10 blur-[120px]"
          animate={
            shouldReduceMotion
              ? { opacity: 0.4 }
              : { opacity: 0.55, left: `calc(${heroGlow.x}% - 260px)`, top: `calc(${heroGlow.y}% - 260px)` }
          }
          transition={{ type: 'spring', stiffness: 40, damping: 20 }}
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8 space-y-8">
            {PAGE_SEO.about.breadcrumbs ? <PageBreadcrumb items={PAGE_SEO.about.breadcrumbs} /> : null}
            <motion.span
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-blue-600 block"
            >
              ABOUT DIGIVATE
            </motion.span>
            <h1 className="text-[clamp(2.4rem,7.2vw,5.75rem)] font-bold font-display leading-[0.92] text-[#0f131a] tracking-tight">
              {heroLines.map((line, i) => {
                const prior = heroLines.slice(0, i).reduce((sum, item) => sum + item.length, 0);
                return (
                  <span key={line} className="block">
                    <LetterReveal text={line} delay={0.12 + prior * 0.018} stagger={0.018} />
                  </span>
                );
              })}
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.35, ease: easeOut }}
            className="lg:col-span-4 text-base md:text-lg text-zinc-600 leading-relaxed lg:pb-2"
          >
            Digivate is a digital growth agency in Hyderabad. We digitize businesses — website development, app development, AI workflows, CRM automation, and digital marketing — so they can be found, trusted, and grown.
          </motion.p>
        </div>
      </section>

      <MissionVisionStory />
      {PAGE_SEO.about.faqs ? <PageFaq items={PAGE_SEO.about.faqs} /> : null}

      <ZoomSection className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 md:space-y-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              className="space-y-4 max-w-2xl"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
                THE PEOPLE BEHIND DIGIVATE
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display leading-[1.1] text-[#0f131a]">
                <WordReveal inView as="span" text="THE FOUNDERS." className="block" />
              </h2>
              <p className="text-lg text-zinc-600 leading-relaxed">
                Digivate is led by two founders who shape the vision, the craft, and the way every project is delivered.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {team.map((member, index) => (
                <TeamCard
                  key={member.name}
                  member={member}
                  index={index}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
          </div>
        </div>
      </ZoomSection>

      <section id="how-we-work" className="py-24 md:py-32 overflow-x-clip border-y border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4"
          >
            <span className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-blue-600 block">
              The process
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-[#0f131a] tracking-tight">
              How we work
            </h2>
            <p className="text-lg md:text-xl text-zinc-600">
              From understanding the problem to building systems that create measurable growth.
            </p>
          </motion.div>

          <HowWeWorkProcess shouldReduceMotion={shouldReduceMotion} />
        </div>
      </section>

      <section className="py-12 md:py-16 bg-[#0f131a] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-white/10">
            {[
              { type: 'count' as const, value: 10, suffix: '+', label: 'SAMPLE PROJECTS' },
              { type: 'count' as const, value: 4, suffix: '', label: 'CORE SERVICES' },
              { type: 'count' as const, value: 1, suffix: '', label: 'CONNECTED GROWTH SYSTEM' },
              { type: 'symbol' as const, value: '∞', label: 'POSSIBILITIES TO GROW' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: easeOut }}
                className="space-y-2 md:space-y-4 px-2 md:px-4"
              >
                {stat.type === 'count' ? (
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-blue-400"
                  />
                ) : (
                  <motion.div
                    initial={{ scale: shouldReduceMotion ? 1 : 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15, ease: easeOut }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-blue-400"
                  >
                    {stat.value}
                  </motion.div>
                )}
                <div className="text-xs sm:text-sm font-mono font-bold tracking-wider text-zinc-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[28rem] md:min-h-[34rem] py-20 md:py-28 overflow-hidden flex items-center justify-center border-t border-black/[0.06]">
        <MagneticDotField />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 } },
          }}
          className="relative z-10 text-center space-y-6 md:space-y-8 px-4 max-w-3xl pointer-events-none"
        >
          <div className="space-y-4 md:space-y-6">
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-[#0f131a] tracking-tight">
              <WordReveal inView as="span" text="READY TO BUILD" className="block" />
              <WordReveal inView delay={0.1} as="span" text="WHAT'S NEXT?" className="block" />
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-600">
              Let's create a digital system that works as hard as your business does.
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-2 md:pt-4 pointer-events-auto"
          >
            <motion.button
              onClick={onOpenBooking}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="group relative px-6 py-4 md:px-8 bg-[#0f131a] text-white font-bold text-sm tracking-wide overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                START A CONVERSATION <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <Link
              to="/portfolio"
              className="group flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-[#0f131a] transition-colors"
            >
              EXPLORE OUR WORK
              <div className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};
