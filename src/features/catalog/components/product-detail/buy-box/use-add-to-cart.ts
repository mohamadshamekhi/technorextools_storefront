'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useCartStore } from '@/store/cart-store';

import type { ProductDetail } from '../../../types';
import { flyToCart } from '../../../utils/fly-to-cart';
import type { AddStatus } from './add-to-cart-button';

type Input = { product: ProductDetail; lineId: string; price: number; label?: string; qty: number };

const SPIN_MS = 350;
const DONE_MS = 1800;
const DRAWER_DELAY_MS = 700;

/** Add-to-cart sequence: spinner → commit + fly-to-cart + checkmark → mini-cart drawer. */
export function useAddToCart({ product, lineId, price, label, qty }: Input) {
  const addItem = useCartStore((state) => state.addItem);
  const [status, setStatus] = useState<AddStatus>('idle');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const add = useCallback(
    (source: Element) => {
      if (status !== 'idle') return;
      const image = product.images.find((item) => item.isMain) ?? product.images[0];
      setStatus('loading');
      const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
      later(() => {
        addItem(
          {
            id: lineId,
            title: product.title,
            price,
            variant: label,
            compareAt: null,
            categorySlug: product.category.slug,
            imageUrl: image?.url,
          },
          qty,
        );
        flyToCart(source, image?.url);
        setStatus('done');
        later(() => setDrawerOpen(true), DRAWER_DELAY_MS);
        later(() => setStatus('idle'), DONE_MS);
      }, SPIN_MS);
    },
    [status, product, lineId, price, label, qty, addItem],
  );

  return { status, add, drawerOpen, closeDrawer: () => setDrawerOpen(false) };
}
