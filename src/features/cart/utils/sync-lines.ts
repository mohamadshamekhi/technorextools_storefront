import type { CartSyncLine } from '../services/cart.schemas';
import type { CartLine } from '@/store/cart-store';

/** Maps local cart lines to the payload the BFF syncs into the server cart. */
export function toSyncLines(lines: CartLine[]): CartSyncLine[] {
  return lines.map((line) => {
    if (line.kind === 'spare_part') return { sparePartId: line.id, qty: line.quantity };
    if (line.kind === 'bundle') return { bundleId: line.id, qty: line.quantity };
    return { variantId: line.id, qty: line.quantity };
  });
}
