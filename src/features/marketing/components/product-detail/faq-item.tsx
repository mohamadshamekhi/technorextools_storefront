import { Icon } from '@/components/atoms';

import type { Faq } from '../../types/product-detail';

/** Native `<details>` disclosure — accessible and JS-free. */
export function FaqItem({ faq, open }: { faq: Faq; open?: boolean }) {
  return (
    <details
      open={open}
      className="border-hairline hover:border-brand-500/40 rounded-2xl border transition-colors open:[&_svg]:rotate-180"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-bold marker:hidden">
        {faq.question}
        <span className="bg-surface-sunken grid size-6 shrink-0 place-items-center rounded-full">
          <Icon name="chevronDown" className="text-brand-600 size-3.5 transition-transform" />
        </span>
      </summary>
      <p className="text-foreground-muted px-4 pb-4 text-[13.5px] leading-relaxed">{faq.answer}</p>
    </details>
  );
}
