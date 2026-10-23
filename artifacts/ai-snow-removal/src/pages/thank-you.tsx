import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PAGES, type ServiceKind } from '@/site';
import { SiteLayout } from '@/components/site-layout';
import { QUOTE_SUBMITTED_KEY } from '@/components/quote-section';
import { CallLink, PillLink, SnowDrift } from '@/components/page-sections';
import { trackLead } from '@/lib/tracking';

export default function ThankYouPage() {
  const [service, setService] = useState<ServiceKind>('snow');

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('service');
    const kind: ServiceKind = fromUrl === 'landscaping' ? 'landscaping' : 'snow';
    setService(kind);
    // Count the conversion once per submitted quote, not on refreshes or direct visits.
    try {
      const raw = window.sessionStorage.getItem(QUOTE_SUBMITTED_KEY);
      if (raw) {
        window.sessionStorage.removeItem(QUOTE_SUBMITTED_KEY);
        let submitted: ServiceKind = kind;
        try {
          const parsed = JSON.parse(raw) as { service?: ServiceKind };
          if (parsed.service === 'landscaping' || parsed.service === 'snow') submitted = parsed.service;
        } catch {
          // Older format: plain request id.
        }
        trackLead(submitted);
      }
    } catch {
      // Storage blocked: skip tracking rather than double count.
    }
  }, []);

  return (
    <SiteLayout page={PAGES['/thank-you']} cta={false}>
      <section className="hero-fallback relative overflow-hidden text-white" aria-labelledby="page-title">
        <div className="snowfall" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-4 pb-32 pt-40 text-center sm:px-6 md:pt-48">
          <CheckCircle2 size={60} className="mx-auto text-ice" aria-hidden="true" />
          <h1 id="page-title" className="heading-xl mt-6 text-5xl md:text-7xl">
            <span className="block text-ice">Thanks!</span>
            <span className="block">Your request was sent.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-200">
            We'll call you back with your {service === 'landscaping' ? 'landscaping' : 'snow removal'} price at the number you gave us. Need us sooner? Call us directly.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <CallLink />
            <PillLink href={service === 'landscaping' ? '/landscape-management' : '/seasonal-snow-removal-contracts'} variant="outline-light">
              {service === 'landscaping' ? 'Our landscaping' : 'How contracts work'}
            </PillLink>
          </div>
        </div>
        <SnowDrift />
      </section>
    </SiteLayout>
  );
}
