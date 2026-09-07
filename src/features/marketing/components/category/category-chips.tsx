import Link from 'next/link';

import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

import type { Category } from '../../types';

type CategoryChipsProps = {
  categories: Category[];
  activeSlug: string;
};

/** Sibling-department shortcuts shown above the results grid. */
export function CategoryChips({ categories, activeSlug }: CategoryChipsProps) {
  return (
    <nav aria-label="دسته‌بندی‌های مرتبط" className="mb-6 flex flex-wrap gap-2.5">
      {categories.map((category) => {
        const active = category.slug === activeSlug;
        return (
          <Link
            key={category.slug}
            href={routes.category(category.slug)}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'rounded-full border px-4 py-2 text-[13px] font-bold transition-colors',
              active
                ? 'border-brand-500 bg-brand-500 text-white'
                : 'border-hairline bg-surface hover:border-brand-500/50 text-foreground-muted',
            )}
          >
            {category.title}
          </Link>
        );
      })}
    </nav>
  );
}
