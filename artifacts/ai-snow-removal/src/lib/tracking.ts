import { type ServiceKind, TRACKING } from '@/site';

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

// The Google tag itself is loaded in index.html (with Consent Mode defaults) so Google can detect it.
export const CONSENT_KEY = 'ai-cookie-consent';
export type ConsentChoice = 'granted' | 'denied';

export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && window.gtag) window.gtag(...args);
}

function loadMetaPixel() {
  if (!TRACKING.metaPixelId || window.fbq) return;
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
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
  fbq('init', TRACKING.metaPixelId);
  fbq('track', 'PageView');
}

// Runs once in the browser. The Meta pixel only loads if the visitor has not declined cookies.
export function initTracking() {
  if (typeof window === 'undefined') return;
  if (readConsent() !== 'denied') loadMetaPixel();
}

export function setConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Storage blocked: the choice still applies for this visit.
  }
  const value = choice === 'granted' ? 'granted' : 'denied';
  gtag('consent', 'update', {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
  if (choice === 'granted') {
    loadMetaPixel();
    window.fbq?.('consent', 'grant');
  } else {
    window.fbq?.('consent', 'revoke');
  }
}

export function trackPageView(path: string) {
  gtag('event', 'page_view', { page_path: path, page_location: window.location.href });
  window.fbq?.('track', 'PageView');
}

// Fired on the thank-you page after a real form submission (one conversion per request).
export function trackLead(service: ServiceKind) {
  const label = service === 'landscaping' ? TRACKING.landscapingLeadLabel : TRACKING.snowLeadLabel;
  gtag('event', 'conversion', { send_to: `${TRACKING.googleAdsId}/${label}` });
  gtag('event', 'generate_lead', { service_type: service });
  window.fbq?.('track', 'Lead', { content_category: service });
}

// Every clickable phone number on the site calls this.
export function trackCallClick() {
  gtag('event', 'conversion', { send_to: `${TRACKING.googleAdsId}/${TRACKING.callLabel}` });
  gtag('event', 'phone_click');
  window.fbq?.('track', 'Contact');
}

// Every "Get a Quote" button calls this (an engagement event; the conversion counts on form submit).
export function trackQuoteClick(location: string) {
  gtag('event', 'quote_button_click', { button_location: location });
  window.fbq?.('trackCustom', 'QuoteButtonClick', { location });
}
