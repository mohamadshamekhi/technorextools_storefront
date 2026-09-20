import { Container } from '@/components/atoms';
import { Reveal } from '@/components/molecules';

import { ABOUT_FAQ } from '../../data/about';
import { AboutSectionHeading } from './about-section-heading';

type FaqItemProps = {
  question: string;
  answer: string;
};

/** Native disclosure — zero JS, keyboard-accessible, indexable content. */
function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className="border-hairline group bg-surface open:bg-surface-muted rounded-2xl border px-5 py-1">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-bold [&::-webkit-details-marker]:hidden">
        {question}
        <span
          aria-hidden
          className="text-brand-600 bg-brand-50 grid size-7 shrink-0 place-items-center rounded-full text-lg leading-none transition-transform duration-300 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <p className="text-foreground-muted pb-4 text-[13.5px] leading-loose">{answer}</p>
    </details>
  );
}

/** FAQ accordion — pairs with the FAQPage JSON-LD emitted by the page. */
export function FaqSection() {
  return (
    <section className="pb-24">
      <Container className="max-w-3xl">
        <AboutSectionHeading
          eyebrow="پرسش‌های متداول"
          title="سؤال‌های پرتکرار مشتریان"
          id="faq-heading"
        />
        <Reveal className="flex flex-col gap-3">
          {ABOUT_FAQ.map((item) => (
            <FaqItem key={item.question} {...item} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
