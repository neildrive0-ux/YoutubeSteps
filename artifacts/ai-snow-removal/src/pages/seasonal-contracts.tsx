import { ArrowRight, CalendarRange, Check, FileText } from 'lucide-react';
import { PAGES, SITE } from '@/site';
import { SiteLayout, useSignUp } from '@/components/site-layout';
import { ContentSection, FaqSection, PageHero, RelatedPages } from '@/components/page-sections';
import { CONTRACT_PDF } from '@/components/signup-modal';

const included = [
  'Plowing of your driveway and parking areas',
  'Any zones you add: walkways, steps, sidewalk, back-alley parking pad',
  `Service triggered at about ${SITE.triggerCm} cm of snowfall, or as required`,
  'Coverage for the full length of your plan',
  'Fully insured in Alberta',
  'Pay the season in full or monthly',
];

function ContractDetails() {
  const openSignUp = useSignUp();
  return (
    <>
      <ContentSection eyebrow="What you get" title="What a Seasonal Snow Removal Contract Includes">
        <div className="grid lg:grid-cols-2 gap-12">
          <ul className="space-y-4">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-700 text-lg">
                <Check size={22} className="text-sky-600 shrink-0 mt-1" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="font-display text-2xl font-semibold text-slate-900 mb-4">Why a contract instead of calling per storm?</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              With a seasonal contract you are on our route from the start of your plan. You don't have to watch the forecast, call after a snowfall or wait while one-time jobs are booked in.
            </p>
            <p className="text-slate-600 leading-relaxed">
              You also know your cost for the whole winter up front, whether Grande Prairie gets a mild season or a heavy one.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Plan length" title="4 Month or 5 Month Snow Removal Plans" tone="sky">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {[
            { name: '4 month plan', text: 'Covers the core of the Grande Prairie winter. A good fit if you want the heaviest months handled.' },
            { name: '5 month plan', text: 'Adds an extra month of coverage for early or late snowfalls at either end of the season.' },
          ].map((plan) => (
            <article key={plan.name} className="rounded-2xl bg-white border border-sky-100 p-8 shadow-sm">
              <CalendarRange size={24} className="text-sky-700 mb-4" aria-hidden="true" />
              <h3 className="font-display text-2xl font-semibold text-slate-900 mb-3">{plan.name}</h3>
              <p className="text-slate-600 leading-relaxed">{plan.text}</p>
              <p className="mt-6 text-sm font-semibold text-slate-800">From ${SITE.priceFrom}/month for standard driveways · from ${SITE.priceLargeFrom}/month for larger driveways</p>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection eyebrow="No fine print surprises" title="Read the Snow Removal Agreement Before You Sign">
        <div className="max-w-3xl">
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            Our seasonal service agreement is short and written in plain language. It covers the term you choose, the services, the snowfall trigger, payment, insurance and what we ask of you as a customer, like keeping the areas accessible and marking hazards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={CONTRACT_PDF} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#071118] hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-md">
              <FileText size={18} /> Open the contract (PDF)
            </a>
            <button type="button" onClick={openSignUp} className="inline-flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold px-8 py-4 rounded-md">
              Sign up for winter service <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </ContentSection>
    </>
  );
}

export default function SeasonalContractsPage() {
  const page = PAGES['/seasonal-snow-removal-contracts'];
  return (
    <SiteLayout page={page} quoteTitle="Get Your Seasonal Contract Quote">
      <PageHero
        eyebrow="Seasonal contracts · Grande Prairie & Sexsmith"
        title="Seasonal Snow Removal Contracts in Grande Prairie"
        intro={<p>One agreement covers your driveway and walkways all winter. Choose 4 or 5 months, pay upfront or monthly, and we come out from about {SITE.triggerCm} cm of snow.</p>}
        points={[`From $${SITE.priceFrom}/month`, '4 or 5 month plans', 'Pay upfront or monthly', 'Read the contract online']}
      />
      <ContractDetails />
      <FaqSection faqs={page.faqs ?? []} title="Seasonal Contract Questions" />
      <RelatedPages current={page.path} />
    </SiteLayout>
  );
}
