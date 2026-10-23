import { renderToString } from 'react-dom/server';
import App from './App';

// Used only at build time by scripts/prerender.mjs to turn each page into static HTML,
// so Google and link previews get the full text without running JavaScript.
export function render(url: string) {
  return renderToString(<App ssrPath={url} />);
}

export { PAGES, NOT_FOUND, canonicalUrl, structuredData, SITE } from './site';
