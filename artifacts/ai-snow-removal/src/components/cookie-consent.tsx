import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Cookie } from 'lucide-react';
import { readConsent, setConsent } from '@/lib/tracking';

export const OPEN_COOKIE_SETTINGS = 'open-cookie-settings';

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS));
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (readConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: 'granted' | 'denied') => {
    setConsent(choice);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-[84px] z-[70] rounded-2xl border border-white/10 bg-night/95 p-4 text-white sm:p-5 shadow-2xl backdrop-blur-md sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-md lg:bottom-5 animate-fade-in-up"
      data-testid="cookie-consent"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 hidden h-9 w-9 shrink-0 sm:inline-flex items-center justify-center rounded-full bg-ice/15 text-ice">
          <Cookie size={18} aria-hidden="true" />
        </span>
        <div>
          <p className="font-display text-base font-bold uppercase tracking-wide sm:text-lg">We use cookies</p>
          <p className="mt-1 text-[13px] leading-snug text-slate-300 sm:text-sm sm:leading-relaxed">
            We use cookies from Google and Meta to see which ads bring in quote requests and to show you relevant ads. You can accept or decline.{' '}
            <Link href="/privacy-policy" className="font-semibold text-ice underline underline-offset-2">Privacy &amp; cookie policy</Link>
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4">
        <button type="button" onClick={() => choose('denied')} className="rounded-full border border-white/25 px-4 py-2.5 text-sm font-extrabold sm:py-3 uppercase tracking-[0.06em] text-white hover:border-white/50" data-testid="button-cookies-decline">
          Decline
        </button>
        <button type="button" onClick={() => choose('granted')} className="rounded-full bg-ice px-4 py-2.5 text-sm font-extrabold sm:py-3 uppercase tracking-[0.06em] text-ink hover:bg-ice-soft" data-testid="button-cookies-accept">
          Accept
        </button>
      </div>
    </div>
  );
}
