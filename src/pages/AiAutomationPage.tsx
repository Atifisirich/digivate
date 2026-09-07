import React from 'react';
import {
  Cpu,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Clock,
  Sparkles,
  Database,
} from 'lucide-react';
import { getWhatsAppUrl } from '../config/siteConfig';
import { PAGE_SEO } from '../config/seo';
import { PageBreadcrumb, PageFaq, Seo } from '../components/Seo';
import { RelatedServices } from '../components/RelatedServices';

interface AiAutomationPageProps {
  onOpenBooking: () => void;
}

export const AiAutomationPage: React.FC<AiAutomationPageProps> = ({ onOpenBooking }) => {
  const seo = PAGE_SEO.automation;
  return (
    <div className="pt-24 pb-20">
      <Seo page={seo} />
      {/* Service Hero */}
      <section className="py-16 sm:py-20 bg-white border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            {seo.breadcrumbs ? <PageBreadcrumb items={seo.breadcrumbs} /> : null}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>Service 03 · AI Automation & Workflows</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f131a] font-display tracking-tight leading-tight">
              AI workflows and CRM automation that capture leads 24/7.
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed">
              Digivate connects your website, WhatsApp, forms, calendar, and CRM with AI workflows so inquiries are answered, logged, and followed up — without manual copy-paste.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="py-3.5 px-7 rounded-full bg-[#0f131a] text-white hover:bg-blue-600 font-bold text-sm transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Book an Automation Consult</span>
              </button>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-7 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <span>Discuss on WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AI Automation Pillars */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">
              Automated Business Systems
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f131a] font-display">
              What Digivate automates for your business
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0f131a] font-display">
                Instant Lead Capture
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Respond to potential clients in seconds rather than hours. Automated workflows qualify their requirements and trigger instant personalized responses.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0f131a] font-display">
                CRM & Pipeline Sync
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Eliminate manual copy-pasting into spreadsheets. Every form submission, WhatsApp inquiry, and booking is categorized and recorded automatically.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0f131a] font-display">
                Smart Appointment Booking
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Automated calendar synchronization, confirmation messaging, and pre-meeting reminder sequences prevent no-shows and save staff time.
              </p>
            </div>
          </div>

          {/* Workflow Diagram Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#fafaf8] border border-black/[0.08] space-y-6">
            <h3 className="text-2xl font-bold text-[#0f131a] font-display">
              Example Automated Inquiry Sequence
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 bg-white rounded-2xl border border-black/[0.06] space-y-1.5">
                <span className="text-zinc-400">Trigger</span>
                <div className="font-bold text-zinc-900 text-sm">Inbound Form / WhatsApp</div>
                <p className="text-zinc-500 font-sans text-xs">Customer submits project details or requests appointment.</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-1.5">
                <span className="text-blue-600 font-bold">0.5s Processing</span>
                <div className="font-bold text-blue-900 text-sm">AI Qualification</div>
                <p className="text-blue-800 font-sans text-xs">System analyzes budget, timeline, and requested service category.</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-black/[0.06] space-y-1.5">
                <span className="text-emerald-600 font-bold">Instant Dispatch</span>
                <div className="font-bold text-zinc-900 text-sm">Personalized Reply</div>
                <p className="text-zinc-500 font-sans text-xs">Automated response with customized follow-up questions sent.</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-black/[0.06] space-y-1.5">
                <span className="text-zinc-400">Background Sync</span>
                <div className="font-bold text-zinc-900 text-sm">CRM & Calendar Alert</div>
                <p className="text-zinc-500 font-sans text-xs">Lead logged to pipeline, team notified with summarized brief.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {seo.faqs ? <PageFaq items={seo.faqs} /> : null}
      <RelatedServices current="automation" />

      {/* CTA */}
      <section className="py-16 bg-[#0f131a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-display">
            Ready to automate your business operations?
          </h2>
          <p className="text-zinc-300 max-w-xl mx-auto text-sm sm:text-base">
            Book an appointment with Digivate to identify which manual bottlenecks can be eliminated with intelligent AI workflows.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={onOpenBooking}
              className="py-3.5 px-8 rounded-full bg-white text-[#0f131a] hover:bg-blue-500 hover:text-white font-bold text-sm transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Book an Appointment</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
