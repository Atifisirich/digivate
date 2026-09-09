import { CONTACT_EMAIL, DISPLAY_PHONE, SITE_ORIGIN } from './siteConfig';
import { HOME_FAQS, SITE_FAQS } from './faqs';
import type { FaqItem } from './faqs';
import type { BlogPost } from './blog';

export type { FaqItem } from './faqs';

export type SeoPage = {
  title: string;
  description: string;
  path: string;
  faqs?: FaqItem[];
  breadcrumbs?: { name: string; path: string }[];
  serviceName?: string;
  noindex?: boolean;
  datePublished?: string;
};

export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;
export const DEFAULT_OG_IMAGE_ALT = 'Digivate digital agency — websites, apps, AI workflows, CRMs, and digital marketing';

export const PAGE_SEO: Record<string, SeoPage> = {
  home: {
    title: 'Digivate | Digital Agency for Web, Apps, AI & Marketing',
    description:
      'Digivate is a digital agency in Hyderabad for website development, app development, AI workflows, CRM automation, and digital marketing. We build systems that help businesses get found and grow.',
    path: '/',
    faqs: HOME_FAQS,
  },
  services: {
    title: 'Digital Agency Services in Hyderabad | Digivate',
    description:
      'Digivate services: website development, app development, AI workflows and CRM automation, and digital marketing. One agency for the digital system behind your growth.',
    path: '/services',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ],
    faqs: [
      {
        question: 'Which digital services does Digivate offer?',
        answer:
          'Website development, app development, AI workflows and CRM automation, and digital marketing — planned so each part supports the others.',
      },
      {
        question: 'Can I start with one service?',
        answer:
          'Yes. Many clients start with a website or a marketing campaign. We still design it so CRM, booking, and follow-up can be added without rebuilding everything later.',
      },
    ],
  },
  web: {
    title: 'Website Development Company in Hyderabad | Digivate',
    description:
      'Custom website development in Hyderabad: fast, mobile-first sites with technical SEO, WhatsApp, and booking paths. Digivate builds websites that turn visitors into clients.',
    path: '/services/web-development',
    serviceName: 'Website development',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Website Development', path: '/services/web-development' },
    ],
    faqs: [
      {
        question: 'What does Digivate include in website development?',
        answer:
          'Strategy, design, development, mobile-first layout, technical SEO foundations, and inquiry paths such as WhatsApp and appointment booking.',
      },
      {
        question: 'Do you rebuild existing websites?',
        answer:
          'Yes. We rebuild slow or outdated sites into conversion-focused websites while keeping what already works for search, where it makes sense.',
      },
      {
        question: 'Do you build SEO-friendly websites?',
        answer:
          'Yes. Every Digivate website ships with semantic HTML, unique titles and descriptions, fast load times, and a crawlable structure — the foundation organic search needs.',
      },
    ],
  },
  apps: {
    title: 'App Development Company in Hyderabad | Digivate',
    description:
      'Mobile and web app development in Hyderabad with UI/UX, backend APIs, CRM integrations, and launch support. Digivate builds apps designed to scale with your business.',
    path: '/services/app-development',
    serviceName: 'App development',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'App Development', path: '/services/app-development' },
    ],
    faqs: [
      {
        question: 'Do you build mobile apps and web apps?',
        answer:
          'Yes. We build native and cross-platform mobile apps and web applications, including product strategy, UI/UX, backend, and integrations.',
      },
      {
        question: 'Can you build an MVP first?',
        answer:
          'Yes. We can start with an MVP so you can test with real customers, then expand features once the product is proving itself.',
      },
      {
        question: 'Can the app connect to our CRM?',
        answer:
          'Yes. We connect apps to CRMs, payments, and internal tools so bookings, leads, and operations stay in one pipeline.',
      },
    ],
  },
  automation: {
    title: 'AI Workflows & CRM Automation | Digivate',
    description:
      'AI workflow and CRM automation in Hyderabad. Digivate connects websites, WhatsApp, forms, and calendars so leads are answered, logged, and followed up automatically.',
    path: '/services/ai-automation',
    serviceName: 'AI workflows and CRM automation',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'AI Workflows & CRM', path: '/services/ai-automation' },
    ],
    faqs: [
      {
        question: 'What AI workflows do you set up?',
        answer:
          'Lead capture, instant replies, qualification, appointment booking, reminders, and CRM logging so inquiries do not sit unanswered.',
      },
      {
        question: 'Can you connect our CRM?',
        answer:
          'Yes. We connect forms, WhatsApp, and calendars to your CRM so every inquiry is recorded and routed without manual spreadsheet work.',
      },
      {
        question: 'Do we need a CRM before automation?',
        answer:
          'No. We can work with the CRM you already use, or recommend a simple setup if you are still tracking leads in chat and spreadsheets.',
      },
    ],
  },
  marketing: {
    title: 'Digital Marketing Agency in Hyderabad | Digivate',
    description:
      'Digital marketing and SEO in Hyderabad for qualified inquiries: search, paid campaigns, content, and conversion pages. Digivate connects marketing to websites that convert.',
    path: '/services/digital-marketing',
    serviceName: 'Digital marketing',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Digital Marketing', path: '/services/digital-marketing' },
    ],
    faqs: [
      {
        question: 'What digital marketing services do you offer?',
        answer:
          'SEO, paid search, social campaigns, landing pages, and conversion work focused on inquiries and bookings — not empty traffic.',
      },
      {
        question: 'Do you work with local businesses?',
        answer:
          'Yes. We work with local and growing businesses that need to get found, look credible, and make it easy to call, book, or message.',
      },
      {
        question: 'How is Digivate SEO different from running ads only?',
        answer:
          'Ads can bring demand quickly. SEO builds lasting visibility for searches like website development, app development, and your own services. We often run both, tied to a site that converts.',
      },
    ],
  },
  about: {
    title: 'About Digivate | Digital Agency in Hyderabad',
    description:
      'Digivate is a Hyderabad digital agency founded to help businesses build, automate, and grow with websites, apps, AI workflows, CRMs, and marketing.',
    path: '/about',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
    faqs: [
      {
        question: 'Who founded Digivate?',
        answer:
          'Digivate was founded by Atif Khan, with Hajira Bi as co-founder. The agency is based in Hyderabad and focused on practical digital systems for growing businesses.',
      },
      {
        question: 'What does Digivate actually build?',
        answer:
          'Websites, mobile and web apps, AI workflows, CRM connections, and digital marketing — designed to work together so leads can find you, inquire, and get followed up.',
      },
    ],
  },
  portfolio: {
    title: 'Portfolio | Websites and Digital Work by Digivate',
    description:
      'Selected Digivate work: conversion-focused websites and digital experiences for cafes, real estate, restaurants, and growing businesses.',
    path: '/portfolio',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Portfolio', path: '/portfolio' },
    ],
  },
  contact: {
    title: 'Contact Digivate | Book a Digital Agency Consultation',
    description:
      'Contact Digivate in Hyderabad for website development, app development, AI workflows, CRM automation, or digital marketing. Book a call or message on WhatsApp.',
    path: '/contact',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
  },
  start: {
    title: 'Get a 60-Second Plan | Digivate',
    description:
      'Tell Digivate what you need — website development, app development, AI workflows, CRM, or digital marketing — and see the first move we would actually work on.',
    path: '/get-started',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Get a plan', path: '/get-started' },
    ],
  },
  faq: {
    title: 'FAQs | Digivate Digital Agency Hyderabad',
    description:
      'Answers about Digivate website development, app development, AI workflows, CRM automation, digital marketing, pricing, and how to start in Hyderabad.',
    path: '/faq',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'FAQ', path: '/faq' },
    ],
    faqs: SITE_FAQS,
  },
  blog: {
    title: 'Blog | Web, Apps, AI Workflows & Marketing | Digivate',
    description:
      'Practical writing from Digivate on converting websites, AI workflows and CRM, SEO and ads, and whether to build a website or an app first.',
    path: '/blog',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ],
  },
  notFound: {
    title: 'Page not found | Digivate',
    description: 'This page does not exist. Visit Digivate for website development, apps, AI workflows, CRMs, and digital marketing.',
    path: '/404',
    noindex: true,
  },
};

