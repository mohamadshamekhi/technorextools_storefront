import type { Metadata } from 'next';

import { Icon } from '@/components/atoms';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({ title: 'گزارش‌ها', noindex: true });

export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-xl font-black tracking-tight sm:text-[1.35rem]">گزارش‌ها و آمار</h1>
      <div className="border-hairline bg-surface rounded-card mt-6 grid place-items-center gap-3 border px-6 py-16 text-center shadow-(--shadow-soft)">
        <span className="bg-brand-50 text-brand-600 ring-brand-100 grid size-14 place-items-center rounded-2xl ring-1">
          <Icon name="trend" className="size-7" />
        </span>
        <p className="text-[15px] font-bold">به‌زودی</p>
        <p className="text-foreground-muted max-w-sm text-[13px] leading-loose">
          نمودار خرید، تفکیک دسته‌بندی‌ها و روند سفارش‌ها در این بخش اضافه می‌شود.
        </p>
      </div>
    </div>
  );
}
