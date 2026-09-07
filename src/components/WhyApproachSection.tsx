import React from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../config/siteConfig';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';

export const WhyApproachSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      action: 'Attract',
      title: 'Search & Visibility',
      desc: 'Position your brand in front of high-intent buyers through targeted organic search and data-driven marketing.',
      metric: 'Maximum Discovery'
    },
    {
      step: '02',
      action: 'Convert',
      title: 'Web Architecture',
      desc: 'Build high-performance, responsive digital experiences engineered for clarity, speed, and business conversion.',
      metric: 'Frictionless UX'
    },
    {
      step: '03',
      action: 'Automate',
      title: 'Intelligent Workflows',
      desc: 'Connect CRM, customer intake, lead scoring, and automated communications to eliminate manual operational waste.',
      metric: 'Zero Lost Leads'
    },
    {
      step: '04',
      action: 'Compound',
      title: 'Closed-Loop Scale',
      desc: 'Use continuous data feedback loops to optimize campaign targeting, increase customer retention, and grow revenue.',
      metric: 'Sustainable Growth'
    }
  ];

  return (
    <section id="approach" className="py-24 md:py-36 border-b border-black/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20 space-y-3">
          <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block">
            Strategic Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f131a] font-display tracking-tight">
            How the growth system connects
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
            Instead of isolated vendors or fragmented point solutions, Digivate connects development, search discoverability, intelligent automation, and marketing into a single compounding system.
          </p>
        </div>

        {/* Connected System Flow Graphic / Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((s, idx) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-7 rounded-3xl bg-white border border-black/[0.08] hover:border-black/[0.18] transition-all flex flex-col justify-between shadow-sm shadow-black/[0.02]"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    PHASE {s.step}
                  </span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-zinc-400 hidden md:block" />
                  )}
                </div>

                <div className="text-[11px] font-mono text-zinc-500 font-semibold uppercase tracking-wider mb-1">
                  {s.action}
                </div>
                <h3 className="text-xl font-bold text-[#0f131a] font-display mb-2.5">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-black/[0.06] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-xs font-mono text-zinc-700 font-semibold">
                  {s.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cohesive Growth Philosophy Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-[#0f131a] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5">
            <h4 className="text-lg sm:text-xl font-bold font-display text-white">
              A single unified engagement model
            </h4>
            <p className="text-sm text-zinc-300">
              Web Development + Digital Marketing + AI Automation + App Development engineered to reinforce each other.
            </p>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-xs text-blue-400 font-semibold bg-white/10 px-4 py-2 rounded-xl border border-white/10 shrink-0">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>Built for Enduring Business Value</span>
          </div>
        </div>
      </div>
    </section>
  );
};

