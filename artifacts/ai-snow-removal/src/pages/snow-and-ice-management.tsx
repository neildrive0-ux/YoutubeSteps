import { Link } from 'wouter';
import { Truck } from 'lucide-react';
import { PAGES, PHOTOS, SITE } from '@/site';
import { ServicePage } from '@/components/service-page';

export default function SnowAndIceManagementPage() {
  return (
    <ServicePage
      page={PAGES['/snow-and-ice-management']}
      hero={{
        eyebrow: 'Safety focused · Grande Prairie & Sexsmith',
        accent: 'Snow & Ice Management',
        title: 'Grande Prairie & Sexsmith',
        intro: <p>Driveways plowed, walkways and steps cleared, and ice under control all winter. Seasonal plans from ${SITE.priceFrom}/month.</p>,
        points: [`Service from ~${SITE.triggerCm} cm`, '4 or 5 month plans', 'Fully insured in Alberta'],
      }}
      quoteHref="/snow-removal-quote"
      quoteLabel="Get a snow quote"
      included={{
        eyebrow: 'What is included',
        title: 'Residential snow & ice management',
        intro: <p>Pick the areas you want covered. Everything is written into one seasonal agreement.</p>,
        items: [
          'Driveway and parking area plowing',
          'Walkways and front steps',
          'Public sidewalk along your property',
          'Back-alley parking pads',
          'Salting and ice control where it is needed',
          `Service triggered at about ${SITE.triggerCm} cm of snowfall, or as required`,
        ],
      }}
      photo={PHOTOS.snow}
      photoFallback="photo-fallback-snow"
      photoLabel="Snow plowing a driveway in Grande Prairie"
      photoIcon={<Truck size={96} strokeWidth={1} />}
      details={{
        eyebrow: 'Why a seasonal plan',
        title: 'Clear before it packs down',
        bigWord: 'Snow & Ice',
        body: (
          <>
            <p>
              Light snowfalls that sit on a driveway get driven over, pack down and turn into ruts and ice that last until spring. Because our agreement triggers service at about {SITE.triggerCm} cm, your driveway and walkways get cleared before that happens.
            </p>
            <p>
              You pay one set price for the season, so a heavy Grande Prairie winter does not mean a bigger bill. See{' '}
              <Link href="/snow-removal-prices" className="font-semibold text-ice underline underline-offset-4">snow removal prices</Link> or read{' '}
              <Link href="/seasonal-snow-removal-contracts" className="font-semibold text-ice underline underline-offset-4">how our seasonal contracts work</Link>.
            </p>
          </>
        ),
      }}
      faqTitle="Snow & ice questions"
    />
  );
}
