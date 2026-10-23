import { TRACKING } from '@/site';

type Gtag = (...args: unknown[]) => void;
type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown; callMethod?: (...args: unknown[]) => void };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

function loadScript(src: string) {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

// Loads the Google tag and Meta pixel only when their IDs are filled in src/site.ts.
export function initTracking() {
  if (typeof window === 'undefined') return;

  if (TRACKING.googleAdsId && !window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', TRACKING.googleAdsId);
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${TRACKING.googleAdsId}`);
  }

  if (TRACKING.metaPixelId && !window.fbq) {
    const fbq = function (...args: unknown[]) {
      const self = window.fbq!;
      if (self.callMethod) self.callMethod(...args);
      else self.queue!.push(args);
    } as Fbq;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.push = fbq;
    window.fbq = fbq;
    window._fbq = fbq;
    loadScript('https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', TRACKING.metaPixelId);
    fbq('track', 'PageView');
  }
}

export function trackPageView() {
  if (window.fbq && TRACKING.metaPixelId) window.fbq('track', 'PageView');
}

export function trackLead() {
  if (window.gtag && TRACKING.googleAdsId && TRACKING.googleAdsLeadLabel) {
    window.gtag('event', 'conversion', { send_to: `${TRACKING.googleAdsId}/${TRACKING.googleAdsLeadLabel}` });
  }
  if (window.fbq && TRACKING.metaPixelId) window.fbq('track', 'Lead');
}

export function trackCallClick() {
  if (window.gtag && TRACKING.googleAdsId && TRACKING.googleAdsCallLabel) {
    window.gtag('event', 'conversion', { send_to: `${TRACKING.googleAdsId}/${TRACKING.googleAdsCallLabel}` });
  }
  if (window.fbq && TRACKING.metaPixelId) window.fbq('track', 'Contact');
}
