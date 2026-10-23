import { useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowRight,
  CalendarRange,
  Flower2,
  MapPin,
  Phone,
  ShieldCheck,
  Snowflake,
  Trees,
  Truck,
} from 'lucide-react';
import { PAGES, PHOTOS, SITE } from '@/site';
import { SiteLayout } from '@/components/site-layout';
import { CallLink, CheckList, ContentSection, FaqSection, PhotoPanel, PillLink, SnowDrift } from '@/components/page-sections';
import { trackCallClick } from '@/lib/tracking';

function Hero() {
  return (
    <section className={`relative flex min-h-[92svh] items-center overflow-hidden text-white ${PHOTOS.hero ? 'bg-ink' : 'hero-fallback'}`} aria-labelledby="hero-title">
      {PHOTOS.hero && <img src={PHOTOS.hero} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover opacity-50" />}
      <div className="snowfall" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-32 pt-40 text-center sm:px-6 md:pt-44">
        <p className="eyebrow text-ice-soft">Grande Prairie · Sexsmith · Clairmont · County of GP</p>
        <h1 id="hero-title" className="heading-xl mt-6 text-[3.1rem] sm:text-7xl md:text-8xl">
          <span className="block text-ice">Snow Removal</span>{' '}
          <span className="block">Grande Prairie &amp; Sexsmith</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
          Driveways, walkways and steps cleared after every snowfall on seasonal plans from ${SITE.priceFrom}/month. Larger driveways from ${SITE.priceLargeFrom}/month. Pay monthly or upfront, no hidden fees.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <PillLink href="/snow-removal-quote" track="hero">Get a Snow Quote</PillLink>
          <CallLink />
        </div>
        <p className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-300">
          <span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-ice" aria-hidden="true" /> Fully insured in Alberta</span>
          <span className="inline-flex items-center gap-2"><Snowflake size={16} className="text-ice" aria-hidden="true" /> Service from ~{SITE.triggerCm} cm of snow</span>
          <span className="inline-flex items-center gap-2"><CalendarRange size={16} className="text-ice" aria-hidden="true" /> Limited route spots: book before the first storm</span>
        </p>
      </div>
      <SnowDrift fill="#05080c" />
    </section>
  );
}

const stats = [
  { value: `${SITE.triggerCm} cm`, label: 'Snowfall that triggers service' },
  { value: `$${SITE.priceFrom}`, label: 'Per month, seasonal plans from' },
  { value: '4 or 5', label: 'Month winter plans' },
  { value: '$0', label: 'Hidden fees. Pay monthly or upfront' },
];

function StatsStrip() {
  return (
    <section className="bg-ink text-white" aria-label="At a glance">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 pb-16 pt-4 sm:px-6 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="px-2 py-6 text-center" data-reveal>
            <p className="heading-xl text-5xl text-ice md:text-6xl">{stat.value}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const reasons = [
  {
    icon: Snowflake,
    title: 'We come out early',
    text: `Service starts at about ${SITE.triggerCm} cm of snow, so light snowfalls get cleared before they pack down into ice.`,
    href: '/seasonal-snow-removal-contracts',
    cta: 'How plans work',
  },
  {
    icon: CalendarRange,
    title: 'One price all winter',
    text: `Seasonal plans from $${SITE.priceFrom}/month. A heavy winter does not mean a bigger bill. Pay upfront or monthly.`,
    href: '/snow-removal-prices',
    cta: 'See prices',
  },
  {
    icon: Phone,
    title: 'Straight answers',
    text: 'Call and talk to the people who actually clear your driveway. No call centres and no runaround.',
    href: SITE.phoneHref,
    cta: `Call ${SITE.phoneDisplay}`,
  },
];

function WinterPlanBand() {
  return (
    <ContentSection
      tone="dark"
      bigWord="Winter Ready"
      center
      eyebrow="Your snow pros"
      title="Your driveway needs a snow plan, not a shovel."
      intro={
        <p>
          Shovelling at 6 a.m. before work gets old fast. With a seasonal plan your property is on our route from the first snowfall to the spring thaw. You don't call, you don't wait, you just back out of the driveway.
        </p>
      }
    >
      <div className="grid gap-5 md:grid-cols-3">
        {reasons.map(({ icon: Icon, title, text, href, cta }) => (
          <article key={title} className="flex flex-col items-center rounded-3xl border border-ice/40 bg-night/60 p-8 text-center" data-reveal>
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-ice/10 text-ice">
              <Icon size={30} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h3 className="heading-xl mt-6 text-3xl text-white">{title}</h3>
            <p className="mt-3 leading-relaxed text-slate-300">{text}</p>
            {href.startsWith('tel:') ? (
              <a href={href} onClick={trackCallClick} className="mt-7 inline-flex items-center gap-2 rounded-full bg-ice px-6 py-3 text-sm font-extrabold uppercase tracking-[0.06em] text-ink hover:bg-ice-soft">
                {cta} <ArrowRight size={16} aria-hidden="true" />
              </a>
            ) : (
              <Link href={href} className="mt-7 inline-flex items-center gap-2 rounded-full bg-ice px-6 py-3 text-sm font-extrabold uppercase tracking-[0.06em] text-ink hover:bg-ice-soft">
                {cta} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            )}
          </article>
        ))}
      </div>
    </ContentSection>
  );
}

const services = [
  {
    eyebrow: 'Safety focused',
    title: 'Snow & Ice Management',
    href: '/snow-and-ice-management',
    cta: 'Safe winters',
    photo: PHOTOS.snow,
    fallback: 'photo-fallback-snow',
    icon: Snowflake,
  },
  {
    eyebrow: 'Keeping green',
    title: 'Landscape Management',
    href: '/landscape-management',
    cta: 'Lawn & yard care',
    photo: PHOTOS.landscapeManagement,
    fallback: 'photo-fallback-green',
    icon: Trees,
  },
  {
    eyebrow: 'Refresh your yard',
    title: 'Landscape Enhancements',
    href: '/landscape-enhancements',
    cta: 'A fresh start',
    photo: PHOTOS.landscapeEnhancements,
    fallback: 'photo-fallback-bloom',
    icon: Flower2,
  },
];

function Services() {
  return (
    <ContentSection id="services" tone="snow" eyebrow="Everything outside your door" title="Our Services">
      <div className="grid gap-5 md:grid-cols-3">
        {services.map(({ eyebrow, title, href, cta, photo, fallback, icon: Icon }) => (
          <Link key={href} href={href} className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl text-white shadow-xl" data-reveal>
            <div className={`absolute inset-0 transition-transform duration-700 group-hover:scale-105 ${photo ? 'bg-ink' : fallback}`}>
              {photo ? (
                <img src={photo} alt="" loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <div className="bg-grain flex h-full items-start justify-end p-8">
                  <Icon size={120} strokeWidth={1} className="text-white/15" aria-hidden="true" />
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" aria-hidden="true" />
            <div className="relative p-7">
              <p className="eyebrow text-ice-soft">{eyebrow}</p>
              <h3 className="heading-xl mt-2 text-4xl">{title}</h3>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-ice px-5 py-3 text-sm font-extrabold uppercase tracking-[0.06em] text-ink transition-colors group-hover:bg-ice-soft">
                {cta} <ArrowRight size={16} aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </ContentSection>
  );
}

const seasons = [
  {
    id: 'snow',
    label: 'Snow & Ice',
    heading: 'Winter: snow & ice management',
    items: [
      'Driveway and parking area plowing',
      'Walkways, front steps and sidewalks',
      'Back-alley parking pads',
      'Salting and ice control where it is needed',
      `Service from about ${SITE.triggerCm} cm of snowfall`,
    ],
    href: '/snow-removal-quote',
    cta: 'Get a snow quote',
    photo: PHOTOS.snow,
    fallback: 'photo-fallback-snow',
    icon: Truck,
  },
  {
    id: 'turf',
    label: 'Turf & Maintenance',
    heading: 'Summer: landscape management',
    items: ['Lawn mowing and trimming', 'Spring and fall yard cleanups', 'Hedge and shrub trimming', 'Tidy garden beds all season'],
    href: '/landscaping-quote',
    cta: 'Get a landscaping quote',
    photo: PHOTOS.landscapeManagement,
    fallback: 'photo-fallback-green',
    icon: Trees,
  },
  {
    id: 'enhancements',
    label: 'Enhancements',
    heading: 'Projects: landscape enhancements',
    items: ['New garden beds and mulch', 'Sod and seeding', 'Planting and yard refreshes', 'Small landscape projects'],
    href: '/landscaping-quote',
    cta: 'Plan a project',
    photo: PHOTOS.landscapeEnhancements,
    fallback: 'photo-fallback-bloom',
    icon: Flower2,
  },
];

function AllSeasonCare() {
  const [active, setActive] = useState(seasons[0].id);
  return (
    <ContentSection id="all-season-care" eyebrow="One company, all year" title="All-season care">
      <div role="tablist" aria-label="Seasons" className="mb-8 flex flex-wrap gap-2 border-b border-slate-200" data-reveal>
        {seasons.map((season) => (
          <button
            key={season.id}
            type="button"
            role="tab"
            id={`tab-${season.id}`}
            aria-selected={active === season.id}
            aria-controls={`panel-${season.id}`}
            onClick={() => setActive(season.id)}
            className={`-mb-px border-b-2 px-4 py-3 text-sm font-extrabold uppercase tracking-[0.1em] transition-colors ${active === season.id ? 'border-ice-deep text-ink' : 'border-transparent text-slate-500 hover:text-ink'}`}
          >
            {season.label}
          </button>
        ))}
      </div>
      {seasons.map(({ id, heading, items, href, cta, photo, fallback, icon: Icon }) => (
        <div key={id} role="tabpanel" id={`panel-${id}`} aria-labelledby={`tab-${id}`} hidden={active !== id} className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h3 className="heading-xl text-4xl text-ink">{heading}</h3>
            <div className="mt-6">
              <CheckList items={items} />
            </div>
            <div className="mt-8">
              <PillLink href={href} variant="dark" track={`season-${id}`}>{cta}</PillLink>
            </div>
          </div>
          <div className="grid grid-cols-3 grid-rows-2 gap-3">
            <PhotoPanel photo={photo} fallback={fallback} label={heading} icon={<Icon size={72} strokeWidth={1} />} className="col-span-2 row-span-2 min-h-[320px]" />
            <PhotoPanel fallback={fallback} label="" icon={<Snowflake size={34} strokeWidth={1} />} className="min-h-[150px]" />
            <PhotoPanel fallback="hero-fallback" label="" icon={<MapPin size={34} strokeWidth={1} />} className="min-h-[150px]" />
          </div>
        </div>
      ))}
    </ContentSection>
  );
}

const steps = [
  {
    title: 'Request a quote',
    text: 'Fill out the quick form or call us. Tell us your address and what you need cleared or cared for.',
  },
  {
    title: 'Get your price & plan',
    text: 'We call you back with a straight price. Pick a 4 or 5 month snow plan, read the agreement, and pay upfront or monthly.',
  },
  {
    title: 'We handle it',
    text: `You are on our route. Service starts at about ${SITE.triggerCm} cm of snow, all season, without you lifting a finger.`,
  },
];

function Process() {
  const [open, setOpen] = useState(0);
  return (
    <ContentSection id="how-it-works" tone="snow" bigWord="Our Process" eyebrow="Here's how to get started" title="Three steps to a clear driveway">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <ol className="divide-y divide-slate-300 border-y border-slate-300" data-reveal>
          {steps.map((step, index) => (
            <li key={step.title}>
              <button
                type="button"
                onClick={() => setOpen(index)}
                aria-expanded={open === index}
                aria-controls={`step-${index}`}
                className="flex w-full items-center gap-4 py-5 text-left"
              >
                <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-xl font-bold ${open === index ? 'bg-ink text-ice' : 'border border-slate-400 text-slate-500'}`}>
                  {index + 1}
                </span>
                <span className={`heading-xl text-3xl ${open === index ? 'text-ink' : 'text-slate-500'}`}>{step.title}</span>
              </button>
              <div id={`step-${index}`} className={`${open === index ? 'block' : 'hidden'} pb-6 pl-[60px]`}>
                <p className="text-lg leading-relaxed text-slate-700">{step.text}</p>
                {index === 0 && (
                  <div className="mt-5">
                    <PillLink href="/snow-removal-quote" variant="dark" track="process">Reach out</PillLink>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
        <PhotoPanel photo={PHOTOS.process} fallback="hero-fallback" label="Snow removal crew in Grande Prairie" icon={<Truck size={96} strokeWidth={1} />} className="min-h-[380px]" />
      </div>
    </ContentSection>
  );
}

function Plans() {
  return (
    <ContentSection id="plans" eyebrow="Seasonal snow plans" title="Simple pricing. No winter surprises." center>
      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
        {[
          { name: 'Standard driveway', price: SITE.priceFrom, items: ['Driveway plowed all season', 'Add walkway, steps or sidewalk', '4 or 5 month plan'] },
          { name: 'Larger driveway or lot', price: SITE.priceLargeFrom, items: ['Long, wide or double driveways', 'Parking areas and back-alley pads', '4 or 5 month plan'] },
        ].map((plan, index) => (
          <article key={plan.name} className={`rounded-3xl p-8 text-left ${index === 0 ? 'bg-ink text-white' : 'border border-slate-200 bg-white'}`} data-reveal>
            <p className={`eyebrow ${index === 0 ? 'text-ice' : 'text-ice-deep'}`}>{plan.name}</p>
            <p className="heading-xl mt-3 text-6xl">
              <span className="align-top text-2xl">from </span>${plan.price}
              <span className={`text-2xl ${index === 0 ? 'text-slate-400' : 'text-slate-500'}`}>/mo</span>
            </p>
            <div className="mt-6">
              <CheckList items={plan.items} tone={index === 0 ? 'dark' : 'light'} />
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row" data-reveal>
        <PillLink href="/snow-removal-quote" track="plans">Get my exact price</PillLink>
        <PillLink href="/seasonal-snow-removal-contracts" variant="outline-dark">How contracts work</PillLink>
      </div>
      <p className="mt-6 text-center text-sm text-slate-600">Starting prices before tax. Your exact price is set in your written agreement after a free quote.</p>
    </ContentSection>
  );
}

function ServiceArea() {
  return (
    <ContentSection id="service-area" tone="snow" eyebrow="Where we work" title="Grande Prairie, Sexsmith, Clairmont & the County">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <p className="text-lg leading-relaxed text-slate-700" data-reveal>
          We clear residential driveways, walkways and sidewalks and take care of yards across the City of Grande Prairie, the Town of Sexsmith, the Hamlet of Clairmont and nearby homes in the County of Grande Prairie. Not sure if you are on our route? Send your address on the quote form and we will confirm.
        </p>
        <ul className="grid grid-cols-2 gap-3" data-reveal>
          {['Grande Prairie', 'Sexsmith', 'Clairmont', 'County of GP'].map((area) => (
            <li key={area} className="rounded-3xl border border-slate-200 bg-white p-6">
              <MapPin size={22} className="text-ice-deep" aria-hidden="true" />
              <h3 className="heading-xl mt-4 text-2xl text-ink">{area}</h3>
            </li>
          ))}
        </ul>
      </div>
    </ContentSection>
  );
}

export default function HomePage() {
  const page = PAGES['/'];
  return (
    <SiteLayout page={page}>
      <Hero />
      <StatsStrip />
      <WinterPlanBand />
      <Services />
      <AllSeasonCare />
      <Process />
      <Plans />
      <ServiceArea />
      <FaqSection faqs={page.faqs ?? []} title="Snow removal & landscaping questions" />
    </SiteLayout>
  );
}
