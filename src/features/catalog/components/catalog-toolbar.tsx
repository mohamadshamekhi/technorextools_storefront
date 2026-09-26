import { toPersianDigits } from '@/lib/persian';

import { CATALOG_PAGE_SIZE } from '../services/catalog.query';
import { ActiveFilterChips } from './active-filter-chips';
import { CatalogSort } from './catalog-sort';

type Option = { slug: string; title: string };

type CatalogToolbarProps = {
  total: number;
  page: number;
  shown: number;
  categories: Option[];
  brands: Option[];
  lockedCategory?: string;
};

/** Result summary + active filter chips + sort, above the grid. */
export function CatalogToolbar({
  total,
  page,
  shown,
  categories,
  brands,
  lockedCategory,
}: CatalogToolbarProps) {
  const from = total === 0 ? 0 : (page - 1) * CATALOG_PAGE_SIZE + 1;
  const to = (page - 1) * CATALOG_PAGE_SIZE + shown;

  return (
    <div className="border-hairline bg-surface rounded-card mb-6 flex flex-col gap-4 border px-5 py-4 shadow-(--shadow-soft)">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[15px] font-black">
            <span className="tabular-nums">{toPersianDigits(total)}</span> محصول
          </p>
          <p className="text-foreground-muted mt-0.5 text-[12.5px]">
            نمایش {toPersianDigits(from)} تا {toPersianDigits(to)}
          </p>
        </div>
        <CatalogSort lockedCategory={lockedCategory} />
      </div>
      <ActiveFilterChips categories={categories} brands={brands} lockedCategory={lockedCategory} />
    </div>
  );
}
