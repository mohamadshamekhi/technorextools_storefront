import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

const COPY = {
  error: {
    icon: 'alert',
    title: 'در حال حاضر امکان نمایش محصولات نیست',
    body: 'ارتباط با سرویس کاتالوگ برقرار نشد. کمی بعد دوباره تلاش کنید.',
  },
  empty: {
    icon: 'search',
    title: 'محصولی با این فیلترها پیدا نشد',
    body: 'یکی از فیلترها را بردارید یا بازهٔ قیمت را بازتر کنید.',
  },
} as const;

type CatalogEmptyStateProps = { variant?: keyof typeof COPY; body?: string };

export function CatalogEmptyState({ variant = 'empty', body }: CatalogEmptyStateProps) {
  const copy = COPY[variant];
  return (
    <div className="border-hairline bg-surface rounded-card flex flex-col items-center border border-dashed px-6 py-16 text-center">
      <span className="bg-brand-50 text-brand-500 mb-5 grid size-16 place-items-center rounded-2xl">
        <Icon name={copy.icon} className="size-7" />
      </span>
      <p className="text-lg font-black">{copy.title}</p>
      <p className="text-foreground-muted mt-2 max-w-md text-sm leading-loose">
        {body ?? copy.body}
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          href={routes.products}
          className="bg-brand-500 flex min-h-11 items-center rounded-xl bg-(image:--gradient-brand) px-5 text-sm font-bold text-white shadow-(--shadow-brand) transition-[filter] hover:brightness-110"
        >
          نمایش همه محصولات
        </Link>
        <Link
          href={routes.categories}
          className="border-hairline text-foreground hover:border-brand-300 hover:text-brand-600 flex min-h-11 items-center rounded-xl border px-5 text-sm font-bold transition-colors"
        >
          مرور دسته‌بندی‌ها
        </Link>
      </div>
    </div>
  );
}
