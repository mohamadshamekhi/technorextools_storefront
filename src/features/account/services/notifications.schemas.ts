import { z } from 'zod';

/**
 * Zod mirror of `abzar/api`'s `/storefront/notifications` resource.
 * Source: `../api/postman/abzar-api.postman_collection.json`. Populated by `abzar/api`'s order
 * ship/deliver/cancel flows and personal discount-code grants.
 */
export const notificationTypeSchema = z.enum([
  'order_shipped',
  'order_delivered',
  'order_cancelled',
  'discount',
  'system',
]);

export type NotificationType = z.infer<typeof notificationTypeSchema>;

export const notificationSchema = z.object({
  id: z.string(),
  type: notificationTypeSchema,
  title: z.string(),
  body: z.string(),
  createdAt: z.string(),
  read: z.boolean(),
});

export type Notification = z.infer<typeof notificationSchema>;

export const notificationListSchema = z.array(notificationSchema);
