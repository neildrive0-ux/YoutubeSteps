import { type ChangeEvent, type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

function scrollToQuote() {
  document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
}

function Brand() {
  return (
    <a className="brand-lockup" href="#top" data-testid="link-brand">
      <span className="brand-logo-shell">
        <img
          className="brand-logo"
          src={logoPath}
          alt="Ai Landscaping & SnowRemoval"
          data-testid="img-brand-logo"
        />
      </span>
    </a>
  );
}

function Header({ onSignUp }: { onSignUp: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="topbar" id="top">
      <div className="nav-inner">
        <Brand />
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          data-testid="button-mobile-menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          <a className="nav-link" href="#services" onClick={closeMenu} data-testid="link-services">Services</a>
          <a className="nav-link" href="#how-it-works" onClick={closeMenu} data-testid="link-how-it-works">How it works</a>
          <a className="nav-link" href="#why-us" onClick={closeMenu} data-testid="link-why-us">Why us</a>
          <a className="nav-link" href="#contracts" onClick={closeMenu} data-testid="link-contracts">Contracts</a>
          <button className="nav-cta" type="button" onClick={() => { closeMenu(); scrollToQuote(); }} data-testid="button-header-quote">
            Get a Quote <ArrowRight size={14} />
          </button>
        </nav>
      </div>
    </header>
  );
}

function Hero({ onSignUp }: { onSignUp: () => void }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-inner">
        <div className="reveal">
          <div className="eyebrow">Winter readiness, handled</div>
          <h1 id="hero-title">Reliable Snow Removal You Can <em>Count On</em> All Winter</h1>
          <p className="hero-copy">Serving Grande Prairie and surrounding areas with professional, insured snow removal services</p>
          <div className="hero-actions">
            <button className="btn-primary" type="button" onClick={scrollToQuote} data-testid="button-hero-quote">
              Get a Quote <ArrowRight size={15} />
            </button>
            <button className="btn-outline" type="button" onClick={onSignUp} data-testid="button-hero-signup">
              Sign Up for Winter Service
            </button>
          </div>
          <div className="hero-note"><ShieldCheck size={15} /> Insured service for homes and properties across Grande Prairie and surrounding areas</div>
        </div>
        <aside className="hero-aside reveal reveal-delay" aria-label="Service readiness">
          <div className="storm-card">
            <div className="eyebrow">Before the first storm</div>
            <h2>Make a plan while the forecast is clear.</h2>
            <p>Seasonal customers get a dependable plan in place before winter demands your attention.</p>
          </div>
          <ul className="readiness-list">
            <li><Check size={15} /> Pre-season scheduling</li>
            <li><Check size={15} /> Storm-aware service planning</li>
            <li><Check size={15} /> Clear, straightforward contracts</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services-section" id="services" aria-labelledby="services-title">
      <div className="section">
        <div className="section-header reveal">
          <div>
            <p className="section-kicker">What we clear</p>
            <h2 className="section-title" id="services-title">The whole property.<br />Ready for winter.</h2>
          </div>
          <p className="section-intro">From the first flurry to the last thaw, we keep the places that matter moving.</p>
        </div>
        <div className="services-grid">
          {services.map(({ number, title, description, icon: Icon }) => (
            <article className="service-card reveal" key={title} data-testid={`card-service-${number}`}>
              <span className="service-number">{number}</span>
              <div className="service-icon"><Icon size={20} strokeWidth={1.7} /></div>
              <h3>{title}</h3>
              <p>{description}</p>
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
    { number: '03', title: 'We Handle the Snow All Season', description: 'Your service is planned, scheduled, and looked after through the thaw.' },
  ];

  return (
    <section className="band" id="how-it-works" aria-labelledby="process-title">
      <div className="section">
        <div className="section-header reveal">
          <div>
            <p className="section-kicker">A simpler winter</p>
            <h2 className="section-title" id="process-title">Three steps.<br />Zero snow stress.</h2>
          </div>
          <ArrowDownRight size={28} color="#2783a4" />
        </div>
        <div className="steps">
          {steps.map((step) => (
            <article className="step reveal" key={step.number} data-testid={`step-process-${step.number}`}>
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="why-section" id="why-us" aria-labelledby="why-title">
      <div className="section">
        <div className="section-header reveal">
          <div>
            <p className="section-kicker">The safe choice</p>
            <h2 className="section-title" id="why-title">Prepared is better<br />than surprised.</h2>
          </div>
          <p className="section-intro" style={{ color: '#9ab2bd' }}>A calm, accountable crew makes a difference when the driveway disappears overnight.</p>
        </div>
        <div className="why-grid">
          {reasons.map(({ title, description, icon: Icon }) => (
            <article className="why-item reveal" key={title} data-testid={`benefit-${title.slice(0, 8).replace(/\s/g, '-').toLowerCase()}`}>
              <div className="why-icon"><Icon size={21} strokeWidth={1.6} /></div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contracts({ onSignUp }: { onSignUp: () => void }) {
  return (
    <section className="section" id="contracts" aria-labelledby="contracts-title">
      <div className="contracts-layout">
        <div className="contract-copy reveal">
          <p className="section-kicker">Stay covered</p>
          <h2 className="section-title" id="contracts-title">4 or 5 Month Seasonal Contracts Available</h2>
          <p>Choose the length that matches your property and let us take snow off your list. Simple pricing, consistent service, no winter surprises.</p>
          <div className="contract-facts">
            <span className="fact"><CalendarRange size={14} /> 4 or 5 months</span>
            <span className="fact"><Check size={14} /> Pay upfront or monthly</span>
            <span className="fact"><BadgeCheck size={14} /> No hidden fees</span>
          </div>
        </div>
        <div className="contract-card reveal reveal-delay">
          <div className="contract-card-inner">
            <div className="contract-label">Seasonal service agreement</div>
            <h3>Snow handled before it becomes your problem.</h3>
            <ul>
              <li><Check size={15} /> Service planned around snowfall</li>
              <li><Check size={15} /> Residential and commercial coverage</li>
              <li><Check size={15} /> Clear terms, direct communication</li>
            </ul>
            <button className="btn-primary" type="button" onClick={onSignUp} data-testid="button-contract-signup">
              View Contract / Sign Up <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { quote: 'Placeholder review copy: dependable service, clear communication, and one less thing to think about after every storm.', name: 'Residential customer', location: 'Alberta homeowner', initial: 'R' },
    { quote: 'Placeholder review copy: our property stays accessible and the crew is easy to work with all season.', name: 'Property manager', location: 'Alberta commercial site', initial: 'P' },
    { quote: 'Placeholder review copy: professional, prepared, and exactly what we needed for winter.', name: 'Local customer', location: 'Alberta service area', initial: 'L' },
  ];

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="section">
        <div className="section-header reveal">
          <div>
            <p className="section-kicker">Good words, earned</p>
            <h2 className="section-title" id="testimonials-title">People sleep better<br />when snow is covered.</h2>
          </div>
        </div>
        <div className="testimonial-grid">
          {reviews.map((review, index) => (
            <article className={`testimonial reveal ${index === 0 ? 'featured' : ''}`} key={review.name} data-testid={`testimonial-${index + 1}`}>
              <div>
                <div className="quote-mark">“</div>
                <blockquote>{review.quote}</blockquote>
              </div>
              <div className="testimonial-author">
                <span className="author-dot">{review.initial}</span>
                <span><span className="author-name">{review.name}</span><span className="author-location">{review.location}</span></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type FormValues = { name: string; phone: string; email: string; address: string };

function Contact() {
  const [values, setValues] = useState<FormValues>({ name: '', phone: '', email: '', address: '' });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement>) => {
    setSubmitted(false);
    setValues((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact-section" id="quote" aria-labelledby="quote-title">
      <div className="section">
        <div className="contact-layout">
          <div className="contact-copy reveal">
            <p className="section-kicker">Start here</p>
            <h2 className="section-title" id="quote-title">Get Your Spot Before Winter Fills Up</h2>
            <p>Send a few details and we’ll follow up with a straightforward quote. This form is a request only — no commitment until you’re ready.</p>
            <div className="contact-detail"><Phone size={15} /> <a href="tel:+17809957459" data-testid="link-phone">780-995-7459</a></div>
            <div className="contact-detail"><Mail size={15} /> <a href="mailto:ailandscapinggp@gmail.com" data-testid="link-email">ailandscapinggp@gmail.com</a></div>
            <div className="contact-detail"><MapPin size={15} /> Serving Grande Prairie and surrounding areas</div>
          </div>
          <form className="contact-form reveal reveal-delay" onSubmit={handleSubmit} noValidate data-testid="form-quote">
            <div className="form-grid">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" value={values.name} onChange={update('name')} placeholder="Your name" required data-testid="input-name" />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" value={values.phone} onChange={update('phone')} placeholder="Your phone number" required data-testid="input-phone" />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={values.email} onChange={update('email')} placeholder="you@example.com" required data-testid="input-email" />
              </div>
              <div className="field">
                <label htmlFor="address">Address</label>
                <input id="address" name="address" value={values.address} onChange={update('address')} placeholder="Property address" required data-testid="input-address" />
              </div>
            </div>
            <button className="btn-primary" type="submit" data-testid="button-submit-quote">Get Your Spot Before Winter Fills Up <Send size={15} /></button>
            <p className="form-note">We’ll use these details to respond to your quote request. No automated service has been booked.</p>
            {submitted && (
              <div className="success-message" role="status" data-testid="status-quote-success">
                <CheckCircle2 size={17} /> Thanks — your request is ready for our team. We’ll be in touch using the details you provided.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <Brand />
          <p className="footer-copy">Calm, prepared, accountable snow removal for homes and properties across Grande Prairie and surrounding areas.</p>
        </div>
        <div>
          <p className="footer-heading">Contact</p>
          <p className="footer-detail"><a href="tel:+17809957459" data-testid="link-footer-phone">780-995-7459</a><br /><a href="mailto:ailandscapinggp@gmail.com" data-testid="link-footer-email">ailandscapinggp@gmail.com</a><br />Response within one business day</p>
        </div>
        <div>
          <p className="footer-heading">Service area</p>
          <p className="footer-detail">Grande Prairie &amp; surrounding areas<br />Residential properties<br />Commercial properties</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span data-testid="text-copyright">Copyright 2026 Ai Landscaping &amp; SnowRemoval</span>
        <a href="#top" data-testid="link-back-to-top">Back to top</a>
      </div>
    </footer>
  );
}

function SignUpModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" type="button" aria-label="Close sign up dialog" onClick={onClose} data-testid="button-close-signup">
          <X size={19} />
        </button>
        <p className="section-kicker">Winter service</p>
        <h2 id="modal-title">Let’s get your property on the list.</h2>
        <p>Choose a seasonal plan, then send us your property details. We’ll confirm availability and follow up with the contract — no automated booking or payment is taken here.</p>
        <div className="modal-actions">
          <button className="btn-primary" type="button" onClick={() => { onClose(); scrollToQuote(); }} data-testid="button-modal-quote">
            Request a quote <ArrowRight size={15} />
          </button>
          <button className="btn-outline" type="button" onClick={onClose} data-testid="button-modal-close">Not right now</button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="site-shell">
      <Header onSignUp={() => setModalOpen(true)} />
      <main>
        <Hero onSignUp={() => setModalOpen(true)} />
        <Services />
        <HowItWorks />
        <WhyChooseUs />
        <Contracts onSignUp={() => setModalOpen(true)} />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      {modalOpen && <SignUpModal onClose={() => setModalOpen(false)} />}
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