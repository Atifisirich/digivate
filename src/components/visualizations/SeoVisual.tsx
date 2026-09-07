import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Compass, Eye, CheckCircle2, TrendingUp, Sparkles, Filter, Globe2 } from 'lucide-react';

export const SeoVisual: React.FC = () => {
  const [queryText, setQueryText] = useState('high performance business solutions');
  const [isOptimized, setIsOptimized] = useState(true);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev % 3) + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const searchResults = [
    {
      id: 'client',
      title: 'Your Business — Scalable Digital Systems & Architecture',
      url: 'https://yourbusiness.com/solutions',
      snippet: 'High-performance web architecture, technical search optimization, and verified discoverability.',
      isClient: true,
      score: 'High Intent Match',
      badge: 'Optimized #1 Position'
    },
    {
      id: 'comp1',
      title: 'Generic Business Services & Consulting Hub',
      url: 'https://competitor-alpha.com/services',
      snippet: 'Legacy consulting solutions and general business management directories.',
      isClient: false,
      score: 'Standard Match'
    },
    {
      id: 'comp2',
      title: 'Unranked Directory of Enterprise Providers',
      url: 'https://unindexed-directory.net/listings',
      snippet: 'Unstructured business directory with unranked technical profiles.',
      isClient: false,
      score: 'Low Visibility'
    }
  ];

  return (
    <div className="w-full bg-white border border-black/[0.08] rounded-3xl p-5 sm:p-7 shadow-lg shadow-black/[0.02] overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <span className="text-[11px] font-mono font-bold text-emerald-600 uppercase tracking-wider block mb-1">
            Service Architecture · 02
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[#0f131a] font-display">
            Search Visibility & Discovery Engine
          </h4>
        </div>

        {/* Discovery State Toggle */}
        <div className="flex items-center gap-2 bg-zinc-100 p-1.5 rounded-xl border border-black/[0.06]">
          <span className="text-xs text-zinc-600 px-2 font-mono hidden sm:inline">Indexing State:</span>
          <button
            onClick={() => setIsOptimized(!isOptimized)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isOptimized
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-zinc-200 text-zinc-700'
            }`}
          >
            {isOptimized ? 'Structured Visibility' : 'Unindexed State'}
          </button>
        </div>
      </div>

      {/* Interactive Search Bar Simulation */}
      <div className="mt-4 p-4 sm:p-5 bg-zinc-50/80 rounded-2xl border border-black/[0.06]">
        <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-black/[0.08] shadow-sm">
          <Search className="w-4 h-4 text-emerald-600 shrink-0" />
          <div className="flex-1 flex items-center">
            <span className="text-xs sm:text-sm font-mono text-zinc-800 truncate">
              {queryText}
            </span>
            <span className="w-1.5 h-4 bg-emerald-500 animate-pulse ml-1" />
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <Compass className="w-3 h-3 text-emerald-600" />
            <span>High Intent</span>
          </div>
        </div>

        {/* Visibility Stream / Search Results Ranking */}
        <div className="mt-4 space-y-2.5">
          {(isOptimized ? searchResults : [...searchResults].reverse()).map((item, index) => {
            const isTop = index === 0;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`p-4 rounded-xl border transition-all ${
                  item.isClient && isOptimized
                    ? 'bg-white border-emerald-500/50 shadow-md shadow-emerald-500/5 ring-1 ring-emerald-500/20'
                    : 'bg-white/80 border-black/[0.05]'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono ${
                      isTop && isOptimized ? 'bg-emerald-600 text-white font-bold' : 'bg-zinc-200 text-zinc-700'
                    }`}>
                      #{index + 1}
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500 truncate max-w-[200px] sm:max-w-none">
                      {item.url}
                    </span>
                  </div>

                  {item.badge && isOptimized && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                      <Sparkles className="w-2.5 h-2.5" />
                      {item.badge}
                    </span>
                  )}
                </div>

                <h5 className={`text-xs sm:text-sm font-bold tracking-tight ${
                  item.isClient && isOptimized ? 'text-emerald-950' : 'text-zinc-800'
                }`}>
                  {item.title}
                </h5>

                <p className="text-[11px] text-zinc-600 mt-1 leading-relaxed">
                  {item.snippet}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Search Discoverability Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">
        <div className="p-3.5 rounded-xl bg-zinc-50 border border-black/[0.06]">
          <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">1. Technical Health</span>
          <span className="text-xs font-bold text-zinc-800 block mt-0.5">Structured Schema & Crawlability</span>
        </div>
        <div className="p-3.5 rounded-xl bg-zinc-50 border border-black/[0.06]">
          <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">2. High-Intent Keywords</span>
          <span className="text-xs font-bold text-zinc-800 block mt-0.5">Targeted Customer Discovery</span>
        </div>
        <div className="p-3.5 rounded-xl bg-zinc-50 border border-black/[0.06]">
          <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">3. Organic Visibility</span>
          <span className="text-xs font-bold text-zinc-800 block mt-0.5">Sustainable Inbound Growth</span>
        </div>
      </div>

      {/* Outcome Note */}
      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 font-mono">
        <span>Concept: Structured Search Authority</span>
        <span className="text-emerald-700 font-medium">Outcome: We help businesses become easier to discover.</span>
      </div>
    </div>
  );
};

