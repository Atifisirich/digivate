import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PAGE_SEO } from '../config/seo';
import { Seo } from '../components/Seo';

export const NotFoundPage: React.FC = () => (
  <div className="pt-32 pb-24 min-h-[70vh] flex items-center">
    <Seo page={PAGE_SEO.notFound} />
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <span className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-blue-600">404</span>
      <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight text-[#0f131a]">
        This page is not here.
      </h1>
      <p className="text-lg text-zinc-600 leading-relaxed max-w-xl">
        Digivate still is. Explore website development, app development, AI workflows and CRM automation, or digital marketing — or go home.
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 py-3.5 px-7 rounded-full bg-[#0f131a] text-white hover:bg-blue-600 font-bold text-sm transition-all"
        >
          Back home
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 py-3.5 px-7 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-sm transition-all"
        >
          View services
        </Link>
      </div>
    </div>
  </div>
);
