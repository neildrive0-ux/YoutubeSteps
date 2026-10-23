import type { ReactNode } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { type Faq, SITE } from '@/site';
import { scrollToQuote } from '@/components/site-header';
import { trackCallClick } from '@/lib/tracking';

export function PageHero({
  eyebrow,
  title,
  intro,
  points,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  points?: string[];
}) {
  return (
    <section className="relative bg-[#071118] text-white pt-40 pb-20 lg:pt-44 lg:pb-24 overflow-hidden" aria-labelledby="page-title">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[700px] h-[700px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-3 text-sky-300 font-bold text-xs tracking-widest uppercase mb-6">
            <span className="w-8 h-px bg-sky-300" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 id="page-title" className="font-display text-4xl lg:text-6xl font-semibold leading-[1.08] tracking-tight mb-6">
            {title}
          </h1>
          <div className="text-slate-200 text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed">{intro}</div>
          {points && (
            <ul className="grid sm:grid-cols-2 gap-3 mb-10 max-w-2xl">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-slate-200">
                  <Check size={18} className="text-sky-300 shrink-0 mt-1" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <button type="button" onClick={scrollToQuote} className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-[#071118] font-bold px-8 py-4 rounded-md transition-all duration-200" data-testid="button-hero-quote">
              Get a Free Quote <ArrowRight size={18} />
            </button>
            <a href={SITE.phoneHref} onClick={trackCallClick} className="inline-flex items-center justify-center gap-2 bg-transparent border border-slate-500 hover:border-slate-300 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-md transition-all duration-200" data-testid="button-hero-call">
              <Phone size={18} /> Call {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContentSection({
  id,
  eyebrow,
  title,
  children,
  tone = 'white',
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  tone?: 'white' | 'slate' | 'sky';
}) {
  const bg = tone === 'slate' ? 'bg-slate-50 border-y border-slate-200' : tone === 'sky' ? 'bg-sky-50 border-y border-sky-100' : 'bg-white';
  const headingId = `${id ?? title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`;
  return (
    <section id={id} className={`py-20 lg:py-28 ${bg}`} aria-labelledby={headingId}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-3xl mb-12">
          {eyebrow && <p className="text-sky-700 font-bold text-xs tracking-widest uppercase mb-4">{eyebrow}</p>}
          <h2 id={headingId} className="font-display text-3xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

export function FaqSection({ faqs, title = 'Snow Removal Questions' }: { faqs: Faq[]; title?: string }) {
  return (
    <ContentSection id="faq" eyebrow="FAQ" title={title} tone="white">
      <div className="max-w-3xl divide-y divide-slate-200 border-y border-slate-200">
        {faqs.map((faq) => (
          <details key={faq.q} className="group py-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-lg lg:text-xl font-semibold text-slate-900">
              <h3 className="m-0">{faq.q}</h3>
              <span className="mt-1 text-sky-700 transition-transform group-open:rotate-45 text-2xl leading-none" aria-hidden="true">+</span>
            </summary>
            <p className="mt-4 text-slate-600 leading-relaxed">{faq.a}</p>
          </details>
        ))}
      </div>
    </ContentSection>
  );
}

const relatedLinks = [
  { href: '/seasonal-snow-removal-contracts', label: 'Seasonal snow removal contracts' },
  { href: '/snow-removal-prices', label: 'Snow removal prices in Grande Prairie' },
  { href: '/driveway-snow-removal', label: 'Driveway snow removal & plowing' },
  { href: '/snow-removal-for-seniors', label: 'Snow removal for seniors' },
];

export function RelatedPages({ current }: { current: string }) {
  return (
    <nav aria-label="More snow removal information" className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-6 max-w-7xl py-12">
        <h2 className="font-display text-xl font-semibold text-slate-900 mb-5">More about our snow removal</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedLinks
            .filter((link) => link.href !== current)
            .map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 font-semibold text-slate-800 hover:border-sky-400 hover:text-sky-800 transition-colors">
                  {link.label} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
