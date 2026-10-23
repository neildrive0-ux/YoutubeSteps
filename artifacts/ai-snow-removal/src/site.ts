// Single source of truth for business details, page SEO and structured data.
// The build-time prerender (scripts/prerender.mjs) and the in-browser <Seo> component both read this file.

export const SITE = {
  name: 'Ai Landscaping & Snow Removal',
  shortName: 'Ai Landscaping',
  legalName: 'Ai Landscaping & Contracting Services Inc.',
  url: 'https://ailandscaping.ca',
  phoneDisplay: '780-995-7459',
  phoneHref: 'tel:+17809957459',
  phoneE164: '+1-780-995-7459',
  email: 'ailandscapinggp@gmail.com',
  city: 'Grande Prairie',
  region: 'AB',
  areas: ['Grande Prairie', 'Sexsmith', 'Clairmont', 'County of Grande Prairie No. 1'],
  priceFrom: 250,
  triggerCm: '1.5',
  logo: 'https://ailandscaping.ca/logo-512.png',
  image: 'https://ailandscaping.ca/social-preview.png',
};

// Google Ads tag + conversion labels (account 694-901-1492) and the Meta pixel.
// Leave metaPixelId blank until the client's pixel ID is available.
export const TRACKING = {
  googleAdsId: 'AW-18488338467',
  snowLeadLabel: 'EAliCOLYq6YdEKPQ9u9E',
  landscapingLeadLabel: 'h-ETCOXYq6YdEKPQ9u9E',
  callLabel: 'S-VFCOjYq6YdEKPQ9u9E',
  metaPixelId: '',
};

// Drop real photos into /public/images and put their paths here, e.g. '/images/hero.webp'.
// Until then each spot shows a designed winter/landscape background instead of a photo.
export const PHOTOS = {
  hero: '',
  snow: '',
  landscapeManagement: '',
  landscapeEnhancements: '',
  process: '',
};

export type ServiceKind = 'snow' | 'landscaping';

export type Faq = { q: string; a: string };

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  breadcrumb?: string;
  noindex?: boolean;
  faqs?: Faq[];
  service?: { name: string; type: string; description: string };
};

export const HOME_FAQS: Faq[] = [
  {
    q: 'How much does snow removal cost in Grande Prairie?',
    a: `Our residential seasonal plans start from $${SITE.priceFrom} a month. Your exact price depends on the size of your driveway, which extra areas you want cleared (walkways, steps, sidewalk, back-alley parking pad) and whether you choose a 4 or 5 month plan. Quotes are free.`,
  },
  {
    q: 'How much snow before you come out?',
    a: `Our service agreement sets the trigger at about ${SITE.triggerCm} cm of snowfall, or as required. You don't have to call us after each storm.`,
  },
  {
    q: 'Do you clear snow in Sexsmith, Clairmont and the County?',
    a: 'Yes. We clear driveways and walkways in Grande Prairie, Sexsmith, Clairmont and nearby properties in the County of Grande Prairie. Send your address and we will confirm it is on our route.',
  },
  {
    q: 'What does a seasonal snow removal contract include?',
    a: 'Plowing of your driveway and parking areas, plus any zones you pick on the quote form: walkways, steps, sidewalks and back-alley parking pads. Everything is written into one agreement you can read before you sign.',
  },
  {
    q: 'Do you do landscaping in the summer?',
    a: 'Yes. We handle landscape management like lawn mowing, cleanups and trimming, plus landscape enhancements like garden beds, sod and small projects. Use the landscaping quote form and tell us what you need.',
  },
  {
    q: 'Can I pay monthly?',
    a: 'Yes. You can pay the season in full or pay monthly, whichever is easier for you.',
  },
  {
    q: 'Are you insured?',
    a: 'Yes. Ai Landscaping is fully insured in Alberta.',
  },
];

export const CONTRACT_FAQS: Faq[] = [
  {
    q: 'How long is a seasonal snow removal contract?',
    a: 'You choose a 4 month or 5 month winter plan. The start date is written into your agreement.',
  },
  {
    q: 'When do you come out?',
    a: `Service is triggered at about ${SITE.triggerCm} cm of snowfall, or as required, so you are covered for small snowfalls as well as big storms.`,
  },
  {
    q: 'What do I need to do as a customer?',
    a: 'Keep the areas accessible, move vehicles or obstacles out of the way where you can, and let us know about any hazards like curbs, rocks or garden edges so they can be marked.',
  },
  {
    q: 'Can I read the contract before I sign?',
    a: 'Yes. The full seasonal service agreement is available on this page as a PDF.',
  },
];