export function blogPostSeo(post: BlogPost): SeoPage {
  return {
    title: `${post.title} | Digivate`,
    description: post.description,
    path: `/blog/${post.slug}`,
    datePublished: post.date,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ],
  };
}

export function absoluteUrl(path: string) {
  return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildJsonLd(page: SeoPage) {
  const url = absoluteUrl(page.path);
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': `${SITE_ORIGIN}/#organization`,
      name: 'Digivate',
      alternateName: 'Digivate Digital Agency',
      url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}/favicon.svg`,
      image: DEFAULT_OG_IMAGE,
      email: CONTACT_EMAIL,
      telephone: DISPLAY_PHONE,
      description:
        'Digital agency in Hyderabad for website development, app development, AI workflows, CRM automation, and digital marketing.',
      areaServed: [
        { '@type': 'City', name: 'Hyderabad' },
        { '@type': 'City', name: 'Bangalore' },
        { '@type': 'City', name: 'Mumbai' },
        { '@type': 'City', name: 'Delhi' },
        { '@type': 'City', name: 'Pune' },
        { '@type': 'City', name: 'Chennai' },
        { '@type': 'Country', name: 'India' },
      ],
      knowsAbout: [
        'Website development',
        'App development',
        'AI workflows',
        'CRM automation',
        'Digital marketing',
        'SEO',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: DISPLAY_PHONE,
        email: CONTACT_EMAIL,
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Telugu'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      url: SITE_ORIGIN,
      name: 'Digivate',
      inLanguage: 'en-IN',
      publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: 'en-IN',
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
      about: { '@id': `${SITE_ORIGIN}/#organization` },
      primaryImageOfPage: DEFAULT_OG_IMAGE,
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_ORIGIN}/#service`,
      name: 'Digivate Digital Agency',
      url: SITE_ORIGIN,
      image: DEFAULT_OG_IMAGE,
      telephone: DISPLAY_PHONE,
      email: CONTACT_EMAIL,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        addressCountry: 'IN',
      },
      areaServed: { '@type': 'Country', name: 'India' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Digivate digital services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website development', url: `${SITE_ORIGIN}/services/web-development` } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'App development', url: `${SITE_ORIGIN}/services/app-development` } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI workflows and CRM automation', url: `${SITE_ORIGIN}/services/ai-automation` } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital marketing', url: `${SITE_ORIGIN}/services/digital-marketing` } },
        ],
      },
    },
  ];

  if (page.serviceName) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#offering`,
      name: page.serviceName,
      description: page.description,
      url,
      provider: { '@id': `${SITE_ORIGIN}/#organization` },
      areaServed: { '@type': 'City', name: 'Hyderabad' },
      mainEntityOfPage: { '@id': `${url}#webpage` },
    });
  }

  if (page.breadcrumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    });
  }

  if (page.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  if (page.datePublished) {
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: page.title,
      description: page.description,
      datePublished: page.datePublished,
      dateModified: page.datePublished,
      inLanguage: 'en-IN',
      url,
      image: DEFAULT_OG_IMAGE,
      author: { '@id': `${SITE_ORIGIN}/#organization` },
      publisher: { '@id': `${SITE_ORIGIN}/#organization` },
      mainEntityOfPage: { '@id': `${url}#webpage` },
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export function applySeoToHtml(html: string, page: SeoPage) {
  const url = absoluteUrl(page.path);
  const robots = page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large';
  const jsonLd = JSON.stringify(buildJsonLd(page));

  const replacements: Array<[RegExp, string]> = [
    [/<title[^>]*>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`],
    [/<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(page.description)}" />`],
    [/<meta\s+name="robots"[^>]*>/i, `<meta name="robots" content="${robots}" />`],
    [/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${url}" />`],
    [/<link\s+rel="alternate" hreflang="en-IN"[^>]*>/i, `<link rel="alternate" hreflang="en-IN" href="${url}" />`],
    [/<link\s+rel="alternate" hreflang="x-default"[^>]*>/i, `<link rel="alternate" hreflang="x-default" href="${url}" />`],
    [/<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(page.title)}" />`],
    [/<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(page.description)}" />`],
    [/<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${url}" />`],
    [/<meta\s+property="og:image"[^>]*>/i, `<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`],
    [/<meta\s+name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`],
    [/<meta\s+name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`],
    [/<meta\s+name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`],
  ];

  let next = html;
  for (const [pattern, value] of replacements) {
    next = next.replace(pattern, value);
  }

  if (/id="seo-jsonld"/.test(next)) {
    next = next.replace(
      /<script id="seo-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/i,
      `<script id="seo-jsonld" type="application/ld+json">${jsonLd}</script>`,
    );
  } else {
    next = next.replace('</head>', `    <script id="seo-jsonld" type="application/ld+json">${jsonLd}</script>\n  </head>`);
  }

  return next;
}
