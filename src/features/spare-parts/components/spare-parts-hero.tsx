import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import type { IconName } from '@/components/atoms';

import { SparePartsSearchForm } from './spare-parts-search-form';

const HIGHLIGHTS: { icon: IconName; label: string }[] = [
  { icon: 'shield', label: 'قطعات کاملاً اصل' },
  { icon: 'search', label: 'جستجو با شماره فنی' },
  { icon: 'truck', label: 'ارسال سریع به سراسر ایران' },
];

/** Dark hero band: breadcrumb, headline and the part-number search (server-rendered). */
export function SparePartsHero({ q, inStock }: { q?: string; inStock?: boolean }) {
  return (
    <header className="surface-ink rounded-card relative overflow-hidden px-5 py-10 text-white sm:px-10 sm:py-14">
      <div className="texture-grid absolute inset-0 opacity-70" aria-hidden />
      <div className="relative mx-auto max-w-3xl text-center">
        <nav
          aria-label="مسیر صفحه"
          className="mb-6 flex items-center justify-center gap-2 text-xs text-white/55"
        >
          <Link href={routes.home} className="hover:text-white">
            خانه
          </Link>
          <span aria-hidden>/</span>
          <span className="font-semibold text-white">قطعات یدکی</span>
        </nav>
        <p className="font-display mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-white/80 ring-1 ring-white/15">
          <Icon name="gear" className="size-3.5" />
          TECHNOREXTOOLS PARTS
        </p>
        <h1 className="text-3xl font-black tracking-tight text-balance sm:text-[2.5rem]">
          قطعات <span className="text-accent-400">یدکی</span> اصل
        </h1>
        <p className="mt-4 text-sm leading-loose text-white/70 sm:text-base">
          ابزارتان را دور نیندازید. شماره فنی یا نام قطعه را وارد کنید تا قطعه‌ی سازگار با گارانتی
          اصالت را پیدا کنیم.
        </p>
        <SparePartsSearchForm q={q} inStock={inStock} />
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[12.5px] font-semibold text-white/65">
          {HIGHLIGHTS.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <Icon name={item.icon} className="text-accent-400 size-4" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
