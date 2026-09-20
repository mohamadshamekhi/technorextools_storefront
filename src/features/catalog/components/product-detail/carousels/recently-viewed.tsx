'use client';

import { useRecentlyViewed } from '../../../hooks/use-recently-viewed';
import type { ProductCard } from '../../../types';
import { ProductCarousel } from './product-carousel';

/** Client-only (localStorage) — renders nothing until the visitor has viewed other products. */
export function RecentlyViewed({ current }: { current: ProductCard }) {
  const others = useRecentlyViewed(current);
  return <ProductCarousel id="recent" title="بازدیدهای اخیر شما" products={others} />;
}
