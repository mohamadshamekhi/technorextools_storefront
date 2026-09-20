'use client';

import { useEffect, useState } from 'react';

import type { ProductCard } from '../types';

const KEY = 'abzar-recently-viewed';
const MAX_ITEMS = 8;

function read(): ProductCard[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(parsed) ? (parsed as ProductCard[]) : [];
  } catch {
    return [];
  }
}

/** Records `current` as viewed and returns the other recently-viewed products (client-only). */
export function useRecentlyViewed(current: ProductCard): ProductCard[] {
  const [others, setOthers] = useState<ProductCard[]>([]);

  useEffect(() => {
    const stored = read();
    setOthers(stored.filter((item) => item.id !== current.id));
    const next = [current, ...stored.filter((item) => item.id !== current.id)].slice(0, MAX_ITEMS);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage blocked — feature simply stays empty */
    }
  }, [current]);

  return others;
}
