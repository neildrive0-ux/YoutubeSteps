import type { ReactNode } from 'react';
import type { PageMeta } from '@/site';
import { SiteLayout } from '@/components/site-layout';
import { Breadcrumbs, CheckList, ContentSection, FaqSection, PageHero, PhotoPanel, PillLink, RelatedPages } from '@/components/page-sections';

export type ServicePageProps = {
  page: PageMeta;
  hero: {
    eyebrow: string;
    accent: string;
    title: string;
    intro: ReactNode;
    points?: string[];
    fallback?: string;
    /** Falling snow over the hero and the closing band. Off for landscaping. */
    snow?: boolean;
  };
  quoteHref: string;
  quoteLabel: string;
  included: { eyebrow: string; title: string; intro?: ReactNode; items: string[] };
  photo?: string;
  photoFallback: string;
  photoLabel: string;
  photoIcon: ReactNode;
  details: { eyebrow: string; title: string; body: ReactNode; bigWord?: string };
  faqTitle: string;
  extra?: ReactNode;
};

export function ServicePage({
  page,
  hero,
  quoteHref,
  quoteLabel,
  included,
  photo,
  photoFallback,
  photoLabel,
  photoIcon,
  details,
  faqTitle,
  extra,
}: ServicePageProps) {
  return (
    <SiteLayout page={page} snow={hero.snow ?? true}>
      <PageHero {...hero} quoteHref={quoteHref} quoteLabel={quoteLabel} />
      {page.breadcrumb && <Breadcrumbs label={page.breadcrumb} />}

      <ContentSection eyebrow={included.eyebrow} title={included.title} intro={included.intro}>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div data-reveal>
            <CheckList items={included.items} />
            <div className="mt-8">
              <PillLink href={quoteHref} variant="dark" track="service-included">{quoteLabel}</PillLink>
            </div>
          </div>
          <PhotoPanel photo={photo} fallback={photoFallback} label={photoLabel} icon={photoIcon} className="min-h-[340px]" />
        </div>
      </ContentSection>

      <ContentSection tone="dark" eyebrow={details.eyebrow} title={details.title} bigWord={details.bigWord}>
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-slate-300" data-reveal>
          {details.body}
        </div>
      </ContentSection>

      {extra}

      <FaqSection faqs={page.faqs ?? []} title={faqTitle} tone="snow" />
      <RelatedPages current={page.path} />
    </SiteLayout>
  );
}
