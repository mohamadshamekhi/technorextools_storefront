import { Icon } from '@/components/atoms';

const COPY = {
  error: {
    title: 'در حال حاضر امکان نمایش محصولات نیست',
    body: 'ارتباط با سرویس کاتالوگ برقرار نشد. کمی بعد دوباره تلاش کنید.',
  },
  empty: {
    title: 'محصولی یافت نشد',
    body: 'فیلترها را تغییر دهید یا همهٔ محصولات را ببینید.',
  },
} as const;

export function CatalogEmptyState({ variant = 'empty' }: { variant?: keyof typeof COPY }) {
  const copy = COPY[variant];
  return (
    <div className="border-hairline bg-surface rounded-card flex flex-col items-center gap-3 border py-16 text-center">
      <span className="bg-surface-sunken text-foreground-muted grid size-12 place-items-center rounded-2xl">
        <Icon name="box" className="size-6" />
      </span>
      <p className="text-base font-bold">{copy.title}</p>
      <p className="text-foreground-muted max-w-sm text-sm leading-relaxed">{copy.body}</p>
    </div>
  );
}
