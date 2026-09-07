import { z } from 'zod';

/** Guest order-tracking lookup form. Validated on submit before the fixture query. */
export const trackingFormSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, 'کد سفارش را وارد کنید')
    .regex(/^PA-\d{6}$/i, 'قالب کد سفارش صحیح نیست (مثال: PA-249672)'),
  mobile: z
    .string()
    .trim()
    .min(1, 'شماره موبایل را وارد کنید')
    .regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
});

export type TrackingFormValues = z.infer<typeof trackingFormSchema>;

export type TrackingStatus = 'processing' | 'packed' | 'shipped' | 'delivered';

/** One node on the fulfilment progress rail. `date` is `null` while pending. */
export type TimelineStep = {
  key: TrackingStatus;
  label: string;
  date: string | null;
};

export type TrackedItem = {
  title: string;
  quantity: number;
  /** Line total in toman. */
  total: number;
};

export type TrackedOrder = {
  code: string;
  mobile: string;
  status: TrackingStatus;
  statusLabel: string;
  carrier: string;
  trackingNumber: string;
  timeline: TimelineStep[];
  items: TrackedItem[];
};
