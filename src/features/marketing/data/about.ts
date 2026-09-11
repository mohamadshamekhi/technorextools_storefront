import type { TeamMember, TimelineEntry, ValueProp } from '../types';

/** Checklist shown next to the about-page mission statement. */
export const ABOUT_MISSION_POINTS = [
  'اصالت تضمینی روی تمام محصولات',
  'مشاوره فنی رایگان پیش از خرید',
  'خدمات پس از فروش سراسری',
];

/** Animated counters in the dark stats band. */
export const ABOUT_STATS = [
  { value: 14, suffix: '+', label: 'سال تجربه' },
  { value: 12_000, suffix: '+', label: 'مشتری راضی' },
  { value: 350, suffix: '+', label: 'مدل ابزار' },
  { value: 40, suffix: '+', label: 'نمایندگی فعال' },
];

/** Company milestones — 1391 founding through today's online store. */
export const ABOUT_TIMELINE: TimelineEntry[] = [
  {
    year: '۱۳۹۱',
    title: 'شروع فعالیت',
    description: 'افتتاح اولین فروشگاه ابزار در تهران',
  },
  {
    year: '۱۳۹۶',
    title: 'نمایندگی رسمی',
    description: 'اخذ نمایندگی انحصاری برند تکنورکس',
  },
  {
    year: '۱۴۰۰',
    title: 'توسعه سراسری',
    description: 'راه‌اندازی بیش از ۴۰ نمایندگی در کشور',
  },
  {
    year: '۱۴۰۵',
    title: 'فروشگاه آنلاین',
    description: 'راه‌اندازی فروشگاه اینترنتی تکنورکس',
  },
];

/** Trust cards under "چرا کارگاه‌ها به ما اعتماد می‌کنند". */
export const ABOUT_VALUES: ValueProp[] = [
  {
    icon: 'award',
    title: 'کیفیت بدون تخفیف',
    description: 'هر محصول پیش از عرضه، تست کیفیت می‌شود.',
  },
  {
    icon: 'handshake',
    title: 'شفافیت کامل',
    description: 'قیمت و مشخصات واقعی، بدون ابهام.',
  },
  {
    icon: 'wrench',
    title: 'تخصص فنی',
    description: 'مشاوره توسط کارشناسان مجرب ابزار صنعتی.',
  },
  {
    icon: 'headset',
    title: 'پشتیبانی واقعی',
    description: 'پاسخگویی سریع پیش و پس از خرید.',
  },
];

/** Leadership portraits on the about page. */
export const ABOUT_TEAM: TeamMember[] = [
  { name: 'مهدی احمدی', role: 'مدیرعامل' },
  { name: 'سارا کریمی', role: 'مدیر فنی' },
  { name: 'رضا نوری', role: 'مدیر فروش' },
  { name: 'نگین صادقی', role: 'مدیر خدمات مشتریان' },
];

/** Buyer questions surfaced in the about-page FAQ accordion. */
export const ABOUT_FAQ = [
  {
    question: 'آیا ابزارها گارانتی اصالت دارند؟',
    answer:
      'بله؛ تمام محصولات تکنورکس به‌صورت مستقیم از برند تأمین می‌شوند و با گارانتی اصالت و برگشت کالا عرضه می‌شوند.',
  },
  {
    question: 'ارسال سفارش چقدر زمان می‌برد؟',
    answer:
      'سفارش‌های تهران معمولاً همان روز و سایر شهرها کمتر از ۴۸ ساعت کاری با باربری‌های معتبر ارسال می‌شوند.',
  },
  {
    question: 'برای خرید عمده کارگاهی چه شرایطی دارید؟',
    answer:
      'برای سفارش‌های عمده، قیمت‌گذاری اختصاصی، تسویه اعتباری و ارسال یکجا در نظر گرفته می‌شود؛ کافی است با واحد فروش تماس بگیرید.',
  },
  {
    question: 'قطعات یدکی ابزارها هم موجود است؟',
    answer:
      'بله؛ قطعات یدکی تمام مدل‌های عرضه‌شده در طول عمر ابزار از انبار ما تأمین می‌شود و خدمات تعمیر توسط تیم فنی خودمان انجام می‌گیرد.',
  },
  {
    question: 'مشاوره پیش از خرید رایگان است؟',
    answer:
      'بله؛ کارشناسان فنی ما پیش از خرید، ابزار متناسب با کاربری و بودجه شما را بدون هزینه معرفی می‌کنند.',
  },
];
