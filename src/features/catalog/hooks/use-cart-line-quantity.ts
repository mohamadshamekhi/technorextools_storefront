'use client';

import { useEffect, useState } from 'react';

import { useCartStore } from '@/store/cart-store';

/** Units of cart line `id`; stays 0 until the persisted store hydrates (avoids SSR mismatch). */
export function useCartLineQuantity(id: string): number {
  const quantity = useCartStore(
    (state) => state.lines.find((line) => line.id === id)?.quantity ?? 0,
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  return hydrated ? quantity : 0;
}
