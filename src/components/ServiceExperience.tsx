import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceId } from '../types';
import { SERVICES } from '../config/siteConfig';
import { WebDevVisual } from './visualizations/WebDevVisual';
import { SeoVisual } from './visualizations/SeoVisual';
import { AiAutomationVisual } from './visualizations/AiAutomationVisual';
import { MarketingVisual } from './visualizations/MarketingVisual';
import { Globe, Search, Cpu, TrendingUp } from 'lucide-react';

interface ServiceExperienceProps {
  activeService: ServiceId;
  onSelectService: (serviceId: ServiceId) => void;
}

export const ServiceExperience: React.FC<ServiceExperienceProps> = ({
  activeService,
  onSelectService,
}) => {
  const currentService = SERVICES.find((s) => s.id === activeService) || SERVICES[0];

  const serviceIcons = {
    'web-dev': Globe,
    'seo': Search,
    'ai-automation': Cpu,
    'digital-marketing': TrendingUp,
  };

  return (
    <section id="experience" className="py-24 md:py-32 border-b border-black/[0.06] relative bg-[#f4f4f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block">
            Interactive Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f131a] font-display tracking-tight">
            How each capability operates
          </h2>
          <p className="text-base text-zinc-600 font-normal">
            Inspect the underlying mechanics, structural workflow logic, and conversion loops.
          </p>
        </div>

        {/* Minimalist Service Filter Switcher */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          {SERVICES.map((s) => {
            const Icon = serviceIcons[s.id];
            const isActive = activeService === s.id;

            return (
              <button
                key={s.id}
                onClick={() => onSelectService(s.id)}
                className={`inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0f131a] text-white shadow-md'
                    : 'bg-white text-zinc-700 hover:text-black hover:bg-zinc-100 border border-black/[0.08]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-zinc-500'}`} />
                <span>{s.number} · {s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Visualization Container with Cinematic Staging */}
        <div className="max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {activeService === 'web-dev' && <WebDevVisual />}
              {activeService === 'seo' && <SeoVisual />}
              {activeService === 'ai-automation' && <AiAutomationVisual />}
              {activeService === 'digital-marketing' && <MarketingVisual />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

