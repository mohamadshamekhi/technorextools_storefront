import { Icon } from '@/components/atoms';
import { siteConfig } from '@/config/site';
import { formatJalaliDate } from '@/features/content/utils/date';

import type { ProductQuestion } from '../../../types/pdp';

export function QaSection({ questions }: { questions: ProductQuestion[] }) {
  return (
    <div className="flex max-w-[72ch] flex-col gap-4">
      {questions.map((item) => (
        <article key={item.id} className="border-hairline rounded-2xl border p-4">
          <h3 className="text-[15px] font-bold">{item.question}</h3>
          <p className="text-foreground-muted mt-0.5 text-xs">{formatJalaliDate(item.askedAt)}</p>
          <p className="mt-3 text-sm leading-7">
            {item.answer ?? <span className="text-foreground-muted">هنوز پاسخی ثبت نشده است.</span>}
          </p>
        </article>
      ))}
      <a
        href={`tel:${siteConfig.phoneHref}`}
        className="text-brand-600 focus-visible:ring-brand-500 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold hover:underline focus-visible:ring-2 focus-visible:outline-none"
      >
        <Icon name="question" className="size-4" />
        سؤال دیگری دارید؟ با کارشناسان ما تماس بگیرید
      </a>
    </div>
  );
}
