import { PAGES, SITE } from '@/site';
import { QuotePage } from '@/components/quote-page';

export default function SnowRemovalQuotePage() {
  return (
    <QuotePage
      page={PAGES['/snow-removal-quote']}
      service="snow"
      eyebrow="Residential seasonal snow contracts · Free quote"
      accent="Snow Removal Grande Prairie"
      title={`Plans From $${SITE.priceFrom}/Month`}
      fallback="hero-fallback"
      intro={<p>Never shovel again this winter. Your driveway plowed and your walkways and steps cleared after every snowfall. Larger driveways from ${SITE.priceLargeFrom}/month.</p>}
      points={[
        `From $${SITE.priceFrom}/mo`,
        `Larger driveways from $${SITE.priceLargeFrom}/mo`,
        '4 & 5 month winter plans',
        'Pay monthly or upfront',
        'No hidden fees',
        'Grande Prairie, Sexsmith & County',
      ]}
      note="Spots on our routes are limited. Book before the first big storm."
      benefits={[
        `Driveway plowed, walkways and steps cleared after every snowfall (from about ${SITE.triggerCm} cm)`,
        'Sidewalks and back-alley parking pads can be added',
        '4 or 5 month plans, paid monthly or upfront, no hidden fees',
        `Standard driveways from $${SITE.priceFrom}/month, larger from $${SITE.priceLargeFrom}/month`,
      ]}
    />
  );
}
