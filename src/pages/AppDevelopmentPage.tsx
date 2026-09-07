import React from 'react';
import {
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Layers,
  Code2,
  Gauge,
} from 'lucide-react';
import { getWhatsAppUrl } from '../config/siteConfig';
import { PAGE_SEO } from '../config/seo';
import { PageBreadcrumb, PageFaq, Seo } from '../components/Seo';
import { RelatedServices } from '../components/RelatedServices';

interface AppDevelopmentPageProps {
  onOpenBooking: () => void;
}

export const AppDevelopmentPage: React.FC<AppDevelopmentPageProps> = ({ onOpenBooking }) => {
  const seo = PAGE_SEO.apps;

  return (
    <div className="pt-24 pb-20">
      <Seo page={seo} />
      <section className="py-16 sm:py-20 bg-white border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            {seo.breadcrumbs ? <PageBreadcrumb items={seo.breadcrumbs} /> : null}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5" />
              <span>App Development</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f131a] font-display tracking-tight leading-tight">
              App development for mobile and web products that scale.
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed">
              Digivate is an app development company in Hyderabad. We build mobile and web applications with product strategy, UI/UX, backend APIs, and CRM integrations that can grow with your business.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="py-3.5 px-7 rounded-full bg-[#0f131a] text-white hover:bg-blue-600 font-bold text-sm transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Book an App Consultation</span>
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

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">
              Product engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f131a] font-display">
              How Digivate builds apps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0f131a] font-display">Strategy and UI/UX</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                We map the user journey, screens, and features before writing code so the app solves a real business problem instead of becoming a pile of unused screens.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0f131a] font-display">Mobile and web apps</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Native and cross-platform mobile apps, plus web applications built for speed, accessibility, and a consistent experience across devices.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0f131a] font-display">Backend and APIs</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Secure APIs, data models, and integrations so bookings, payments, CRM, and notifications sit on a foundation that can scale.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-[#fafaf8] border border-black/[0.08] space-y-6">
            <h3 className="text-2xl font-bold text-[#0f131a] font-display">What every Digivate app project includes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ['Product scope and MVP path', 'Start with the features that prove the idea, then expand.'],
                ['UI/UX designed for real use', 'Clear flows for signup, booking, buying, or operations.'],
                ['Backend, APIs, and integrations', 'Connect the app to CRM, payments, or internal tools.'],
                ['Launch and maintenance', 'Store listing, monitoring, and ongoing fixes after go-live.'],
              ].map(([title, line]) => (
                <div key={title} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm text-zinc-900 block">{title}</span>
                    <span className="text-xs text-zinc-600">{line}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {seo.faqs ? <PageFaq items={seo.faqs} /> : null}
      <RelatedServices current="apps" />

      <section className="py-16 bg-[#0f131a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-display">Ready to build an app?</h2>
          <p className="text-zinc-300 max-w-xl mx-auto text-sm sm:text-base">
            Book a Digivate consultation to scope the product, the first release, and the stack that fits.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={onOpenBooking}
              className="py-3.5 px-8 rounded-full bg-white text-[#0f131a] hover:bg-blue-500 hover:text-white font-bold text-sm transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Gauge className="w-4 h-4 text-blue-600" />
              <span>Book an Appointment</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
