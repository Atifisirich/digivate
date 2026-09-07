import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { editorialEase } from './EditorialMotion';

export interface AboutServiceItem {
  id: string;
  icon: LucideIcon;
  title: string;
  text: string;
}

interface AboutServicesStripProps {
  services: AboutServiceItem[];
}

/** Capability sequence — items enter in order, then the highlight travels the chain. */
export const AboutServicesStrip: React.FC<AboutServicesStripProps> = ({ services }) => {
  const shouldReduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(shouldReduceMotion ? services.length : 0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (entered >= services.length) return;
    const id = window.setTimeout(() => setEntered((n) => n + 1), entered === 0 ? 180 : 280);
    return () => window.clearTimeout(id);
  }, [entered, services.length, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || paused) return;
    if (entered < services.length) {
      setActiveIndex(Math.max(0, entered - 1));
      return;
    }
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % services.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [entered, paused, services.length, shouldReduceMotion]);

  const active = services[activeIndex];

  return (
    <section className="py-16 md:py-20 border-y border-black/[0.06] overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div
          className="relative"
          onMouseLeave={() => setPaused(false)}
        >
          <div className="absolute top-[42px] left-[8%] right-[8%] h-px bg-black/[0.06] hidden md:block overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: shouldReduceMotion || entered >= services.length ? 1 : entered / Math.max(services.length - 1, 1) }}
              transition={{ duration: 0.4, ease: editorialEase }}
            />
          </div>

          <div className="flex md:grid md:grid-cols-5 overflow-x-auto md:overflow-visible gap-6 md:gap-0 relative z-10 pb-2">
            {services.map((service, index) => {
              const visible = shouldReduceMotion || index < entered;
              const isLit = visible && activeIndex === index;
              const Icon = service.icon;

              return (
                <button
                  key={service.id}
                  type="button"
                  onMouseEnter={() => {
                    setPaused(true);
                    setActiveIndex(index);
                  }}
                  onFocus={() => {
                    setPaused(true);
                    setActiveIndex(index);
                  }}
                  onClick={() => {
                    setPaused(true);
                    setActiveIndex(index);
                  }}
                  className="relative flex flex-col items-center text-center pt-4 px-1 group cursor-pointer bg-transparent min-w-[9.5rem] md:min-w-0 snap-center shrink-0 md:shrink"
                >
                  <motion.div
                    initial={shouldReduceMotion ? false : { y: 36, opacity: 0, scale: 0.82 }}
                    animate={
                      visible
                        ? { y: 0, opacity: 1, scale: isLit ? 1.04 : 1 }
                        : { y: 36, opacity: 0, scale: 0.82 }
                    }
                    transition={{ duration: 0.5, ease: editorialEase }}
                    className="space-y-3"
                  >
                    <motion.div
                      animate={{
                        backgroundColor: isLit ? '#2563eb' : '#ffffff',
                        color: isLit ? '#ffffff' : '#0f131a',
                        borderColor: isLit ? '#2563eb' : 'rgba(15,19,26,0.1)',
                      }}
                      className="mx-auto w-12 h-12 rounded-2xl border flex items-center justify-center"
                    >
                      <Icon className="w-5 h-5 stroke-[1.4]" />
                    </motion.div>
                    <h3
                      className={`text-[10px] sm:text-[11px] font-bold font-mono tracking-[0.18em] uppercase whitespace-nowrap transition-colors duration-300 ${
                        isLit ? 'text-blue-600' : 'text-[#0f131a]'
                      }`}
                    >
                      {service.title}
                    </h3>
                  </motion.div>
                </button>
              );
            })}
          </div>

          <div className="min-h-[3.25rem] mt-8 flex justify-center">
            <AnimatePresence mode="wait">
              {active && entered > 0 && (
                <motion.p
                  key={active.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease: editorialEase }}
                  className="text-sm text-zinc-600 text-center max-w-md leading-relaxed"
                >
                  {active.text}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
