import { routes } from '@/config/routes';

/** `abzar/api`'s line-item kinds — same contract as the cart's `kind`. */
export const ORDER_ITEM_KINDS = ['variant', 'bundle', 'spare_part'] as const;
export type OrderItemKind = (typeof ORDER_ITEM_KINDS)[number];

/**
 * Catalog link for an order line. `productSlug` is read live from the catalog, so it's `null`
 * once the record is gone — and the storefront has no bundle route yet, so bundles never link.
 */
export function orderItemHref(kind: OrderItemKind, productSlug: string | null): string | null {
  if (!productSlug) return null;
  if (kind === 'variant') return routes.product(productSlug);
  if (kind === 'spare_part') return routes.sparePart(productSlug);
  return null;
}
