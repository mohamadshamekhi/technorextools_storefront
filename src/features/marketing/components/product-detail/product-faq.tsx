import type { Faq } from '../../types/product-detail';
import { FaqItem } from './faq-item';

export function ProductFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="flex max-w-2xl flex-col gap-3">
      {faqs.map((faq, index) => (
        <FaqItem key={faq.question} faq={faq} open={index === 0} />
      ))}
    </div>
  );
}
