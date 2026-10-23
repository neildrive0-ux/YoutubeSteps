import { Link } from 'wouter';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarRange,
  Check,
  Clock3,
  FileText,
  Footprints,
  Home as HomeIcon,
  MapPin,
  Phone,
  ShieldCheck,
  Snowflake,
  Truck,
} from 'lucide-react';
import { PAGES, SITE } from '@/site';
import { SiteLayout, useSignUp } from '@/components/site-layout';
import { scrollToQuote } from '@/components/site-header';
import { FaqSection, RelatedPages } from '@/components/page-sections';
import { trackCallClick } from '@/lib/tracking';

const services = [
  {
    title: 'Driveway Snow Removal',
    description: 'Your driveway plowed after every qualifying snowfall, so you can get the car out and get to work.',
    icon: HomeIcon,
    href: '/driveway-snow-removal',
  },
  {
    title: 'Walkways, Steps & Sidewalks',
    description: 'Front walks, steps and the public sidewalk cleared so family, guests and delivery drivers can get to the door safely.',
    icon: Footprints,
    href: '/driveway-snow-removal',
  },
  {
    title: 'Back-Alley Parking Pads',
    description: 'Rear parking pads off the back alley added to your plan, so you are not digging out behind the house.',
    icon: Truck,
    href: '/driveway-snow-removal',
  },
  {
    title: 'Commercial Snow Removal',
    description: 'Lots, entrances and business properties kept open, with snow hauling and ice management when you need it.',
    icon: Building2,
    href: '#quote',
  },
];

const steps = [
  { number: '01', title: 'Request a Free Quote', description: 'Tell us your address and the areas you want cleared. We call you back with a price.' },
  { number: '02', title: 'Choose a 4 or 5 Month Plan', description: 'Read the agreement, pick your season length and pay upfront or monthly.' },
  { number: '03', title: 'We Clear It All Winter', description: `Service starts at about ${SITE.triggerCm} cm of snow, so you never have to call after a storm.` },
];

const reasons = [
  { title: `Service from about ${SITE.triggerCm} cm of snow`, description: 'Our agreement triggers service at light snowfalls too, not only big storms.', icon: Snowflake },
  { title: 'One price for the whole season', description: 'A heavy winter does not mean a bigger bill. Pay upfront or monthly.', icon: CalendarRange },
  { title: 'Fully insured in Alberta', description: 'Responsible work, documented properly in a written agreement.', icon: ShieldCheck },
  { title: 'Read the contract before you sign', description: 'The full seasonal agreement is online. No surprises later.', icon: FileText },
  { title: 'Local Grande Prairie crew', description: 'We live and work here, and we know the streets, the alleys and the weather.', icon: MapPin },
  { title: 'Real people on the phone', description: `Call ${SITE.phoneDisplay} and talk to the people who clear your driveway.`, icon: Phone },
];

