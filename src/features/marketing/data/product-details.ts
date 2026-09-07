import type { ProductGroup } from '../types';
import type { ColorOption, Faq, ProductReview, SpecRow } from '../types/product-detail';

export const GALLERY_LABELS = [
  'عکس اصلی محصول',
  'نمای بدنه از نزدیک',
  'نمای دسته و ماشه',
  'محصول در حال کار',
];

export const COLOR_OPTIONS: ColorOption[] = [
  { label: 'آبی صنعتی', swatch: 'oklch(0.55 0.15 250)' },
  { label: 'زرد ایمنی', swatch: 'oklch(0.8 0.16 90)' },
  { label: 'خاکستری', swatch: 'oklch(0.55 0.01 70)' },
];

/** Full spec table per coarse product group; values are representative mock data. */
export const SPEC_TEMPLATES: Record<ProductGroup, SpecRow[]> = {
  air: [
    { icon: 'gauge', label: 'گشتاور خروجی', value: '۱۲۰۰ نیوتن‌متر' },
    { icon: 'bolt', label: 'سرعت بی‌باری', value: '۷۰۰۰ دور بر دقیقه' },
    { icon: 'gauge', label: 'فشار هوای کاری', value: '۶.۳ بار' },
    { icon: 'bolt', label: 'مصرف هوا', value: '۲۸۰ لیتر بر دقیقه' },
    { icon: 'wrench', label: 'اندازه دنده', value: '۱/۲ اینچ' },
    { icon: 'box', label: 'وزن', value: '۲.۱ کیلوگرم' },
    { icon: 'truck', label: 'کشور سازنده', value: 'تایوان' },
    { icon: 'shield', label: 'گارانتی', value: '۱۸ ماه' },
  ],
  cordless: [
    { icon: 'battery', label: 'ولتاژ باتری', value: '۱۸ ولت' },
    { icon: 'battery', label: 'ظرفیت باتری', value: '۴ آمپرساعت لیتیومی' },
    { icon: 'gauge', label: 'گشتاور خروجی', value: '۹۰۰ نیوتن‌متر' },
    { icon: 'bolt', label: 'سرعت بی‌باری', value: '۲۹۰۰ دور بر دقیقه' },
    { icon: 'box', label: 'وزن', value: '۱.۶ کیلوگرم' },
    { icon: 'refresh', label: 'زمان شارژ کامل', value: '۶۰ دقیقه' },
    { icon: 'truck', label: 'کشور سازنده', value: 'آلمان' },
    { icon: 'shield', label: 'گارانتی', value: '۱۲ ماه' },
  ],
  accessory: [
    { icon: 'gear', label: 'جنس بدنه', value: 'فولاد ابزار' },
    { icon: 'box', label: 'تعداد اجزا', value: '۴۰ پارچه' },
    { icon: 'wrench', label: 'سازگاری', value: 'استاندارد صنعتی' },
    { icon: 'box', label: 'وزن مجموعه', value: '۵.۴ کیلوگرم' },
    { icon: 'truck', label: 'کشور سازنده', value: 'تایوان' },
    { icon: 'shield', label: 'گارانتی', value: '۱۲ ماه' },
  ],
};

export const HIGHLIGHTS: Record<ProductGroup, string[]> = {
  air: [
    'بدنه آلومینیومی فورج با پوشش ضدضربه',
    'شیر تنظیم گشتاور دومرحله‌ای برای کنترل دقیق',
    'دسته ارگونومیک با روکش ضدلرزش',
    'سازگار با تمام کمپرسورهای استاندارد صنعتی',
  ],
  cordless: [
    'موتور براشلس با بازده و عمر بالا',
    'باتری لیتیومی با محافظت در برابر داغ شدن',
    'چراغ LED برای کار در فضای کم‌نور',
    'نمایشگر سطح شارژ روی بدنه',
  ],
  accessory: [
    'کیف حمل مقاوم با جای‌گذاری منظم',
    'آبکاری کروم-وانادیوم ضد زنگ',
    'سازگار با ابزارهای بادی و دستی',
    'مناسب کارگاه و تعمیرگاه سیار',
  ],
};

export const REVIEW_POOL: ProductReview[] = [
  {
    name: 'مهدی رستمی',
    date: '۲ هفته پیش',
    rating: 5,
    text: 'گشتاور و دوام این ابزار واقعاً عالی است؛ برای تعمیرگاه ماشین‌های سنگین گزینه‌ی خیلی خوبی است.',
  },
  {
    name: 'علی صادقی',
    date: '۱ ماه پیش',
    rating: 5,
    text: 'دسته‌اش خیلی راحت است و خستگی دست کمتری دارد نسبت به مدل قبلی که داشتم.',
  },
  {
    name: 'رضا کریمی',
    date: '۲ ماه پیش',
    rating: 4,
    text: 'کیفیت خوبی دارد؛ فقط صدایش کمی بلندتر از چیزی بود که فکر می‌کردم.',
  },
  {
    name: 'سیما احمدی',
    date: '۳ ماه پیش',
    rating: 5,
    text: 'بسته‌بندی و ارسال سریع بود و کالا دقیقاً مطابق توضیحات سایت است.',
  },
];

export const PRODUCT_FAQS: Faq[] = [
  {
    question: 'آیا این محصول گارانتی دارد؟',
    answer: 'بله، این محصول گارانتی رسمی پوما ایر شامل تعویض قطعات را دارد و اصالت کالا تضمین شده است.',
  },
  {
    question: 'برای کارهای خانگی هم مناسب است؟',
    answer:
      'این مدل برای کاربری صنعتی و نیمه‌صنعتی طراحی شده؛ برای مصارف سبک خانگی مدل‌های سبک‌تر را پیشنهاد می‌کنیم.',
  },
  {
    question: 'زمان ارسال چقدر است؟',
    answer: 'ارسال به تهران حداکثر ۲۴ ساعت و به سایر شهرها حداکثر ۴۸ ساعت کاری پس از ثبت سفارش است.',
  },
  {
    question: 'امکان پرداخت در محل وجود دارد؟',
    answer: 'برای سفارش‌های داخل تهران امکان پرداخت در محل و بازدید کالا پیش از تحویل فراهم است.',
  },
];

export const MODELS_BY_CATEGORY: Record<string, string[]> = {
  'air-wrench': ['۱/۲ اینچ استاندارد', '۱/۲ اینچ سنگین‌کار', '۳/۴ اینچ کارگاهی'],
  'air-screwdriver': ['مولتی‌تیری', 'تک‌سرعته', 'زاویه‌دار ۹۰ درجه'],
  'cordless-screwdriver': ['۱۲ ولت جیبی', '۱۸ ولت حرفه‌ای', '۲۰ ولت با دو باتری'],
};

export const DEFAULT_MODELS = ['استاندارد', 'حرفه‌ای', 'پکیج کارگاهی'];
