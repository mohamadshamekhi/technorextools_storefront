import { z } from 'zod';

import { ORDER_ITEM_KINDS } from '@/lib/order-items';

/**
 * Zod mirror of `POST /storefront/orders/track` — the full order detail plus fulfilment
 * presentation fields. Extra keys `abzar/api` sends are ignored; only what the page renders
 * is declared here.
 */

/** One node on the fulfilment rail. `date === null` means the step has not happened yet. */
export const timelineStepSchema = z.object({
  key: z.string(),
  label: z.string(),
  date: z.string().nullable(),
});

export const trackedOrderSchema = z.object({
  orderNumber: z.string(),
  statusLabel: z.string(),
  carrier: z.string().nullable().default(null),
  trackingNumber: z.string().nullable().default(null),
  placedAt: z.string(),
  total: z.number(),
  timeline: z.array(timelineStepSchema).default([]),
  items: z
    .array(
      z.object({
        productTitle: z.string(),
        sku: z.string().nullable().default(null),
        /** Live from the catalog (unlike `productTitle`/`sku`, which are purchase-time
         * snapshots). Always `null` for bundles — `abzar/api` has no bundle-owned media yet. */
        imageUrl: z.string().nullable().default(null),
        /** `null` when the catalog record was deleted — check before linking. */
        productSlug: z.string().nullable().default(null),
        kind: z.enum(ORDER_ITEM_KINDS).default('variant'),
        qty: z.number(),
        lineTotal: z.number(),
      }),
    )
    .default([]),
});

export type TimelineStep = z.infer<typeof timelineStepSchema>;
export type TrackedOrder = z.infer<typeof trackedOrderSchema>;
export type TrackedItem = TrackedOrder['items'][number];
