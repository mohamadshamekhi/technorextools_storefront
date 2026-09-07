import { env } from '@/config/env';

/** Single source of truth for brand + default SEO metadata. */
export const siteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME,
  url: env.NEXT_PUBLIC_SITE_URL,
  description:
    'پوما ایر، نمایندگی رسمی ابزار بادی و شارژی صنعتی در ایران — پیچ‌گوشتی، دریل، بکس و چکش بادی با گارانتی اصالت، قطعات یدکی همیشه موجود و مشاوره فنی رایگان پیش از خرید.',
  locale: 'fa_IR',
  themeColor: '#b45a2c',
  twitterHandle: '@pumaair',
  ogImage: '/og/default.png',
  keywords: [
    'ابزار بادی',
    'پیچ گوشتی بادی',
    'بکس بادی',
    'دریل بادی',
    'ابزار شارژی صنعتی',
    'پوما ایر',
    'فروش ابزار صنعتی',
  ],
  phone: '۰۲۱-۶۶۹۹۰۰۰۰',
  phoneHref: '+982166990000',
  email: 'info@pumaair.ir',
  address: 'تهران، خیابان ولی‌عصر، مجتمع صنعتی ابزار',
  links: {
    instagram: 'https://instagram.com/pumaair',
    telegram: 'https://t.me/pumaair',
    whatsapp: 'https://wa.me/989121771587',
  },
} as const;

export type SiteConfig = typeof siteConfig;
