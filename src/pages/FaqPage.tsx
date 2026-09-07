import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { PAGE_SEO } from '../config/seo';
import { SITE_FAQS } from '../config/faqs';
import { PageBreadcrumb, PageFaq, Seo } from '../components/Seo';

interface FaqPageProps {
  onOpenBooking: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onOpenBooking }) => (
  <div className="pt-24 pb-20">
    <Seo page={PAGE_SEO.faq} />
    <section className="py-16 sm:py-20 bg-white border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-5">
          {PAGE_SEO.faq.breadcrumbs ? <PageBreadcrumb items={PAGE_SEO.faq.breadcrumbs} /> : null}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider">
            <span>Questions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f131a] font-display tracking-tight leading-tight">
            Frequently asked questions
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed">
            Straight answers about Digivate website development, apps, AI workflows, CRM automation, digital marketing, pricing, and how to start.
          </p>
        </div>
      </div>
    </section>

    <PageFaq items={SITE_FAQS} heading="All questions" />

    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onOpenBooking}
          className="inline-flex items-center justify-center gap-2 py-3.5 px-7 rounded-full bg-[#0f131a] text-white hover:bg-blue-600 font-bold text-sm transition-all"
        >
          <Calendar className="w-4 h-4" />
          Book an appointment
        </button>
        <Link
          to="/blog"
          className="inline-flex items-center justify-center gap-2 py-3.5 px-7 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-sm transition-all"
        >
          Read the blog
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  </div>
);
