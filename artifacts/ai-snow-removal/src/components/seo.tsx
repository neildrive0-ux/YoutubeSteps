import { useEffect } from 'react';
import { canonicalUrl, type PageMeta, structuredData } from '@/site';

function setMeta(selector: string, attr: 'name' | 'property', key: string, value: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.content = value;
}

// Keeps the <head> in sync when visitors move between pages in the browser.
// The first page load already has these tags baked in by the build-time prerender.
export function Seo({ page }: { page: PageMeta }) {
  useEffect(() => {
    const url = canonicalUrl(page.path);
    document.title = page.title;
    setMeta('meta[name="description"]', 'name', 'description', page.description);
    setMeta('meta[name="robots"]', 'name', 'robots', page.noindex ? 'noindex, follow' : 'index, follow');
    setMeta('meta[property="og:title"]', 'property', 'og:title', page.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', page.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', page.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', page.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (page.noindex) {
      canonical?.remove();
    } else {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    }

    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((node) => node.remove());
    if (!page.noindex) {
      for (const block of structuredData(page)) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.seoJsonld = '';
        script.textContent = JSON.stringify(block);
        document.head.appendChild(script);
      }
    }
  }, [page]);

  return null;
}
