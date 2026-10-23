import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import { SITE } from '@/site';
import { trackCallClick, trackQuoteClick } from '@/lib/tracking';

export const LOGO_SRC = '/logo-192.webp';

const navigationItems = [
  { href: '/snow-and-ice-management', label: 'Snow & Ice' },
  { href: '/landscape-management', label: 'Landscaping' },
  { href: '/landscape-enhancements', label: 'Enhancements' },
  { href: '/snow-removal-prices', label: 'Pricing' },
  { href: '/seasonal-snow-removal-contracts', label: 'Contracts' },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <header
      id="top"
      // Phones and tablets get a slim solid bar; large screens keep the floating logo over the hero until you scroll.
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-md transition-all duration-500 ${scrolled ? 'lg:shadow-[0_10px_30px_rgba(0,0,0,0.35)]' : 'lg:border-transparent lg:bg-transparent lg:bg-gradient-to-b lg:from-ink/70 lg:to-transparent lg:backdrop-blur-none'}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label={`${SITE.name} home`} className="relative z-10 shrink-0" data-testid="link-brand">
          <img
            src={LOGO_SRC}
            width={192}
            height={192}
            alt={`${SITE.name} logo, ${SITE.phoneDisplay}`}
            fetchPriority="high"
            className={`my-1.5 h-11 w-11 drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] transition-all duration-500 ${scrolled ? 'lg:my-2 lg:h-[72px] lg:w-[72px]' : 'lg:mt-4 lg:mb-[-40px] lg:h-[112px] lg:w-[112px]'}`}
            data-testid="img-brand-logo"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className={`hidden lg:flex items-center gap-1 rounded-full border border-white/10 p-1.5 transition-all duration-500 ${scrolled ? 'bg-transparent border-transparent' : 'mt-1 bg-night/85 backdrop-blur-md shadow-xl'}`}
        >
          {navigationItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`whitespace-nowrap rounded-full px-3.5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors ${isActive ? 'bg-white/10 text-ice' : 'text-slate-200 hover:text-white hover:bg-white/5'}`}
              >
                {item.label}
              </Link>
            );
          })}
          <a href="/#faq" className="whitespace-nowrap rounded-full px-3.5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-slate-200 hover:text-white hover:bg-white/5">
            FAQ
          </a>
          <a
            href={SITE.phoneHref}
            onClick={trackCallClick}
            className="ml-1 hidden xl:inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-ice/40 px-4 py-2.5 text-sm font-bold text-white hover:border-ice hover:text-ice transition-colors"
            data-testid="link-header-phone"
          >
            <Phone size={15} className="text-ice" /> {SITE.phoneDisplay}
          </a>
          <Link
            href="/snow-removal-quote"
            onClick={() => trackQuoteClick('header')}
            className="ml-1 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-ice px-5 py-2.5 text-sm font-extrabold uppercase tracking-[0.06em] text-ink hover:bg-ice-soft transition-colors"
            data-testid="button-header-quote"
          >
            Get a Quote <ArrowRight size={16} />
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={SITE.phoneHref}
            onClick={trackCallClick}
            aria-label={`Call ${SITE.phoneDisplay}`}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-ice px-4 text-sm font-extrabold text-ink"
            data-testid="link-header-phone-mobile"
          >
            <Phone size={16} /> <span className="hidden sm:inline">{SITE.phoneDisplay}</span><span className="sm:hidden">Call</span>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-night/80 text-white"
            data-testid="button-mobile-menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] flex flex-col bg-ink/98 px-6 pb-8 pt-6 text-white lg:hidden animate-fade-in">
          <div className="flex items-center justify-between">
            <img src={LOGO_SRC} width={192} height={192} alt="" className="h-16 w-16" />
            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15">
              <X size={22} />
            </button>
          </div>
          <nav aria-label="Mobile navigation" className="mt-10 flex flex-col">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href} className="heading-xl border-b border-white/10 py-4 text-4xl text-white hover:text-ice">
                {item.label}
              </Link>
            ))}
            <a href="/#faq" onClick={() => setMenuOpen(false)} className="heading-xl border-b border-white/10 py-4 text-4xl text-white hover:text-ice">
              FAQ
            </a>
          </nav>
          <div className="mt-auto grid gap-3 pt-8">
            <Link href="/snow-removal-quote" onClick={() => trackQuoteClick('mobile-menu-snow')} className="inline-flex items-center justify-center gap-2 rounded-full bg-ice px-6 py-4 font-extrabold uppercase tracking-[0.06em] text-ink">
              Snow Removal Quote <ArrowRight size={18} />
            </Link>
            <Link href="/landscaping-quote" onClick={() => trackQuoteClick('mobile-menu-landscaping')} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-4 font-extrabold uppercase tracking-[0.06em] text-white">
              Landscaping Quote <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
