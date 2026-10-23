// Build step: turns every page into static HTML so search engines and link previews
// get the full page text, title, description, canonical and structured data
// in the first response, without running JavaScript.
import { readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clientDir = path.join(root, 'dist/public');
const serverEntry = path.join(root, 'dist/server/entry-server.js');

const { render, PAGES, NOT_FOUND, canonicalUrl, structuredData } = await import(pathToFileURL(serverEntry).href);
const template = await readFile(path.join(clientDir, 'index.html'), 'utf8');

const escapeHtml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function headFor(page) {
  const url = canonicalUrl(page.path);
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow'}" />`,
  ];
  if (!page.noindex) tags.push(`<link rel="canonical" href="${url}" />`);
  tags.push(
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
  );
  if (!page.noindex) {
    for (const block of structuredData(page)) {
      tags.push(`<script type="application/ld+json" data-seo-jsonld>${JSON.stringify(block).replace(/</g, '\\u003c')}</script>`);
    }
  }
  return tags.join('\n    ');
}

function pageHtml(page, url) {
  const start = template.indexOf('<!--seo:start-->');
  const end = template.indexOf('<!--seo:end-->') + '<!--seo:end-->'.length;
  if (start === -1 || end < start) throw new Error('index.html is missing the <!--seo:start--> / <!--seo:end--> markers');
  const withHead = template.slice(0, start) + headFor(page) + template.slice(end);
  const appHtml = render(url);
  return withHead.replace('<div id="root"></div>', `<div id="root" data-prerender-path="${url}">${appHtml}</div>`);
}

const written = [];
for (const page of Object.values(PAGES)) {
  const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`;
  await writeFile(path.join(clientDir, file), pageHtml(page, page.path));
  written.push(file);
}

await writeFile(path.join(clientDir, '404.html'), pageHtml(NOT_FOUND, '/404'));
written.push('404.html');

await rm(path.join(root, 'dist/server'), { recursive: true, force: true });
console.log(`Prerendered ${written.length} pages: ${written.join(', ')}`);
