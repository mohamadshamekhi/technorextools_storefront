import type { Metadata } from 'next';

import { Container } from '@/components/atoms';
import { routes } from '@/config/routes';
import {
  CONTACT_FAQ,
  ContactChannels,
  ContactFaq,
  ContactForm,
  ContactHero,
  ContactInfoPanel,
} from '@/features/contact';
import { breadcrumbSchema, faqSchema, localBusinessSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'تماس با ما و نمایندگی',
  description:
    'راه‌های ارتباط با تکنورکس؛ تلفن، ایمیل، نشانی مجتمع صنعتی ابزار، فرم پیام و ساعات پاسخگویی برای مشاورهٔ خرید و همکاری نمایندگی.',
  path: routes.contact,
});

export default function ContactPage() {
  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: 'خانه', path: '/' },
      { name: 'تماس با ما', path: routes.contact },
    ]),
    faqSchema(CONTACT_FAQ),
  ];

  return (
    <div className="bg-surface-muted pb-24">
      <script
        type="application/ld+json"
        // Static, server-generated structured data — XSS-safe.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <ContactHero />
      <ContactChannels />
      <Container className="mt-6 grid items-start gap-6 lg:grid-cols-2">
        <ContactForm />
        <ContactInfoPanel />
      </Container>
      <ContactFaq />
    </div>
  );
}
