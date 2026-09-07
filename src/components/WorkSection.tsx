import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_PLACEHOLDERS } from '../config/siteConfig';
import { ArrowUpRight } from 'lucide-react';

interface WorkSectionProps {
  onStartProject: () => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onStartProject }) => {
  return (
    <section id="work" className="py-24 md:py-36 border-b border-black/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-black/[0.08]">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block">
              Portfolio Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f131a] font-display tracking-tight">
              Selected Work
            </h2>
          </div>
          <p className="text-base text-zinc-600 max-w-md font-normal leading-relaxed">
            Case study frameworks demonstrating high-performance web engineering, organic search ranking, and automated pipeline efficiency.
          </p>
        </div>

        {/* Project Showcases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTFOLIO_PLACEHOLDERS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Minimalist Canvas Preview Frame */}
                <div className="w-full aspect-[16/10] rounded-3xl bg-zinc-100 border border-black/[0.08] group-hover:border-blue-500/50 p-6 flex flex-col justify-between mb-6 transition-all duration-300 relative overflow-hidden shadow-xs hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-zinc-500 font-bold group-hover:text-blue-600 transition-colors">
                      CASE 0{idx + 1}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <div className="space-y-2 py-4">
                    <div className="w-12 h-1 bg-blue-600 rounded-full" />
                    <span className="text-xs font-mono text-zinc-500 block uppercase tracking-wider font-semibold">
                      {project.category}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-[#0f131a] font-display">
                      {project.title}
                    </h4>
                  </div>

                  <div className="text-[10px] font-mono text-zinc-400">
                    Production Architecture Case
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-black/[0.06]">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-zinc-500 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bespoke Requirement Callout */}
        <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-white border border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h4 className="text-xl sm:text-2xl font-bold text-[#0f131a] font-display">
              Have specific project requirements?
            </h4>
            <p className="text-sm text-zinc-600 mt-1">
              We engineer custom solutions tailored directly to your operational workflows and revenue objectives.
            </p>
          </div>
          <button
            onClick={onStartProject}
            className="px-6 py-3 rounded-full bg-[#0f131a] text-white text-xs font-bold hover:bg-blue-600 transition-colors flex items-center gap-2 cursor-pointer shrink-0 shadow-md"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

