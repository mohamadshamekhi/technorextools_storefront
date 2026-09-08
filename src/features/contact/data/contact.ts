import type { IconName } from '@/components/atoms';
import { siteConfig } from '@/config/site';

/** Top row of quick-contact cards. `href` omitted → rendered as a static card. */
export const CONTACT_CHANNELS: Array<{
  icon: IconName;
  title: string;
  value: string;
  href?: string;
}> = [
  {
    icon: 'phone',
    title: 'تلفن پشتیبانی',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phoneHref}`,
  },
  { icon: 'doc', title: 'ایمیل', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: 'pin', title: 'نشانی', value: 'تهران، خیابان ولی‌عصر', href: '#location' },
  { icon: 'clock', title: 'ساعات پاسخگویی', value: '۹ صبح تا ۸ شب' },
];

export const WORK_HOURS = [
  { days: 'شنبه تا چهارشنبه', hours: '۹ صبح تا ۸ شب' },
  { days: 'پنجشنبه', hours: '۹ صبح تا ۲ بعدازظهر' },
];