function Hero() {
  const openSignUp = useSignUp();
  return (
    <section className="relative bg-[#071118] text-white pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-3 text-sky-300 font-bold text-xs tracking-widest uppercase mb-8">
              <span className="w-8 h-px bg-sky-300" aria-hidden="true" />
              Residential snow removal · Grande Prairie, AB
            </p>
            <h1 id="hero-title" className="font-display text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.05] tracking-tight mb-8">
              Snow Removal in Grande Prairie &amp; Sexsmith: <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-sky-500">Driveways Cleared All Winter</span>
            </h1>
            <p className="text-slate-200 text-lg lg:text-xl max-w-xl mb-10 leading-relaxed">
              Seasonal snow removal contracts for driveways, walkways, steps and sidewalks. Plans from ${SITE.priceFrom}/month, and service starts at about {SITE.triggerCm} cm of snow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button type="button" onClick={scrollToQuote} className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-[#071118] font-bold px-8 py-4 rounded-md transition-all duration-200" data-testid="button-hero-quote">
                Get a Free Quote <ArrowRight size={18} />
              </button>
              <button type="button" onClick={openSignUp} className="inline-flex items-center justify-center gap-2 bg-transparent border border-slate-500 hover:border-slate-300 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-md transition-all duration-200" data-testid="button-hero-signup">
                Sign Up for Winter Service
              </button>
            </div>
            <a href={SITE.phoneHref} onClick={trackCallClick} className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white mt-8" data-testid="link-hero-phone">
              <Phone size={18} className="text-sky-300" /> Prefer to talk? Call {SITE.phoneDisplay}
            </a>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700 rounded-2xl p-8 lg:p-10 shadow-2xl">
              <p className="text-sky-300 text-xs font-bold tracking-widest uppercase mb-4">2026–27 winter plans</p>
              <h2 className="font-display text-2xl lg:text-3xl font-semibold mb-6 leading-tight text-white">Seasonal snow removal from ${SITE.priceFrom}/month</h2>
              <ul className="space-y-4">
                {[
                  `Standard driveways from $${SITE.priceFrom}/month`,
                  `Larger driveways from $${SITE.priceLargeFrom}/month`,
                  '4 or 5 month plans, paid upfront or monthly',
                  'Walkways, steps, sidewalks & back-alley pads',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-200 pt-4 border-t border-slate-700/70">
                    <Check size={18} className="text-sky-300 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/snow-removal-prices" className="mt-8 inline-flex items-center gap-2 text-sky-300 hover:text-white font-semibold text-sm">
                See snow removal prices <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50 border-b border-slate-200" id="services" aria-labelledby="services-title">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <p className="text-sky-700 font-bold text-xs tracking-widest uppercase mb-4">The whole property, ready for winter</p>
            <h2 id="services-title" className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
              Residential Snow Removal Services
            </h2>
          </div>
          <p className="text-slate-600 max-w-sm text-lg leading-relaxed">
            From the first snowfall to the spring thaw, we keep Grande Prairie and Sexsmith driveways and walkways clear.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ title, description, icon: Icon, href }) => (
            <article key={title} className="bg-white border border-slate-200 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-sky-900/5 hover:-translate-y-1 flex flex-col">
              <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center text-sky-700 mb-10">
                <Icon size={24} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-semibold text-slate-900 mb-3 leading-tight">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{description}</p>
              {href.startsWith('#') ? (
                <a href={href} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-900">
                  Ask for a commercial quote <ArrowRight size={14} aria-hidden="true" />
                </a>
              ) : (
                <Link href={href} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-900">
                  Learn more <span className="sr-only">about {title.toLowerCase()}</span> <ArrowRight size={14} aria-hidden="true" />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 bg-white" id="how-it-works" aria-labelledby="process-title">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-20 max-w-3xl">
          <p className="text-sky-700 font-bold text-xs tracking-widest uppercase mb-4">Three steps, zero snow stress</p>
          <h2 id="process-title" className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
            How Our Seasonal Snow Removal Contracts Work
          </h2>
        </div>

        <ol className="grid md:grid-cols-3 gap-12 relative">
          {steps.map((step) => (
            <li key={step.number} className="relative">
              <div className="w-14 h-14 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center font-display font-bold text-sky-700 text-lg mb-8 shadow-sm" aria-hidden="true">
                {step.number}
              </div>
              <h3 className="font-display text-2xl font-semibold text-slate-900 mb-4">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Contracts() {
  const openSignUp = useSignUp();
  return (
    <section className="py-24 lg:py-32 bg-sky-50 overflow-hidden border-y border-sky-100" id="contracts" aria-labelledby="contracts-title">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <p className="text-sky-700 font-bold text-xs tracking-widest uppercase mb-4">Stay covered all season</p>
            <h2 id="contracts-title" className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Seasonal Snow Removal Contracts &amp; Prices
            </h2>
            <p className="text-slate-700 text-lg mb-8 leading-relaxed max-w-md">
              Pick a 4 or 5 month plan and take snow off your list. Standard driveways start from ${SITE.priceFrom} a month and larger driveways from ${SITE.priceLargeFrom} a month. Simple pricing, no winter surprises.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { label: '4 or 5 months', icon: CalendarRange },
                { label: 'Pay upfront or monthly', icon: Check },
                { label: 'No hidden fees', icon: BadgeCheck },
              ].map(({ label, icon: Icon }) => (
                <span key={label} className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                  <Icon size={16} className="text-sky-600" aria-hidden="true" /> {label}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-6 text-sm font-semibold">
              <Link href="/snow-removal-prices" className="inline-flex items-center gap-2 text-sky-700 hover:text-sky-900">Snow removal prices <ArrowRight size={14} /></Link>
              <Link href="/seasonal-snow-removal-contracts" className="inline-flex items-center gap-2 text-sky-700 hover:text-sky-900">How contracts work <ArrowRight size={14} /></Link>
            </div>
          </div>

          <div className="bg-white border border-sky-100 shadow-xl shadow-sky-900/5 rounded-2xl p-8 lg:p-12">
            <p className="inline-block bg-sky-50 text-sky-800 border border-sky-100 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md mb-6">
              Seasonal service agreement
            </p>
            <h3 className="font-display text-3xl font-semibold text-slate-900 mb-6 leading-tight">
              Snow handled before it becomes your problem.
            </h3>
            <ul className="space-y-4 mb-10">
              {[
                `Service starts at about ${SITE.triggerCm} cm of snowfall`,
                'Driveways, parking areas and the zones you choose',
                'Clear written terms you can read online',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <Check size={20} className="text-sky-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button onClick={openSignUp} type="button" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#071118] hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-md transition-all duration-200" data-testid="button-contract-signup">
              View Contract / Sign Up <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32 bg-[#071118] text-white" id="why-us" aria-labelledby="why-title">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-3xl mb-16">
          <p className="text-sky-300 font-bold text-xs tracking-widest uppercase mb-4">Prepared is better than surprised</p>
          <h2 id="why-title" className="font-display text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-[1.1]">
            Why Grande Prairie Homeowners Choose Ai Landscaping
          </h2>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
            A calm, accountable crew makes the difference when the driveway disappears overnight.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {reasons.map(({ title, description, icon: Icon }) => (
            <article key={title}>
              <div className="w-12 h-12 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center text-sky-300 mb-6">
                <Icon size={22} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 leading-tight">{title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceArea() {
  return (
    <section className="py-24 lg:py-32 bg-white" id="service-area" aria-labelledby="area-title">
      <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div>
          <p className="text-sky-700 font-bold text-xs tracking-widest uppercase mb-4">Where we plow</p>
          <h2 id="area-title" className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Snow Removal Service Area: Grande Prairie, Sexsmith &amp; County
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            We clear residential driveways, walkways and sidewalks across the City of Grande Prairie, the Town of Sexsmith and nearby homes in the County of Grande Prairie. Not sure if you are on our route? Send your address and we will confirm.
          </p>
        </div>
        <ul className="grid sm:grid-cols-3 gap-4">
          {[
            { name: 'Grande Prairie', detail: 'Homes across the city' },
            { name: 'Sexsmith', detail: 'Driveways & walkways' },
            { name: 'County of GP', detail: 'Nearby homes' },
          ].map((area) => (
            <li key={area.name} className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <MapPin size={22} className="text-sky-700 mb-4" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-slate-900">{area.name}</h3>
              <p className="text-sm text-slate-600 mt-1">{area.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ResponseNote() {
  return (
    <section className="bg-slate-50 border-t border-slate-200" aria-label="Contact promise">
      <div className="container mx-auto px-6 max-w-7xl py-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-slate-700">
        <Clock3 size={22} className="text-sky-700 shrink-0" aria-hidden="true" />
        <p>
          Winter routes fill up. Request your quote now, or call{' '}
          <a href={SITE.phoneHref} onClick={trackCallClick} className="font-semibold text-sky-700 underline underline-offset-4">{SITE.phoneDisplay}</a>{' '}
          to talk to us directly.
        </p>
      </div>
    </section>
  );
}

export default function HomePage() {
  const page = PAGES['/'];
  return (
    <SiteLayout page={page} quoteTitle="Get Your Snow Removal Quote">
      <Hero />
      <Services />
      <HowItWorks />
      <Contracts />
      <WhyChooseUs />
      <ServiceArea />
      <FaqSection faqs={page.faqs ?? []} title="Snow Removal Questions in Grande Prairie" />
      <RelatedPages current="/" />
      <ResponseNote />
    </SiteLayout>
  );
}
