import type { Metadata } from 'next';

import {
  AboutCta,
  AboutHero,
  AboutStatsBand,
  AboutValuesSection,
  FaqSection,
  MissionSection,
  TeamSection,
  TimelineSection,
} from '@/features/marketing';
import { ABOUT_FAQ } from '@/features/marketing/data/about';
import { breadcrumbSchema, faqSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'درباره ما؛ ۱۴ سال تجربه در تأمین ابزار صنعتی',
  description:
    'داستان پوما ایر؛ از فروشگاه کوچک ابزار تا نمایندگی رسمی پوما ایر در ایران با گارانتی اصالت، مشاوره فنی و خدمات پس از فروش سراسری.',
  path: '/about',
});

export default function AboutPage() {
  const schemas = [
    breadcrumbSchema([
      { name: 'خانه', path: '/' },
      { name: 'درباره ما', path: '/about' },
    ]),
    faqSchema(ABOUT_FAQ),
  ];

  return (
    <article className="bg-surface-muted">
      <script
        type="application/ld+json"
        // Static, server-generated structured data — XSS-safe.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <AboutHero />
      <MissionSection />
      <AboutStatsBand />
      <TimelineSection />
      <AboutValuesSection />
      <TeamSection />
      <FaqSection />
      <AboutCta />
    </article>
  );
}
