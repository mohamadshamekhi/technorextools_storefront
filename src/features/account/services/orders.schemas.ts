import { z } from 'zod';

import { ORDER_ITEM_KINDS } from '@/lib/order-items';

/**
 * Zod mirrors of `abzar/api`'s `/storefront/orders` views.
 * Source: `../api/src/modules/storefront/orders/storefront-orders.service.ts` +
 * `prisma/schema.prisma` (`OrderStatus`, `PaymentMethodKind` enums).
 */
export const orderStatusSchema = z.enum([
  'pending_payment',
  'payment_failed',
  'abandoned',
  'paid',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
]);
export type OrderStatus = z.infer<typeof orderStatusSchema>;

/** `Order.paymentMethod` is the plain `PaymentMethodKind` enum — not the metadata
 * catalog row (that's `/storefront/payment-methods`, keyed by this same code). */
export const paymentMethodSchema = z.enum(['online', 'cash']);
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;

export const orderListItemSchema = z.object({
  orderNumber: z.string(),
  status: orderStatusSchema,
  total: z.number(),
  paymentMethod: paymentMethodSchema,
  itemCount: z.number(),
  placedAt: z.string(),
});
export type OrderListItem = z.infer<typeof orderListItemSchema>;

export const orderListSchema = z.object({
  items: z.array(orderListItemSchema),
  total: z.number(),
  skip: z.number(),
  take: z.number(),
});

export const orderDetailSchema = orderListItemSchema.extend({
  subtotal: z.number(),
  discountAmount: z.number(),
  discountCode: z.string().nullable(),
  shippingCost: z.number(),
  shippingMethodTitle: z.string().nullable(),
  address: z.object({
    receiverName: z.string(),
    receiverMobile: z.string(),
    province: z.string(),
    city: z.string(),
    fullAddress: z.string(),
    postalCode: z.string(),
  }),
  items: z.array(
    z.object({
      productTitle: z.string(),
      sku: z.string().nullable(),
      /** Live from the catalog (unlike `productTitle`/`sku`, which are purchase-time snapshots).
       * Always `null` for bundles — `abzar/api` has no bundle-owned media yet. */
      imageUrl: z.string().nullable().default(null),
      /** `null` when the catalog record was deleted — check before linking. */
      productSlug: z.string().nullable().default(null),
      kind: z.enum(ORDER_ITEM_KINDS).default('variant'),
      qty: z.number(),
      unitPrice: z.number(),
      lineTotal: z.number(),
    }),
  ),
  statusHistory: z.array(
    z.object({
      status: orderStatusSchema,
      note: z.string().nullable(),
      at: z.string(),
    }),
  ),
  payment: z
    .object({
      status: z.string(),
      refId: z.string().nullable(),
      paidAt: z.string().nullable(),
    })
    .nullable(),
});
export type OrderDetail = z.infer<typeof orderDetailSchema>;

export const orderStatsSchema = z.object({
  totalSpend: z.number(),
  paidOrderCount: z.number(),
  monthlyTrend: z.array(z.object({ month: z.string(), count: z.number(), amount: z.number() })),
});
export type OrderStats = z.infer<typeof orderStatsSchema>;
