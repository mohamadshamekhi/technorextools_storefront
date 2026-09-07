import { toPersianDigits } from '../../utils/persian';
import type { CatalogView, SortKey } from '../../types/catalog';
import { SortMenu } from './sort-menu';
import { ViewToggle } from './view-toggle';

type CatalogToolbarProps = {
  count: number;
  sort: SortKey;
  onSortChange: (value: SortKey) => void;
  view: CatalogView;
  onViewChange: (value: CatalogView) => void;
};

export function CatalogToolbar({
  count,
  sort,
  onSortChange,
  view,
  onViewChange,
}: CatalogToolbarProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <p className="text-foreground-muted text-[13.5px]">
        <span className="text-foreground font-bold">{toPersianDigits(count)}</span> محصول یافت شد
      </p>
      <div className="flex items-center gap-3">
        <SortMenu value={sort} onChange={onSortChange} />
        <ViewToggle value={view} onChange={onViewChange} />
      </div>
    </div>
  );
}
