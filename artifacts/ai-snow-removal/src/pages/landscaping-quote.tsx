import { PAGES } from '@/site';
import { QuotePage } from '@/components/quote-page';

export default function LandscapingQuotePage() {
  return (
    <QuotePage
      page={PAGES['/landscaping-quote']}
      service="landscaping"
      accent="Landscaping"
      title="Quote Request"
      fallback="photo-fallback-green"
      intro={<p>Lawn care, cleanups, garden beds or a bigger project. Tell us what you need and we'll call you back with a price.</p>}
      benefits={[
        'Lawn mowing, trimming and seasonal cleanups',
        'Hedge and shrub trimming',
        'Garden beds, mulch, sod and seeding',
        'One local company for summer and winter',
      ]}
    />
  );
}
