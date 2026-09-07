import { cn } from '@/lib/utils';

import type { Product } from '../../types';

const TONES = {
  brand: 'bg-brand-500',
  success: 'bg-[oklch(0.5_0.14_155)]',
  sale: 'bg-sale',
} as const;

type ProductBadge = NonNullable<Product['badge']>;

export function ProductBadge({ badge }: { badge: ProductBadge }) {
  return (
    <span
      className={cn(
        'absolute top-3.5 start-3.5 z-10 rounded-full px-3 py-1 text-[12px] font-extrabold text-white',
        TONES[badge.tone],
      )}
    >
      {badge.label}
    </span>
  );
}
