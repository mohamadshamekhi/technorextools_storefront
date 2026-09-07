import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

/** Breadcrumb + heading block above the catalog grid (server-rendered for SEO). */
export function CatalogHero() {
  return (
    <header className="mb-8">
      <nav aria-label="مسیر صفحه" className="text-foreground-muted mb-5 flex items-center gap-2 text-xs">
        <Link href={routes.home} className="hover:text-brand-600">
          خانه
        </Link>
        <span aria-hidden>/</span>
        <span className="text-foreground font-semibold">همه محصولات</span>
      </nav>
      <p className="text-brand-600 font-display mb-2 flex items-center gap-2 text-xs tracking-[0.2em]">
        <Icon name="bolt" className="size-3.5" />
        PUMA AIR CATALOG
      </p>
      <h1 className="text-3xl font-black tracking-tight sm:text-[2.35rem]">همه محصولات</h1>
      <p className="text-foreground-muted mt-3 max-w-2xl text-sm leading-relaxed">
        مجموعه کامل ابزار بادی و شارژی صنعتی پوما ایر با گارانتی اصالت کالا، ارسال سریع به سراسر
        ایران و پشتیبانی فنی. با فیلترهای دسته‌بندی، برند، قیمت و امتیاز، سریع‌تر به ابزار مورد
        نیازتان برسید.
      </p>
    </header>
  );
}
