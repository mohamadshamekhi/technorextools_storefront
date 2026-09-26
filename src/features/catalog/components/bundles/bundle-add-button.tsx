'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

import type { Bundle } from '../../services/bundles.schemas';
import { bundleCoverImage } from '../../utils/bundle';

/** Adds the whole bundle as one cart line (`kind: 'bundle'`, `id` = bundle id) — the server
 * cart expands it into its members at `POST /storefront/cart/bundles`. */
export function BundleAddButton({ bundle }: { bundle: Bundle }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  if (!bundle.available) {
    return (
      <span className="grid h-12 place-items-center rounded-xl bg-white/10 text-[13px] font-bold text-white/60">
        فعلاً ناموجود
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        addItem({
          id: bundle.id,
          title: bundle.title,
          price: bundle.bundlePrice,
          kind: 'bundle',
          imageUrl: bundleCoverImage(bundle),
          variant: 'پکیج',
        });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1800);
      }}
      className={cn(
        'focus-visible:ring-brand-500 inline-flex h-12 items-center justify-center gap-2 rounded-xl text-[13.5px] font-extrabold transition-colors focus-visible:ring-2 focus-visible:outline-none',
        added
          ? 'bg-success text-white'
          : 'bg-accent-500 text-ink hover:bg-accent-400 shadow-(--shadow-accent)',
      )}
    >
      <Icon name={added ? 'check' : 'cart'} className="size-4" />
      {added ? 'به سبد اضافه شد' : 'افزودن پکیج به سبد'}
    </button>
  );
}
