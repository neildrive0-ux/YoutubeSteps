import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import logoPath from '@assets/ai-landscaping-logo-no-bg.png';
import { SITE } from '@/site';
import { trackCallClick } from '@/lib/tracking';

const navigationItems = [
  { href: '/seasonal-snow-removal-contracts', label: 'Seasonal Contracts', testId: 'link-contracts' },
  { href: '/snow-removal-prices', label: 'Prices', testId: 'link-prices' },
  { href: '/driveway-snow-removal', label: 'Driveways', testId: 'link-driveways' },
  { href: '/snow-removal-for-seniors', label: 'Seniors', testId: 'link-seniors' },
] as const;

export function scrollToQuote() {
  document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  useEffect(() => setMenuOpen(false), [location]);

  const solid = scrolled || menuOpen;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${solid ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-5'}`} id="top">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <Link className="inline-flex items-center" href="/" aria-label={`${SITE.name} home`} data-testid="link-brand">
            <span className="inline-flex items-center bg-[#071118] px-3 py-2.5 rounded-md shadow-md">
              <img
                className="h-8 w-auto"
                src={logoPath}
                width={2917}
                height={212}
                alt={SITE.name}
                fetchPriority="high"
                data-testid="img-brand-logo"
              />
            </span>
          </Link>

          <button
            className={`lg:hidden p-2 rounded-md ${solid ? 'text-slate-900' : 'text-white'}`}
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav id="main-navigation" className={`
            absolute lg:relative top-full left-0 right-0
            lg:top-auto lg:flex lg:items-center lg:gap-7
            bg-white lg:bg-transparent border-b lg:border-none border-slate-200
            shadow-xl lg:shadow-none p-6 lg:p-0
            transition-all duration-300 origin-top
            ${menuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 lg:opacity-100 lg:scale-y-100 hidden lg:flex'}
          `} aria-label="Main navigation">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-7 mb-6 lg:mb-0">
              {navigationItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link
                    key={item.href}
                    className={`relative whitespace-nowrap text-sm font-semibold transition-colors after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:bg-sky-500 after:transition-all ${
                      isActive
                        ? 'text-sky-500 after:w-full'
                        : `${solid ? 'text-slate-700' : 'text-slate-200 hover:text-white'} hover:text-sky-500 after:w-0 hover:after:w-full`
                    }`}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    data-testid={item.testId}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col lg:flex-row gap-3">
              <a
                href={SITE.phoneHref}
                onClick={trackCallClick}
                className={`inline-flex lg:hidden xl:inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold px-4 py-3 rounded-md transition-all duration-200 ${solid ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
                data-testid="link-header-phone"
              >
                <Phone size={16} /> {SITE.phoneDisplay}
              </a>
              <button
                className={`w-full lg:w-auto inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold px-6 py-3 rounded-md transition-all duration-200 ${
                  solid ? 'bg-[#071118] hover:bg-slate-800 text-white' : 'bg-white hover:bg-sky-50 text-[#071118]'
                }`}
                type="button"
                onClick={() => { setMenuOpen(false); scrollToQuote(); }}
                data-testid="button-header-quote"
              >
                Get a Quote <ArrowRight size={16} />
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
