import type { ShippingMethod } from '../types';

/** Order subtotal (toman) at or above which standard shipping is free. */
export const FREE_SHIPPING_THRESHOLD = 20_000_000;

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    key: 'standard',
    label: 'ارسال استاندارد',
    eta: 'تحویل ۲ تا ۳ روز کاری',
    price: 250_000,
    icon: 'truck',
  },
  {
    key: 'express',
    label: 'ارسال فوری',
    eta: 'تحویل امروز یا فردا',
    price: 450_000,
    icon: 'bolt',
  },
];
