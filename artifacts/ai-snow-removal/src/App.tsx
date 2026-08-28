import { type ChangeEvent, type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createQuoteRequest } from '@workspace/api-client-react';
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarRange,
  Check,
  CheckCircle2,
  Clock3,
  Home as HomeIcon,
  Mail,
  MapPin,
  Menu,
  LoaderCircle,
  Phone,
  ShieldCheck,
  Send,
  Shovel,
  Truck,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import logoPath from '@assets/ai-landscaping-logo-no-bg.png';

const queryClient = new QueryClient();

type Service = {
  number: string;
  title: string;
  description: string;
  icon: typeof HomeIcon;
};

const services: Service[] = [
  {
    number: '01',
    title: 'Residential Snow Removal',
    description: 'Clear driveways, walkways, and steps so your household can start the day safely.',
    icon: HomeIcon,
  },
  {
    number: '02',
    title: 'Commercial Snow Removal',
    description: 'Keep lots, entrances, and business properties open, accessible, and ready for customers.',
    icon: Building2,
  },
  {
    number: '03',
    title: 'Snow Hauling',
    description: 'When banks get too high, we load out and haul snow away to restore usable space.',
    icon: Truck,
  },
  {
    number: '04',
    title: 'Ice Management',
    description: 'Proactive salting and de-icing that helps reduce slips before they become a problem.',
    icon: Shovel,
  },
];

const reasons = [
  { title: 'Fully Insured & Registered in Alberta', description: 'Responsible work, documented properly.', icon: ShieldCheck },
  { title: 'Reliable & On-Time Service', description: 'We plan around the forecast, not after it.', icon: Clock3 },
  { title: 'Seasonal Contracts (No Hassle)', description: 'One agreement. Less to remember.', icon: CalendarRange },
  { title: 'Professional Equipment', description: 'The right machines for Alberta snow.', icon: Wrench },
  { title: 'Local & Trusted', description: 'A crew that knows your roads and weather.', icon: Users },
];

const navigationItems = [
  { href: '#services', id: 'services', label: 'Services', testId: 'link-services' },
  { href: '#how-it-works', id: 'how-it-works', label: 'How it works', testId: 'link-how-it-works' },
  { href: '#why-us', id: 'why-us', label: 'Why us', testId: 'link-why-us' },
  { href: '#contracts', id: 'contracts', label: 'Contracts', testId: 'link-contracts' },
] as const;

const propertyAreaOptions = [
  { value: 'driveway', label: 'Driveway' },
  { value: 'sidewalk', label: 'Sidewalk' },
  { value: 'staircase', label: 'Staircase' },
  { value: 'back-alley-parking-pad', label: 'Back-Alley Parking Pad' },
] as const;

type PropertyArea = (typeof propertyAreaOptions)[number]['value'];

