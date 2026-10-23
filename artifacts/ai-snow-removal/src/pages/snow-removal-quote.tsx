import { PAGES, SITE } from '@/site';
import { QuotePage } from '@/components/quote-page';

export default function SnowRemovalQuotePage() {
  return (
    <QuotePage
      page={PAGES['/snow-removal-quote']}
      service="snow"
      accent="Snow & Ice"
      title="Removal Quote"
      fallback="hero-fallback"
      intro={<p>Tell us about your driveway and we'll call you back with a price. Seasonal plans from ${SITE.priceFrom}/month.</p>}
      benefits={[
        `Service from about ${SITE.triggerCm} cm of snowfall`,
        'Driveways, walkways, steps, sidewalks and back-alley pads',
        '4 or 5 month plans, paid upfront or monthly',
        `Standard driveways from $${SITE.priceFrom}/month, larger from $${SITE.priceLargeFrom}/month`,
      ]}
    />
  );
}
