import { PAGES } from '@/site';
import { QuotePage } from '@/components/quote-page';

export default function LandscapingQuotePage() {
  return (
    <QuotePage
      page={PAGES['/landscaping-quote']}
      service="landscaping"
      accent="Landscaping Quote"
      title="Grande Prairie & Sexsmith"
      fallback="photo-fallback-green"
      intro={<p>Lawn care, cleanups, garden beds or a bigger project. Tell us what you need and we'll call you back with a price.</p>}
      points={['Lawn mowing & cleanups', 'Hedge & shrub trimming', 'Garden beds, sod & seeding', 'Free quote']}
      benefits={[
        'Lawn mowing, trimming and seasonal cleanups',
        'Hedge and shrub trimming',
        'Garden beds, mulch, sod and seeding',
        'One local company for summer and winter',
      ]}
    />
  );
}
