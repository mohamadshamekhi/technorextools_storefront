import type { Address } from '../types';

/** Mock saved addresses. Real ones come from `abzar/api` once accounts land. */
export const ADDRESSES: Address[] = [
  {
    id: 'home',
    title: 'خانه',
    text: 'تهران، خیابان ولی‌عصر، پلاک ۱۲۴، واحد ۳',
    isDefault: true,
  },
  {
    id: 'work',
    title: 'محل کار',
    text: 'تهران، شهرک صنعتی، بلوار اصلی، پلاک ۴۵',
  },
];
