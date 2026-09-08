import { routes } from '@/config/routes';

import { anchor } from '../anchors';
import type { FooterColumn, NavItem, SocialLink } from '../types';

export const PRIMARY_NAV: NavItem[] = [
  { label: 'همه محصولات', href: routes.products },
  { label: 'دسته‌بندی‌ها', href: anchor('categories') },
  { label: 'پیشنهاد شگفت‌انگیز', href: anchor('deals') },
  { label: 'مجله پوما', href: routes.blog },
  { label: 'درباره ما', href: routes.about },
  { label: 'تماس با ما', href: routes.contact },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'دسترسی سریع',
    links: [
      { label: 'درباره ما', href: routes.about },
      { label: 'همه محصولات', href: routes.products },
      { label: 'مجله پوما', href: routes.blog },
      { label: 'پیگیری سفارش', href: routes.orderTracking },
      { label: 'نمایندگی و همکاری', href: routes.contact },
    ],
  },
  {
    title: 'دسته‌بندی‌ها',
    links: [
      { label: 'پیچ‌گوشتی بادی', href: `${routes.products}?category=air-screwdriver` },
      { label: 'دریل بادی', href: `${routes.products}?category=air-drill` },
      { label: 'بکس بادی', href: `${routes.products}?category=air-wrench` },
      { label: 'پیچ‌گوشتی شارژی', href: `${routes.products}?category=cordless-screwdriver` },
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'اینستاگرام', href: 'https://instagram.com/pumaair', icon: 'instagram' },
  { label: 'تلگرام', href: 'https://t.me/pumaair', icon: 'telegram' },
  { label: 'واتساپ', href: 'https://wa.me/989121771587', icon: 'whatsapp' },
];
