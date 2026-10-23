import type { ReactNode } from 'react';
import { Check, CheckCircle2, Clock3, Phone, ShieldCheck } from 'lucide-react';
import { type PageMeta, SITE, type ServiceKind } from '@/site';
import { SiteLayout } from '@/components/site-layout';
import { QuoteForm } from '@/components/quote-section';
import { Breadcrumbs, FaqSection, SnowDrift } from '@/components/page-sections';
import { trackCallClick } from '@/lib/tracking';

export function QuotePage({
  page,
  service,
  eyebrow = 'Free quote · Grande Prairie & Sexsmith',
  accent,
  title,
  intro,
  points,
  note,
  benefits,
  fallback,
}: {
  page: PageMeta;
  service: ServiceKind;
  eyebrow?: string;
  accent: string;
  title: string;
  intro: ReactNode;
  points?: string[];
  note?: string;
  benefits: string[];
  fallback: string;
}) {
  return (
    <SiteLayout page={page} cta={false}>
      <section className={`relative overflow-hidden text-white ${fallback}`} aria-labelledby="page-title">
        {service !== 'landscaping' && <div className="snowfall" aria-hidden="true" />}
        <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-32 text-center sm:px-6 md:pb-24 md:pt-44">
          <p className="eyebrow text-ice-soft">{eyebrow}</p>
          <h1 id="page-title" className="heading-xl mt-4 text-[2.4rem] sm:text-6xl md:mt-5 md:text-7xl">
            <span className="block text-ice">{accent}</span>{' '}
            <span className="block">{title}</span>
          </h1>
          <div className="mx-auto mt-5 max-w-2xl text-lg text-slate-200">{intro}</div>
          {points && (
            <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2" aria-label="What is included">
              {points.map((point) => (
                <li key={point} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-slate-100 backdrop-blur">
                  <Check size={14} className="text-ice" aria-hidden="true" /> {point}
                </li>
              ))}
            </ul>
          )}
          {note && <p className="mt-5 text-sm font-bold uppercase tracking-[0.12em] text-ice-soft">{note}</p>}
        </div>
        <SnowDrift fill="#0b1822" />
      </section>

      <div className="bg-base-2">
        <Breadcrumbs label={page.breadcrumb ?? 'Quote'} />
        <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[1.35fr_1fr]" aria-label="Quote request">
          <div className="order-1">
            <QuoteForm service={service} />
          </div>
          <aside className="order-2 space-y-5">
            <div className="rounded-3xl bg-ink p-7 text-white">
              <p className="eyebrow text-ice">Prefer to talk?</p>
              <a href={SITE.phoneHref} onClick={trackCallClick} className="heading-xl mt-3 inline-flex items-center gap-3 text-4xl text-white hover:text-ice">
                <Phone size={30} className="text-ice" aria-hidden="true" /> {SITE.phoneDisplay}
              </a>
              <p className="mt-3 text-slate-300">Call and talk to the people who do the work.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-raise p-7">
              <h2 className="heading-xl text-3xl text-white">What you get</h2>
              <ul className="mt-5 space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-slate-100">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-ice" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl border border-white/10 bg-raise p-5">
                <ShieldCheck size={22} className="text-ice" aria-hidden="true" />
                <p className="mt-3 font-bold text-white">Fully insured in Alberta</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-raise p-5">
                <Clock3 size={22} className="text-ice" aria-hidden="true" />
                <p className="mt-3 font-bold text-white">No commitment until you sign</p>
              </div>
            </div>
          </aside>
        </section>
      </div>

      <FaqSection faqs={page.faqs ?? []} title="Before you request a quote" />
    </SiteLayout>
  );
}
