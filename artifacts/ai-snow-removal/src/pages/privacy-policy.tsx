import { Link } from 'wouter';
import { Clock3, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { SiteLayout } from '@/components/site-layout';
import { Breadcrumbs, SnowDrift } from '@/components/page-sections';
import { openCookieSettings } from '@/components/cookie-consent';
import { PAGES } from '@/site';

const sections = [
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    content: (
      <>
        <p>
          When you request a quote through our website, a Google Ads lead form, or a Meta (Facebook or Instagram) lead form, you may provide:
        </p>
        <ul>
          <li>Your name, phone number, and email address.</li>
          <li>The property address where you are asking about service.</li>
          <li>Snow removal requirements, such as the areas to clear (for example, a driveway, sidewalk, staircase, or back-alley parking pad) and other details you choose to include.</li>
        </ul>
        <p>
          Meta may also provide information you submit through its lead forms to us. Meta independently handles information under its own privacy terms and practices.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use-information',
    title: 'How we use information',
    content: (
      <>
        <p>We use the information you provide to:</p>
        <ul>
          <li>Prepare and provide a quote based on your property and service requirements.</li>
          <li>Respond to your inquiry and follow up using the contact details you supplied.</li>
          <li>Discuss, arrange, and, if you accept, provide snow removal or related services.</li>
          <li>Send service-related communications, including confirmation that a website quote request was received.</li>
          <li>Maintain business records and meet applicable legal obligations.</li>
        </ul>
        <p>
          Sending a quote request does not itself book or schedule service. We will use your information for these purposes and for other purposes explained to you when the information is collected or otherwise permitted or required by law.
        </p>
      </>
    ),
  },
  {
    id: 'sharing-information',
    title: 'When information may be shared',
    content: (
      <>
        <p>
          We may share personal information with service providers that help us operate the website, store or process quote requests, communicate by email, or receive lead-form submissions. Those providers may handle information on our behalf under their own service terms.
        </p>
        <p>
          We may also disclose information when you direct us to do so, when disclosure is required or authorized by law, or when reasonably necessary to protect legal rights, safety, or the operation of our services.
        </p>
        <p>
          We do not sell personal information or share it with other people or businesses for their own independent purposes. Necessary service providers may process information to support the website, store quote requests, and deliver email.
        </p>
      </>
    ),
  },
  {
    id: 'service-providers',
    title: 'Third-party service providers',
    content: (
      <>
        <p>Services involved in the current website or its lead channels include:</p>
        <ul>
          <li><strong>Meta (Meta Business Suite, Facebook, and Instagram):</strong> may collect information through its lead forms and provide it to us when you submit a form there. Meta handles information submitted through its forms under its own privacy terms and practices.</li>
          <li><strong>Google (Google Ads):</strong> measures which ads lead to quote requests and phone calls, and may collect information through Google Ads lead forms and provide it to us when you submit a form there. Google handles this information under its own privacy terms.</li>
          <li><strong>Resend:</strong> delivers quote-request email notifications and, when available, customer confirmations.</li>
          <li><strong>Replit:</strong> hosts the website and PostgreSQL database where quote requests are stored.</li>
        </ul>
        <p>
          Replit and Resend may process or store information outside Alberta or Canada, where it may be subject to the laws of those locations. We do not know their exact processing locations.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies, ads measurement and your choices',
    content: (
      <>
        <p>
          This website uses the Google tag (for Google Ads) and may use the Meta pixel. These tools use cookies and similar technologies to tell us which ads lead to quote requests and phone calls, and to show relevant ads on Google, Facebook and Instagram.
        </p>
        <ul>
          <li><strong>What is measured:</strong> page visits, clicks on our phone number and quote buttons, and completed quote requests. We do not send your form answers (like your name or address) to Google or Meta from this website.</li>
          <li><strong>Your choice:</strong> when you first visit, a banner lets you accept or decline these cookies. If you decline, Google is told not to use advertising cookies and the Meta pixel is switched off.</li>
          <li><strong>Change your mind:</strong> use the &ldquo;Cookie settings&rdquo; link at the bottom of any page. You can also clear cookies in your browser.</li>
        </ul>
        <p>
          The website also stores your cookie choice and, while you browse, a temporary note that your quote request was sent, in your own browser.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Data security',
    content: (
      <p>
        At the business level, we use two-factor authentication to help protect business accounts. We do not currently use other safeguards. The website and service providers may apply their own security measures. No method of transmission or storage can be guaranteed to be completely secure.
      </p>
    ),
  },
  {
    id: 'retention',
    title: 'How long we keep information',
    content: (
      <p>
        We automatically delete quote request records from our database when they are more than one calendar month old. This cleanup runs periodically, so a record may remain until the next cleanup after the one-month point. This does not delete copies of email notifications or information retained by service providers, which may follow their own retention practices.
      </p>
    ),
  },
  {
    id: 'your-privacy-rights',
    title: 'Your privacy rights',
    content: (
      <>
        <p>
          Alberta’s <em>Personal Information Protection Act</em> (PIPA) generally applies to private-sector organizations operating within Alberta. Canada’s <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA) may also apply in circumstances such as certain interprovincial or international activities.
        </p>
        <p>
          Subject to applicable law and its exceptions, you may ask to access personal information we hold about you, request a correction, or raise a concern about how it has been handled. You may also withdraw consent where the law permits, although this may affect our ability to provide a quote or service. Contact us using the details below to make a request. We may need to verify your identity before responding.
        </p>
        <p>
          If we cannot resolve a privacy concern, you may contact the Office of the Information and Privacy Commissioner of Alberta.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us about privacy',
    content: (
      <>
        <p>
          Ai Landscaping &amp; Snow Removal is a trade name of Ai Landscaping &amp; Contracting Services Inc. To ask a privacy question or make an access or correction request, contact us:
        </p>
        <address className="not-italic space-y-2">
          <p><strong>Email:</strong> <a className="text-ice underline underline-offset-4 hover:text-white" href="mailto:ailandscapinggp@gmail.com">ailandscapinggp@gmail.com</a></p>
          <p><strong>Phone:</strong> <a className="text-ice underline underline-offset-4 hover:text-white" href="tel:+17809957459">780-995-7459</a></p>
          <p><strong>Service area:</strong> Grande Prairie and surrounding areas, Alberta</p>
        </address>
      </>
    ),
  },
  {
    id: 'policy-updates',
    title: 'Updates to this policy',
    content: (
      <p>
        We may update this policy to reflect changes to our practices or legal requirements. The latest version will be posted on this page with its updated date.
      </p>
    ),
  },
];

export function PrivacyPolicy() {
  const page = PAGES['/privacy-policy'];
  return (
    <SiteLayout page={page} cta={false}>
      <section className="hero-fallback relative overflow-hidden text-white" aria-labelledby="page-title">
        <div className="relative mx-auto max-w-4xl px-4 pb-24 pt-40 text-center sm:px-6 md:pt-44">
          <p className="eyebrow text-ice-soft">Your information matters</p>
          <h1 id="page-title" className="heading-xl mt-5 text-5xl md:text-7xl">
            <span className="block text-ice">Privacy &amp;</span>
            <span className="block">Cookie Policy</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-200">
            How we handle information you share when requesting snow removal or landscaping in Grande Prairie and surrounding areas, and how cookies are used on this website.
          </p>
          <p className="mt-4 text-sm text-slate-400">Last updated · October 22, 2026</p>
        </div>
        <SnowDrift fill="#0b1822" />
      </section>

      <div className="bg-base-2">
        <Breadcrumbs label={page.breadcrumb ?? 'Privacy policy'} />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16">
          <aside className="h-fit rounded-3xl border border-white/10 bg-raise p-5 lg:sticky lg:top-28">
            <h2 className="heading-xl text-2xl text-white">On this page</h2>
            <nav aria-label="Privacy policy sections" className="mt-4">
              <ul className="space-y-3 text-sm">
                {sections.map(({ id, title }) => (
                  <li key={id}>
                    <a className="text-slate-300 transition-colors hover:text-ice" href={`#${id}`}>
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-xs leading-relaxed text-slate-400">
              <p className="flex items-center gap-2"><Clock3 size={14} aria-hidden="true" /> Last updated: October 22, 2026</p>
              <p className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" aria-hidden="true" /> Grande Prairie, Alberta, Canada</p>
              <p className="flex items-start gap-2"><Mail size={14} className="mt-0.5 shrink-0" aria-hidden="true" /> <a className="break-all hover:text-ice" href="mailto:ailandscapinggp@gmail.com">ailandscapinggp@gmail.com</a></p>
              <p className="flex items-center gap-2"><Phone size={14} aria-hidden="true" /> <a className="hover:text-ice" href="tel:+17809957459">780-995-7459</a></p>
              <button type="button" onClick={openCookieSettings} className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-bold text-white hover:border-ice">
                <ShieldCheck size={14} aria-hidden="true" /> Cookie settings
              </button>
            </div>
          </aside>

          <article className="min-w-0 rounded-3xl border border-white/10 bg-raise px-6 py-8 shadow-sm sm:px-10 sm:py-10">
            <p className="mb-8 text-sm leading-relaxed text-slate-300">
              Ai Landscaping &amp; Contracting Services Inc. operates under the trade name Ai Landscaping &amp; Snow Removal (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), serving Grande Prairie and surrounding areas in Alberta, Canada. This policy describes how we collect, use, disclose, and safeguard personal information in connection with our website, quote requests, cookies, and Google and Meta lead forms.
            </p>
            <div className="space-y-9">
              {sections.map(({ id, title, content }) => (
                <section key={id} id={id} className="scroll-mt-28 border-t border-white/10 pt-7 first:border-0 first:pt-0">
                  <h2 className="heading-xl text-3xl text-white">{title}</h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-7 text-slate-300 [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
                    {content}
                  </div>
                </section>
              ))}
            </div>
            <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-400">
              <p>For a quote, visit our <Link className="font-medium text-ice underline underline-offset-4 hover:text-white" href="/snow-removal-quote">snow removal quote</Link> or <Link className="font-medium text-ice underline underline-offset-4 hover:text-white" href="/landscaping-quote">landscaping quote</Link> page.</p>
            </div>
          </article>
        </div>
      </div>
    </SiteLayout>
  );
}
