import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import type { IconName } from '@/components/atoms';

const HIGHLIGHTS: { icon: IconName; label: string }[] = [
  { icon: 'shield', label: 'گارانتی اصالت کالا' },
  { icon: 'truck', label: 'ارسال سریع به سراسر ایران' },
  { icon: 'headset', label: 'پشتیبانی فنی تخصصی' },
];

/** Breadcrumb + heading block above the catalog grid (server-rendered for SEO). */
export function CatalogHero() {
  return (
    <header className="mb-8">
      <nav
        aria-label="مسیر صفحه"
        className="text-foreground-muted mb-5 flex items-center gap-2 text-xs"
      >
        <Link href={routes.home} className="hover:text-brand-600">
          خانه
        </Link>
        <span aria-hidden>/</span>
        <span className="text-foreground font-semibold">همه محصولات</span>
      </nav>
      <p className="text-brand-600 font-display ring-brand-100 bg-brand-50 mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-[0.18em] ring-1">
        <Icon name="bolt" className="size-3.5" />
        TECHNOREXTOOLS CATALOG
      </p>
      <h1 className="text-3xl font-black tracking-tight text-balance sm:text-[2.4rem]">
        همه <span className="text-gradient-brand">محصولات</span>
      </h1>
      <p className="text-foreground-muted mt-3 text-sm leading-relaxed">
        مجموعه کامل ابزار بادی و شارژی صنعتی تکنورکس با گارانتی اصالت کالا، ارسال سریع به سراسر
        ایران و پشتیبانی فنی. با فیلترهای دسته‌بندی، برند و قیمت، سریع‌تر به ابزار مورد نیازتان
        برسید.
      </p>
      <ul className="mt-6 flex flex-wrap gap-3">
        {HIGHLIGHTS.map((item) => (
          <li
            key={item.label}
            className="border-hairline bg-surface text-foreground-muted flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12.5px] font-bold shadow-(--shadow-soft)"
          >
            <span className="text-brand-600 bg-brand-50 grid size-6 place-items-center rounded-full">
              <Icon name={item.icon} className="size-3.5" />
            </span>
            {item.label}
          </li>
        ))}
      </ul>
    </header>
  );
}