export const PRICE_FAQS: Faq[] = [
  {
    q: 'How much is snow removal per month in Grande Prairie?',
    a: `Our seasonal plans start from $${SITE.priceFrom} a month. Your exact price depends on the size of your driveway and which areas you want cleared.`,
  },
  {
    q: 'What changes the price?',
    a: 'Driveway size, extra areas (walkways, steps, sidewalk, back-alley parking pad), how much hand shovelling is needed, and whether you pick a 4 or 5 month plan.',
  },
  {
    q: 'Is it cheaper than paying per visit?',
    a: 'For most homes, yes. A seasonal plan covers every qualifying snowfall for one set price, so a heavy winter does not mean a bigger bill.',
  },
  {
    q: 'How do I get an exact price?',
    a: `Call ${SITE.phoneDisplay} or send the quote form with your address and the areas you want cleared. Quotes are free and there is no commitment until you sign.`,
  },
];

export const DRIVEWAY_FAQS: Faq[] = [
  {
    q: 'Do you plow or shovel driveways?',
    a: 'Driveways and parking areas are plowed. Walkways, steps and tight spots are cleared with smaller equipment or by hand.',
  },
  {
    q: 'Do you clear back-alley parking pads?',
    a: 'Yes. Back-alley parking pads are common in Grande Prairie and can be added to your plan.',
  },
  {
    q: 'Do you clear the city sidewalk in front of my house?',
    a: 'Yes. You can add the public sidewalk along your property to your plan.',
  },
];

export const SENIOR_FAQS: Faq[] = [
  {
    q: 'Can I book snow removal for my parents?',
    a: 'Yes. Put your parent\'s address on the quote form and your own phone number, and we will sort out the details with you.',
  },
  {
    q: 'Do you clear steps and walkways, not just the driveway?',
    a: 'Yes. Steps and walkways are where most slips happen, so we recommend adding them to any plan for an older homeowner.',
  },
  {
    q: 'Do I need to call after every snowfall?',
    a: `No. Service is triggered at about ${SITE.triggerCm} cm of snow, so nobody has to remember to call.`,
  },
];

export const SNOW_ICE_FAQS: Faq[] = [
  {
    q: 'What is included in snow and ice management?',
    a: 'Plowing of your driveway and parking areas, clearing of walkways, steps and sidewalks you add to your plan, and salting or ice control where it is needed.',
  },
  {
    q: 'Do you offer one-time snow removal?',
    a: `Our focus is seasonal contracts so our route stays reliable. If you need a one-time clearing, call ${SITE.phoneDisplay} and we will tell you if we can fit you in.`,
  },
  {
    q: 'How soon after a snowfall do you come?',
    a: `Service is triggered at about ${SITE.triggerCm} cm of snow. Timing depends on the storm and our route, and it is handled within a reasonable timeframe as set out in your agreement.`,
  },
];

export const LANDSCAPE_MGMT_FAQS: Faq[] = [
  {
    q: 'What does landscape management include?',
    a: 'Regular lawn mowing and trimming, spring and fall cleanups, hedge and shrub trimming, and keeping garden beds tidy through the season.',
  },
  {
    q: 'Can I get snow removal and landscaping from the same company?',
    a: 'Yes. Many homeowners use us for landscaping in the summer and snow removal in the winter, so there is one number to call all year.',
  },
  {
    q: 'How do I get a landscaping price?',
    a: 'Send the landscaping quote form with your address and what you need, and we will call you back with a price.',
  },
];

export const LANDSCAPE_ENH_FAQS: Faq[] = [
  {
    q: 'What counts as a landscape enhancement?',
    a: 'Projects that improve the look of your yard: new garden beds and mulch, sod and seeding, planting, and other small landscape upgrades.',
  },
  {
    q: 'When is the best time to plan a landscaping project in Grande Prairie?',
    a: 'Planning over the winter and booking early is the easiest way to get on the schedule for spring and early summer.',
  },
  {
    q: 'Do you give free quotes for projects?',
    a: 'Yes. Send the landscaping quote form with a few details about the project and we will follow up.',
  },
];

