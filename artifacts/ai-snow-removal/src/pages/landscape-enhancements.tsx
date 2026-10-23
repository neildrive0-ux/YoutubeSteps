import { Link } from 'wouter';
import { Flower2 } from 'lucide-react';
import { PAGES, PHOTOS } from '@/site';
import { ServicePage } from '@/components/service-page';

export default function LandscapeEnhancementsPage() {
  return (
    <ServicePage
      page={PAGES['/landscape-enhancements']}
      hero={{
        eyebrow: 'Refresh your yard · Grande Prairie & Sexsmith',
        accent: 'Landscape',
        title: 'Enhancements',
        intro: <p>New garden beds, sod, planting and yard upgrades that make your property look finished.</p>,
        points: ['Garden beds & mulch', 'Sod & seeding', 'Planting & projects'],
        fallback: 'photo-fallback-bloom',
      }}
      quoteHref="/landscaping-quote"
      quoteLabel="Plan my project"
      included={{
        eyebrow: 'What we do',
        title: 'Upgrades that change how your yard looks',
        items: ['New garden beds and fresh mulch', 'Sod and seeding', 'Planting', 'Small landscape projects'],
      }}
      photo={PHOTOS.landscapeEnhancements}
      photoFallback="photo-fallback-bloom"
      photoLabel="Landscape enhancement project in Grande Prairie"
      photoIcon={<Flower2 size={96} strokeWidth={1} />}
      details={{
        eyebrow: 'Book early',
        title: 'Plan in winter, enjoy all summer',
        bigWord: 'Fresh Start',
        body: (
          <>
            <p>
              The easiest way to get on the spring schedule is to plan ahead. Send the landscaping quote form with a few details about your yard and what you have in mind, and we will follow up with ideas and a price.
            </p>
            <p>
              For regular mowing and cleanups, see{' '}
              <Link href="/landscape-management" className="font-semibold text-ice underline underline-offset-4">landscape management</Link>.
            </p>
          </>
        ),
      }}
      faqTitle="Landscape enhancement questions"
    />
  );
}
