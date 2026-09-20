import type { PromoCard, Testimonial, ValueProp } from '../types';

export const HERO_WORDS = ['کارهای سنگین', 'خط تولید صنعتی', 'تعمیرگاه خودرو', 'کارگاه نجاری'];

/** Used when no `isFeatured` product exists yet in `abzar/api`. */
export const HERO_SHOWCASE_FALLBACK = {
  label: 'پیچ‌گوشتی بادی تکنورکس',
  torque: '۱۲۰۰ Nm',
  warranty: '۱۸ ماه',
};

export const HERO_STATS = [
  { value: 14, suffix: '+', label: 'سال تجربه' },
  { value: 12_000, suffix: '+', label: 'مشتری صنعتی' },
  { value: 350, suffix: '+', label: 'مدل ابزار' },
];

export const PROMO_CARDS: PromoCard[] = [
  {
    title: 'خرید عمده کارگاهی',
    description: 'قیمت ویژه و مشاور اختصاصی برای سفارش‌های عمده کارگاه‌ها',
    cta: 'استعلام قیمت عمده',
    icon: 'handshake',
  },
  {
    title: 'پکیج کامل کارگاهی',
    description: 'ست ابزار بادی به‌همراه کمپرسور با تخفیف ویژه',
    cta: 'مشاهده پکیج',
    icon: 'box',
  },
  {
    title: 'سرویس و تعمیر رایگان',
    description: 'اولین سرویس دوره‌ای ابزار روی ماست',
    cta: 'رزرو نوبت',
    icon: 'wrench',
  },
];

export const VALUE_PROPS: ValueProp[] = [
  { icon: 'shield', title: 'اصالت تضمینی', description: 'واردات مستقیم و گارانتی رسمی' },
  { icon: 'box', title: 'قطعات همیشه موجود', description: 'تأمین ۱۰۰٪ لوازم یدکی' },
  { icon: 'headset', title: 'مشاوره فنی رایگان', description: 'پیش از خرید تماس بگیرید' },
  { icon: 'truck', title: 'ارسال سریع', description: 'کمتر از ۴۸ ساعت، سراسر ایران' },
];

export const PILLARS: ValueProp[] = [
  {
    icon: 'shield',
    title: 'اصالت تضمینی',
    description: 'واردات مستقیم با گارانتی رسمی روی تمام ابزارها.',
  },
  {
    icon: 'box',
    title: 'قطعات یدکی',
    description: 'تأمین ۱۰۰٪ قطعات و لوازم جانبی در طول عمر ابزار.',
  },
  {
    icon: 'headset',
    title: 'مشاوره تخصصی',
    description: 'انتخاب ابزار بر اساس کاربری واقعی و بودجه شما.',
  },
  {
    icon: 'gear',
    title: 'خدمات پس از فروش',
    description: 'تعمیر و سرویس دوره‌ای توسط تیم فنی خودمان.',
  },
];

export const TRUST_BADGES: ValueProp[] = [
  { icon: 'shield', title: 'گارانتی اصالت', description: 'کالای اورجینال با ضمانت' },
  { icon: 'truck', title: 'ارسال سریع', description: 'به سراسر ایران' },
  { icon: 'refresh', title: 'بازگشت کالا', description: 'تا ۷ روز پس از خرید' },
  { icon: 'card', title: 'پرداخت امن', description: 'درگاه معتبر بانکی' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'مهدی رستمی',
    role: 'مدیر کارگاه تعمیرات خودرو',
    quote:
      'گشتاور و دوام بکس‌های تکنورکس واقعاً با نمونه‌های گران‌تر قابل مقایسه است و پشتیبانی فنی همیشه در دسترس بوده.',
    rating: 5,
  },
  {
    name: 'علی صادقی',
    role: 'صاحب کارگاه نجاری',
    quote: 'چهار سال است از پیچ‌گوشتی بادی این برند استفاده می‌کنم و حتی یک بار زمین‌گیر نشده.',
    rating: 5,
  },
  {
    name: 'رضا کریمی',
    role: 'مدیر خط تولید صنعتی',
    quote: 'قطعات یدکی همیشه موجود است و همین باعث شد برای خط تولید ما به گزینه اول تبدیل شوند.',
    rating: 5,
  },
  {
    name: 'سیما احمدی',
    role: 'تعمیرکار لوازم صنعتی',
    quote:
      'مشاوره پیش از خرید دقیقاً کمک کرد ابزار درست را با بودجه‌ام انتخاب کنم، نه گران‌تر و نه ضعیف‌تر.',
    rating: 5,
  },
];

export const TICKER_PHRASES = [
  'گارانتی اصالت کالا',
  'ارسال به سراسر ایران',
  'قطعات یدکی موجود',
  'مشاوره فنی رایگان',
  'نمایندگی رسمی',
  'پرداخت در محل تهران',
];

export const PARTNER_BRANDS = ['BSD', 'KILEWS', 'VESSEL', 'ROTAKE', 'ROCOL', 'TORQNADO', 'DATEES'];
