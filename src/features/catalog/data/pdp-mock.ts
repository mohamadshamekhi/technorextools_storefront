import { productExtrasSchema } from '../services/pdp.schemas';
import type { ProductExtras } from '../types/pdp';

/**
 * Typed placeholder for PDP content `abzar/api` doesn't expose yet (documents, 3D hotspots,
 * Q&A, extended specs). Replace with API data field by field; no I/O here.
 * Asset URLs under `/docs` and `/models` are expected in `public/` — missing files degrade
 * gracefully (3D → poster fallback, documents → 404 on download).
 */
const raw: Omit<ProductExtras, 'explodedView'> = {
  documents: [
    {
      id: 'catalog',
      type: 'catalog',
      title: 'کاتالوگ محصول BSD 102',
      url: '/docs/bsd-102-catalog.pdf',
      sizeKb: 2458,
      locale: 'fa',
      updatedAt: '2026-07-12',
    },
    {
      id: 'manual',
      type: 'manual',
      title: 'دفترچه راهنمای کاربر',
      url: '/docs/bsd-102-manual.pdf',
      sizeKb: 1310,
      locale: 'fa',
      updatedAt: '2026-05-03',
    },
    {
      id: 'datasheet',
      type: 'datasheet',
      title: 'دیتاشیت فنی (Datasheet)',
      url: '/docs/bsd-102-datasheet.pdf',
      sizeKb: 640,
      locale: 'en',
      updatedAt: '2026-03-21',
    },
    {
      id: 'certificate',
      type: 'certificate',
      title: 'گواهی اصالت کالا',
      url: '/docs/bsd-102-certificate.pdf',
      sizeKb: 380,
      locale: 'fa',
      updatedAt: '2026-01-15',
    },
  ],
  model3d: {
    glbUrl: '/models/bsd-102.glb',
    posterUrl: '/products/bsd-102-poster.webp',
    alt: 'مدل سه‌بعدی پیچ‌گوشتی برقی BSD 102',
    hotspots: [
      {
        id: 'motor',
        label: 'موتور ۱۲ وات',
        description: 'موتور DC با سرعت ۱۰۰۰ دور بر دقیقه',
        position: [0.1, 0.05, 0.05],
      },
      {
        id: 'bit',
        label: 'سری چهارسو Ph2',
        description: 'بیت استاندارد با تعویض سریع',
        position: [-0.55, 0, 0],
      },
      {
        id: 'switch',
        label: 'کلید استارت',
        description: 'فشردن ۲۰ ثانیه‌ای، شروع خودکار',
        position: [0.2, -0.12, 0],
      },
    ],
  },
  video: null,
  specs: [
    { label: 'وزن دستگاه', value: '۱٫۱۳ کیلوگرم' },
    { label: 'سرعت چرخش', value: '۱۰۰۰ دور بر دقیقه' },
    { label: 'گشتاور', value: '۰٫۵ تا ۳٫۰ نیوتن‌متر' },
    { label: 'طول دستگاه', value: '۲۳۰ میلی‌متر' },
    { label: 'سری بیت', value: 'چهارسو Ph2' },
    { label: 'طول کابل', value: '۱٫۸ متر' },
    { label: 'گارانتی', value: '۳ ماه گارانتی معتبر' },
    { label: 'کشور سازنده', value: 'چین' },
  ],
  highlights: [
    { icon: 'bolt', value: '۱۲ وات', label: 'توان موتور' },
    { icon: 'gauge', value: '۱۰۰۰ rpm', label: 'سرعت چرخش' },
    { icon: 'shield', value: '۳ ماه', label: 'گارانتی' },
  ],
  keyFeatures: [
    {
      icon: 'weight',
      title: 'وزن سبک',
      value: '۱٫۱۳ کیلوگرم',
      hint: 'خستگی کمتر اپراتور در کار مداوم',
    },
    {
      icon: 'gear',
      title: 'گشتاور قابل تنظیم',
      value: '۰٫۵ تا ۳ N·m',
      hint: 'مناسب پیچ‌های ظریف تا معمولی',
    },
    { icon: 'drill', title: 'سری بیت', value: 'چهارسو Ph2', hint: 'تعویض سریع بدون آچار' },
    { icon: 'wrench', title: 'کاربرد', value: 'خط تولید و مونتاژ', hint: 'صنعتی، خانگی، کارگاهی' },
  ],
  questions: [
    {
      id: 'q1',
      question: 'آیا این مدل با آداپتور ۲۴ ولت کار می‌کند؟',
      answer: 'بله، ورودی ترانس ۲۴ ولت است و آداپتور استاندارد پشتیبانی می‌شود.',
      askedAt: '2026-08-02',
    },
    {
      id: 'q2',
      question: 'بیت یدکی همراه دستگاه ارسال می‌شود؟',
      answer: null,
      askedAt: '2026-08-19',
    },
  ],
};

export const pdpMock = productExtrasSchema.omit({ explodedView: true }).parse(raw);
