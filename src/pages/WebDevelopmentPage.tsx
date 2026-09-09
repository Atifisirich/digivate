import React from 'react';
import {
  Globe,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Zap,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';
import { getWhatsAppUrl } from '../config/siteConfig';
import { PAGE_SEO } from '../config/seo';
import { PageBreadcrumb, PageFaq, Seo } from '../components/Seo';
import { RelatedServices } from '../components/RelatedServices';

interface WebDevelopmentPageProps {
  onOpenBooking: () => void;
}

export const WebDevelopmentPage: React.FC<WebDevelopmentPageProps> = ({ onOpenBooking }) => {
  const seo = PAGE_SEO.web;
  return (
    <div className="pt-24 pb-20">
      <Seo page={seo} />
      {/* Service Hero */}
      <section className="py-16 sm:py-20 bg-white border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            {seo.breadcrumbs ? <PageBreadcrumb items={seo.breadcrumbs} /> : null}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              <span>Service 01 · Web Development</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f131a] font-display tracking-tight leading-tight">
              Website development built to convert visitors into clients.
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed">
              Digivate is a website development company in Hyderabad, working with clients across India. We engineer custom, high-speed websites with mobile-first design, technical SEO, and clear conversion paths that turn visitors into inquiries.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="py-3.5 px-7 rounded-full bg-[#0f131a] text-white hover:bg-blue-600 font-bold text-sm transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Book a Web Consultation</span>
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

      {/* Web Development Pillars */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">
              Engineering Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f131a] font-display">
              How Digivate builds websites differently
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0f131a] font-display">
                Sub-Second Speed
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Slow websites lose customers before they even read your headline. We optimize code, compress assets, and build lightweight layouts that load instantly.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0f131a] font-display">
                Mobile-First UX
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Over 70% of your business inquiries arrive via smartphone. We design touch targets, instant WhatsApp triggers, and frictionless mobile appointment flows.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0f131a] font-display">
                Conversion Structure
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                A website must act as a 24/7 sales representative. We organize content hierarchy and high-contrast call-to-actions to maximize inquiry volume.
              </p>
            </div>
          </div>

          {/* Deliverables Checklist */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#fafaf8] border border-black/[0.08] space-y-6">
            <h3 className="text-2xl font-bold text-[#0f131a] font-display">
              What every Digivate website includes:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sm text-zinc-900 block">Custom UI & Typography Pairing</span>
                  <span className="text-xs text-zinc-600">No generic cookie-cutter templates or heavy visual clutter.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sm text-zinc-900 block">Integrated WhatsApp & Appointment Systems</span>
                  <span className="text-xs text-zinc-600">Direct 1-click booking and WhatsApp connection triggers.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sm text-zinc-900 block">Technical Search Optimization</span>
                  <span className="text-xs text-zinc-600">Semantic HTML, metadata, and fast crawlability out of the box.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sm text-zinc-900 block">Clean Scalable Codebase</span>
                  <span className="text-xs text-zinc-600">Built for longevity and easy future modifications.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {seo.faqs ? <PageFaq items={seo.faqs} /> : null}
      <RelatedServices current="web" />

      {/* CTA */}
      <section className="py-16 bg-[#0f131a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-display">
            Ready to upgrade your website?
          </h2>
          <p className="text-zinc-300 max-w-xl mx-auto text-sm sm:text-base">
            Let's build a website that accurately represents your business and converts visitors into paying customers.
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
