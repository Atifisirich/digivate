import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const MovingServiceLine: React.FC<{ inverted?: boolean }> = ({ inverted = false }) => {
  const shouldReduceMotion = useReducedMotion();
  const items = [
    'WEB DEVELOPMENT',
    'DIGITAL MARKETING',
    'APP DEVELOPMENT',
    'AI WORKFLOWS',
    'CRM AUTOMATION',
    'SEO',
    'BUILD',
    'AUTOMATE',
    'GROW',
  ];

  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`relative z-10 w-full overflow-hidden py-4 sm:py-5 border-y select-none ${
        inverted
          ? 'bg-[#0f131a] border-white/10'
          : 'border-black/[0.08] bg-[#fafaf8]'
      }`}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none ${
          inverted ? 'bg-gradient-to-r from-[#0f131a] to-transparent' : 'bg-gradient-to-r from-[#fafaf8] to-transparent'
        }`}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none ${
          inverted ? 'bg-gradient-to-l from-[#0f131a] to-transparent' : 'bg-gradient-to-l from-[#fafaf8] to-transparent'
        }`}
      />

      <motion.div
        className="flex items-center gap-8 sm:gap-14 whitespace-nowrap will-change-transform"
        animate={shouldReduceMotion ? undefined : { x: ['0%', '-50%'] }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                repeat: Infinity,
                ease: 'linear',
                duration: 36,
              }
        }
      >
        {repeatedItems.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-8 sm:gap-14 shrink-0">
            <span
              className={`text-xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight uppercase ${
                inverted ? 'text-white/80' : 'text-[#0f131a]'
              }`}
            >
              {item}
            </span>
            <span className="text-lg sm:text-2xl text-blue-600 font-serif">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
