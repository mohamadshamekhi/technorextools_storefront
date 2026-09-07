'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

export function WishlistButton({ title }: { title: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `حذف ${title} از علاقه‌مندی‌ها` : `افزودن ${title} به علاقه‌مندی‌ها`}
      onClick={() => setSaved((value) => !value)}
      className={cn(
        'bg-surface border-hairline hover:border-brand-500 absolute top-3.5 end-3.5 z-10 grid size-9 place-items-center rounded-full border transition-colors',
        saved && 'border-brand-500 text-brand-600',
      )}
    >
      <Icon name="heart" className={cn('size-4', saved && 'fill-current')} />
    </button>
  );
}
