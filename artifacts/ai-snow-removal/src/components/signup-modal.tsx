import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CalendarRange, X } from 'lucide-react';
import { SITE } from '@/site';
import { scrollToQuote } from '@/components/site-header';

export const CONTRACT_PDF = '/snow-removal-service-agreement.pdf';

export function SignUpModal({ onClose }: { onClose: () => void }) {
  const [contractOpen, setContractOpen] = useState(false);
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
      <div ref={dialogRef} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-fade-in-up" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" tabIndex={-1}>
        <button ref={closeButtonRef} className="absolute top-6 right-6 text-slate-500 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-colors" type="button" aria-label="Close sign up dialog" onClick={onClose} data-testid="button-close-signup">
          <X size={20} />
        </button>

        <div className="p-8 sm:p-12">
          <p className="text-sky-700 font-bold text-xs tracking-widest uppercase mb-4">Winter service</p>
          <h2 id="modal-title" className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4 leading-[1.1]">
            Let's get your driveway on the route.
          </h2>
          <p id="modal-description" className="text-slate-600 mb-8 leading-relaxed max-w-lg">
            Read the seasonal snow removal agreement below, then send us your property details. We'll confirm your price and availability and follow up directly. No booking or payment is taken here.
          </p>

          <button className="flex items-center justify-between w-full p-4 sm:p-5 bg-sky-50 hover:bg-sky-100 border border-sky-100 hover:border-sky-200 rounded-xl text-sky-800 font-semibold text-sm transition-all duration-200 mb-6 group" type="button" onClick={() => setContractOpen((open) => !open)} aria-expanded={contractOpen} aria-controls="contract-preview" data-testid="button-toggle-contract">
            <span className="flex items-center gap-3">
              <CalendarRange size={20} className="text-sky-700" />
              {contractOpen ? 'Hide the contract' : 'View the contract'}
            </span>
            <ArrowRight size={18} className={`text-sky-700 transition-transform duration-300 ${contractOpen ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
          </button>

          {contractOpen && (
            <div id="contract-preview" className="mb-8 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 animate-fade-in-up" data-testid="contract-preview">
              <iframe src={`${CONTRACT_PDF}#view=FitH`} title={`${SITE.name} seasonal snow removal agreement`} className="w-full h-[350px] sm:h-[450px] border-0 bg-white" />
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                <a className="inline-flex items-center gap-2 text-sky-700 hover:text-sky-900 font-semibold text-sm transition-colors" href={CONTRACT_PDF} target="_blank" rel="noreferrer" data-testid="link-download-contract">
                  Open in a new tab <ArrowRight size={14} />
                </a>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100 mt-2">
            <button className="flex-1 inline-flex items-center justify-center gap-2 bg-[#071118] hover:bg-slate-800 text-white font-bold px-6 py-4 rounded-md transition-colors" type="button" onClick={() => { onClose(); scrollToQuote(); }} data-testid="button-modal-quote">
              Request a quote <ArrowRight size={16} />
            </button>
            <button className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold px-6 py-4 rounded-md transition-colors" type="button" onClick={onClose} data-testid="button-modal-close">
              Not right now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
