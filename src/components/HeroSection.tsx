import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Code, Search, Cpu, BarChart3, ChevronDown } from 'lucide-react';
import { HeroVisual } from './HeroVisual';
import { ServiceId } from '../types';

interface HeroSectionProps {
  onStartProject: () => void;
  onSelectService: (serviceId: ServiceId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartProject, onSelectService }) => {
  const serviceBadges = [
    { id: 'web-dev' as ServiceId, label: 'Web Development', icon: Code },
    { id: 'ai-automation' as ServiceId, label: 'AI Automation', icon: Cpu },
    { id: 'digital-marketing' as ServiceId, label: 'Digital Marketing', icon: BarChart3 },
    { id: 'app-dev' as ServiceId, label: 'App Development', icon: Code },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] md:min-h-screen pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden flex flex-col justify-center border-b border-black/[0.05]"
    >
      {/* Subtle ambient warm lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-b from-blue-500/[0.04] via-blue-500/[0.02] to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Subtle Category Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.03] border border-black/[0.06] text-xs font-mono tracking-wider text-zinc-600 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>Digital Agency · Technology & Growth</span>
          </motion.div>

          {/* Monumental Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold tracking-tight text-[#0f131a] font-display leading-[0.96]"
          >
            Build. Automate. Grow.
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Digital solutions that help businesses build their presence, reach the right audience, automate repetitive work and grow.
          </motion.p>

          {/* 4 Clean Service Pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2 pt-1"
          >
            {serviceBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <button
                  key={badge.id}
                  onClick={() => onSelectService(badge.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-zinc-50 border border-black/[0.08] hover:border-blue-600/40 text-xs sm:text-sm text-zinc-700 hover:text-[#0f131a] shadow-sm transition-all cursor-pointer group active:scale-95"
                >
                  <Icon className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{badge.label}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3"
          >
            <button
              onClick={onStartProject}
              id="hero-book-appointment-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#0f131a] text-white font-semibold text-sm hover:bg-blue-600 transition-all active:scale-95 cursor-pointer shadow-lg shadow-black/5 hover:shadow-blue-600/25"
            >
              <span>Book an Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#services"
              id="hero-explore-services-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-zinc-50 border border-black/[0.08] text-zinc-700 hover:text-black font-medium text-sm transition-all shadow-sm"
            >
              <span>Explore What We Do</span>
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </a>
          </motion.div>
        </div>

        {/* Expansive Hero Ecosystem Visual: Business Growth Through Digital Systems */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 md:mt-20"
        >
          <HeroVisual onSelectService={onSelectService} />
        </motion.div>
      </div>
    </section>
  );
};

