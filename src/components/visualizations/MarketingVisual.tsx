import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Users, Zap, BarChart2, RefreshCw, CheckCircle2 } from 'lucide-react';

export const MarketingVisual: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<'b2b' | 'enterprise' | 'growth'>('enterprise');

  const stages = [
    {
      id: 'campaign',
      title: 'Campaign',
      subtitle: 'Strategic Intent',
      icon: Target,
      desc: 'Positioning and message-market fit aligned with commercial objectives.',
      color: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'audience',
      title: 'Audience',
      subtitle: 'High-Intent Targeting',
      icon: Users,
      desc: 'Segmentation isolating active decision-makers and high-value buyers.',
      color: 'bg-orange-100 text-orange-800',
    },
    {
      id: 'engagement',
      title: 'Engagement',
      subtitle: 'Interactive Conversion',
      icon: Zap,
      desc: 'High-touch landing experiences, tailored messaging, and direct inquiries.',
      color: 'bg-rose-100 text-rose-800',
    },
    {
      id: 'data',
      title: 'Data',
      subtitle: 'Real-time Telemetry',
      icon: BarChart2,
      desc: 'Multivariate tracking measuring funnel health and friction points.',
      color: 'bg-purple-100 text-purple-800',
    },
    {
      id: 'optimization',
      title: 'Optimization',
      subtitle: 'Iterative Scaling',
      icon: RefreshCw,
      desc: 'Continuous creative refinement, audience tuning, and budget efficiency.',
      color: 'bg-blue-100 text-blue-800',
    }
  ];

  return (
    <div className="w-full bg-white border border-black/[0.08] rounded-3xl p-5 sm:p-7 shadow-lg shadow-black/[0.02] overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <span className="text-[11px] font-mono font-bold text-amber-600 uppercase tracking-wider block mb-1">
            Service Architecture · 04
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[#0f131a] font-display">
            Strategic Campaign Growth System
          </h4>
        </div>

        {/* Audience Segment Selectors */}
        <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl border border-black/[0.06]">
          <span className="text-xs text-zinc-600 px-2 font-mono hidden sm:inline">Target:</span>
          {(['b2b', 'enterprise', 'growth'] as const).map((seg) => (
            <button
              key={seg}
              onClick={() => setSelectedSegment(seg)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all cursor-pointer ${
                selectedSegment === seg
                  ? 'bg-white text-[#0f131a] shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>

      {/* 5 Growth Stages Pipeline Flow */}
      <div className="my-6 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.id}
                className="p-3.5 rounded-2xl bg-zinc-50 border border-black/[0.06] flex flex-col justify-between hover:bg-white hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-xl ${stage.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-600 font-bold">0{idx + 1}</span>
                  </div>

                  <h5 className="text-xs font-bold text-[#0f131a]">{stage.title}</h5>
                  <p className="text-[10px] font-mono text-amber-700 font-medium mt-0.5">{stage.subtitle}</p>
                </div>

                <p className="text-[11px] text-zinc-600 mt-2 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback Growth Loop Visual Diagram */}
      <div className="p-4 rounded-2xl bg-zinc-50 border border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-zinc-700 font-mono">
          <RefreshCw className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '10s' }} />
          <span>Closed Feedback Loop: Campaign Telemetry feeds continuous optimization</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-700 font-mono text-[11px] font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>High-intent qualified inquiries</span>
        </div>
      </div>

      {/* Outcome Note */}
      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 font-mono">
        <span>Concept: Strategic Distribution</span>
        <span className="text-amber-800 font-medium">Outcome: We help businesses reach and engage the right audience.</span>
      </div>
    </div>
  );
};