function scrollToQuote() {
  document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Header({ onSignUp }: { onSignUp: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navigationItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.1, 0.35] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-5'}`} id="top">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <a className="inline-flex items-center" href="#top" data-testid="link-brand">
            <span className="inline-flex items-center bg-[#071118] px-3 py-2.5 rounded-md shadow-md">
              <img
                className="h-8 w-auto"
                src={logoPath}
                alt="Ai Landscaping & SnowRemoval"
                data-testid="img-brand-logo"
              />
            </span>
          </a>
          
          <button
            className={`lg:hidden p-2 rounded-md ${scrolled ? 'text-slate-900' : 'text-white'}`}
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <nav id="main-navigation" className={`
            absolute lg:relative top-full left-0 right-0 
            lg:top-auto lg:flex lg:items-center lg:gap-8 
            bg-white lg:bg-transparent border-b lg:border-none border-slate-200 
            shadow-xl lg:shadow-none p-6 lg:p-0
            transition-all duration-300 origin-top
            ${menuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 lg:opacity-100 lg:scale-y-100 hidden lg:flex'}
          `} aria-label="Main navigation">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 mb-6 lg:mb-0">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    className={`relative text-sm font-semibold transition-colors after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:bg-sky-500 after:transition-all ${
                      isActive
                        ? 'text-sky-500 after:w-full'
                        : `${scrolled || menuOpen ? 'text-slate-700' : 'text-slate-300 hover:text-white'} hover:text-sky-500 after:w-0 hover:after:w-full`
                    }`}
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive ? 'location' : undefined}
                    data-testid={item.testId}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
            
            <button 
              className={`w-full lg:w-auto inline-flex items-center justify-center gap-2 font-bold px-6 py-3 rounded-md transition-all duration-200 ${
                scrolled || menuOpen 
                  ? 'bg-[#071118] hover:bg-slate-800 text-white' 
                  : 'bg-white hover:bg-sky-50 text-[#071118]'
              }`}
              type="button" 
              onClick={() => { closeMenu(); scrollToQuote(); }} 
              data-testid="button-header-quote"
            >
              Get a Quote <ArrowRight size={16} />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Hero({ onSignUp }: { onSignUp: () => void }) {
  return (
    <section className="relative bg-[#071118] text-white pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden" aria-labelledby="hero-title">
      {/* Decorative icy elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 text-sky-400 font-bold text-xs tracking-widest uppercase mb-8">
              <span className="w-8 h-px bg-sky-400"></span>
              Winter readiness, handled
            </div>
            <h1 id="hero-title" className="font-display text-5xl lg:text-7xl font-semibold leading-[1.05] tracking-tight mb-8">
              Reliable Snow Removal You Can <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-sky-500">Count On</span> All Winter
            </h1>
            <p className="text-slate-300 text-lg lg:text-xl max-w-xl mb-10 leading-relaxed">
              Serving Grande Prairie and surrounding areas with professional, insured snow removal services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToQuote} 
                className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-[#071118] font-bold px-8 py-4 rounded-md transition-all duration-200"
                data-testid="button-hero-quote"
              >
                Get a Quote <ArrowRight size={18} />
              </button>
              <button 
                onClick={onSignUp} 
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-slate-600 hover:border-slate-400 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-md transition-all duration-200"
                data-testid="button-hero-signup"
              >
                Sign Up for Winter Service
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400 mt-8">
              <ShieldCheck size={18} className="text-sky-400" /> Insured service for homes and properties across Grande Prairie
            </div>
          </div>
          
          <div className="lg:col-span-5 animate-fade-in-up delay-200">
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 lg:p-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-6 text-sky-500/10 font-display font-bold text-7xl pointer-events-none select-none">01</div>
              <div className="text-sky-400 text-xs font-bold tracking-widest uppercase mb-4">Before the first storm</div>
              <h2 className="font-display text-2xl lg:text-3xl font-semibold mb-4 leading-tight text-white">Make a plan while the forecast is clear.</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Seasonal customers get a dependable plan in place before winter demands your attention.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-slate-300 pt-4 border-t border-slate-800/50">
                  <Check size={18} className="text-sky-400 shrink-0 mt-0.5" /> 
                  <span>Pre-season scheduling</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300 pt-4 border-t border-slate-800/50">
                  <Check size={18} className="text-sky-400 shrink-0 mt-0.5" /> 
                  <span>Storm-aware service planning</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300 pt-4 border-t border-slate-800/50">
                  <Check size={18} className="text-sky-400 shrink-0 mt-0.5" /> 
                  <span>Clear, straightforward contracts</span>
                </li>
              </ul>
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
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 animate-fade-in-up">
          <div className="max-w-2xl">
            <p className="text-sky-600 font-bold text-xs tracking-widest uppercase mb-4">What we clear</p>
            <h2 id="services-title" className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
              The whole property.<br />Ready for winter.
            </h2>
          </div>
          <p className="text-slate-600 max-w-sm text-lg leading-relaxed">
            From the first flurry to the last thaw, we keep the places that matter moving.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ number, title, description, icon: Icon }, i) => (
            <article 
              key={title} 
              data-testid={`card-service-${number}`}
              className="bg-white border border-slate-200 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-sky-900/5 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center text-sky-600">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <span className="text-slate-200 font-display font-bold text-xl">{number}</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-slate-900 mb-3 leading-tight">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { number: '01', title: 'Request a Quote', description: 'Tell us about your property and the areas you need cleared.' },
    { number: '02', title: 'Choose 4 or 5 Month Plan', description: 'Pick the seasonal coverage that fits your winter and your budget.' },
    { number: '03', title: 'We Handle the Snow', description: 'Your service is planned, scheduled, and looked after through the thaw.' },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white" id="how-it-works" aria-labelledby="process-title">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 animate-fade-in-up">
          <div>
            <p className="text-sky-600 font-bold text-xs tracking-widest uppercase mb-4">A simpler winter</p>
            <h2 id="process-title" className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
              Three steps.<br />Zero snow stress.
            </h2>
          </div>
          <div className="hidden md:block">
            <ArrowDownRight size={48} className="text-sky-100" strokeWidth={1.5} />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[28px] left-[60px] right-[calc(33.33%+60px)] h-px bg-slate-100" />
          
          {steps.map((step, i) => (
            <article 
              key={step.number} 
              data-testid={`step-process-${step.number}`}
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="w-14 h-14 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center font-display font-bold text-sky-600 text-lg relative z-10 mb-8 shadow-sm">
                {step.number}
              </div>
              <h3 className="font-display text-2xl font-semibold text-slate-900 mb-4">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32 bg-[#071118] text-white" id="why-us" aria-labelledby="why-title">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-3xl mb-16 animate-fade-in-up">
          <p className="text-sky-400 font-bold text-xs tracking-widest uppercase mb-4">The safe choice</p>
          <h2 id="why-title" className="font-display text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-[1.1]">
            Prepared is better than surprised.
          </h2>
          <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
            A calm, accountable crew makes a difference when the driveway disappears overnight.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {reasons.map(({ title, description, icon: Icon }, i) => (
            <article 
              key={title} 
              data-testid={`benefit-${title.slice(0, 8).replace(/\s/g, '-').toLowerCase()}`}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center text-sky-400 mb-6 shadow-inner">
                <Icon size={22} strokeWidth={2} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 leading-tight">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contracts({ onSignUp }: { onSignUp: () => void }) {
  return (
    <section className="py-24 lg:py-32 bg-sky-50 overflow-hidden border-y border-sky-100" id="contracts" aria-labelledby="contracts-title">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="animate-fade-in-left">
            <p className="text-sky-600 font-bold text-xs tracking-widest uppercase mb-4">Stay covered</p>
            <h2 id="contracts-title" className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              4 or 5 Month Seasonal Contracts
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-md">
              Choose the length that matches your property and let us take snow off your list. Simple pricing, consistent service, no winter surprises.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                <CalendarRange size={16} className="text-sky-500" /> 4 or 5 months
              </span>
              <span className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                <Check size={16} className="text-sky-500" /> Pay upfront or monthly
              </span>
              <span className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                <BadgeCheck size={16} className="text-sky-500" /> No hidden fees
              </span>
            </div>
          </div>
          
          <div className="relative animate-fade-in-right">
            {/* Decorative background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-sky-200/50 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="bg-white border border-sky-100 shadow-xl shadow-sky-900/5 rounded-2xl p-8 lg:p-12 relative z-10">
              <div className="inline-block bg-sky-50 text-sky-700 border border-sky-100 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md mb-6">
                Seasonal service agreement
              </div>
              <h3 className="font-display text-3xl font-semibold text-slate-900 mb-6 leading-tight">
                Snow handled before it becomes your problem.
              </h3>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3 text-slate-600">
                  <Check size={20} className="text-sky-500 shrink-0 mt-0.5" />
                  <span>Service planned around snowfall</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <Check size={20} className="text-sky-500 shrink-0 mt-0.5" />
                  <span>Residential and commercial coverage</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <Check size={20} className="text-sky-500 shrink-0 mt-0.5" />
                  <span>Clear terms, direct communication</span>
                </li>
              </ul>
              
              <button 
                onClick={onSignUp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#071118] hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-md transition-all duration-200"
                data-testid="button-contract-signup"
              >
                View Contract / Sign Up <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceStandards() {
  const serviceStandards = [
    {
      title: 'Dependable planning',
      description: 'Service is organized around the forecast so your property is not an afterthought when snow arrives.',
      icon: CalendarRange,
    },
    {
      title: 'Clear communication',
      description: 'Straightforward terms and direct contact make it easier to know what is covered all season.',
      icon: Mail,
    },
    {
      title: 'Property-ready service',
      description: 'Residential and commercial areas are handled with the equipment and attention the site requires.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white" aria-labelledby="service-standards-title">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20 animate-fade-in-up">
          <p className="text-sky-600 font-bold text-xs tracking-widest uppercase mb-4">What to expect</p>
          <h2 id="service-standards-title" className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
            A winter service built around clarity.
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {serviceStandards.map(({ title, description, icon: Icon }, index) => (
            <article 
              key={title} 
              data-testid={`service-standard-${index + 1}`}
              className="rounded-2xl p-8 bg-slate-50 border border-slate-100 text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-900/5 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center mb-8">
                <Icon size={23} strokeWidth={2} />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4">{title}</h3>
              <p className="text-slate-600 leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type FormValues = {
  name: string;
  phone: string;
  email: string;
  address: string;
  propertyAreas: PropertyArea[];
};
type FormErrors = Partial<Record<keyof FormValues, string>>;
type SubmissionState = 'idle' | 'sending' | 'success' | 'error';

function Contact() {
  const [values, setValues] = useState<FormValues>({
    name: '',
    phone: '',
    email: '',
    address: '',
    propertyAreas: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [website, setWebsite] = useState('');
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [submitError, setSubmitError] = useState('');
  const submissionIdRef = useRef<string | null>(null);
  const isSending = submissionState === 'sending';

  const update = (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement>) => {
    setSubmissionState((current) => current === 'sending' ? current : 'idle');
    setSubmitError('');
    submissionIdRef.current = null;
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const nextErrors = { ...current };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const togglePropertyArea = (area: PropertyArea) => {
    setSubmissionState((current) => current === 'sending' ? current : 'idle');
    setSubmitError('');
    submissionIdRef.current = null;
    setValues((current) => ({
      ...current,
      propertyAreas: current.propertyAreas.includes(area)
        ? current.propertyAreas.filter((currentArea) => currentArea !== area)
        : [...current.propertyAreas, area],
    }));
    setErrors((current) => {
      if (!current.propertyAreas) return current;
      const nextErrors = { ...current };
      delete nextErrors.propertyAreas;
      return nextErrors;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;

    const nextErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = values.phone.replace(/\D/g, '');

    if (values.name.trim().length < 2) nextErrors.name = 'Please enter your name.';
    if (phoneDigits.length < 10) nextErrors.phone = 'Please enter a valid phone number.';
    if (!emailPattern.test(values.email.trim())) nextErrors.email = 'Please enter a valid email address.';
    if (values.address.trim().length < 3) nextErrors.address = 'Please enter the property address.';
    if (values.propertyAreas.length === 0) nextErrors.propertyAreas = 'Please select at least one area to clear.';

    if (Object.keys(nextErrors).length > 0) {
      const formElement = event.currentTarget;
      const firstInvalidName = Object.keys(nextErrors)[0] as keyof FormValues;
      setErrors(nextErrors);
      setSubmissionState('idle');
      setSubmitError('');
      window.requestAnimationFrame(() => {
        if (firstInvalidName === 'propertyAreas') {
          document.getElementById('property-area-driveway')?.focus();
          return;
        }
        const firstInvalidField = formElement.elements.namedItem(firstInvalidName);
        if (firstInvalidField instanceof HTMLElement) firstInvalidField.focus();
      });
      return;
    }

    setErrors({});
    setSubmitError('');
    setSubmissionState('sending');

    const requestId = submissionIdRef.current ?? crypto.randomUUID();
    submissionIdRef.current = requestId;

    try {
      await createQuoteRequest({
        requestId,
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        address: values.address.trim(),
        propertyAreas: values.propertyAreas,
        website,
      });
      setSubmissionState('success');
      setValues({ name: '', phone: '', email: '', address: '', propertyAreas: [] });
      setWebsite('');
      submissionIdRef.current = null;
    } catch (error) {
      const status =
        typeof error === 'object' && error !== null && 'status' in error
          ? error.status
          : null;

      setSubmitError(
        status === 429
          ? 'We received several requests from this connection. Please wait a few minutes, or call us at 780-995-7459.'
          : 'We could not send your request right now. Please try again, or call us at 780-995-7459.',
      );
      setSubmissionState('error');
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-slate-50 border-t border-slate-200" id="quote" aria-labelledby="quote-title">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="animate-fade-in-left lg:pt-8">
            <p className="text-sky-600 font-bold text-xs tracking-widest uppercase mb-4">Start here</p>
            <h2 id="quote-title" className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Get Your Spot Before Winter Fills Up
            </h2>
            <p className="text-slate-600 text-lg mb-12 leading-relaxed max-w-md">
              Send a few details and we'll follow up with a straightforward quote. This form is a request only — no commitment until you're ready.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-5 text-slate-700">
                <div className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center text-sky-500 shadow-sm shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Call Us</div>
                  <a href="tel:+17809957459" className="text-lg font-semibold hover:text-sky-600 transition-colors" data-testid="link-phone">780-995-7459</a>
                </div>
              </div>
              <div className="flex items-center gap-5 text-slate-700">
                <div className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center text-sky-500 shadow-sm shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Email Us</div>
                  <a href="mailto:ailandscapinggp@gmail.com" className="text-lg font-semibold hover:text-sky-600 transition-colors" data-testid="link-email">ailandscapinggp@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-5 text-slate-700">
                <div className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center text-sky-500 shadow-sm shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Service Area</div>
                  <div className="text-lg font-semibold">Grande Prairie & Surrounding</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in-right">
            <form 
              id="quote-form"
              className="bg-white border border-slate-200 rounded-2xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 scroll-mt-24"
              onSubmit={handleSubmit} 
              noValidate 
              aria-busy={isSending}
              data-testid="form-quote"
            >
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  data-testid="input-quote-website"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-500">Name</label>
                  <input 
                    id="name" name="name" 
                    value={values.name} onChange={update('name')} 
                    placeholder="Your name" required 
                    disabled={isSending}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full bg-slate-50 border rounded-md px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-sky-500/50 focus:border-sky-500'}`}
                    data-testid="input-name" 
                  />
                  {errors.name && <p id="name-error" className="text-sm text-red-700" data-testid="error-name">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone</label>
                  <input 
                    id="phone" name="phone" type="tel" 
                    value={values.phone} onChange={update('phone')} 
                    placeholder="Your phone number" required 
                    disabled={isSending}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className={`w-full bg-slate-50 border rounded-md px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 transition-all ${errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-sky-500/50 focus:border-sky-500'}`}
                    data-testid="input-phone" 
                  />
                  {errors.phone && <p id="phone-error" className="text-sm text-red-700" data-testid="error-phone">{errors.phone}</p>}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500">Email</label>
                  <input 
                    id="email" name="email" type="email" 
                    value={values.email} onChange={update('email')} 
                    placeholder="you@example.com" required 
                    disabled={isSending}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full bg-slate-50 border rounded-md px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-sky-500/50 focus:border-sky-500'}`}
                    data-testid="input-email" 
                  />
                  {errors.email && <p id="email-error" className="text-sm text-red-700" data-testid="error-email">{errors.email}</p>}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="address" className="text-xs font-bold uppercase tracking-widest text-slate-500">Address</label>
                  <input 
                    id="address" name="address" 
                    value={values.address} onChange={update('address')} 
                    placeholder="Property address" required 
                    disabled={isSending}
                    aria-invalid={Boolean(errors.address)}
                    aria-describedby={errors.address ? 'address-error' : undefined}
                    className={`w-full bg-slate-50 border rounded-md px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 transition-all ${errors.address ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-sky-500/50 focus:border-sky-500'}`}
                    data-testid="input-address" 
                  />
                  {errors.address && <p id="address-error" className="text-sm text-red-700" data-testid="error-address">{errors.address}</p>}
                </div>
                <fieldset
                  className="sm:col-span-2 space-y-3"
                  aria-invalid={Boolean(errors.propertyAreas)}
                  aria-describedby={errors.propertyAreas ? 'property-areas-error' : undefined}
                >
                  <legend className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Areas to clear
                  </legend>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {propertyAreaOptions.map(({ value, label }) => (
                      <label
                        key={value}
                        htmlFor={`property-area-${value}`}
                        className={`flex items-center gap-3 rounded-md border px-4 py-3.5 cursor-pointer transition-colors ${
                          values.propertyAreas.includes(value)
                            ? 'border-sky-500 bg-sky-50 text-slate-900'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-sky-300'
                        }`}
                      >
                        <input
                          id={`property-area-${value}`}
                          name="propertyAreas"
                          type="checkbox"
                          checked={values.propertyAreas.includes(value)}
                          onChange={() => togglePropertyArea(value)}
                          disabled={isSending}
                          className="h-4 w-4 accent-sky-500"
                          data-testid={`checkbox-property-area-${value}`}
                        />
                        <span className="text-sm font-medium">{label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.propertyAreas && (
                    <p id="property-areas-error" className="text-sm text-red-700" data-testid="error-property-areas">
                      {errors.propertyAreas}
                    </p>
                  )}
                </fieldset>
              </div>
              
              <button 
                type="submit" 
                disabled={isSending}
                className="w-full inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-70 disabled:cursor-not-allowed text-[#071118] font-bold px-8 py-4 rounded-md transition-all duration-200 mb-4"
                data-testid="button-submit-quote"
              >
                {isSending ? (
                  <>Sending Request… <LoaderCircle size={18} className="animate-spin" /></>
                ) : (
                  <>{submissionState === 'error' ? 'Try Again' : 'Request Quote'} <Send size={18} /></>
                )}
            </button>
              
              <p className="text-center text-xs text-slate-500">
                We'll use these details to respond to your quote request. No automated service has been booked.
              </p>
              
              {submissionState === 'sending' && (
                <div className="mt-6 p-4 bg-sky-50 border border-sky-200 text-sky-900 rounded-md flex items-start gap-3" role="status" data-testid="status-quote-sending">
                  <LoaderCircle size={20} className="text-sky-500 shrink-0 mt-0.5 animate-spin" />
                  <span className="text-sm font-medium">Sending your request securely to our team…</span>
                </div>
              )}

              {submissionState === 'success' && (
                <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md flex items-start gap-3 animate-fade-in-up" role="status" data-testid="status-quote-success">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" /> 
                  <span className="text-sm font-medium">Thanks — your request was sent to our team. We'll be in touch using the details you provided.</span>
                </div>
              )}

              {submissionState === 'error' && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-md flex items-start gap-3 animate-fade-in-up" role="alert" data-testid="status-quote-error">
                  <X size={20} className="text-red-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{submitError}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#071118] text-white pt-20 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <a className="inline-flex items-center bg-[#071118] p-2 -ml-2 rounded-md mb-6" href="#top" data-testid="link-footer-brand">
              <img
                className="h-10 w-auto"
                src={logoPath}
                alt="Ai Landscaping & SnowRemoval"
                data-testid="img-footer-brand-logo"
              />
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Calm, prepared, accountable snow removal for homes and properties across Grande Prairie and surrounding areas.
            </p>
          </div>
          
          <div>
            <h4 className="text-sky-400 font-bold text-xs tracking-widest uppercase mb-6">Contact</h4>
            <div className="space-y-4 text-sm text-slate-300">
              <a href="tel:+17809957459" className="block hover:text-sky-400 transition-colors" data-testid="link-footer-phone">780-995-7459</a>
              <a href="mailto:ailandscapinggp@gmail.com" className="block hover:text-sky-400 transition-colors" data-testid="link-footer-email">ailandscapinggp@gmail.com</a>
              <p className="text-slate-500 pt-2">Response within one business day</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sky-400 font-bold text-xs tracking-widest uppercase mb-6">Service Area</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>Grande Prairie & surrounding</li>
              <li>Residential properties</li>
              <li>Commercial properties</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800 text-xs text-slate-500 gap-4">
          <span data-testid="text-copyright">© {new Date().getFullYear()} Ai Landscaping & SnowRemoval</span>
          <a href="#top" className="hover:text-sky-400 transition-colors" data-testid="link-back-to-top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}

function SignUpModal({ onClose }: { onClose: () => void }) {
  const [contractOpen, setContractOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), iframe, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getAttribute('aria-hidden') !== 'true');

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      } else if (!dialogRef.current.contains(document.activeElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fade-in" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div
        ref={dialogRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-fade-in-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        tabIndex={-1}
      >
        <button 
          ref={closeButtonRef}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors" 
          type="button" 
          aria-label="Close sign up dialog" 
          onClick={onClose} 
          data-testid="button-close-signup"
        >
          <X size={20} />
        </button>
        
        <div className="p-8 sm:p-12">
          <p className="text-sky-600 font-bold text-xs tracking-widest uppercase mb-4">Winter service</p>
          <h2 id="modal-title" className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4 leading-[1.1]">
            Let's get your property on the list.
          </h2>
          <p id="modal-description" className="text-slate-600 mb-8 leading-relaxed max-w-lg">
            Review the actual seasonal service agreement below, then send us your property details. We'll confirm availability and follow up directly — no automated booking or payment is taken here.
          </p>
          
          <button
            className="flex items-center justify-between w-full p-4 sm:p-5 bg-sky-50 hover:bg-sky-100 border border-sky-100 hover:border-sky-200 rounded-xl text-sky-800 font-semibold text-sm transition-all duration-200 mb-6 group"
            type="button"
            onClick={() => setContractOpen((open) => !open)}
            aria-expanded={contractOpen}
            aria-controls="contract-preview"
            data-testid="button-toggle-contract"
          >
            <span className="flex items-center gap-3">
              <CalendarRange size={20} className="text-sky-600" />
              {contractOpen ? 'Hide actual contract' : 'View actual contract'}
            </span>
            <ArrowRight size={18} className={`text-sky-600 transition-transform duration-300 ${contractOpen ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
          </button>
          
          {contractOpen && (
            <div id="contract-preview" className="mb-8 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 animate-fade-in-up" data-testid="contract-preview">
              <iframe
                src="/snow-removal-service-agreement.pdf#view=FitH"
                title="Ai Landscaping & SnowRemoval service agreement"
                className="w-full h-[350px] sm:h-[450px] border-0 bg-white"
              />
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                <a
                  className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold text-sm transition-colors"
                  href="/snow-removal-service-agreement.pdf"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="link-download-contract"
                >
                  Open in a new tab <ArrowRight size={14} />
                </a>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100 mt-2">
            <button 
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#071118] hover:bg-slate-800 text-white font-bold px-6 py-4 rounded-md transition-colors" 
              type="button" 
              onClick={() => { onClose(); scrollToQuote(); }} 
              data-testid="button-modal-quote"
            >
              Request a quote <ArrowRight size={16} />
            </button>
            <button 
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold px-6 py-4 rounded-md transition-colors" 
              type="button" 
              onClick={onClose} 
              data-testid="button-modal-close"
            >
              Not right now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalTriggerRef = useRef<HTMLElement | null>(null);

  const openSignUp = () => {
    modalTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setModalOpen(true);
  };

  const closeSignUp = () => {
    setModalOpen(false);
    window.requestAnimationFrame(() => modalTriggerRef.current?.focus());
  };

  return (
    <div className="min-h-screen bg-white selection:bg-sky-200 selection:text-sky-900">
      <div
        aria-hidden={modalOpen ? true : undefined}
        inert={modalOpen ? true : undefined}
        data-testid="site-background"
      >
        <Header onSignUp={openSignUp} />
        <main>
          <Hero onSignUp={openSignUp} />
          <Services />
          <HowItWorks />
          <WhyChooseUs />
          <Contracts onSignUp={openSignUp} />
          <ServiceStandards />
          <Contact />
        </main>
        <Footer />
      </div>
      {modalOpen && <SignUpModal onClose={closeSignUp} />}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
