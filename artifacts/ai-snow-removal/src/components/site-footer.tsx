import { Link } from 'wouter';
import logoPath from '@assets/ai-landscaping-logo-no-bg.png';

export function Footer() {
  return (
    <footer className="bg-[#071118] text-white pt-20 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <a className="inline-flex items-center bg-[#071118] p-2 -ml-2 rounded-md mb-6" href="#top" data-testid="link-footer-brand">
              <img
                className="h-10 w-auto"
                src={logoPath}
                alt="Ai Landscaping & SnowRemoval"
                data-testid="img-footer-brand-logo"
              />
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Calm, prepared, accountable snow removal for homes and properties across Grande Prairie and surrounding areas.
            </p>
          </div>

          <div>
            <h4 className="text-sky-400 font-bold text-xs tracking-widest uppercase mb-6">Contact</h4>
            <div className="space-y-4 text-sm text-slate-300">
              <a href="tel:+17809957459" className="block hover:text-sky-400 transition-colors" data-testid="link-footer-phone">780-995-7459</a>
              <a href="mailto:ailandscapinggp@gmail.com" className="block hover:text-sky-400 transition-colors" data-testid="link-footer-email">ailandscapinggp@gmail.com</a>
              <p className="text-slate-500 pt-2">Response within one business day</p>
            </div>
          </div>

          <div>
            <h4 className="text-sky-400 font-bold text-xs tracking-widest uppercase mb-6">Service Area</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>Grande Prairie &amp; surrounding</li>
              <li>Residential properties</li>
              <li>Commercial properties</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800 text-xs text-slate-500 gap-4">
          <span data-testid="text-copyright">© {new Date().getFullYear()} Ai Landscaping &amp; SnowRemoval</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-sky-400 transition-colors" data-testid="link-footer-privacy">Privacy Policy</Link>
            <a href="#top" className="hover:text-sky-400 transition-colors" data-testid="link-back-to-top">Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
