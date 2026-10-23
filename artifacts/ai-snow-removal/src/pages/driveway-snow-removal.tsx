import { Footprints, Home as HomeIcon, ParkingSquare, Snowflake } from 'lucide-react';
import { PAGES, SITE } from '@/site';
import { SiteLayout } from '@/components/site-layout';
import { Breadcrumbs, ContentSection, FaqSection, PageHero, RelatedPages } from '@/components/page-sections';

const areas = [
  { title: 'Driveways', text: 'Single, double and long driveways plowed so you can get in and out.', icon: HomeIcon },
  { title: 'Walkways & steps', text: 'The path to your door and the steps cleared so nobody slips.', icon: Footprints },
  { title: 'Sidewalks', text: 'The public sidewalk along your property, added to your plan if you want it.', icon: Snowflake },
  { title: 'Back-alley parking pads', text: 'Rear parking pads off the alley cleared along with the front.', icon: ParkingSquare },
];

export default function DrivewaySnowRemovalPage() {
  const page = PAGES['/driveway-snow-removal'];
  return (
    <SiteLayout page={page}>
      <PageHero
        eyebrow="Driveway snow removal · Grande Prairie & Sexsmith"
        accent="Driveway Snow Removal"
        title="& Plowing in Grande Prairie"
        intro={<p>We plow residential driveways in Grande Prairie and Sexsmith all winter and clear the walkways, steps, sidewalks and back-alley parking pads that go with them. Service starts at about {SITE.triggerCm} cm of snow.</p>}
        points={[`From $${SITE.priceFrom}/month`, 'Driveways & parking areas', 'Walkways, steps & sidewalks', 'Back-alley parking pads']}
      />
      {page.breadcrumb && <Breadcrumbs label={page.breadcrumb} />}

      <ContentSection eyebrow="What we clear" title="Residential Driveway Snow Clearing">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-3xl border border-white/10 bg-base-2 p-6">
              <Icon size={24} className="text-ice mb-4" aria-hidden="true" />
              <h3 className="heading-xl text-2xl text-white mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection eyebrow="How it works" title="Snow Plowing After Every Qualifying Snowfall" tone="snow">
        <div className="max-w-3xl space-y-5 text-slate-300 text-lg leading-relaxed">
          <p>
            Once you are on a seasonal plan, your property is on our route. Our agreement triggers service at about {SITE.triggerCm} cm of snowfall, or as required, so light snowfalls get cleared too and packed snow doesn't build up into ruts and ice.
          </p>
          <p>
            Driveways and parking areas are plowed. Walkways, steps and tight spots are cleared with smaller equipment or by hand. Before the season starts, mark curbs, rocks and garden edges so nothing gets damaged under the snow.
          </p>
        </div>
      </ContentSection>

      <FaqSection faqs={page.faqs ?? []} title="Driveway Snow Removal Questions" />
      <RelatedPages current={page.path} />
    </SiteLayout>
  );
}
