import type { ReactNode } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Check, ChevronRight, Phone, Plus } from 'lucide-react';
import { type Faq, SITE } from '@/site';
import { trackCallClick, trackQuoteClick } from '@/lib/tracking';

type Tone = 'white' | 'snow' | 'dark';

export function PillLink({
  href,
  children,
  variant = 'ice',
  track,
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: 'ice' | 'outline-light' | 'outline-dark' | 'dark';
  track?: string;
  className?: string;
}) {
  const styles = {
    ice: 'bg-ice text-ink hover:bg-ice-soft',
    'outline-light': 'border border-white/30 text-white hover:border-ice hover:text-ice',
    'outline-dark': 'border border-ink/20 text-ink hover:border-ice-deep hover:text-ice-deep',
    dark: 'bg-ink text-white hover:bg-steel',
  }[variant];
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-extrabold uppercase tracking-[0.08em] transition-colors ${styles} ${className}`;
  const onClick = track ? () => trackQuoteClick(track) : undefined;
  if (href.startsWith('/') && !href.startsWith('/#')) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children} <ArrowRight size={17} aria-hidden="true" />
      </Link>
    );
  }
  return (
    <a href={href} onClick={onClick} className={classes}>
      {children} <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

export function CallLink({ variant = 'light', className = '' }: { variant?: 'light' | 'dark'; className?: string }) {
  return (
    <a
      href={SITE.phoneHref}
      onClick={trackCallClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-extrabold uppercase tracking-[0.08em] transition-colors ${variant === 'light' ? 'border border-white/30 text-white hover:border-ice hover:text-ice' : 'border border-ink/20 text-ink hover:border-ice-deep hover:text-ice-deep'} ${className}`}
    >
      <Phone size={17} aria-hidden="true" /> Call {SITE.phoneDisplay}
    </a>
  );
}

export function SnowDrift({ fill = '#ffffff' }: { fill?: string }) {
  return (
    <svg className="absolute inset-x-0 bottom-[-1px] h-12 w-full sm:h-16" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <path fill={fill} d="M0 50 C 180 20, 320 70, 520 44 S 860 10, 1040 40 S 1320 70, 1440 34 L1440 80 L0 80 Z" />
    </svg>
  );
}

