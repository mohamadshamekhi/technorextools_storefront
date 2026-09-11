import { z } from 'zod';

/**
 * Zod mirror of `abzar/api`'s `/storefront/addresses` resource.
 * Source: `../api/postman/abzar-api.postman_collection.json`.
 */
export const addressSchema = z.object({
  id: z.string(),
  receiverName: z.string(),
  receiverMobile: z.string(),
  province: z.string(),
  city: z.string(),
  fullAddress: z.string(),
  postalCode: z.string(),
  isDefault: z.boolean(),
});

export const addressListSchema = z.array(addressSchema);

export const createAddressInputSchema = z.object({
  receiverName: z.string().trim().min(2).max(120),
  receiverMobile: z.string().trim().regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
  province: z.string().trim().min(2).max(60),
  city: z.string().trim().min(2).max(60),
  fullAddress: z.string().trim().min(5).max(500),
  postalCode: z.string().trim().regex(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد'),
  isDefault: z.boolean().optional(),
});

export type CreateAddressInput = z.infer<typeof createAddressInputSchema>;
