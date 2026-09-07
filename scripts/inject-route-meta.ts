import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BLOG_POSTS } from '../src/config/blog.ts';
import { PAGE_SEO, applySeoToHtml, blogPostSeo } from '../src/config/seo.ts';
import { buildSitemapXml } from '../src/config/sitemap.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const pages = [
  ...Object.values(PAGE_SEO).filter((page) => page.path !== '/404' && !page.noindex),
  ...BLOG_POSTS.map(blogPostSeo),
];

for (const page of pages) {
  const html = applySeoToHtml(template, page);
  const outFile =
    page.path === '/' ? join(dist, 'index.html') : join(dist, page.path.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  console.log(`seo: ${page.path === '/' ? '/index.html' : `${page.path}/index.html`}`);
}

writeFileSync(join(dist, '404.html'), applySeoToHtml(template, PAGE_SEO.notFound));
console.log('seo: /404.html');

const sitemap = buildSitemapXml();
writeFileSync(join(dist, 'sitemap.xml'), sitemap);
writeFileSync(join(root, 'public', 'sitemap.xml'), sitemap);
console.log('seo: /sitemap.xml');
