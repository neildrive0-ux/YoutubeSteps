import { HeartHandshake, Phone, ShieldCheck, Snowflake } from 'lucide-react';
import { PAGES, SITE } from '@/site';
import { SiteLayout } from '@/components/site-layout';
import { Breadcrumbs, ContentSection, FaqSection, PageHero, RelatedPages } from '@/components/page-sections';
import { trackCallClick } from '@/lib/tracking';

const reasons = [
  { title: 'No shovelling, no heavy lifting', text: 'Shovelling heavy snow is hard work. Let us do it so you don\'t have to.', icon: Snowflake },
  { title: 'Steps and walkways included', text: 'The path to the door and the front steps are where slips happen. Add them to the plan.', icon: ShieldCheck },
  { title: 'Nobody has to remember to call', text: `Service starts at about ${SITE.triggerCm} cm of snow, all season long.`, icon: Phone },
  { title: 'Family can set it up', text: 'Sons, daughters and caregivers can book and manage the plan for a parent.', icon: HeartHandshake },
];

export default function SnowRemovalForSeniorsPage() {
  const page = PAGES['/snow-removal-for-seniors'];
  return (
    <SiteLayout page={page}>
      <PageHero
        eyebrow="Snow removal for seniors · Grande Prairie & Sexsmith"
        accent="Snow Removal for Seniors"
        title="in Grande Prairie"
        intro={<p>Keep driveways, walkways and steps clear all winter without picking up a shovel. Seasonal plans from ${SITE.priceFrom}/month for homes in Grande Prairie and Sexsmith, and family members can book for a parent.</p>}
        points={['Driveway, walkway & steps', `Starts at about ${SITE.triggerCm} cm of snow`, 'Family can book for a parent', 'Talk to a real person']}
      />
      {page.breadcrumb && <Breadcrumbs label={page.breadcrumb} />}

      <ContentSection eyebrow="Peace of mind all winter" title="Dependable Snow Clearing for Older Homeowners">
        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl">
          {reasons.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-3xl border border-white/10 bg-base-2 p-7">
              <Icon size={24} className="text-ice mb-4" aria-hidden="true" />
              <h3 className="heading-xl text-2xl text-white mb-2">{title}</h3>
              <p className="text-slate-400 leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection eyebrow="Booking for a parent" title="Setting Up Snow Removal for Mom or Dad" tone="snow">
        <div className="max-w-3xl space-y-5 text-slate-300 text-lg leading-relaxed">
          <p>
            If you live away from Grande Prairie or Sexsmith, or just can't get over after every snowfall, you can set up a seasonal plan for your parent's home. Put their address on the form and your phone number, and we'll go over the details with you.
          </p>
          <p>
            Prefer to talk it through?{' '}
            <a href={SITE.phoneHref} onClick={trackCallClick} className="font-semibold text-ice underline underline-offset-4">Call {SITE.phoneDisplay}</a>.
          </p>
        </div>
      </ContentSection>

      <FaqSection faqs={page.faqs ?? []} title="Questions From Seniors and Families" />
      <RelatedPages current={page.path} />
    </SiteLayout>
  );
}
