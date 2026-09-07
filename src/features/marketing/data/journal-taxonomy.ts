import type { JournalCategory } from '../types';

export const JOURNAL_CATEGORIES: JournalCategory[] = [
  {
    slug: 'guides',
    label: 'راهنمای انتخاب ابزار',
    icon: 'wrench',
    chip: 'bg-brand-50',
    ink: 'text-brand-600',
  },
  {
    slug: 'maintenance',
    label: 'نگهداری و تعمیر',
    icon: 'gear',
    chip: 'bg-[oklch(0.94_0.035_250)]',
    ink: 'text-[oklch(0.53_0.16_250)]',
  },
  {
    slug: 'news',
    label: 'اخبار محصولات',
    icon: 'bolt',
    chip: 'bg-[oklch(0.94_0.04_150)]',
    ink: 'text-[oklch(0.5_0.14_155)]',
  },
  {
    slug: 'safety',
    label: 'ایمنی کار با ابزار',
    icon: 'shield',
    chip: 'bg-[oklch(0.95_0.05_25)]',
    ink: 'text-sale',
  },
  {
    slug: 'comparisons',
    label: 'مقایسه مدل‌ها',
    icon: 'scale',
    chip: 'bg-[oklch(0.94_0.035_300)]',
    ink: 'text-[oklch(0.5_0.16_300)]',
  },
];

/** Trending topics strip under the journal hero. */

export const JOURNAL_TRENDING = [
  { rank: '۱', title: 'راهنمای انتخاب پیچ‌گوشتی بادی' },
  { rank: '۲', title: 'ابزار بادی یا شارژی؟' },
  { rank: '۳', title: 'نکات ایمنی کار با ابزار بادی' },
  { rank: '۴', title: 'زمان تعویض روغن ابزار بادی' },
  { rank: '۵', title: 'مقایسه برندهای ابزار بادی' },
];