export function PageHero({
  eyebrow,
  accent,
  title,
  intro,
  points,
  quoteHref = '/snow-removal-quote',
  quoteLabel = 'Get a Free Quote',
  photo,
  fallback = 'hero-fallback',
  driftFill = '#ffffff',
}: {
  eyebrow: string;
  accent: string;
  title: string;
  intro: ReactNode;
  points?: string[];
  quoteHref?: string;
  quoteLabel?: string;
  photo?: string;
  fallback?: string;
  driftFill?: string;
}) {
  return (
    <section className={`relative overflow-hidden text-white ${photo ? 'bg-ink' : fallback}`} aria-labelledby="page-title">
      {photo && <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />}
      <div className="snowfall" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl px-4 pb-28 pt-40 text-center sm:px-6 md:pb-32 md:pt-48">
        <p className="eyebrow text-ice-soft">{eyebrow}</p>
        <h1 id="page-title" className="heading-xl mt-5 text-[2.6rem] sm:text-6xl md:text-7xl">
          <span className="block text-ice">{accent}</span>
          <span className="block text-white">{title}</span>
        </h1>
        <div className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">{intro}</div>
        {points && (
          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
            {points.map((point) => (
              <li key={point} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 backdrop-blur">
                <Check size={15} className="text-ice" aria-hidden="true" /> {point}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <PillLink href={quoteHref} track="page-hero">{quoteLabel}</PillLink>
          <CallLink />
        </div>
      </div>
      <SnowDrift fill={driftFill} />
    </section>
  );
}

export function Breadcrumbs({ label }: { label: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-600">
        <li>
          <Link href="/" className="hover:text-ice-deep">Home</Link>
        </li>
        <li aria-hidden="true"><ChevronRight size={14} /></li>
        <li aria-current="page" className="font-semibold text-ink">{label}</li>
      </ol>
    </nav>
  );
}

export function ContentSection({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = 'white',
  bigWord,
  center = false,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
  tone?: Tone;
  bigWord?: string;
  center?: boolean;
}) {
  const bg = tone === 'dark' ? 'bg-ink text-white' : tone === 'snow' ? 'bg-snow' : 'bg-white';
  const headingId = `${id ?? title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`;
  return (
    <section id={id} className={`relative overflow-hidden py-20 md:py-28 ${bg}`} aria-labelledby={headingId}>
      {bigWord && (
        <p aria-hidden="true" className="heading-xl text-outline pointer-events-none absolute inset-x-0 top-6 select-none whitespace-nowrap text-center text-[22vw] md:top-4 md:text-[13rem]">
          {bigWord}
        </p>
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`mb-12 max-w-3xl ${center ? 'mx-auto text-center' : ''}`} data-reveal>
          {eyebrow && <p className={`eyebrow ${tone === 'dark' ? 'text-ice' : 'text-ice-deep'}`}>{eyebrow}</p>}
          <h2 id={headingId} className={`heading-xl mt-3 text-4xl md:text-6xl ${tone === 'dark' ? 'text-white' : 'text-ink'}`}>
            {title}
          </h2>
          {intro && <div className={`mt-5 text-lg leading-relaxed ${tone === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{intro}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function CheckList({ items, tone = 'light' }: { items: string[]; tone?: 'light' | 'dark' }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-3 text-lg ${tone === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
          <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ice/15">
            <Check size={15} className={tone === 'dark' ? 'text-ice' : 'text-ice-deep'} aria-hidden="true" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PhotoPanel({
  photo,
  fallback,
  icon,
  label,
  className = '',
}: {
  photo?: string;
  fallback: string;
  icon?: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl ${photo ? 'bg-ink' : fallback} ${className}`}>
      {photo ? (
        <img src={photo} alt={label} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <div className="bg-grain absolute inset-0 flex items-center justify-center" role={label ? 'img' : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true}>
          <div className="text-white/80">{icon}</div>
        </div>
      )}
    </div>
  );
}

export function FaqSection({ faqs, title = 'Questions People Ask', eyebrow = 'FAQ', tone = 'white' }: { faqs: Faq[]; title?: string; eyebrow?: string; tone?: Tone }) {
  return (
    <ContentSection id="faq" eyebrow={eyebrow} title={title} tone={tone}>
      <div className="max-w-4xl divide-y divide-slate-200 border-y border-slate-200" data-reveal>
        {faqs.map((faq) => (
          <details key={faq.q} className="group py-2">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-left">
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-ink md:text-2xl">{faq.q}</h3>
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-300 text-ice-deep transition-transform group-open:rotate-45" aria-hidden="true">
                <Plus size={18} />
              </span>
            </summary>
            <p className="pb-5 pr-14 text-lg leading-relaxed text-slate-700">{faq.a}</p>
          </details>
        ))}
      </div>
    </ContentSection>
  );
}

export function QuoteCtaBand({ title = 'Ready when the snow is.', intro }: { title?: string; intro?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white md:py-24" aria-labelledby="quote-cta-title">
      <div className="snowfall" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6" data-reveal>
        <p className="eyebrow text-ice">Free quotes · Grande Prairie &amp; Sexsmith</p>
        <h2 id="quote-cta-title" className="heading-xl mt-4 text-5xl md:text-7xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
          {intro ?? 'Pick the quote you need. We call you back with a straight price, with no commitment until you sign.'}
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <PillLink href="/snow-removal-quote" track="cta-band-snow">Snow &amp; Ice Quote</PillLink>
          <PillLink href="/landscaping-quote" variant="outline-light" track="cta-band-landscaping">Landscaping Quote</PillLink>
        </div>
        <a href={SITE.phoneHref} onClick={trackCallClick} className="mt-8 inline-flex items-center gap-2 text-lg font-bold text-white hover:text-ice">
          <Phone size={18} className="text-ice" aria-hidden="true" /> Or call {SITE.phoneDisplay}
        </a>
      </div>
    </section>
  );
}

const relatedLinks = [
  { href: '/snow-and-ice-management', label: 'Snow & ice management' },
  { href: '/driveway-snow-removal', label: 'Driveway snow removal' },
  { href: '/seasonal-snow-removal-contracts', label: 'Seasonal snow contracts' },
  { href: '/snow-removal-prices', label: 'Snow removal prices' },
  { href: '/snow-removal-for-seniors', label: 'Snow removal for seniors' },
  { href: '/landscape-management', label: 'Landscape management' },
  { href: '/landscape-enhancements', label: 'Landscape enhancements' },
];

export function RelatedPages({ current }: { current: string }) {
  return (
    <nav aria-label="More services" className="border-t border-slate-200 bg-snow">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="heading-xl text-3xl text-ink">More from Ai Landscaping</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {relatedLinks
            .filter((link) => link.href !== current)
            .map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 font-bold text-ink transition-colors hover:border-ice">
                  {link.label} <ArrowRight size={17} className="text-ice-deep transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
