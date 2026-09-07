'use client';

import { useEffect, useState } from 'react';

import { selectCartQuantity, useCartStore } from '@/store/cart-store';

/**
 * Cart unit count that stays 0 until the persisted store has hydrated —
 * prevents a server/client badge mismatch.
 */
export function useCartQuantity(): number {
  const quantity = useCartStore(selectCartQuantity);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  return hydrated ? quantity : 0;
}
