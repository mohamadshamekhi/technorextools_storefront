import Link from 'next/link';

import { routes } from '@/config/routes';
import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

type ToolbarProps = { count: number; q?: string; inStock?: boolean };

const buildHref = (q: string | undefined, stockOnly: boolean) => {
  const search = new URLSearchParams();
  if (q) search.set('q', q);
  if (stockOnly) search.set('inStock', 'true');
  const query = search.toString();
  return query ? `${routes.spareParts}?${query}` : routes.spareParts;
};

const chip = (active: boolean) =>
  cn(
    'flex min-h-9 items-center rounded-full px-4 text-[13px] font-bold transition-colors',
    active
      ? 'bg-ink text-white'
      : 'border-hairline text-foreground-muted hover:text-brand-600 hover:border-brand-200 border',
  );

/** Result count + stock filter chips above the grid. */
export function SparePartsToolbar({ count, q, inStock }: ToolbarProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <p className="text-foreground-muted text-sm">
        <span className="text-foreground font-black tabular-nums">{toPersianDigits(count)}</span>{' '}
        قطعه {q ? <>برای «{q}» </> : null}یافت شد
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Link href={buildHref(q, false)} className={chip(!inStock)}>
          همه قطعات
        </Link>
        <Link href={buildHref(q, true)} className={chip(Boolean(inStock))}>
          فقط موجود
        </Link>
      </div>
    </div>
  );
}
