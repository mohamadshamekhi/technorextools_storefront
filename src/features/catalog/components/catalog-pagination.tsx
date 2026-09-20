'use client';

import { Icon } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import { CATALOG_PAGE_SIZE } from '../services/catalog.query';
import { useCatalogParams } from '../hooks/use-catalog-params';

export function CatalogPagination({
  total,
  page,
  lockedCategory,
}: {
  total: number;
  page: number;
  lockedCategory?: string;
}) {
  const { goToPage } = useCatalogParams(lockedCategory);
  const pageCount = Math.max(1, Math.ceil(total / CATALOG_PAGE_SIZE));
  if (pageCount <= 1) return null;

  return (
    <nav aria-label="صفحه‌بندی" className="mt-10 flex items-center justify-center gap-3">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => goToPage(page - 1)}
        className={cn(
          'border-hairline grid size-10 place-items-center rounded-xl border',
          page <= 1 && 'opacity-40',
        )}
      >
        <Icon name="chevronEnd" className="size-4 rotate-180" />
      </button>
      <span className="text-[13px] font-bold">
        صفحهٔ {toPersianDigits(page)} از {toPersianDigits(pageCount)}
      </span>
      <button
        type="button"
        disabled={page >= pageCount}
        onClick={() => goToPage(page + 1)}
        className={cn(
          'border-hairline grid size-10 place-items-center rounded-xl border',
          page >= pageCount && 'opacity-40',
        )}
      >
        <Icon name="chevronEnd" className="size-4" />
      </button>
    </nav>
  );
}
