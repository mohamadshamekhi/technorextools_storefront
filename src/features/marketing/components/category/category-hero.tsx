import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

import { toPersianDigits } from '../../utils/persian';
import type { Category } from '../../types';

type CategoryHeroProps = {
  category: Category;
  count: number;
};

/** Breadcrumb + department banner above the category grid (server-rendered for SEO). */
export function CategoryHero({ category, count }: CategoryHeroProps) {
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
        <Link href={routes.products} className="hover:text-brand-600">
          محصولات
        </Link>
        <span aria-hidden>/</span>
        <span className="text-foreground font-semibold">{category.title}</span>
      </nav>

      <div className="border-hairline bg-surface rounded-card flex flex-col gap-5 border p-6 shadow-sm sm:flex-row sm:items-center sm:gap-7 sm:p-8">
        <span
          className="grid size-16 shrink-0 place-items-center rounded-2xl sm:size-[70px]"
          style={{ backgroundColor: category.tint, color: category.ink }}
        >
          <Icon name={category.icon} className="size-8" />
        </span>

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-black tracking-tight sm:text-[1.7rem]">{category.title}</h1>
          <p className="text-foreground-muted mt-2 max-w-2xl text-sm leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="border-hairline flex shrink-0 items-center gap-3 border-t pt-4 sm:flex-col sm:gap-0.5 sm:border-t-0 sm:border-s sm:ps-7">
          <span className="text-brand-600 font-display text-2xl font-bold">
            {toPersianDigits(count)}
          </span>
          <span className="text-foreground-muted text-[12px]">محصول در این دسته</span>
        </div>
      </div>
    </header>
  );
}
