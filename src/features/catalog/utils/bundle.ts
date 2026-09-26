import type { Bundle } from '../services/bundles.schemas';

/** What the same basket costs bought separately. `abzar/api` sends it; the members' own prices
 * are the fallback for a response that predates the field. */
export function bundleListPrice(bundle: Bundle): number {
  if (bundle.compareAtTotal > 0) return bundle.compareAtTotal;
  return bundle.items.reduce((sum, item) => sum + item.variant.effectivePrice * item.qty, 0);
}

/** Absolute تومان saved by the bundle price; `0` when it isn't actually cheaper. */
export function bundleSavings(bundle: Bundle): number {
  if (bundle.savingAmount > 0) return bundle.savingAmount;
  return Math.max(0, bundleListPrice(bundle) - bundle.bundlePrice);
}

/** Whole-percent discount, `0` when there's nothing to compare against. */
export function bundleSavingsPercent(bundle: Bundle): number {
  const listPrice = bundleListPrice(bundle);
  if (listPrice <= 0) return 0;
  return Math.round((bundleSavings(bundle) / listPrice) * 100);
}

/** Why a member can't ship right now — `null` when it's fine. Presentation only: the
 * buy/don't-buy decision is `bundle.available`, which `abzar/api` owns. */
export function memberUnavailableLabel(item: Bundle['items'][number]): string | null {
  if (!item.variant.isActive || !item.variant.product.isActive) return 'غیرفعال';
  if (item.variant.stockQty < item.qty) return 'ناموجود';
  return null;
}

/** Cover art: `abzar/api` already falls back to the first member's image. */
export function bundleCoverImage(bundle: Bundle): string | null {
  return (
    bundle.imageUrl ?? bundle.items.find((item) => item.variant.imageUrl)?.variant.imageUrl ?? null
  );
}
