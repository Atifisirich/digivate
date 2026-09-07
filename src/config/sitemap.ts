import { BLOG_POSTS } from './blog';

export const SITEMAP_ORIGIN = 'https://digivate.in';

/** Public pages only — homepage sections are not separate URLs. */
export const INDEXABLE_ROUTES: { path: string; changefreq: string; priority: string }[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  { path: '/services/web-development', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/digital-marketing', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/ai-automation', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/app-development', changefreq: 'monthly', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/portfolio', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.7' },
  ...BLOG_POSTS.map((post) => ({
    path: `/blog/${post.slug}`,
    changefreq: 'monthly',
    priority: '0.6',
  })),
  { path: '/faq', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/get-started', changefreq: 'monthly', priority: '0.7' },
];

export function buildSitemapXml(lastmod = new Date().toISOString().slice(0, 10)): string {
  const urls = INDEXABLE_ROUTES.map((route) => {
    const loc = route.path === '/' ? `${SITEMAP_ORIGIN}/` : `${SITEMAP_ORIGIN}${route.path}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
