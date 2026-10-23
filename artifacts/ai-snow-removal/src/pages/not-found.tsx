import { Link } from 'wouter';
import { ArrowRight, Phone } from 'lucide-react';
import { NOT_FOUND, SITE } from '@/site';
import { SiteLayout } from '@/components/site-layout';
import { trackCallClick } from '@/lib/tracking';

export default function NotFound() {
  return (
    <SiteLayout page={NOT_FOUND} showQuote={false}>
      <section className="bg-[#071118] text-white pt-40 pb-24 lg:pt-48 lg:pb-32" aria-labelledby="page-title">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-sky-300 font-bold text-xs tracking-widest uppercase mb-6">Error 404</p>
          <h1 id="page-title" className="font-display text-4xl lg:text-6xl font-semibold tracking-tight mb-6">
            This page doesn't exist.
          </h1>
          <p className="text-slate-200 text-lg leading-relaxed mb-10">
            The link may be old or mistyped. You can find our snow removal services for Grande Prairie and Sexsmith on the home page, or call us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-[#071118] font-bold px-8 py-4 rounded-md">
              Go to the home page <ArrowRight size={18} />
            </Link>
            <a href={SITE.phoneHref} onClick={trackCallClick} className="inline-flex items-center justify-center gap-2 border border-slate-500 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-md">
              <Phone size={18} /> Call {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
