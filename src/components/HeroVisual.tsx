import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe, Search, Cpu, TrendingUp, ArrowRight, CheckCircle2, Sparkles, Layers, Zap } from 'lucide-react';
import { ServiceId } from '../types';

interface HeroVisualProps {
  onSelectService?: (serviceId: ServiceId) => void;
}

export const HeroVisual: React.FC<HeroVisualProps> = ({ onSelectService }) => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  // Auto-progress stages subtly every 3.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const stages = [
    {
      id: 0,
      serviceId: 'seo' as ServiceId,
      stage: '01 · ATTRACT',
      title: 'Audience & Search Discovery',
      services: 'Digital Marketing & Automation',
      metric: 'High-Intent Traffic',
      icon: Search,
      badge: 'Attract',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      activeBorder: 'border-blue-500 ring-2 ring-blue-500/20',
      desc: 'Targeted multi-channel discovery capturing active customers searching for your services.',
    },
    {
      id: 1,
      serviceId: 'web-dev' as ServiceId,
      stage: '02 · BUILD',
      title: 'Digital Conversion Platform',
      services: 'Web Development',
      metric: 'Sub-second UX Speed',
      icon: Globe,
      badge: 'Build',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      activeBorder: 'border-indigo-500 ring-2 ring-indigo-500/20',
      desc: 'Fast, structured, modern web architecture engineered to turn visitors into qualified inquiries.',
    },
    {
      id: 2,
      serviceId: 'ai-automation' as ServiceId,
      stage: '03 · AUTOMATE',
      title: 'Autonomous Operations',
      services: 'AI Automation',
      metric: '<5s Response Time',
      icon: Cpu,
      badge: 'Automate',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20',
      desc: 'Intelligent workflow engines that qualify inbound leads, route data, and automate repetitive tasks.',
    },
    {
      id: 3,
      serviceId: 'digital-marketing' as ServiceId,
      stage: '04 · GROW',
      title: 'Compounding Business Scale',
      services: 'Combined Digital Systems',
      metric: 'Predictable Growth',
      icon: TrendingUp,
      badge: 'Grow',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      activeBorder: 'border-amber-500 ring-2 ring-amber-500/20',
      desc: 'Closed feedback telemetry optimizing acquisition costs, lead volume, and customer retention.',
    },
  ];

  const currentIdx = hoveredStage !== null ? hoveredStage : activeStage;

  return (
    <div
      id="hero-ecosystem-visual"
      className="relative w-full max-w-5xl mx-auto rounded-3xl bg-white border border-black/[0.08] shadow-xl shadow-black/[0.03] p-6 sm:p-8 md:p-10 overflow-hidden"
    >
      {/* Subtle top indicator bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-black/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500">
            Digital Growth System Architecture
          </span>
        </div>
        <div className="text-[11px] font-mono text-zinc-600 flex items-center gap-1.5">
          <span>Continuous Loop:</span>
          <span className="font-semibold text-blue-600">Attract → Build → Automate → Grow</span>
        </div>
      </div>

      {/* 4 Interactive System Stage Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 relative">
        {stages.map((st, idx) => {
          const Icon = st.icon;
          const isSelected = currentIdx === idx;

          return (
            <motion.div
              key={st.id}
              onClick={() => {
                setActiveStage(idx);
                if (onSelectService) onSelectService(st.serviceId);
              }}
              onMouseEnter={() => setHoveredStage(idx)}
              onMouseLeave={() => setHoveredStage(null)}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[160px] ${
                isSelected
                  ? `bg-white ${st.activeBorder} shadow-lg shadow-black/5`
                  : 'bg-zinc-50/70 border-black/[0.06] hover:bg-white hover:border-black/[0.12]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl ${st.bgColor} ${st.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-zinc-600 bg-white px-2 py-0.5 rounded-full border border-black/[0.06]">
                    {st.stage}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#0f131a] tracking-tight mb-1">
                  {st.title}
                </h4>
                <p className="text-[11px] text-zinc-600 font-medium">
                  {st.services}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-black/[0.05] flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-600">{st.metric}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-zinc-300'}`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Stage Detail Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-black/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase">
              {stages[currentIdx].stage}
            </span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs font-semibold text-[#0f131a]">
              {stages[currentIdx].title}
            </span>
          </div>
          <p className="text-xs text-zinc-600 max-w-2xl leading-relaxed">
            {stages[currentIdx].desc}
          </p>
        </div>

        <button
          onClick={() => {
            if (onSelectService) onSelectService(stages[currentIdx].serviceId);
            const el = document.getElementById('services');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-zinc-100 border border-black/[0.08] text-xs font-semibold text-[#0f131a] transition-all shrink-0 cursor-pointer shadow-sm"
        >
          <span>Explore {stages[currentIdx].badge}</span>
          <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
        </button>
      </div>
    </div>
  );
};

