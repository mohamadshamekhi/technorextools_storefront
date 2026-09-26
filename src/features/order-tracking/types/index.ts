import { z } from 'zod';

/** Guest order-tracking lookup form, validated before the BFF call. */
export const trackingFormSchema = z.object({
  code: z
    .string()
    .trim()
    .min(4, 'کد سفارش را وارد کنید')
    .max(32, 'کد سفارش معتبر نیست')
    .regex(/^[A-Za-z0-9][A-Za-z0-9-]*$/, 'قالب کد سفارش صحیح نیست'),
  mobile: z
    .string()
    .trim()
    .min(1, 'شماره موبایل را وارد کنید')
    .regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
});

export type TrackingFormValues = z.infer<typeof trackingFormSchema>;

export type { TimelineStep, TrackedItem, TrackedOrder } from '../services/order-tracking.schemas';
