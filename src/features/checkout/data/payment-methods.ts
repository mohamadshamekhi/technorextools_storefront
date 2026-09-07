import type { CheckoutPaymentMethod } from '../types';

export const PAYMENT_METHODS: CheckoutPaymentMethod[] = [
  {
    key: 'gateway',
    label: 'درگاه بانکی آنلاین',
    desc: 'پرداخت امن با تمام کارت‌های بانکی',
    icon: 'card',
  },
  {
    key: 'cod',
    label: 'پرداخت در محل',
    desc: 'پرداخت نقدی یا کارت‌خوان هنگام تحویل',
    icon: 'cash',
  },
  {
    key: 'installment',
    label: 'اقساطی / اعتباری خرید',
    desc: 'خرید اعتباری با اسنپ‌پی یا تا ۳ قسط',
    icon: 'wallet',
  },
];
