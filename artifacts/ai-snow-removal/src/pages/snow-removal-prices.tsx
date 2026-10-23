import { Link } from 'wouter';
import { ArrowRight, Check } from 'lucide-react';
import { PAGES, SITE } from '@/site';
import { SiteLayout } from '@/components/site-layout';
import { ContentSection, FaqSection, PageHero, RelatedPages } from '@/components/page-sections';

const factors = [
  { title: 'Driveway size', text: 'A single-car driveway takes less time than a long or double-wide driveway.' },
  { title: 'Extra areas', text: 'Walkways, steps, the public sidewalk and back-alley parking pads are added to your plan.' },
  { title: 'Hand clearing', text: 'Steps and tight spots that need shovelling take more time than open driveway.' },
  { title: 'Plan length', text: 'A 5 month plan covers one more month of winter than a 4 month plan.' },
];

export default function SnowRemovalPricesPage() {
  const page = PAGES['/snow-removal-prices'];
  return (
    <SiteLayout page={page} quoteTitle="Get Your Exact Price" quoteIntro="Send your address and the areas you want cleared, and we'll call you back with your price. Quotes are free.">
      <PageHero
        eyebrow="Snow removal prices · 2026–27 season"
        title="Snow Removal Prices in Grande Prairie"
        intro={<p>Residential seasonal snow removal starts from ${SITE.priceFrom} a month. Larger driveways start from ${SITE.priceLargeFrom} a month. Here is what's included and what changes your price.</p>}
        points={['Free quotes', 'One price all season', 'Pay upfront or monthly', 'No hidden fees']}
      />

      <ContentSection eyebrow="Starting prices" title="Seasonal Snow Removal Pricing">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {[
            { name: 'Standard driveway', price: `From $${SITE.priceFrom}/month`, items: ['Driveway plowed all season', 'Add walkway, steps or sidewalk', '4 or 5 month plan'] },
            { name: 'Larger driveway or lot', price: `From $${SITE.priceLargeFrom}/month`, items: ['Long, wide or double driveways', 'Parking areas and back-alley pads', '4 or 5 month plan'] },
          ].map((tier) => (
            <article key={tier.name} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="font-display text-2xl font-semibold text-slate-900">{tier.name}</h3>
              <p className="mt-2 mb-6 font-display text-3xl font-semibold text-sky-700">{tier.price}</p>
              <ul className="space-y-3">
                {tier.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <Check size={18} className="text-sky-600 shrink-0 mt-1" aria-hidden="true" />
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

      <ContentSection eyebrow="How we price" title="What Changes the Cost of Snow Removal" tone="slate">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {factors.map((factor) => (
            <article key={factor.title} className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="font-display text-xl font-semibold text-slate-900 mb-2">{factor.title}</h3>
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
            <Link href="/seasonal-snow-removal-contracts" className="font-semibold text-sky-700 underline underline-offset-4">See how our seasonal contracts work</Link>.
          </p>
          <a href="#quote" className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-sky-700">
            Get your exact price <ArrowRight size={18} />
          </a>
        </div>
      </ContentSection>

      <FaqSection faqs={page.faqs ?? []} title="Snow Removal Price Questions" />
      <RelatedPages current={page.path} />
    </SiteLayout>
  );
}
