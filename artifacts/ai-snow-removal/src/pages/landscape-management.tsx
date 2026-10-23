import { Link } from 'wouter';
import { Trees } from 'lucide-react';
import { PAGES, PHOTOS } from '@/site';
import { ServicePage } from '@/components/service-page';

export default function LandscapeManagementPage() {
  return (
    <ServicePage
      page={PAGES['/landscape-management']}
      hero={{
        eyebrow: 'Keeping green · Grande Prairie & Sexsmith',
        accent: 'Landscape Management',
        title: 'Grande Prairie & Sexsmith',
        intro: <p>Lawn mowing, trimming, cleanups and hedge care so your yard looks good all summer without you giving up your weekends.</p>,
        points: ['Lawn care', 'Spring & fall cleanups', 'Hedge & shrub trimming'],
        fallback: 'photo-fallback-green',
        snow: false,
      }}
      quoteHref="/landscaping-quote"
      quoteLabel="Get a landscaping quote"
      included={{
        eyebrow: 'What is included',
        title: 'Lawn & yard care for your home',
        items: [
          'Lawn mowing and trimming',
          'Spring and fall yard cleanups',
          'Hedge and shrub trimming',
          'Keeping garden beds tidy through the season',
        ],
      }}
      photo={PHOTOS.landscapeManagement}
      photoFallback="photo-fallback-green"
      photoLabel="Lawn care in Grande Prairie"
      photoIcon={<Trees size={96} strokeWidth={1} />}
      details={{
        eyebrow: 'One company all year',
        title: 'Summer yard care, winter snow removal',
        bigWord: 'Turf Pros',
        body: (
          <>
            <p>
              Grande Prairie summers are short. We keep the lawn cut and the yard tidy so you get to enjoy it. When the season turns, the same local crew can take care of your{' '}
              <Link href="/snow-and-ice-management" className="font-semibold text-ice underline underline-offset-4">snow and ice management</Link>.
            </p>
            <p>
              Want something bigger than maintenance? See{' '}
              <Link href="/landscape-enhancements" className="font-semibold text-ice underline underline-offset-4">landscape enhancements</Link>.
            </p>
          </>
        ),
      }}
      faqTitle="Landscape management questions"
    />
  );
}
