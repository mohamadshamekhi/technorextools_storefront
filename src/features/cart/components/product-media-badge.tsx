import { Icon } from '@/components/atoms';

import { categoryFor } from '../utils/category-lookup';

/**
 * Small coloured category icon-chip stamped onto a product's placeholder image.
 * Renders nothing when the line has no resolvable category.
 */
export function ProductMediaBadge({ categorySlug }: { categorySlug: string | undefined }) {
  const category = categoryFor(categorySlug);
  if (!category) return null;

  return (
    <span
      className="border-surface absolute inset-e-1.5 bottom-1.5 grid size-7 place-items-center rounded-lg border-2 shadow-sm"
      style={{ backgroundColor: category.tint, color: category.ink }}
      aria-hidden
    >
      <Icon name={category.icon} className="size-3.5" />
    </span>
  );
}
