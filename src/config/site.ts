import { env } from '@/config/env';

/** Single source of truth for brand + default SEO metadata. */
export const siteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME,
  url: env.NEXT_PUBLIC_SITE_URL,
  description:
    'تکنورکس، نمایندگی رسمی ابزار بادی و شارژی صنعتی در ایران — پیچ‌گوشتی، دریل، بکس و چکش بادی با گارانتی اصالت، قطعات یدکی همیشه موجود و مشاوره فنی رایگان پیش از خرید.',
  locale: 'fa_IR',
  themeColor: '#b45a2c',
  twitterHandle: '@technorextools',
  ogImage: '/og/default.png',
  keywords: [
    'ابزار بادی',
    'پیچ گوشتی بادی',
    'بکس بادی',
    'دریل بادی',
    'ابزار شارژی صنعتی',
    'تکنورکس',
    'فروش ابزار صنعتی',
  ],
  phone: '۰۲۱۶۶۷۵۲۶۵۳',
  phoneHref: '۰۹۱۲۰۲۰۷۴۹۴',
  email: 'info@technorextools.ir',
  address: 'تهران، خیابان امام خمینی نرسیده به میدان حسن آباد جنب بیمارستان سینا کوچه نعمتی ساختمان دیاکو طبقه دوم واحد ۵',
  links: {
    instagram: 'https://instagram.com/technorextools',
    telegram: 'https://t.me/technorextools',
    whatsapp: 'https://wa.me/989120207494',
  },
  enamad: {
    id: '8041899',
    code: 'rHXXizBjFrxOu6r4QDN0EdlfgD0hYOS2',
  },
} as const;

export type SiteConfig = typeof siteConfig;
