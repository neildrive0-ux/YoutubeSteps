import { Link } from 'wouter';
import { ArrowLeft, Clock3, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { Footer } from '@/components/site-footer';
import { Seo } from '@/components/seo';
import { PAGES } from '@/site';

const sections = [
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    content: (
      <>
        <p>
          When you request a quote through our website or a Meta (Facebook or Instagram) lead form, you may provide:
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
          <p><strong>Email:</strong> <a className="text-sky-700 underline decoration-sky-300 underline-offset-4 hover:text-sky-900" href="mailto:ailandscapinggp@gmail.com">ailandscapinggp@gmail.com</a></p>
          <p><strong>Phone:</strong> <a className="text-sky-700 underline decoration-sky-300 underline-offset-4 hover:text-sky-900" href="tel:+17809957459">780-995-7459</a></p>
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Seo page={PAGES['/privacy-policy']} />
      <header id="top" className="bg-[#071118] text-white">
        <div className="container mx-auto max-w-7xl px-6 py-5">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to home
          </Link>
        </div>
        <div className="border-t border-slate-800">
          <div className="container mx-auto max-w-7xl px-6 py-14 md:py-20">
            <div className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
              <ShieldCheck size={16} aria-hidden="true" />
              Your information matters
            </div>
            <h1 className="font-display max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              How we handle information you share when requesting snow removal services in Grande Prairie and surrounding areas.
            </p>
            <p className="mt-6 text-sm text-slate-400">Last updated · October 17, 2026</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16">
          <aside className="h-fit rounded-md border border-slate-200 bg-white p-5 lg:sticky lg:top-8">
            <h2 className="font-display text-lg font-semibold text-slate-900">On this page</h2>
            <nav aria-label="Privacy policy sections" className="mt-4">
              <ul className="space-y-3 text-sm">
                {sections.map(({ id, title }) => (
                  <li key={id}>
                    <a className="text-slate-600 transition-colors hover:text-sky-700" href={`#${id}`}>
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 border-t border-slate-200 pt-5 text-xs leading-relaxed text-slate-500">
              <p className="flex items-center gap-2"><Clock3 size={14} aria-hidden="true" /> Last updated: October 17, 2026</p>
              <p className="mt-3 flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" aria-hidden="true" /> Grande Prairie, Alberta, Canada</p>
              <p className="mt-3 flex items-start gap-2"><Mail size={14} className="mt-0.5 shrink-0" aria-hidden="true" /> <a className="break-all hover:text-sky-700" href="mailto:ailandscapinggp@gmail.com">ailandscapinggp@gmail.com</a></p>
              <p className="mt-3 flex items-center gap-2"><Phone size={14} aria-hidden="true" /> <a className="hover:text-sky-700" href="tel:+17809957459">780-995-7459</a></p>
            </div>
          </aside>

          <article className="min-w-0 rounded-md border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10">
            <p className="mb-8 text-sm leading-relaxed text-slate-600">
              Ai Landscaping &amp; Contracting Services Inc. operates under the trade name Ai Landscaping &amp; Snow Removal (“we,” “us,” or “our”), serving Grande Prairie and surrounding areas in Alberta, Canada. This policy describes how we collect, use, disclose, and safeguard personal information in connection with our website quote requests and Meta lead forms.
            </p>
            <div className="space-y-9">
              {sections.map(({ id, title, content }) => (
                <section key={id} id={id} className="scroll-mt-8 border-t border-slate-200 pt-7 first:border-0 first:pt-0">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-7 text-slate-600 [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
                    {content}
                  </div>
                </section>
              ))}
            </div>
            <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
              <p>For a quote or service inquiry, return to the <Link className="font-medium text-sky-700 underline decoration-sky-300 underline-offset-4 hover:text-sky-900" href="/">Ai Landscaping &amp; Snow Removal website</Link>.</p>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
