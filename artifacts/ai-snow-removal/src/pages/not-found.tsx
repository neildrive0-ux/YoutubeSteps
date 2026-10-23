import { NOT_FOUND } from '@/site';
import { SiteLayout } from '@/components/site-layout';
import { CallLink, PillLink, SnowDrift } from '@/components/page-sections';

export default function NotFound() {
  return (
    <SiteLayout page={NOT_FOUND} cta={false}>
      <section className="hero-fallback relative overflow-hidden text-white" aria-labelledby="page-title">
        <div className="snowfall" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-4 pb-32 pt-40 text-center sm:px-6 md:pt-48">
          <p className="eyebrow text-ice-soft">Error 404</p>
          <h1 id="page-title" className="heading-xl mt-5 text-5xl md:text-7xl">
            <span className="block text-ice">Lost in the snow?</span>
            <span className="block">This page doesn't exist.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-200">
            The link may be old or mistyped. Head to the home page for snow removal and landscaping in Grande Prairie and Sexsmith, or call us.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <PillLink href="/">Go to the home page</PillLink>
            <CallLink />
          </div>
        </div>
        <SnowDrift />
      </section>
    </SiteLayout>
  );
}
