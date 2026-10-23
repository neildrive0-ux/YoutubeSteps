import { createContext, type ReactNode, useCallback, useContext, useRef, useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { Footer } from '@/components/site-footer';
import { QuoteSection } from '@/components/quote-section';
import { SignUpModal } from '@/components/signup-modal';
import { Seo } from '@/components/seo';
import type { PageMeta } from '@/site';

const SignUpContext = createContext<() => void>(() => {});

export function useSignUp() {
  return useContext(SignUpContext);
}

export function SiteLayout({
  page,
  children,
  quoteTitle,
  quoteIntro,
  showQuote = true,
}: {
  page: PageMeta;
  children: ReactNode;
  quoteTitle?: string;
  quoteIntro?: string;
  showQuote?: boolean;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalTriggerRef = useRef<HTMLElement | null>(null);

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
      <div className="min-h-screen bg-white selection:bg-sky-200 selection:text-sky-900">
        <div aria-hidden={modalOpen ? true : undefined} inert={modalOpen ? true : undefined} data-testid="site-background">
          <SiteHeader />
          <main>
            {children}
            {showQuote && <QuoteSection title={quoteTitle} intro={quoteIntro} />}
          </main>
          <Footer />
        </div>
        {modalOpen && <SignUpModal onClose={closeSignUp} />}
      </div>
    </SignUpContext.Provider>
  );
}
