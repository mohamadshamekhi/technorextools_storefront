/** Standard GA4 ecommerce item. Never add customer data here — catalog fields only. */
export type AnalyticsItem = { item_id: string; item_name: string };

type EcommerceEvent = 'view_item' | 'add_to_cart' | 'begin_checkout' | 'purchase';

declare global {
  interface Window {
    /** Defined before hydration by `components/atoms/google-analytics.tsx`. */
    gtag?: (command: 'event', name: string, params: Record<string, unknown>) => void;
  }
}

export function trackEcommerce(
  name: EcommerceEvent,
  items: AnalyticsItem[],
  params: Record<string, unknown> = {},
): void {
  window.gtag?.('event', name, { ...params, items });
}

const sentThisPage = new Set<string>();

/** Claims `key` for this browser. Memory covers Strict Mode re-runs when storage is blocked. */
function claimOnce(key: string): boolean {
  if (sentThisPage.has(key)) return false;
  sentThisPage.add(key);
  try {
    if (localStorage.getItem(key)) return false;
    localStorage.setItem(key, '1');
  } catch {
    // Private mode / blocked storage — the in-memory claim above is all we have.
  }
  return true;
}

/** Fires `purchase` once per order per browser, so refreshing or re-opening the payment result
 * page doesn't count the sale twice. */
export function trackPurchaseOnce(transactionId: string, items: AnalyticsItem[]): void {
  if (claimOnce(`ga4-purchase:${transactionId}`)) {
    trackEcommerce('purchase', items, { transaction_id: transactionId });
  }
}
