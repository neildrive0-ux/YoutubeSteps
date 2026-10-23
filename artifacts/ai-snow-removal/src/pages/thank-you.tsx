import { useEffect } from 'react';
import { Link } from 'wouter';
import { CheckCircle2, Phone } from 'lucide-react';
import { PAGES, SITE } from '@/site';
import { SiteLayout } from '@/components/site-layout';
import { QUOTE_SUBMITTED_KEY } from '@/components/quote-section';
import { trackCallClick, trackLead } from '@/lib/tracking';

export default function ThankYouPage() {
  useEffect(() => {
    // Count the conversion once per submitted quote, not on refreshes or direct visits.
    try {
      const requestId = window.sessionStorage.getItem(QUOTE_SUBMITTED_KEY);
      if (requestId) {
        window.sessionStorage.removeItem(QUOTE_SUBMITTED_KEY);
        trackLead();
      }
    } catch {
      // Storage blocked: skip tracking rather than double count.
    }
  }, []);

  return (
    <SiteLayout page={PAGES['/thank-you']} showQuote={false}>
      <section className="bg-[#071118] text-white pt-40 pb-24 lg:pt-48 lg:pb-32" aria-labelledby="page-title">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <CheckCircle2 size={56} className="mx-auto text-emerald-400 mb-8" aria-hidden="true" />
          <h1 id="page-title" className="font-display text-4xl lg:text-6xl font-semibold tracking-tight mb-6">
            Thanks, your quote request was sent.
          </h1>
          <p className="text-slate-200 text-lg leading-relaxed mb-10">
            We'll call you back with your snow removal price using the number you gave us. If you need us sooner, call us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={SITE.phoneHref} onClick={trackCallClick} className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-[#071118] font-bold px-8 py-4 rounded-md">
              <Phone size={18} /> Call {SITE.phoneDisplay}
            </a>
            <Link href="/seasonal-snow-removal-contracts" className="inline-flex items-center justify-center gap-2 border border-slate-500 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-md">
              Read how contracts work
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
