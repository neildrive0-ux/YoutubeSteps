import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowRight, CalendarRange, X } from 'lucide-react';
import { SITE } from '@/site';

export const CONTRACT_PDF = '/snow-removal-service-agreement.pdf';

export function SignUpModal({ onClose }: { onClose: () => void }) {
  // The contract starts open on larger screens; phones get the toggle and an open-in-new-tab link instead of a cramped PDF frame.
  const [contractOpen, setContractOpen] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches);
  const [, setLocation] = useLocation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), iframe, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getAttribute('aria-hidden') !== 'true');

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      } else if (!dialogRef.current.contains(document.activeElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fade-in" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} className="bg-raise rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-fade-in-up" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" tabIndex={-1}>
        <button ref={closeButtonRef} className="absolute top-6 right-6 text-slate-400 hover:text-slate-300 hover:bg-white/10 p-2 rounded-full transition-colors" type="button" aria-label="Close sign up dialog" onClick={onClose} data-testid="button-close-signup">
          <X size={20} />
        </button>

        <div className="p-8 sm:p-12">
          <p className="text-ice font-bold text-xs tracking-widest uppercase mb-4">Winter service</p>
          <h2 id="modal-title" className="heading-xl text-4xl sm:text-5xl text-white mb-4 leading-[1.1]">
            Let's get your driveway on the route.
          </h2>
          <p id="modal-description" className="text-slate-400 mb-8 leading-relaxed max-w-lg">
            Read the seasonal snow removal agreement below, then send us your property details. We'll confirm your price and availability and follow up directly. No booking or payment is taken here.
          </p>

          <button className="flex items-center justify-between w-full p-4 sm:p-5 bg-ice/10 hover:bg-ice/20 border border-ice/30 hover:border-ice/50 rounded-xl text-white font-semibold text-sm transition-all duration-200 mb-6 group" type="button" onClick={() => setContractOpen((open) => !open)} aria-expanded={contractOpen} aria-controls="contract-preview" data-testid="button-toggle-contract">
            <span className="flex items-center gap-3">
              <CalendarRange size={20} className="text-ice" />
              {contractOpen ? 'Hide the contract' : 'View the contract'}
            </span>
            <ArrowRight size={18} className={`text-ice transition-transform duration-300 ${contractOpen ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
          </button>

          {contractOpen && (
            <div id="contract-preview" className="mb-8 rounded-xl overflow-hidden border border-white/10 bg-base-2 animate-fade-in-up" data-testid="contract-preview">
              <iframe src={`${CONTRACT_PDF}#view=FitH`} title={`${SITE.name} seasonal snow removal agreement`} className="w-full h-[350px] sm:h-[450px] border-0 bg-raise" />
              <div className="p-4 bg-base-2 border-t border-white/10 flex justify-end">
                <a className="inline-flex items-center gap-2 text-ice hover:text-white font-semibold text-sm transition-colors" href={CONTRACT_PDF} target="_blank" rel="noreferrer" data-testid="link-download-contract">
                  Open in a new tab <ArrowRight size={14} />
                </a>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10 mt-2">
            <button className="flex-1 inline-flex items-center justify-center gap-2 bg-ice hover:bg-ice-soft text-ink font-bold px-6 py-4 rounded-full transition-colors" type="button" onClick={() => { onClose(); setLocation('/snow-removal-quote'); }} data-testid="button-modal-quote">
              Request a quote <ArrowRight size={16} />
            </button>
            <button className="flex-1 inline-flex items-center justify-center gap-2 bg-raise hover:bg-white/5 border border-white/10 text-slate-300 font-bold px-6 py-4 rounded-full transition-colors" type="button" onClick={onClose} data-testid="button-modal-close">
              Not right now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
