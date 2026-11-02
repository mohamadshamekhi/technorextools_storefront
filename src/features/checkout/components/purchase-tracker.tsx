'use client';

import { useEffect } from 'react';

import { trackPurchaseOnce, type AnalyticsItem } from '@/lib/analytics';

/** Sends GA4 `purchase` from the payment result page; dedupe lives in `trackPurchaseOnce`.
 * Takes only catalog fields, so the order's receiver details never reach the client bundle's
 * props or GA. */
export function PurchaseTracker({
  transactionId,
  items,
}: {
  transactionId: string;
  items: AnalyticsItem[];
}) {
  useEffect(() => {
    trackPurchaseOnce(transactionId, items);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `items` is a new array each render; the order number identifies it
  }, [transactionId]);

  return null;
}
