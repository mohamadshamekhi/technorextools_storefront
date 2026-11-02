'use client';

import { useEffect, useRef } from 'react';

import { trackEcommerce } from '@/lib/analytics';

/** Sends GA4 `view_item` once per product shown. The ref absorbs Strict Mode's re-run while still
 * firing when client navigation swaps one product page for another. */
export function ProductViewTracker({ slug, title }: { slug: string; title: string }) {
  const trackedSlug = useRef<string | null>(null);

  useEffect(() => {
    if (trackedSlug.current === slug) return;
    trackedSlug.current = slug;
    trackEcommerce('view_item', [{ item_id: slug, item_name: title }]);
  }, [slug, title]);

  return null;
}
