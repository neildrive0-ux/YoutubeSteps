import { PAGES, SITE } from '@/site';
import { QuotePage } from '@/components/quote-page';

export default function SnowRemovalQuotePage() {
  return (
    <QuotePage
      page={PAGES['/snow-removal-quote']}
      formFirst
      service="snow"
      eyebrow="Residential seasonal snow contracts · Free quote"
      accent="Snow Removal Grande Prairie"
      title={`Plans From $${SITE.priceFrom}/Month`}
      fallback="hero-fallback"
      intro={<p>Never shovel again this winter. Your driveway plowed and your walkways and steps cleared after every snowfall. Priced by the size of your driveway.</p>}
      points={[
        `From $${SITE.priceFrom}/mo`,
        'Priced by driveway size',
        '4 & 5 month winter plans',
        'Pay monthly or upfront',
        'No hidden fees',
        'Grande Prairie, Sexsmith & County',
      ]}
      promo="Book by Nov 12: from $250 a month"
      note="Spots on our routes are limited. Book before the first big storm."
      benefits={[
        `Driveway plowed, walkways and steps cleared after every snowfall (from about ${SITE.triggerCm} cm)`,
        'Sidewalks and back-alley parking pads can be added',
        '4 or 5 month plans, paid monthly or upfront, no hidden fees',
        `Plans from $${SITE.priceFrom}/month, priced by the size of your driveway`,
      ]}
    />
  );
}
