import { toPersianDigits } from '@/lib/persian';

import { ORDER_STATUS_META } from '../data/orders';
import type { Order, OrderStatusMeta } from '../types';

/** Presentation metadata for an order's status. */
export function statusMeta(order: Order): OrderStatusMeta {
  return ORDER_STATUS_META[order.status];
}

/** "۳ کالا" label for an order's item count. */
export function itemCountLabel(order: Order): string {
  return `${toPersianDigits(order.itemCount)} کالا`;
}
