import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, Sparkles, CheckCircle, Send, Clock, Database, ArrowRight, Play, RotateCcw } from 'lucide-react';

export const AiAutomationVisual: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const workflowSteps = [
    {
      id: 0,
      title: 'New Lead',
      subtitle: 'Inbound Capture',
      icon: UserPlus,
      color: 'bg-blue-100 text-blue-700',
      badgeColor: 'border-blue-300 text-blue-800 bg-blue-50',
      description: 'Prospect submits inquiry through web interface, contact form, or direct channel.',
      dataPayload: 'Lead: High-value enterprise inquiry received'
    },
    {
      id: 1,
      title: 'AI Analysis',
      subtitle: 'Intent Extraction',
      icon: Sparkles,
      color: 'bg-cyan-100 text-cyan-800',
      badgeColor: 'border-cyan-300 text-cyan-800 bg-cyan-50',
      description: 'Intelligent extraction of project scope, budget range, and timeline parameters.',
      dataPayload: 'Intent: High-priority web architecture & automation'
    },
    {
      id: 2,
      title: 'Qualification',
      subtitle: 'Rule Verification',
      icon: CheckCircle,
      color: 'bg-purple-100 text-purple-800',
      badgeColor: 'border-purple-300 text-purple-800 bg-purple-50',
      description: 'Automated verification against agency capacity, ideal client profiles, and priority score.',
      dataPayload: 'Status: Qualified (Score: 98/100)'
    },
    {
      id: 3,
      title: 'Automated Response',
      subtitle: 'Personalized Email',
      icon: Send,
      color: 'bg-emerald-100 text-emerald-800',
      badgeColor: 'border-emerald-300 text-emerald-800 bg-emerald-50',
      description: 'Instant, personalized response with preliminary discovery questions & direct booking link.',
      dataPayload: 'Response dispatched in <3.8s'
    },
    {
      id: 4,
      title: 'Follow-up',
      subtitle: 'Smart Cadence',
      icon: Clock,
      color: 'bg-amber-100 text-amber-800',
      badgeColor: 'border-amber-300 text-amber-800 bg-amber-50',
      description: 'Scheduled intelligent reminder cadence triggered if no appointment is booked within 48h.',
      dataPayload: 'Cadence: 48h check-in armed'
    },
    {
      id: 5,
      title: 'CRM Sync',
      subtitle: 'Central Database',
      icon: Database,
      color: 'bg-indigo-100 text-indigo-800',
      badgeColor: 'border-indigo-300 text-indigo-800 bg-indigo-50',
      description: 'Complete conversation logs and lead tags synchronized to agency CRM automatically.',
      dataPayload: 'Record #DIGI-921 updated & synced'
    }
  ];

  // Auto-progression loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % workflowSteps.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying, workflowSteps.length]);

  const currentDisplayNode = hoveredNode !== null ? workflowSteps[hoveredNode] : workflowSteps[activeStep];

  return (
    <div className="w-full bg-white border border-black/[0.08] rounded-3xl p-5 sm:p-7 shadow-lg shadow-black/[0.02] overflow-hidden">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <span className="text-[11px] font-mono font-bold text-purple-600 uppercase tracking-wider block mb-1">
            Service Architecture · 03
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[#0f131a] font-display">
            Autonomous Pipeline Automation
          </h4>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 border border-black/[0.06] hover:bg-zinc-200 text-xs font-mono text-zinc-700 transition-colors cursor-pointer"
          >
            <Play className={`w-3 h-3 ${isPlaying ? 'text-purple-600' : 'text-zinc-400'}`} />
            <span>{isPlaying ? 'Simulating' : 'Paused'}</span>
          </button>
          <button
            onClick={() => setActiveStep(0)}
            className="p-1.5 rounded-lg bg-zinc-100 border border-black/[0.06] text-zinc-600 hover:text-black transition-colors cursor-pointer"
            title="Reset Workflow"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Workflow Node Sequence */}
      <div className="my-6 relative">
        {/* Progress connecting line */}
        <div className="hidden lg:block absolute top-7 left-10 right-10 h-0.5 bg-zinc-200 -z-0">
          <motion.div
            className="h-full bg-purple-600"
            animate={{ width: `${(activeStep / (workflowSteps.length - 1)) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* 6 Workflow Nodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = activeStep === idx;
            const isCompleted = activeStep > idx;

            return (
              <motion.div
                key={step.id}
                onMouseEnter={() => setHoveredNode(idx)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[115px] ${
                  isCurrent
                    ? 'bg-white border-purple-500 ring-2 ring-purple-500/20 shadow-md'
                    : isCompleted
                    ? 'bg-zinc-50 border-black/[0.06]'
                    : 'bg-zinc-50/60 border-black/[0.04] opacity-80 hover:opacity-100 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-xl ${step.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-600 font-bold">0{idx + 1}</span>
                </div>

                <div className="mt-2">
                  <h5 className={`text-xs font-bold ${isCurrent ? 'text-purple-700' : 'text-[#0f131a]'}`}>
                    {step.title}
                  </h5>
                  <p className="text-[10px] text-zinc-600 truncate">{step.subtitle}</p>
                </div>

                {/* Progress state indicator */}
                <div className="mt-2 pt-1 border-t border-black/[0.04] flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isCurrent
                        ? 'bg-purple-600 animate-ping'
                        : isCompleted
                        ? 'bg-emerald-500'
                        : 'bg-zinc-300'
                    }`}
                  />
                  <span className="text-[9px] font-mono text-zinc-600 uppercase font-medium">
                    {isCurrent ? 'Processing' : isCompleted ? 'Synced' : 'Pending'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Live Data Packet & Node Detail Inspector */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDisplayNode.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-black/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${currentDisplayNode.badgeColor}`}>
                Step 0{currentDisplayNode.id + 1} · {currentDisplayNode.title}
              </span>
              <span className="text-xs font-bold text-[#0f131a]">{currentDisplayNode.subtitle}</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed max-w-xl">
              {currentDisplayNode.description}
            </p>
          </div>

          <div className="px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] font-mono text-xs text-purple-700 flex items-center gap-2 shrink-0 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span className="font-semibold">{currentDisplayNode.dataPayload}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Outcome Note */}
      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 font-mono">
        <span>Concept: Autonomous Logic</span>
        <span className="text-purple-700 font-medium">Outcome: We connect business processes and automate repetitive work.</span>
      </div>
    </div>
  );
};

