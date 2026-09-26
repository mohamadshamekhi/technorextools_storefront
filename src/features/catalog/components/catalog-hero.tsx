import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import type { IconName } from '@/components/atoms';

const HIGHLIGHTS: { icon: IconName; label: string }[] = [
  { icon: 'shield', label: 'گارانتی اصالت کالا' },
  { icon: 'truck', label: 'ارسال سریع به سراسر ایران' },
  { icon: 'headset', label: 'پشتیبانی فنی تخصصی' },
];

const STATS: { value: string; label: string }[] = [
  { value: '+۳۵۰', label: 'مدل ابزار' },
  { value: '+۲۰', label: 'دسته‌بندی تخصصی' },
  { value: '۱۸ ماه', label: 'گارانتی و خدمات' },
];

/** Breadcrumb + heading band above the catalog grid (server-rendered for SEO). */
export function CatalogHero() {
  return (
    <header className="surface-ink rounded-card relative mb-10 overflow-hidden px-5 py-10 text-white sm:px-10 sm:py-12">
      <div className="texture-grid absolute inset-0 opacity-70" aria-hidden />
      <div className="relative">
        <div>
          <nav
            aria-label="مسیر صفحه"
            className="mb-5 flex items-center gap-2 text-xs text-white/55"
          >
            <Link href={routes.home} className="hover:text-white">
              خانه
            </Link>
            <span aria-hidden>/</span>
            <span className="font-semibold text-white">همه محصولات</span>
          </nav>
          <p className="font-display mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-white/80 ring-1 ring-white/15">
            <Icon name="bolt" className="size-3.5" />
            TECHNOREXTOOLS CATALOG
          </p>
          <h1 className="text-3xl font-black tracking-tight text-balance sm:text-[2.5rem]">
            همه <span className="text-accent-400">محصولات</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-loose text-white/70">
            مجموعه کامل ابزار بادی و شارژی صنعتی تکنورکس با گارانتی اصالت کالا، ارسال سریع و
            پشتیبانی فنی. با فیلترهای دسته‌بندی، برند و قیمت سریع‌تر به ابزار مورد نیازتان برسید.
          </p>
          <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12.5px] font-semibold text-white/65">
            {HIGHLIGHTS.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <Icon name={item.icon} className="text-accent-400 size-4" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <dl className="mt-9 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-ink/70 flex flex-col px-3 py-4 text-center sm:py-5">
              <dt className="mt-1 text-[11.5px] leading-relaxed text-white/60">{stat.label}</dt>
              <dd className="font-display text-accent-400 order-first text-xl font-black tabular-nums sm:text-2xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
