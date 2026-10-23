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
  areas: ['Grande Prairie', 'Sexsmith', 'County of Grande Prairie No. 1'],
  priceFrom: 150,
  priceLargeFrom: 250,
  triggerCm: '1.5',
  logo: 'https://ailandscaping.ca/app-icon-512.png',
  image: 'https://ailandscaping.ca/social-preview.png',
};

// Fill these in to turn on conversion tracking. Leave blank to load nothing.
export const TRACKING = {
  googleAdsId: '', // e.g. 'AW-123456789'
  googleAdsLeadLabel: '', // conversion label for "Quote request"
  googleAdsCallLabel: '', // optional conversion label for phone clicks
  metaPixelId: '', // e.g. '123456789012345'
};

export type Faq = { q: string; a: string };

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  faqs?: Faq[];
};

export const HOME_FAQS: Faq[] = [
  {
    q: 'How much does snow removal cost in Grande Prairie?',
    a: `Our residential seasonal plans start from $${SITE.priceFrom} a month, and larger driveways start from $${SITE.priceLargeFrom} a month. Your exact price depends on the size of your driveway, which extra areas you want cleared (walkways, steps, sidewalk, back-alley parking pad) and whether you choose a 4 or 5 month plan. Quotes are free.`,
  },
  {
    q: 'How much snow before you come out?',
    a: `Our service agreement sets the trigger at about ${SITE.triggerCm} cm of snowfall, or as required. You don't have to call us after each storm.`,
  },
  {
    q: 'Do you clear snow in Sexsmith and the County?',
    a: 'Yes. We clear driveways and walkways in Grande Prairie, Sexsmith and nearby properties in the County of Grande Prairie. Send your address and we will confirm it is on our route.',
  },
  {
    q: 'What does a seasonal snow removal contract include?',
    a: 'Plowing of your driveway and parking areas, plus any zones you pick on the quote form: walkways, steps, sidewalks and back-alley parking pads. Everything is written into one agreement you can read before you sign.',
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
    a: `Our seasonal plans start from $${SITE.priceFrom} a month for a standard residential driveway. Larger driveways and lots start from $${SITE.priceLargeFrom} a month.`,
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

export const PAGES: Record<string, PageMeta> = {
  '/': {
    path: '/',
    title: 'Snow Removal Grande Prairie & Sexsmith | Ai Landscaping',
    description: `Residential snow removal in Grande Prairie & Sexsmith. Driveways, walkways and sidewalks cleared all winter on 4 or 5 month plans from $${SITE.priceFrom}/month. Call ${SITE.phoneDisplay}.`,
    faqs: HOME_FAQS,
  },
  '/seasonal-snow-removal-contracts': {
    path: '/seasonal-snow-removal-contracts',
    title: 'Seasonal Snow Removal Contracts in Grande Prairie | Ai Landscaping',
    description: `4 or 5 month residential snow removal contracts in Grande Prairie and Sexsmith. Service starts at about ${SITE.triggerCm} cm of snow. Pay upfront or monthly. Read the contract online.`,
    faqs: CONTRACT_FAQS,
  },
  '/snow-removal-prices': {
    path: '/snow-removal-prices',
    title: 'Snow Removal Prices in Grande Prairie | Ai Landscaping',
    description: `What residential snow removal costs in Grande Prairie: seasonal plans from $${SITE.priceFrom}/month, larger driveways from $${SITE.priceLargeFrom}/month, what changes your price and how to get a free quote.`,
    faqs: PRICE_FAQS,
  },
  '/driveway-snow-removal': {
    path: '/driveway-snow-removal',
    title: 'Driveway Snow Removal & Plowing in Grande Prairie | Ai Landscaping',
    description: `Driveway snow plowing in Grande Prairie and Sexsmith, plus walkways, steps, sidewalks and back-alley parking pads. Cleared from about ${SITE.triggerCm} cm of snow, all winter.`,
    faqs: DRIVEWAY_FAQS,
  },
  '/snow-removal-for-seniors': {
    path: '/snow-removal-for-seniors',
    title: 'Snow Removal for Seniors in Grande Prairie | Ai Landscaping',
    description: `Dependable snow removal for seniors in Grande Prairie and Sexsmith. Driveways, walkways and steps cleared all winter, and family can book for a parent. Call ${SITE.phoneDisplay}.`,
    faqs: SENIOR_FAQS,
  },
  '/privacy-policy': {
    path: '/privacy-policy',
    title: 'Privacy Policy | Ai Landscaping & Snow Removal',
    description: 'How Ai Landscaping & Snow Removal collects and uses information from website quote requests and Meta lead forms.',
  },
  '/thank-you': {
    path: '/thank-you',
    title: 'Thanks, Your Quote Request Was Sent | Ai Landscaping',
    description: 'Your snow removal quote request was received.',
    noindex: true,
  },
};

export const NOT_FOUND: PageMeta = {
  path: '/404',
  title: 'Page Not Found | Ai Landscaping & Snow Removal',
  description: 'This page does not exist. Find snow removal in Grande Prairie and Sexsmith on our home page.',
  noindex: true,
};

export function getPageMeta(path: string): PageMeta {
  const clean = path !== '/' ? path.replace(/\/+$/, '') : path;
  return PAGES[clean] ?? NOT_FOUND;
}

export function canonicalUrl(path: string) {
  return path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`;
}

export function structuredData(page: PageMeta) {
  const business = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE.url}/#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: `${SITE.url}/`,
    telephone: SITE.phoneE164,
    email: SITE.email,
    logo: SITE.logo,
    image: SITE.image,
    priceRange: `From $${SITE.priceFrom}/month`,
    description:
      'Residential snow removal and seasonal snow clearing contracts for driveways, walkways, steps and sidewalks in Grande Prairie and Sexsmith, Alberta.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: 'CA',
    },
    areaServed: SITE.areas.map((name) => ({ '@type': 'Place', name: `${name}, AB` })),
    knowsAbout: ['Snow removal', 'Snow plowing', 'Driveway snow clearing', 'Seasonal snow removal contracts'],
  };

  const blocks: object[] = [business];
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
