import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Layout, MousePointerClick, Smartphone, Laptop, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const WebDevVisual: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'structure' | 'interface' | 'interaction' | 'live'>('live');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');

  const layers = [
    { id: 'structure', label: '1. Structure', desc: 'Wireframe & Grid Hierarchy' },
    { id: 'interface', label: '2. Interface', desc: 'Typography & Design System' },
    { id: 'interaction', label: '3. Interaction', desc: 'Motion & Conversion UX' },
    { id: 'live', label: '4. Live Website', desc: 'High-Performance Production' },
  ] as const;

  return (
    <div className="w-full bg-white border border-black/[0.08] rounded-3xl p-5 sm:p-7 shadow-lg shadow-black/[0.02] overflow-hidden">
      {/* Visual Header & Layer Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <span className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-wider block mb-1">
            Service Architecture · 01
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[#0f131a] font-display">
            Interactive Interface Assembly
          </h4>
        </div>

        {/* Viewport switcher */}
        <div className="flex items-center gap-1 self-start sm:self-auto bg-zinc-100 p-1 rounded-xl border border-black/[0.06]">
          <button
            onClick={() => setViewport('desktop')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              viewport === 'desktop' ? 'bg-white text-[#0f131a] shadow-sm font-semibold' : 'text-zinc-500 hover:text-zinc-800'
            }`}
            title="Desktop View"
          >
            <Laptop className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              viewport === 'mobile' ? 'bg-white text-[#0f131a] shadow-sm font-semibold' : 'text-zinc-500 hover:text-zinc-800'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>
      </div>

      {/* Layer Step Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
        {layers.map((layer) => {
          const isSelected = activeLayer === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-sm'
                  : 'bg-zinc-50 border-black/[0.05] hover:bg-zinc-100/80 text-zinc-700'
              }`}
            >
              <span className={`text-xs font-bold block ${isSelected ? 'text-blue-700' : 'text-zinc-800'}`}>
                {layer.label}
              </span>
              <span className="text-[10px] text-zinc-500 truncate block mt-0.5">{layer.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Simulated Live Viewport Canvas */}
      <div className="relative mt-3 p-4 sm:p-6 bg-zinc-50/80 rounded-2xl border border-black/[0.06] flex items-center justify-center min-h-[300px] overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-grid-light opacity-60 pointer-events-none" />

        {/* Viewport Frame */}
        <motion.div
          layout
          className={`relative transition-all duration-300 rounded-xl overflow-hidden border border-black/[0.1] shadow-xl bg-white ${
            viewport === 'desktop' ? 'w-full max-w-xl' : 'w-64'
          }`}
        >
          {/* Browser Bar */}
          <div className="bg-zinc-100 px-3 py-2 flex items-center justify-between border-b border-black/[0.06]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="px-3 py-0.5 bg-white rounded-md text-[10px] font-mono text-zinc-600 truncate max-w-[200px] border border-black/[0.05] shadow-2xs">
              https://yourbusiness.com
            </div>
            <div className="w-3" />
          </div>

          {/* Browser Content Area based on selected layer */}
          <div className="p-4 sm:p-5 space-y-4">
            <AnimatePresence mode="wait">
              {activeLayer === 'structure' && (
                <motion.div
                  key="structure"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3 font-mono"
                >
                  <div className="border border-dashed border-blue-400 p-2.5 rounded-lg bg-blue-50/50 flex justify-between items-center text-[10px] text-blue-700">
                    <span>&lt;header.navigation /&gt;</span>
                    <span className="text-zinc-500">grid-12</span>
                  </div>
                  <div className="border border-dashed border-indigo-400 p-4 rounded-lg bg-indigo-50/50 space-y-2">
                    <div className="text-[10px] text-indigo-700">&lt;main.hero_section&gt;</div>
                    <div className="h-3 w-3/4 bg-indigo-200 rounded" />
                    <div className="h-2 w-1/2 bg-indigo-100 rounded" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border border-dashed border-zinc-300 p-2 rounded-lg text-[9px] text-zinc-600 bg-zinc-50">
                      &lt;service_col_1 /&gt;
                    </div>
                    <div className="border border-dashed border-zinc-300 p-2 rounded-lg text-[9px] text-zinc-600 bg-zinc-50">
                      &lt;service_col_2 /&gt;
                    </div>
                  </div>
                </motion.div>
              )}

              {activeLayer === 'interface' && (
                <motion.div
                  key="interface"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
                    <span className="text-xs font-bold text-[#0f131a] tracking-wide">BRAND STUDIO</span>
                    <div className="flex gap-2">
                      <span className="w-8 h-2 bg-zinc-300 rounded" />
                      <span className="w-8 h-2 bg-zinc-300 rounded" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-blue-600 block font-semibold">DESIGN SYSTEM · SCALE</span>
                    <div className="h-5 w-4/5 bg-zinc-800 rounded font-bold text-xs" />
                    <div className="h-2 w-2/3 bg-zinc-400 rounded" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 rounded-lg bg-zinc-50 border border-black/[0.06] space-y-1.5">
                      <div className="w-5 h-5 rounded-md bg-blue-600/20" />
                      <div className="h-2 w-16 bg-zinc-300 rounded" />
                    </div>
                    <div className="p-2.5 rounded-lg bg-zinc-50 border border-black/[0.06] space-y-1.5">
                      <div className="w-5 h-5 rounded-md bg-indigo-600/20" />
                      <div className="h-2 w-16 bg-zinc-300 rounded" />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeLayer === 'interaction' && (
                <motion.div
                  key="interaction"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-blue-900 block">Micro-Interaction Active</span>
                      <span className="text-[10px] text-blue-600 font-medium">Hover trigger · Fast tactile feedback</span>
                    </div>
                    <MousePointerClick className="w-4 h-4 text-blue-600 animate-bounce" />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 py-2 px-3 rounded-lg bg-blue-600 text-white text-xs font-bold text-center shadow-sm">
                      Primary Action
                    </div>
                    <div className="flex-1 py-2 px-3 rounded-lg bg-zinc-100 text-zinc-800 text-xs font-medium text-center border border-black/[0.06]">
                      Details
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Responsive breakpoints verified across devices
                  </div>
                </motion.div>
              )}

              {activeLayer === 'live' && (
                <motion.div
                  key="live"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-white font-black text-[10px]">
                        D
                      </div>
                      <span className="text-xs font-bold text-[#0f131a]">Modern Web Experience</span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      100 Performance
                    </span>
                  </div>

                  <div className="py-2 space-y-1">
                    <h5 className="text-sm font-bold text-[#0f131a]">High-Performance Digital Architecture</h5>
                    <p className="text-[11px] text-zinc-600 leading-relaxed">
                      Engineered for maximum speed, clean UX, and direct business conversion.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow-sm hover:bg-blue-700 transition-colors">
                      Get Started
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-medium transition-colors">
                      Learn More
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Outcome Note */}
      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 font-mono">
        <span>Concept: Structured Engineering</span>
        <span className="text-blue-600 font-medium">Outcome: We build digital experiences.</span>
      </div>
    </div>
  );
};

