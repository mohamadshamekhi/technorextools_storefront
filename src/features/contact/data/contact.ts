import type { IconName } from '@/components/atoms';
import { siteConfig } from '@/config/site';
import { routes } from '@/config/routes';

/** Top row of quick-contact cards. `href` omitted → rendered as a static card. */
export const CONTACT_CHANNELS: Array<{
  icon: IconName;
  title: string;
  value: string;
  note: string;
  href?: string;
}> = [
  {
    icon: 'phone',
    title: 'تلفن پشتیبانی',
    value: siteConfig.phone,
    note: 'سریع‌ترین راه؛ در ساعات کاری',
    href: `tel:${siteConfig.phoneHref}`,
  },
  {
    icon: 'whatsapp',
    title: 'واتساپ',
    value: '۰۹۱۲-۱۷۷۱۵۸۷',
    note: 'ارسال عکس ابزار و شماره فنی',
    href: siteConfig.links.whatsapp,
  },
  {
    icon: 'doc',
    title: 'ایمیل',
    value: siteConfig.email,
    note: 'مناسب استعلام و پیش‌فاکتور',
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: 'pin',
    title: 'نشانی فروشگاه',
    value: 'تهران، خیابان ولی‌عصر',
    note: 'مشاهده روی نقشه و مسیریابی',
    href: '#location',
  },
];

export const WORK_HOURS = [
  { days: 'شنبه تا چهارشنبه', hours: '۹ صبح تا ۸ شب' },
  { days: 'پنجشنبه', hours: '۹ صبح تا ۲ بعدازظهر' },
  { days: 'جمعه و تعطیلات رسمی', hours: 'تعطیل' },
];

/** Deflection links — most visitors write to us for one of these three things. */
export const CONTACT_SHORTCUTS: Array<{
  icon: IconName;
  title: string;
  note: string;
  href: string;
}> = [
  {
    icon: 'wrench',
    title: 'ثبت درخواست تعمیر',
    note: 'با شماره سریال ابزار، بدون تماس تلفنی',
    href: routes.repairRequest,
  },
  {
    icon: 'gear',
    title: 'یافتن قطعه یدکی',
    note: 'جستجو با شماره فنی قطعه',
    href: routes.spareParts,
  },
  {
    icon: 'truck',
    title: 'پیگیری سفارش',
    note: 'وضعیت ارسال با شماره سفارش',
    href: routes.orderTracking,
  },
];

export const CONTACT_FAQ = [
  {
    question: 'چقدر طول می‌کشد پاسخ بگیرم؟',
    answer:
      'تماس تلفنی و واتساپ در ساعات کاری بلافاصله پاسخ داده می‌شود. پیام‌های فرم و ایمیل حداکثر تا یک روز کاری بررسی و پاسخ داده می‌شوند.',
  },
  {
    question: 'قبل از خرید می‌توانم مشاورهٔ فنی بگیرم؟',
    answer:
      'بله. کافی است کاربری ابزار (فشار باد، حجم کار، نوع پیچ یا مهره) را بگویید تا کارشناس، مدل متناسب و لوازم جانبی لازم را پیشنهاد دهد. این مشاوره رایگان است.',
  },
  {
    question: 'برای ابزارِ خراب باید چه کار کنم؟',
    answer:
      'از صفحهٔ «درخواست تعمیر» فرم را با شماره سریال ابزار ثبت کنید. اگر فقط به قطعه نیاز دارید، با شماره فنی قطعه در بخش قطعات یدکی جستجو کنید یا همان شماره را در واتساپ بفرستید.',
  },
  {
    question: 'شرایط نمایندگی و خرید عمده چیست؟',
    answer:
      'برای فروشگاه‌ها و کارگاه‌ها قیمت‌گذاری اختصاصی، تسویهٔ اعتباری و ارسال یکجا داریم. موضوع پیام را روی «همکاری و نمایندگی» بگذارید تا واحد فروش با شما تماس بگیرد.',
  },
];

const MAP_QUERY = encodeURIComponent(siteConfig.address);

export const MAP_LINKS = {
  google: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`,
  neshan: `https://neshan.org/maps/search/${MAP_QUERY}`,
};
