import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PAGE_SEO, type SeoPage } from '../config/seo';

const RELATED: Record<string, { key: keyof typeof PAGE_SEO; label: string; line: string }[]> = {
  web: [
    { key: 'apps', label: 'App development', line: 'Mobile and web apps that sit on the same stack as your site.' },
    { key: 'automation', label: 'AI workflows & CRM', line: 'Route website inquiries into replies, booking, and your CRM.' },
    { key: 'marketing', label: 'Digital marketing', line: 'SEO and campaigns that send traffic to a site built to convert.' },
  ],
  apps: [
    { key: 'web', label: 'Website development', line: 'A public site that explains the product and captures demand.' },
    { key: 'automation', label: 'AI workflows & CRM', line: 'Connect the app to leads, bookings, and pipeline updates.' },
    { key: 'marketing', label: 'Digital marketing', line: 'Acquire users with search and campaigns, not just a store listing.' },
  ],
  automation: [
    { key: 'web', label: 'Website development', line: 'Forms and WhatsApp paths that feed the workflow.' },
    { key: 'apps', label: 'App development', line: 'Product surfaces that log activity back to the same CRM.' },
    { key: 'marketing', label: 'Digital marketing', line: 'Leads from ads and SEO should land in the pipeline automatically.' },
  ],
  marketing: [
    { key: 'web', label: 'Website development', line: 'Pages fast and clear enough that paid and organic traffic convert.' },
    { key: 'apps', label: 'App development', line: 'When the offer is a product, we build the app the campaign points to.' },
    { key: 'automation', label: 'AI workflows & CRM', line: 'Every inquiry answered, booked, and logged without spreadsheet work.' },
  ],
};

export const RelatedServices: React.FC<{ current: keyof typeof RELATED }> = ({ current }) => {
  const items = RELATED[current];
  return (
    <section className="py-16 sm:py-20 bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-blue-600">Also from Digivate</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#0f131a]">
            Related services
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item) => {
            const page = PAGE_SEO[item.key] as SeoPage;
            return (
              <Link
                key={item.key}
                to={page.path}
                className="group rounded-3xl border border-black/[0.08] bg-white p-6 sm:p-8 hover:border-blue-600/40 hover:shadow-lg hover:shadow-blue-600/5 transition-all"
              >
                <h3 className="font-display font-bold text-xl text-[#0f131a] group-hover:text-blue-600 transition-colors">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{item.line}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0f131a] group-hover:gap-3 transition-all">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
