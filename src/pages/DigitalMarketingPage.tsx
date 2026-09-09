import React from 'react';
import {
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Target,
  TrendingUp,
  Compass,
  Search,
} from 'lucide-react';
import { getWhatsAppUrl } from '../config/siteConfig';
import { PAGE_SEO } from '../config/seo';
import { PageBreadcrumb, PageFaq, Seo } from '../components/Seo';
import { RelatedServices } from '../components/RelatedServices';

interface DigitalMarketingPageProps {
  onOpenBooking: () => void;
}

export const DigitalMarketingPage: React.FC<DigitalMarketingPageProps> = ({ onOpenBooking }) => {
  const seo = PAGE_SEO.marketing;
  return (
    <div className="pt-24 pb-20">
      <Seo page={seo} />
      {/* Service Hero */}
      <section className="py-16 sm:py-20 bg-white border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            {seo.breadcrumbs ? <PageBreadcrumb items={seo.breadcrumbs} /> : null}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Service 04 · Digital Marketing & Growth</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f131a] font-display tracking-tight leading-tight">
              Digital marketing and SEO campaigns that generate inquiries.
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed">
              Digivate is a digital marketing agency in Hyderabad, working with clients across India. We run SEO, paid search, and conversion campaigns that put your business in front of people ready to inquire — then send them to a site that converts.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="py-3.5 px-7 rounded-full bg-[#0f131a] text-white hover:bg-blue-600 font-bold text-sm transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Book a Marketing Consult</span>
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

      {/* Digital Marketing Pillars */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">
              Campaign Strategy
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f131a] font-display">
              How Digivate drives qualified customer acquisition
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0f131a] font-display">
                SEO and search visibility
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Technical SEO, content, and local visibility so people searching for your services — or for a digital agency — can find a page that deserves the click.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0f131a] font-display">
                Precision Audience Targeting
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                We identify your ideal client demographics, geography, and commercial behaviors to eliminate ad spend waste on unqualified clicks.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0f131a] font-display">
                Funnel Optimization
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Clicks are meaningless without conversions. We design targeted landing pages and direct WhatsApp inquiry hooks that convert ad visitors into booked appointments.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0f131a] font-display">
                Performance Analytics
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Clear reporting on cost-per-lead, inquiry volume, and channel ROI so you know exactly where every marketing rupee is working.
              </p>
            </div>
          </div>

          {/* Marketing Framework */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#fafaf8] border border-black/[0.08] space-y-6">
            <h3 className="text-2xl font-bold text-[#0f131a] font-display">
              Our growth marketing framework:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sm text-zinc-900 block">Organic SEO</span>
                  <span className="text-xs text-zinc-600">Ranking for the searches your buyers already type — including local and service keywords.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sm text-zinc-900 block">High-Intent Paid Search</span>
                  <span className="text-xs text-zinc-600">Capturing immediate demand from prospects searching for your services now.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sm text-zinc-900 block">Targeted Social Campaigns</span>
                  <span className="text-xs text-zinc-600">Engaging relevant regional audiences with compelling proof and clear CTAs.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sm text-zinc-900 block">Conversion Rate Optimization (CRO)</span>
                  <span className="text-xs text-zinc-600">Refining copy, layout, and mobile forms to increase inquiry conversion percentages.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sm text-zinc-900 block">Transparent Performance Attribution</span>
                  <span className="text-xs text-zinc-600">Measuring direct inquiries and bookings rather than confusing vanity metrics.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {seo.faqs ? <PageFaq items={seo.faqs} /> : null}
      <RelatedServices current="marketing" />

      {/* CTA */}
      <section className="py-16 bg-[#0f131a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-display">
            Ready to launch targeted growth campaigns?
          </h2>
          <p className="text-zinc-300 max-w-xl mx-auto text-sm sm:text-base">
            Book an appointment with Digivate to evaluate your customer acquisition channels and plan an effective marketing strategy.
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
