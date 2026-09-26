import { Container } from '@/components/atoms';

import { CONTACT_FAQ } from '../data/contact';

/** Native disclosure list — zero JS, indexable, pairs with the FAQPage JSON-LD. */
export function ContactFaq() {
  return (
    <Container as="section" aria-labelledby="contact-faq-heading" className="mt-16 max-w-3xl">
      <h2 id="contact-faq-heading" className="mb-2 text-center text-2xl font-black">
        پیش از تماس، این‌ها را ببینید
      </h2>
      <p className="text-foreground-muted mb-8 text-center text-sm leading-loose">
        بیشتر سؤال‌هایی که از ما پرسیده می‌شود همین چهارتاست.
      </p>
      <div className="flex flex-col gap-3">
        {CONTACT_FAQ.map((item) => (
          <details
            key={item.question}
            className="border-hairline group bg-surface open:bg-surface-muted rounded-2xl border px-5 py-1"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-bold [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden
                className="text-brand-600 bg-brand-50 grid size-7 shrink-0 place-items-center rounded-full text-lg leading-none transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="text-foreground-muted pb-4 text-[13.5px] leading-loose">{item.answer}</p>
          </details>
        ))}
      </div>
    </Container>
  );
}
