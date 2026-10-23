import { useRef, useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowLeft,
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
import { SiteLayout, useSignUp } from '@/components/site-layout';
import { CallLink, CheckList, ContentSection, FaqSection, PhotoPanel, PillLink, useAfterLoad } from '@/components/page-sections';
import { trackCallClick, trackQuoteClick } from '@/lib/tracking';

// The hero photo stays fixed while the hero and the stats band scroll over it (clipped to this block),
// and the stats band fades the photo into the page colour so the two read as one picture.
function HeroBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 h-[100lvh]" aria-hidden="true">
      {PHOTOS.hero ? (
        <picture>
          {PHOTOS.heroMobile && (
            <source
              media="(orientation: portrait)"
              srcSet={PHOTOS.heroMobile}
            />
          )}
          <img
            src={PHOTOS.hero}
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover object-center md:object-bottom"
          />
        </picture>
      ) : (
        <div className="hero-fallback h-full w-full" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-base/70 via-base/25 to-base/60" />
      <div className="snowfall" />
    </div>
  );
}

function Hero() {
  return (
    // On phones the hero is one screen tall: location at the top, the title just above the tractor,
    // a clear gap so the tractor shows, then one row of buttons on the snow.
    <section className="relative flex min-h-[100lvh] items-stretch text-white md:min-h-[92svh] md:items-center" aria-labelledby="hero-title">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col px-4 pb-[12lvh] pt-36 text-center sm:px-6 md:block md:pb-20 md:pt-44">
        <p className="eyebrow text-ice-soft">Grande Prairie · Sexsmith · Clairmont · County of GP</p>
        <h1 id="hero-title" className="heading-xl mt-auto text-[2.6rem] sm:text-7xl md:mt-6 md:text-8xl">
          <span className="block text-ice">Snow Removal</span>{' '}
          <span className="block">Grande Prairie &amp; Sexsmith</span>
        </h1>
        <p className="mx-auto mt-7 hidden max-w-2xl leading-relaxed text-slate-200 md:block md:text-xl">
          Driveways, walkways and steps cleared after every snowfall on seasonal plans from ${SITE.priceFrom}/month, priced by the size of your driveway. Pay monthly or upfront, no hidden fees.
        </p>
        <div className="h-[24lvh] shrink-0 md:hidden" aria-hidden="true" />
        {/* The phone bottom bar stays hidden while these buttons are on screen (see MobileCtaBar). */}
        <div data-hero-cta>
          <div className="grid grid-cols-2 gap-2 md:hidden">
            <Link href="/snow-removal-quote" onClick={() => trackQuoteClick('hero')} className="inline-flex items-center justify-center gap-2 rounded-full bg-ice py-3.5 text-sm font-extrabold uppercase tracking-[0.06em] text-ink">
              Get a Quote <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a href={SITE.phoneHref} onClick={trackCallClick} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-ink/40 py-3.5 text-sm font-extrabold uppercase tracking-[0.06em] text-white backdrop-blur">
              <Phone size={16} aria-hidden="true" /> Call Now
            </a>
          </div>
          <div className="mt-10 hidden justify-center gap-3 md:flex">
            <PillLink href="/snow-removal-quote" track="hero">Get a Snow Quote</PillLink>
            <CallLink />
          </div>
        </div>
        <p className="mt-4 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-300 md:mt-8">
          <span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-ice" aria-hidden="true" /> Fully insured in Alberta</span>
          <span className="hidden items-center gap-2 md:inline-flex"><Snowflake size={16} className="text-ice" aria-hidden="true" /> Service from ~{SITE.triggerCm} cm of snow</span>
          <span className="hidden items-center gap-2 md:inline-flex"><CalendarRange size={16} className="text-ice" aria-hidden="true" /> Limited route spots: book before the first storm</span>
        </p>
      </div>
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
    <section className="relative bg-gradient-to-b from-transparent via-base/85 to-base text-white" aria-label="At a glance">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 pb-20 pt-6 sm:px-6 md:pb-24 md:pt-10 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="px-2 py-4 text-center md:py-6" data-reveal>
            <p className="heading-xl text-4xl text-ice md:text-6xl">{stat.value}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400 md:mt-2 md:text-sm">{stat.label}</p>
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

const reasonLink =
  'mt-4 inline-flex items-center gap-2 rounded-full bg-ice px-5 py-2.5 text-xs font-extrabold uppercase tracking-[0.06em] text-ink transition-colors hover:bg-ice-soft md:mt-7 md:px-6 md:py-3 md:text-sm';

// Swipeable row on phones (scroll-snap), with arrows and a progress bar like Clintar's.
// The active slide is whichever one is closest to the middle of the row.
function useSnapCarousel(count: number, onChange?: (index: number) => void) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const onScroll = () => {
    const row = ref.current;
    if (!row) return;
    const middle = row.scrollLeft + row.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    Array.from(row.children).forEach((child, i) => {
      const slide = child as HTMLElement;
      const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - middle);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    if (nearest !== index) {
      setIndex(nearest);
      onChange?.(nearest);
    }
  };
  const go = (target: number) => {
    const row = ref.current;
    const slide = row?.children[Math.max(0, Math.min(count - 1, target))] as HTMLElement | undefined;
    if (!row || !slide) return;
    row.scrollTo({ left: slide.offsetLeft - (row.clientWidth - slide.offsetWidth) / 2, behavior: 'smooth' });
  };
  return { ref, index, onScroll, go };
}

function CarouselControls({ index, count, go, label }: { index: number; count: number; go: (index: number) => void; label: string }) {
  return (
    <div className="mt-6 flex items-center gap-3 md:hidden">
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <div className="h-full rounded-full bg-ice transition-all duration-300" style={{ width: `${((index + 1) / count) * 100}%` }} />
      </div>
      <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label={`Previous ${label}`} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-opacity disabled:opacity-30">
        <ArrowLeft size={18} aria-hidden="true" />
      </button>
      <button type="button" onClick={() => go(index + 1)} disabled={index === count - 1} aria-label={`Next ${label}`} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ice text-ink transition-opacity disabled:opacity-30">
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </div>
  );
}

const swipeRow = 'no-scrollbar relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4';

function WinterPlanBand() {
  return (
    <ContentSection
      tone="dark"
      className="z-10 -mt-12 rounded-t-[2.5rem] shadow-[0_-30px_60px_rgba(0,0,0,0.45)]"
      bigWord="Winter Ready"
      center
      eyebrow="Your snow pros"
      title="Your driveway needs a snow plan, not a shovel."
      intro={
        <p className="hidden md:block">
          Shovelling at 6 a.m. before work gets old fast. With a seasonal plan your property is on our route from the first snowfall to the spring thaw. You don't call, you don't wait, you just back out of the driveway.
        </p>
      }
    >
      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {reasons.map(({ icon: Icon, title, text, href, cta }) => (
          <article key={title} className="flex flex-col items-center rounded-[2rem] border border-ice/50 bg-night/60 px-6 py-7 text-center md:p-8" data-reveal>
            <span className="hidden h-16 w-16 items-center justify-center rounded-full bg-ice/10 text-ice md:inline-flex">
              <Icon size={30} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h3 className="heading-xl text-2xl text-white md:mt-6 md:text-3xl">{title}</h3>
            <p className="mt-3 hidden leading-relaxed text-slate-300 md:block">{text}</p>
            {href.startsWith('tel:') ? (
              <a href={href} onClick={trackCallClick} className={reasonLink}>
                {cta} <ArrowRight size={16} aria-hidden="true" />
              </a>
            ) : (
              <Link href={href} className={reasonLink}>
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
  const carousel = useSnapCarousel(services.length);
  const loaded = useAfterLoad();
  return (
    <ContentSection id="services" tone="panel" layered eyebrow="Everything outside your door" title="Our Services">
      <div ref={carousel.ref} onScroll={carousel.onScroll} className={`${swipeRow} py-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0`}>
        {services.map(({ eyebrow, title, href, cta, photo, fallback, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group relative flex min-h-[360px] w-[85%] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-[2.5rem] text-white shadow-xl ring-1 ring-white/10 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(74,176,245,0.55)] hover:ring-ice/60 active:scale-[0.98] md:min-h-[420px] md:w-auto"
          >
            <div className={`absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110 ${photo ? 'bg-ink' : fallback}`}>
              {photo ? (
                <img src={loaded ? photo : undefined} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
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
                {cta} <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <CarouselControls index={carousel.index} count={services.length} go={carousel.go} label="service" />
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
    <ContentSection id="how-it-works" layered bigWord="Our Process" eyebrow="Here's how to get started" title="Three steps to a clear driveway">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <ol className="divide-y divide-white/10 border-y border-white/10" data-reveal>
          {steps.map((step, index) => (
            <li key={step.title}>
              <button
                type="button"
                onClick={() => setOpen(index)}
                aria-expanded={open === index}
                aria-controls={`step-${index}`}
                className="flex w-full items-center gap-4 py-5 text-left"
              >
                <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-xl font-bold ${open === index ? 'bg-ice text-ink' : 'border border-white/25 text-slate-400'}`}>
                  {index + 1}
                </span>
                <span className={`heading-xl text-2xl md:text-3xl ${open === index ? 'text-white' : 'text-slate-400'}`}>{step.title}</span>
              </button>
              <div id={`step-${index}`} className={`${open === index ? 'block' : 'hidden'} pb-6 pl-[60px]`}>
                <p className="text-base leading-relaxed md:text-lg text-slate-300">{step.text}</p>
                {index === 0 && (
                  <div className="mt-5">
                    <PillLink href="/snow-removal-quote" variant="dark" track="process">Reach out</PillLink>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
        <PhotoPanel photo={PHOTOS.process} fallback="hero-fallback" label="Snow removal crew in Grande Prairie" icon={<Truck size={96} strokeWidth={1} />} defer className="order-first min-h-[220px] md:min-h-[380px] lg:order-none" />
      </div>
    </ContentSection>
  );
}

// Opens the sign-up popup, which shows the seasonal service agreement (PDF) before the visitor asks for a quote.
function ContractCard() {
  const openSignUp = useSignUp();
  return (
    <div className="mx-auto mt-12 grid max-w-5xl items-center gap-8 rounded-[2rem] border border-ice/30 bg-ink/40 p-7 md:grid-cols-[1fr_auto] md:p-10" data-reveal>
      <div>
        <p className="inline-block rounded-md border border-ice/40 bg-ice/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-ice">Seasonal service agreement</p>
        <h3 className="heading-xl mt-5 text-3xl text-white md:text-4xl">Snow handled before it becomes your problem.</h3>
        <div className="mt-5">
          <CheckList items={['Service planned around snowfall', '4 or 5 month plans, paid upfront or monthly', 'Clear terms, direct communication']} />
        </div>
      </div>
      <button
        type="button"
        onClick={openSignUp}
        className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-ink px-7 py-4 text-sm font-extrabold uppercase tracking-[0.06em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-ice hover:text-ice"
      >
        View contract / Sign up <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </button>
    </div>
  );
}

function Plans() {
  return (
    <ContentSection id="plans" tone="panel" layered eyebrow="Seasonal snow plans" title="Simple pricing. No winter surprises." center>
      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
        {[
          { name: 'Standard driveway', price: SITE.priceFrom, items: ['Driveway plowed all season', 'Add walkway, steps or sidewalk', '4 or 5 month plan'] },
          { name: 'Larger driveway or lot', price: null, items: ['Long, wide or double driveways', 'Parking areas and back-alley pads', '4 or 5 month plan'] },
        ].map((plan, index) => (
          <article key={plan.name} className={`rounded-3xl p-6 text-left md:p-8 ${index === 0 ? 'border border-ice/40 bg-ice/10 text-white' : 'border border-white/10 bg-ink/40'}`} data-reveal>
            <p className="eyebrow text-ice">{plan.name}</p>
            {plan.price ? (
              <p className="heading-xl mt-3 text-5xl md:text-6xl">
                <span className="align-top text-2xl">from </span>${plan.price}
                <span className="text-2xl text-slate-400">/mo</span>
              </p>
            ) : (
              <p className="heading-xl mt-3 text-4xl md:text-5xl">Priced by size</p>
            )}
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
      <p className="mt-6 text-center text-sm text-slate-400">Starting prices before tax. Your exact price is set in your written agreement after a free quote.</p>
      <ContractCard />
    </ContentSection>
  );
}

function ServiceArea() {
  return (
    <ContentSection id="service-area" layered eyebrow="Where we work" title="Grande Prairie, Sexsmith, Clairmont & the County">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <p className="text-base leading-relaxed text-slate-300 md:text-lg" data-reveal>
          We clear residential driveways, walkways and sidewalks and take care of yards across the City of Grande Prairie, the Town of Sexsmith, the Hamlet of Clairmont and nearby homes in the County of Grande Prairie. Not sure if you are on our route? Send your address on the quote form and we will confirm.
        </p>
        <ul className="grid grid-cols-2 gap-3" data-reveal>
          {['Grande Prairie', 'Sexsmith', 'Clairmont', 'County of GP'].map((area) => (
            <li key={area} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 md:block md:rounded-3xl md:p-6">
              <MapPin size={20} className="shrink-0 text-ice" aria-hidden="true" />
              <h3 className="heading-xl text-xl text-white md:mt-4 md:text-2xl">{area}</h3>
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
      <div className="relative" style={{ clipPath: 'inset(0)' }}>
        <HeroBackdrop />
        <Hero />
        <StatsStrip />
      </div>
      <WinterPlanBand />
      <Services />
      <Process />
      <Plans />
      <ServiceArea />
      <FaqSection faqs={page.faqs ?? []} title="Snow removal & landscaping questions" tone="panel" layered />
    </SiteLayout>
  );
}