export const SNOW_QUOTE_FAQS: Faq[] = [
  {
    q: 'How much is seasonal snow removal?',
    a: `Plans start from $${SITE.priceFrom} a month. Your exact price depends on the size of your driveway and is set in writing after a free quote, with no hidden fees.`,
  },
  {
    q: 'How long are the plans and how do I pay?',
    a: 'Choose a 4 or 5 month winter plan. Pay the season upfront or pay monthly.',
  },
  {
    q: 'When do you come out?',
    a: `After every snowfall that reaches about ${SITE.triggerCm} cm, or as required. You never have to call us after a storm.`,
  },
];

export const QUOTE_FAQS: Faq[] = [
  {
    q: 'Is the quote free?',
    a: 'Yes. Quotes are free and there is no commitment until you sign an agreement.',
  },
  {
    q: 'How will you contact me?',
    a: 'We call you back at the number you give us. Email is only used to send a copy of your request.',
  },
  {
    q: 'What areas do you serve?',
    a: 'Grande Prairie, Sexsmith, Clairmont and nearby homes in the County of Grande Prairie.',
  },
];

const BRAND = 'Ai Landscaping';

export const PAGES: Record<string, PageMeta> = {
  '/': {
    path: '/',
    title: `Snow Removal & Landscaping Grande Prairie | ${BRAND}`,
    description: `Snow removal and landscaping in Grande Prairie & Sexsmith. Driveways, walkways and sidewalks cleared all winter on plans from $${SITE.priceFrom}/month. Call ${SITE.phoneDisplay}.`,
    faqs: HOME_FAQS,
  },
  '/snow-removal-quote': {
    path: '/snow-removal-quote',
    title: `Snow Removal Grande Prairie | Plans From $${SITE.priceFrom}/Month | ${BRAND}`,
    description: `Seasonal snow removal in Grande Prairie, Sexsmith and the County. Driveway, walkways and steps cleared after every snowfall. Plans from $${SITE.priceFrom}/month, priced by driveway size. Free quote.`,
    breadcrumb: 'Snow removal quote',
    faqs: [...SNOW_QUOTE_FAQS, ...QUOTE_FAQS],
  },
  '/landscaping-quote': {
    path: '/landscaping-quote',
    title: `Get a Landscaping Quote in Grande Prairie | ${BRAND}`,
    description: 'Request a free landscaping quote in Grande Prairie or Sexsmith: lawn care, yard cleanups, garden beds, hedge trimming, sod and landscape projects.',
    breadcrumb: 'Landscaping quote',
    faqs: QUOTE_FAQS,
  },
  '/snow-and-ice-management': {
    path: '/snow-and-ice-management',
    title: `Snow & Ice Management Grande Prairie | ${BRAND}`,
    description: `Residential snow and ice management in Grande Prairie and Sexsmith: driveway plowing, walkways, steps, sidewalks and ice control on seasonal plans from $${SITE.priceFrom}/month.`,
    breadcrumb: 'Snow & ice management',
    faqs: SNOW_ICE_FAQS,
    service: {
      name: 'Snow & Ice Management',
      type: 'Snow removal',
      description: 'Seasonal residential snow plowing, walkway and sidewalk clearing and ice control.',
    },
  },
  '/landscape-management': {
    path: '/landscape-management',
    title: `Landscape Management & Lawn Care Grande Prairie | ${BRAND}`,
    description: 'Landscape management in Grande Prairie and Sexsmith: lawn mowing, trimming, spring and fall cleanups, hedge and shrub care. One local company for summer and winter.',
    breadcrumb: 'Landscape management',
    faqs: LANDSCAPE_MGMT_FAQS,
    service: {
      name: 'Landscape Management',
      type: 'Landscaping',
      description: 'Residential lawn mowing, trimming, seasonal cleanups and hedge and shrub care.',
    },
  },
  '/landscape-enhancements': {
    path: '/landscape-enhancements',
    title: `Landscape Enhancements Grande Prairie | ${BRAND}`,
    description: 'Landscape enhancements in Grande Prairie and Sexsmith: garden beds and mulch, sod and seeding, planting and small yard projects. Free quotes.',
    breadcrumb: 'Landscape enhancements',
    faqs: LANDSCAPE_ENH_FAQS,
    service: {
      name: 'Landscape Enhancements',
      type: 'Landscaping',
      description: 'Garden beds and mulch, sod and seeding, planting and small landscape projects.',
    },
  },
  '/seasonal-snow-removal-contracts': {
    path: '/seasonal-snow-removal-contracts',
    title: `Seasonal Snow Removal Contracts in Grande Prairie | ${BRAND}`,
    description: `4 or 5 month residential snow removal contracts in Grande Prairie and Sexsmith. Service starts at about ${SITE.triggerCm} cm of snow. Pay upfront or monthly. Read the contract online.`,
    breadcrumb: 'Seasonal contracts',
    faqs: CONTRACT_FAQS,
  },
  '/snow-removal-prices': {
    path: '/snow-removal-prices',
    title: `Snow Removal Prices in Grande Prairie | ${BRAND}`,
    description: `What residential snow removal costs in Grande Prairie: seasonal plans from $${SITE.priceFrom}/month, priced by driveway size, what changes your price and how to get a free quote.`,
    breadcrumb: 'Prices',
    faqs: PRICE_FAQS,
  },
  '/driveway-snow-removal': {
    path: '/driveway-snow-removal',
    title: `Driveway Snow Removal & Plowing in Grande Prairie | ${BRAND}`,
    description: `Driveway snow plowing in Grande Prairie and Sexsmith, plus walkways, steps, sidewalks and back-alley parking pads. Cleared from about ${SITE.triggerCm} cm of snow, all winter.`,
    breadcrumb: 'Driveway snow removal',
    faqs: DRIVEWAY_FAQS,
  },
  '/snow-removal-for-seniors': {
    path: '/snow-removal-for-seniors',
    title: `Snow Removal for Seniors in Grande Prairie | ${BRAND}`,
    description: `Dependable snow removal for seniors in Grande Prairie and Sexsmith. Driveways, walkways and steps cleared all winter, and family can book for a parent. Call ${SITE.phoneDisplay}.`,
    breadcrumb: 'Snow removal for seniors',
    faqs: SENIOR_FAQS,
  },
  '/privacy-policy': {
    path: '/privacy-policy',
    title: `Privacy & Cookie Policy | ${SITE.name}`,
    description: 'How Ai Landscaping & Snow Removal collects and uses information from quote requests, lead forms, cookies, Google Ads and Meta.',
    breadcrumb: 'Privacy policy',
  },
  '/thank-you': {
    path: '/thank-you',
    title: `Thanks, Your Quote Request Was Sent | ${BRAND}`,
    description: 'Your quote request was received.',
    noindex: true,
  },
};

