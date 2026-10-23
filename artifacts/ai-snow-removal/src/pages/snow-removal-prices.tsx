import { Link } from 'wouter';
import { ArrowRight, Check } from 'lucide-react';
import { PAGES, SITE } from '@/site';
import { SiteLayout } from '@/components/site-layout';
import { Breadcrumbs, ContentSection, FaqSection, PageHero, RelatedPages } from '@/components/page-sections';
import { trackQuoteClick } from '@/lib/tracking';

const factors = [
  { title: 'Driveway size', text: 'A single-car driveway takes less time than a long or double-wide driveway.' },
  { title: 'Extra areas', text: 'Walkways, steps, the public sidewalk and back-alley parking pads are added to your plan.' },
  { title: 'Hand clearing', text: 'Steps and tight spots that need shovelling take more time than open driveway.' },
  { title: 'Plan length', text: 'A 5 month plan covers one more month of winter than a 4 month plan.' },
];

export default function SnowRemovalPricesPage() {
  const page = PAGES['/snow-removal-prices'];
  return (
    <SiteLayout page={page}>
      <PageHero
        eyebrow="Snow removal prices · 2026–27 season"
        accent="Snow Removal Prices"
        title="in Grande Prairie"
        intro={<p>Residential seasonal snow removal starts from ${SITE.priceFrom} a month, and your exact price depends on the size of your driveway. Here is what's included and what changes your price.</p>}
        points={['Free quotes', 'One price all season', 'Pay upfront or monthly', 'No hidden fees']}
      />
      {page.breadcrumb && <Breadcrumbs label={page.breadcrumb} />}

      <ContentSection eyebrow="Starting prices" title="Seasonal Snow Removal Pricing">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {[
            { name: 'Standard driveway', price: `From $${SITE.priceFrom}/month`, items: ['Driveway plowed all season', 'Add walkway, steps or sidewalk', '4 or 5 month plan'] },
            { name: 'Larger driveway or lot', price: 'Priced by size', items: ['Long, wide or double driveways', 'Parking areas and back-alley pads', '4 or 5 month plan'] },
          ].map((tier) => (
            <article key={tier.name} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="heading-xl text-3xl text-slate-900">{tier.name}</h3>
              <p className="mt-2 mb-6 heading-xl text-5xl text-ice-deep">{tier.price}</p>
              <ul className="space-y-3">
                {tier.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <Check size={18} className="text-ice-deep shrink-0 mt-1" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm text-slate-600">
          Prices are starting points before tax. Your exact monthly price is set in your written agreement after a free quote.
        </p>
      </ContentSection>

      <ContentSection eyebrow="How we price" title="What Changes the Cost of Snow Removal" tone="snow">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {factors.map((factor) => (
            <article key={factor.title} className="rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="heading-xl text-2xl text-slate-900 mb-2">{factor.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{factor.text}</p>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection eyebrow="Seasonal vs per visit" title="Seasonal Contract or Pay Per Visit?">
        <div className="max-w-3xl space-y-5 text-slate-600 text-lg leading-relaxed">
          <p>
            Paying per visit can look cheaper in October, but every snowfall adds to the bill and you have to book each time. With a seasonal contract your price is set for the whole winter and service starts automatically at about {SITE.triggerCm} cm of snow.
          </p>
          <p>
            Want the details first?{' '}
            <Link href="/seasonal-snow-removal-contracts" className="font-semibold text-ice-deep underline underline-offset-4">See how our seasonal contracts work</Link>.
          </p>
          <Link href="/snow-removal-quote" onClick={() => trackQuoteClick('prices-inline')} className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-ice-deep">
            Get your exact price <ArrowRight size={18} />
          </Link>
        </div>
      </ContentSection>

      <FaqSection faqs={page.faqs ?? []} title="Snow Removal Price Questions" />
      <RelatedPages current={page.path} />
    </SiteLayout>
  );
}
