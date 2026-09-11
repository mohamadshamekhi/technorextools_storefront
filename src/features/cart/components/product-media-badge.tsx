import { Icon } from '@/components/atoms';

import { categoryChip } from '../utils/category-lookup';

/** Small coloured category icon-chip stamped onto a product's placeholder image. */
export function ProductMediaBadge({ categorySlug }: { categorySlug: string | undefined }) {
  const chip = categoryChip(categorySlug);

  return (
    <span
      className="border-surface absolute inset-e-1.5 bottom-1.5 grid size-7 place-items-center rounded-lg border-2 shadow-sm"
      style={{ backgroundColor: chip.tint, color: chip.ink }}
      aria-hidden
    >
      <Icon name={chip.icon} className="size-3.5" />
    </span>
  );
}
