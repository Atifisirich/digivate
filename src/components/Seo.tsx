import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { absoluteUrl, buildJsonLd, DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT, type SeoPage } from '../config/seo';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>) {
  const extraSelector = extra
    ? Object.entries(extra).map(([k, v]) => `[${k}="${v}"]`).join('')
    : '';
  let el = document.head.querySelector(`link[rel="${rel}"]${extraSelector}`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (extra) {
      for (const [k, v] of Object.entries(extra)) el.setAttribute(k, v);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export const Seo: React.FC<{ page: SeoPage }> = ({ page }) => {
  useLayoutEffect(() => {
    const url = absoluteUrl(page.path);
    const robots = page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large';
    document.title = page.title;
    document.documentElement.lang = 'en-IN';
    upsertMeta('name', 'description', page.description);
    upsertMeta('name', 'robots', robots);
    upsertMeta('name', 'author', 'Digivate');
    upsertMeta('name', 'geo.region', 'IN-TG');
    upsertMeta('name', 'geo.placename', 'Hyderabad');
    upsertMeta('property', 'og:title', page.title);
    upsertMeta('property', 'og:description', page.description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:site_name', 'Digivate');
    upsertMeta('property', 'og:locale', 'en_IN');
    upsertMeta('property', 'og:image', DEFAULT_OG_IMAGE);
    upsertMeta('property', 'og:image:alt', DEFAULT_OG_IMAGE_ALT);
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:image:type', 'image/png');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', page.title);
    upsertMeta('name', 'twitter:description', page.description);
    upsertMeta('name', 'twitter:image', DEFAULT_OG_IMAGE);
    upsertMeta('name', 'twitter:image:alt', DEFAULT_OG_IMAGE_ALT);
    upsertLink('canonical', url);
    upsertLink('alternate', url, { hreflang: 'en-IN' });
    upsertLink('alternate', url, { hreflang: 'x-default' });

    let script = document.getElementById('seo-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'seo-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(buildJsonLd(page));
  }, [page]);

  return null;
};

export const PageBreadcrumb: React.FC<{ items: NonNullable<SeoPage['breadcrumbs']> }> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="text-xs font-mono font-bold tracking-wider uppercase text-zinc-500">
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((item, index) => (
        <li key={item.path} className="flex items-center gap-2">
          {index > 0 ? <span className="text-zinc-300">/</span> : null}
          {index === items.length - 1 ? (
            <span className="text-[#0f131a]">{item.name}</span>
          ) : (
            <Link to={item.path} className="hover:text-blue-600">
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export const PageFaq: React.FC<{
  items: NonNullable<SeoPage['faqs']>;
  heading?: string;
  moreHref?: string;
  moreLabel?: string;
}> = ({ items, heading = 'Common questions', moreHref, moreLabel }) => (
  <section className="py-16 sm:py-20 bg-white border-y border-black/[0.06]">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-blue-600">Questions</span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#0f131a]">
          {heading}
        </h2>
      </div>
      <dl className="space-y-5">
        {items.map((item) => (
          <div key={item.question} className="rounded-2xl border border-black/[0.08] bg-[#fafaf8] p-5 sm:p-6">
            <dt className="font-display font-bold text-[#0f131a]">{item.question}</dt>
            <dd className="mt-2 text-sm sm:text-base text-zinc-600 leading-relaxed">{item.answer}</dd>
          </div>
        ))}
      </dl>
      {moreHref && moreLabel ? (
        <Link to={moreHref} className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:underline">
          {moreLabel}
        </Link>
      ) : null}
    </div>
  </section>
);
