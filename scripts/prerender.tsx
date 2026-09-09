import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppShell } from '../src/App.tsx';
import { BLOG_POSTS } from '../src/config/blog.ts';
import { PAGE_SEO, applySeoToHtml, blogPostSeo } from '../src/config/seo.ts';
import type { SeoPage } from '../src/config/seo.ts';
import { buildSitemapXml } from '../src/config/sitemap.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const ROOT_DIV = /<div id="root"><\/div>/;

/**
 * Any route whose rendered markup is thinner than this is almost certainly a
 * silent SSR failure (a browser-only call sneaking into a render path), which
 * is exactly the bug that left every page shipping an empty #root. Fail the
 * build rather than deploy blank HTML again.
 */
const MIN_TEXT_CHARS = 600;

/** Effects never run during renderToString; React's warning about it is noise here. */
const realWarn = console.error;
console.error = (...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].includes('useLayoutEffect does nothing on the server')) return;
  realWarn(...args);
};

function visibleTextLength(html: string): number {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim().length;
}

function renderRoute(path: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={path}>
        <AppShell />
      </StaticRouter>
    </StrictMode>,
  );
}

function buildPage(page: SeoPage): string {
  const markup = renderRoute(page.path);
  const textChars = visibleTextLength(markup);

  if (!ROOT_DIV.test(template)) {
    throw new Error('prerender: could not find <div id="root"></div> in dist/index.html');
  }
  if (textChars < MIN_TEXT_CHARS) {
    throw new Error(
      `prerender: ${page.path} rendered only ${textChars} chars of text (expected >= ${MIN_TEXT_CHARS}). ` +
        'Something in this route is failing to render outside the browser.',
    );
  }

  const withMeta = applySeoToHtml(template, page);
  const html = withMeta.replace(ROOT_DIV, () => `<div id="root">${markup}</div>`);
  console.log(`prerender: ${page.path.padEnd(42)} ${String(textChars).padStart(6)} chars of text`);
  return html;
}

const pages: SeoPage[] = [
  ...Object.values(PAGE_SEO).filter((page) => page.path !== '/404' && !page.noindex),
  ...BLOG_POSTS.map(blogPostSeo),
];

for (const page of pages) {
  const outFile =
    page.path === '/' ? join(dist, 'index.html') : join(dist, page.path.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, buildPage(page));
}

writeFileSync(join(dist, '404.html'), buildPage(PAGE_SEO.notFound));

const sitemap = buildSitemapXml();
writeFileSync(join(dist, 'sitemap.xml'), sitemap);
writeFileSync(join(root, 'public', 'sitemap.xml'), sitemap);
console.log(`prerender: wrote sitemap.xml and ${pages.length + 1} prerendered pages`);
