import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { Globe, Smartphone, Target, Zap } from 'lucide-react';

const NODES = [
  {
    id: 'web',
    title: 'Web Development',
    line: 'Sites that convert',
    path: '/services/web-development',
    color: '#2f6bff',
    icon: Globe,
    corner: 'top-1 left-1',
    x: 18,
    y: 16,
  },
  {
    id: 'app',
    title: 'App Development',
    line: 'Products that scale',
    path: '/services/app-development',
    color: '#12b886',
    icon: Smartphone,
    corner: 'top-1 right-1',
    x: 82,
    y: 16,
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    line: 'Reach that lands',
    path: '/services/digital-marketing',
    color: '#ffb020',
    icon: Target,
    corner: 'bottom-1 left-1',
    x: 18,
    y: 84,
  },
  {
    id: 'automation',
    title: 'AI Automation',
    line: 'Work that runs itself',
    path: '/services/ai-automation',
    color: '#7c3aed',
    icon: Zap,
    corner: 'bottom-1 right-1',
    x: 82,
    y: 84,
  },
] as const;

export const HeroAiVisual: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [cycle, setCycle] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 140, damping: 18, mass: 0.5 });
  const rotateY = useSpring(tiltY, { stiffness: 140, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (shouldReduceMotion || hovered) return;
    const timer = window.setInterval(() => {
      setCycle((value) => (value + 1) % NODES.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [hovered, shouldReduceMotion]);

  const activeId = hovered ?? NODES[cycle].id;
  const active = NODES.find((node) => node.id === activeId) ?? NODES[0];

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const box = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width - 0.5;
    const py = (event.clientY - box.top) / box.height - 0.5;
    tiltY.set(px * 9);
    tiltX.set(py * -7);
  };

  const onLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    setHovered(null);
  };

  return (
    <div
      id="hero-business-architecture"
      className="relative w-full max-w-[min(100%,340px)] sm:max-w-[500px] mx-auto lg:ml-auto lg:mr-0"
      style={{ perspective: '1200px' }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative aspect-square w-full"
      >
        <div className="absolute inset-[12%] rounded-full bg-blue-600/[0.05] blur-3xl pointer-events-none" />

        <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 100 100" aria-hidden>
          <defs>
            <linearGradient id="hero-map-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={active.color} stopOpacity="0.15" />
              <stop offset="100%" stopColor={active.color} stopOpacity="0.95" />
            </linearGradient>
          </defs>

          <motion.circle
            cx="50"
            cy="50"
            r="27"
            fill="none"
            stroke={active.color}
            strokeWidth="0.22"
            strokeDasharray="2.4 3.2"
            opacity="0.28"
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '50px 50px' }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="21"
            fill="none"
            stroke={active.color}
            strokeWidth="0.18"
            strokeDasharray="1.2 2.8"
            opacity="0.2"
            animate={shouldReduceMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '50px 50px' }}
          />

          {NODES.map((node) => {
            const on = node.id === activeId;
            const d = `M50 50 C ${node.x < 50 ? 36 : 64} ${node.y < 50 ? 38 : 62}, ${node.x} ${node.y < 50 ? 28 : 72}, ${node.x} ${node.y}`;
            return (
              <g key={node.id}>
                <path
                  d={d}
                  fill="none"
                  stroke={on ? 'url(#hero-map-line)' : 'rgba(15,19,26,0.12)'}
                  strokeWidth={on ? 0.7 : 0.35}
                  strokeLinecap="round"
                />
                {!shouldReduceMotion && (
                  <circle r={on ? 1.15 : 0.7} fill={on ? node.color : 'rgba(15,19,26,0.28)'}>
                    <animateMotion
                      dur={on ? '1.55s' : '3.4s'}
                      repeatCount="indefinite"
                      path={d}
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {NODES.map((node, index) => (
          <MapNode
            key={node.id}
            node={node}
            active={node.id === activeId}
            delay={index * 0.08}
            reduced={!!shouldReduceMotion}
            onEnter={() => setHovered(node.id)}
          />
        ))}

        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex h-[96px] w-[96px] sm:h-[140px] sm:w-[140px] items-center justify-center">
            {!shouldReduceMotion && (
              <>
                <motion.span
                  className="absolute inset-[-14%] rounded-full border border-current/20"
                  style={{ color: active.color }}
                  animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.12, 0.35] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.span
                  className="absolute inset-[-28%] rounded-full border border-current/10"
                  style={{ color: active.color }}
                  animate={{ scale: [1, 1.12, 1], opacity: [0.22, 0.06, 0.22] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                />
              </>
            )}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : { scale: [1, 1.03, 1], boxShadow: [`0 16px 40px -22px ${active.color}66`, `0 22px 50px -18px ${active.color}88`, `0 16px 40px -22px ${active.color}66`] }
              }
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex h-full w-full flex-col items-center justify-center rounded-full border border-black/[0.08] bg-white text-center shadow-[0_20px_50px_-24px_rgba(15,19,26,0.35)]"
              style={{ borderColor: `${active.color}55` }}
            >
              <span className="text-[9px] font-mono font-bold tracking-[0.22em] uppercase text-zinc-400">
                Digivate
              </span>
              <span className="mt-1 text-sm sm:text-base font-display font-bold tracking-tight text-[#0f131a] leading-none">
                Business
              </span>
              <span className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em]" style={{ color: active.color }}>
                Connected
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const MapNode: React.FC<{
  node: (typeof NODES)[number];
  active: boolean;
  delay: number;
  reduced: boolean;
  onEnter: () => void;
}> = ({ node, active, delay, reduced, onEnter }) => {
  const Icon = node.icon;

  return (
    <motion.div
      className={`absolute z-10 ${node.corner}`}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35 + delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={node.path}
        onPointerEnter={onEnter}
        className="block w-[118px] sm:w-[168px]"
      >
        <motion.article
          animate={
            reduced
              ? { scale: active ? 1.03 : 1 }
              : {
                  scale: active ? 1.05 : 1,
                  y: active ? -4 : [0, -3, 0],
                }
          }
          transition={
            active
              ? { duration: 0.28, ease: 'easeOut' }
              : { duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay }
          }
          className="rounded-2xl border bg-white/95 px-2.5 py-2.5 sm:px-4 sm:py-3.5 backdrop-blur-sm"
          style={{
            borderColor: active ? node.color : 'rgba(15,19,26,0.08)',
            boxShadow: active ? `0 16px 36px -20px ${node.color}` : '0 10px 24px -20px rgba(15,19,26,0.28)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white"
              style={{ backgroundColor: node.color }}
            >
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12px] sm:text-[13px] font-display font-bold tracking-tight text-[#0f131a] leading-tight">
                {node.title}
              </p>
              <p className="mt-0.5 text-[10px] sm:text-[11px] text-zinc-500 leading-tight">{node.line}</p>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
};
