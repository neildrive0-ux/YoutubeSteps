import { createContext, type ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { FileText, Phone } from 'lucide-react';
import { SiteHeader, useHeroCtaVisible } from '@/components/site-header';
import { Footer } from '@/components/site-footer';
import { SignUpModal } from '@/components/signup-modal';
import { CookieConsent } from '@/components/cookie-consent';
import { QuoteCtaBand } from '@/components/page-sections';
import { Seo } from '@/components/seo';
import { SITE, type PageMeta } from '@/site';
import { trackCallClick, trackQuoteClick } from '@/lib/tracking';

const SignUpContext = createContext<() => void>(() => {});

export function useSignUp() {
  return useContext(SignUpContext);
}

function useScrollReveal() {
  const [location] = useLocation();
  useEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'));
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('is-visible');
      else observer.observe(el);
    });
    root.classList.add('reveal-ready');
    return () => observer.disconnect();
  }, [location]);
}

const QUOTE_PATHS = ['/snow-removal-quote', '/landscaping-quote'];

function MobileCtaBar() {
  const [location] = useLocation();
  const onQuotePage = QUOTE_PATHS.includes(location);
  // Hidden while the page's own hero buttons are on screen, so the two sets never show at once.
  const hidden = useHeroCtaVisible();
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-white/10 bg-ink/95 p-2.5 backdrop-blur-md transition-all duration-300 lg:hidden ${hidden ? 'pointer-events-none translate-y-full opacity-0' : ''}`}
      aria-hidden={hidden ? true : undefined}
      inert={hidden ? true : undefined}
      data-testid="mobile-cta-bar"
    >
      <a href={SITE.phoneHref} onClick={trackCallClick} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 py-3.5 text-sm font-extrabold uppercase tracking-[0.06em] text-white">
        <Phone size={17} aria-hidden="true" /> Call Now
      </a>
      {onQuotePage ? (
        <a href="#quote-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-ice py-3.5 text-sm font-extrabold uppercase tracking-[0.06em] text-ink">
          <FileText size={17} aria-hidden="true" /> Fill the Form
        </a>
      ) : (
        <Link href="/snow-removal-quote" onClick={() => trackQuoteClick('mobile-bar')} className="inline-flex items-center justify-center gap-2 rounded-full bg-ice py-3.5 text-sm font-extrabold uppercase tracking-[0.06em] text-ink">
          <FileText size={17} aria-hidden="true" /> Get a Quote
        </Link>
      )}
    </div>
  );
}

export function SiteLayout({
  page,
  children,
  cta = true,
  ctaTitle,
}: {
  page: PageMeta;
  children: ReactNode;
  cta?: boolean;
  ctaTitle?: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalTriggerRef = useRef<HTMLElement | null>(null);
  useScrollReveal();

  const openSignUp = useCallback(() => {
    modalTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setModalOpen(true);
  }, []);

  const closeSignUp = useCallback(() => {
    setModalOpen(false);
    window.requestAnimationFrame(() => modalTriggerRef.current?.focus());
  }, []);

  return (
    <SignUpContext.Provider value={openSignUp}>
      <Seo page={page} />
      <div className="min-h-screen bg-base pb-[76px] selection:bg-ice/30 selection:text-ink lg:pb-0">
        <div aria-hidden={modalOpen ? true : undefined} inert={modalOpen ? true : undefined} data-testid="site-background">
          <SiteHeader />
          <main>
            {children}
            {cta && <QuoteCtaBand title={ctaTitle} />}
          </main>
          <Footer />
        </div>
        <MobileCtaBar />
        <CookieConsent />
        {modalOpen && <SignUpModal onClose={closeSignUp} />}
      </div>
    </SignUpContext.Provider>
  );
}
