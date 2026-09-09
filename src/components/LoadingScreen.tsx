import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AGENCY_NAME } from '../config/siteConfig';
import type { LoadingPhase } from '../App';

interface LoadingScreenProps {
  phase: LoadingPhase;
  onPhaseChange: (phase: LoadingPhase) => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ phase, onPhaseChange }) => {
  // We manage an internal state to trigger the clip-path wipe animation
  const [startWipe, setStartWipe] = useState(false);

  useEffect(() => {
    // 0.2s: Start wiping the text in
    const tWipe = setTimeout(() => setStartWipe(true), 200);

    // 1.8s: Switch to transitioning (website hero reveals)
    const tTrans = setTimeout(() => {
      onPhaseChange('transitioning');
    }, 1800);

    // 2.4s: Complete transition
    const tComp = setTimeout(() => {
      onPhaseChange('complete');
    }, 2400);

    return () => { clearTimeout(tWipe); clearTimeout(tTrans); clearTimeout(tComp); };
  }, [onPhaseChange]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none">
      {/* 
        Solid background. Fades out during the transitioning phase 
        so the homepage hero behind it becomes visible.
      */}
      <motion.div
        className="absolute inset-0 bg-[#fafaf8]"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'transitioning' ? 0 : 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />

      {/* 
        The blue glow that starts behind the loading logo.
        It uses layoutId to seamlessly transfer into the HomePage's hero-background div!
      */}
      {phase === 'initial' && (
        <motion.div
          layoutId="hero-blue-glow"
          className="absolute rounded-full mix-blend-multiply"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0) 70%)',
          }}
          initial={{ width: '0vw', height: '0vw', opacity: 0, filter: 'blur(20px)' }}
          animate={{ width: '40vw', height: '40vw', opacity: 1, filter: 'blur(40px)' }}
          transition={{ delay: 1.4, duration: 0.5, ease: "easeOut" }}
        />
      )}

      {/* 
        The Logo that morphs to the Navbar.
        We only render it while phase === 'initial'.
      */}
      {phase === 'initial' && (
        <div className="relative flex flex-col items-center">
          <motion.div 
            layoutId="brand-logo-container" 
            className="relative z-10 flex items-baseline justify-center"
          >
            {/* The Text Container - Relative to hold both ghost and solid layers */}
            <div className="relative flex font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight whitespace-nowrap">
              {/* Ghost Layer: Faint */}
              <div className="text-zinc-300/40">
                {AGENCY_NAME}
              </div>

              {/* Solid Layer: Wipes in from left to right */}
              <motion.div 
                className="absolute inset-0 text-[#0f131a]"
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: startWipe ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
                transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              >
                {AGENCY_NAME}
              </motion.div>
            </div>

            {/* The Blue Dot System */}
            <div className="relative flex items-center justify-center ml-[4px] sm:ml-[5px] md:ml-[6px]">
              {/* Dot Movement Container */}
              <motion.div
                className="relative flex items-center"
                initial={{ x: 150, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 1.1, 
                  duration: 0.35,
                  ease: "easeOut"
                }}
              >
                <div className="w-4 h-4 sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px] rounded-full bg-blue-600 relative z-10" />

                {/* Motion Trail */}
                <motion.div
                  className="absolute right-[50%] top-1/2 -translate-y-1/2 h-[2px] sm:h-[3px] bg-gradient-to-r from-transparent to-blue-600 rounded-l-full -z-10"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: [0, 60, 0], opacity: [0, 1, 0] }}
                  transition={{
                    delay: 1.1,
                    duration: 0.35,
                    ease: "easeOut"
                  }}
                />
              </motion.div>

              {/* Dot lock-in pulse at 1.35s */}
              <motion.div
                className="absolute w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full blur-xl pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.4, 0] }}
                transition={{ delay: 1.35, duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
