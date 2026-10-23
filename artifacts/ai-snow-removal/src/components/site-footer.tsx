import { Link } from 'wouter';
import { Mail, MapPin, Phone } from 'lucide-react';
import { SITE } from '@/site';
import { trackCallClick, trackQuoteClick } from '@/lib/tracking';
import { LOGO_SRC } from '@/components/site-header';
import { openCookieSettings } from '@/components/cookie-consent';

const columns = [
  {
    title: 'Snow & Ice',
    links: [
      { href: '/snow-and-ice-management', label: 'Snow & ice management' },
      { href: '/driveway-snow-removal', label: 'Driveway snow removal' },
      { href: '/seasonal-snow-removal-contracts', label: 'Seasonal contracts' },
      { href: '/snow-removal-prices', label: 'Snow removal prices' },
      { href: '/snow-removal-for-seniors', label: 'Snow removal for seniors' },
      { href: '/snow-removal-quote', label: 'Snow removal quote' },
    ],
  },
  {
    title: 'Landscaping',
    links: [
      { href: '/landscape-management', label: 'Landscape management' },
      { href: '/landscape-enhancements', label: 'Landscape enhancements' },
      { href: '/landscaping-quote', label: 'Landscaping quote' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-12 pb-10 text-white md:pt-20">
      <p aria-hidden="true" className="heading-xl text-outline pointer-events-none absolute inset-x-0 bottom-0 select-none whitespace-nowrap text-center text-[24vw] leading-none md:text-[15rem]">
        Grande Prairie
      </p>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Phones get a short footer (logo, phone, email, legal links); the link columns show from tablet up. */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <Link href="/" aria-label={`${SITE.name} home`} className="inline-block" data-testid="link-footer-brand">
              <img src={LOGO_SRC} width={192} height={192} loading="lazy" alt={`${SITE.name} logo`} className="h-16 w-16 md:h-28 md:w-28" data-testid="img-footer-brand-logo" />
            </Link>
            <p className="mt-6 hidden max-w-sm leading-relaxed text-slate-300 md:block">
              Snow &amp; ice management and landscaping for homes in Grande Prairie, Sexsmith, Clairmont and the County of Grande Prairie, Alberta. Fully insured in Alberta.
            </p>
            <Link href="/snow-removal-quote" onClick={() => trackQuoteClick('footer')} className="mt-6 hidden items-center gap-2 rounded-full bg-ice px-6 py-3.5 text-sm font-extrabold uppercase tracking-[0.06em] text-ink hover:bg-ice-soft md:inline-flex">
              Get a Quote
            </Link>
          </div>

          {columns.map((column) => (
            <div key={column.title} className="hidden md:block">
              <p className="eyebrow text-ice">{column.title}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-200 transition-colors hover:text-ice">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="eyebrow hidden text-ice md:block">Contact</p>
            <ul className="space-y-3 text-slate-200 md:mt-5 md:space-y-4">
              <li>
                <a href={SITE.phoneHref} onClick={trackCallClick} className="inline-flex items-center gap-3 text-lg font-bold text-white hover:text-ice" data-testid="link-footer-phone">
                  <Phone size={18} className="text-ice" aria-hidden="true" /> {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-3 break-all hover:text-ice" data-testid="link-footer-email">
                  <Mail size={18} className="shrink-0 text-ice" aria-hidden="true" /> {SITE.email}
                </a>
              </li>
              <li className="hidden items-start gap-3 md:inline-flex">
                <MapPin size={18} className="mt-1 shrink-0 text-ice" aria-hidden="true" />
                <span>Grande Prairie, Sexsmith, Clairmont &amp; County of Grande Prairie No. 1, Alberta</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:mt-16 md:flex-row md:items-center md:justify-between md:pt-8">
          <span data-testid="text-copyright">© {new Date().getFullYear()} {SITE.legalName}, operating as {SITE.name}</span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-ice" data-testid="link-footer-privacy">Privacy &amp; cookie policy</Link>
            <button type="button" onClick={openCookieSettings} className="hover:text-ice" data-testid="button-cookie-settings">Cookie settings</button>
            <a href="#top" className="hover:text-ice" data-testid="link-back-to-top">Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
