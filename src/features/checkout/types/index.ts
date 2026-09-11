import type { z } from 'zod';

import type { addressSchema } from '../services/checkout-address.schemas';
import type { PaymentMethodView } from '../services/payment-methods.schemas';

export type CheckoutStep = 'address' | 'payment' | 'review' | 'success' | 'cash-pending';

export type Address = z.infer<typeof addressSchema>;

/** One entry from `abzar/api`'s admin-configured `/storefront/payment-methods` catalog. */
export type CheckoutPaymentMethod = PaymentMethodView;

/** Snapshot of the real order returned by `POST /api/checkout` — taken at confirm time
 * since the local cart is cleared right after. */
export type PlacedOrder = {
  orderNumber: string;
  total: number;
  itemCount: number;
};
