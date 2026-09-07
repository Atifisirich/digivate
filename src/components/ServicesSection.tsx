import React from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../config/siteConfig';
import { ServiceId } from '../types';
import { Globe, Search, Cpu, TrendingUp, ArrowUpRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceId: ServiceId) => void;
  selectedService: ServiceId;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  selectedService,
}) => {
  const serviceIcons = {
    'web-dev': Globe,
    'seo': Search,
    'ai-automation': Cpu,
    'digital-marketing': TrendingUp,
  };

  const handleRowClick = (serviceId: ServiceId) => {
    onSelectService(serviceId);
    const el = document.getElementById('experience');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 md:py-36 border-b border-black/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Editorial Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20 pb-8 border-b border-black/[0.08]">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block">
              Core Capabilities
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0f131a] font-display tracking-tight">
              What we build
            </h2>
          </div>
          <p className="text-base sm:text-lg text-zinc-600 max-w-md font-normal leading-relaxed">
            Four specialized disciplines engineered to operate as a single connected growth system.
          </p>
        </div>

        {/* Editorial Service Rows */}
        <div className="divide-y divide-black/[0.06]">
          {SERVICES.map((service, idx) => {
            const Icon = serviceIcons[service.id];
            const isSelected = selectedService === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                onClick={() => handleRowClick(service.id)}
                className={`group py-10 sm:py-12 px-4 sm:px-8 -mx-4 sm:-mx-8 rounded-3xl cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'bg-white shadow-sm ring-1 ring-black/[0.08]'
                    : 'hover:bg-white/80'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  {/* Service Number & Icon */}
                  <div className="lg:col-span-1 flex items-center gap-3 lg:block">
                    <span className="text-sm font-mono text-zinc-600 font-bold group-hover:text-blue-600 transition-colors block">
                      {service.number}
                    </span>
                  </div>

                  {/* Service Title */}
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-zinc-100 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4 text-zinc-700 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#0f131a] font-display tracking-tight group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Core Description & Outcomes */}
                  <div className="lg:col-span-5 space-y-2">
                    <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                      {service.outcomes.map((outcome, i) => (
                        <span key={i} className="text-xs font-mono text-zinc-500 flex items-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          {outcome}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Arrow */}
                  <div className="lg:col-span-2 flex items-center lg:justify-end">
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-600 group-hover:text-blue-600 transition-colors">
                      <span>Explore Engine</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-blue-600" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