export const NOT_FOUND: PageMeta = {
  path: '/404',
  title: `Page Not Found | ${SITE.name}`,
  description: 'This page does not exist. Find snow removal and landscaping in Grande Prairie and Sexsmith on our home page.',
  noindex: true,
};

export function getPageMeta(path: string): PageMeta {
  const clean = path !== '/' ? path.replace(/\/+$/, '') : path;
  return PAGES[clean] ?? NOT_FOUND;
}

export function canonicalUrl(path: string) {
  return path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`;
}

const businessId = `${SITE.url}/#business`;

export function structuredData(page: PageMeta) {
  const areaServed = SITE.areas.map((name) => ({ '@type': 'Place', name: `${name}, AB` }));
  const blocks: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      '@id': businessId,
      name: SITE.name,
      alternateName: SITE.shortName,
      legalName: SITE.legalName,
      url: `${SITE.url}/`,
      telephone: SITE.phoneE164,
      email: SITE.email,
      logo: SITE.logo,
      image: SITE.image,
      priceRange: `From $${SITE.priceFrom}/month`,
      description:
        'Residential snow removal, snow and ice management and landscaping for homes in Grande Prairie and Sexsmith, Alberta.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: 'CA',
      },
      areaServed,
      knowsAbout: [
        'Snow removal',
        'Snow and ice management',
        'Driveway snow plowing',
        'Seasonal snow removal contracts',
        'Landscape management',
        'Lawn care',
        'Landscape enhancements',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Snow & Ice Management' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Landscape Management' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Landscape Enhancements' } },
        ],
      },
    },
  ];

  if (page.path === '/') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      alternateName: SITE.shortName,
      url: `${SITE.url}/`,
    });
  }

  if (page.service) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.service.name,
      serviceType: page.service.type,
      description: page.service.description,
      provider: { '@id': businessId },
      areaServed,
      url: canonicalUrl(page.path),
    });
  }

  if (page.breadcrumb && !page.noindex) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: page.breadcrumb, item: canonicalUrl(page.path) },
      ],
    });
  }

  if (page.faqs?.length && !page.noindex) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  return blocks;
}
