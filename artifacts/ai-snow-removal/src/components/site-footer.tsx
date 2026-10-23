import { Link } from 'wouter';
import logoPath from '@assets/ai-landscaping-logo-no-bg.png';
import { SITE } from '@/site';
import { trackCallClick } from '@/lib/tracking';

const footerLinks = [
  { href: '/', label: 'Snow removal Grande Prairie' },
  { href: '/seasonal-snow-removal-contracts', label: 'Seasonal snow removal contracts' },
  { href: '/snow-removal-prices', label: 'Snow removal prices' },
  { href: '/driveway-snow-removal', label: 'Driveway snow removal' },
  { href: '/snow-removal-for-seniors', label: 'Snow removal for seniors' },
];

export function Footer() {
  return (
    <footer className="bg-[#071118] text-white pt-20 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div>
            <Link className="inline-flex items-center bg-[#071118] p-2 -ml-2 rounded-md mb-6" href="/" aria-label={`${SITE.name} home`} data-testid="link-footer-brand">
              <img className="h-10 w-auto" src={logoPath} width={2917} height={212} loading="lazy" alt={SITE.name} data-testid="img-footer-brand-logo" />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Residential snow removal and seasonal snow clearing contracts for homes in Grande Prairie, Sexsmith and the County of Grande Prairie, Alberta. Fully insured in Alberta.
            </p>
          </div>

          <div>
            <p className="text-sky-300 font-bold text-xs tracking-widest uppercase mb-6">Snow removal</p>
            <ul className="space-y-3 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-200 hover:text-sky-300 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sky-300 font-bold text-xs tracking-widest uppercase mb-6">Contact</p>
            <div className="space-y-4 text-sm text-slate-200">
              <a href={SITE.phoneHref} onClick={trackCallClick} className="block hover:text-sky-300 transition-colors" data-testid="link-footer-phone">{SITE.phoneDisplay}</a>
              <a href={`mailto:${SITE.email}`} className="block hover:text-sky-300 transition-colors break-all" data-testid="link-footer-email">{SITE.email}</a>
            </div>
          </div>

          <div>
            <p className="text-sky-300 font-bold text-xs tracking-widest uppercase mb-6">Service area</p>
            <ul className="space-y-3 text-sm text-slate-200">
              <li>Grande Prairie, AB</li>
              <li>Sexsmith, AB</li>
              <li>County of Grande Prairie No. 1</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800 text-xs text-slate-400 gap-4">
          <span data-testid="text-copyright">© {new Date().getFullYear()} {SITE.legalName}, operating as {SITE.name}</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-sky-300 transition-colors" data-testid="link-footer-privacy">Privacy Policy</Link>
            <a href="#top" className="hover:text-sky-300 transition-colors" data-testid="link-back-to-top">Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
