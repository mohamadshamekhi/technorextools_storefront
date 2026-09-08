import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

import type { Category } from '../../types';

/** One circular department shortcut. Chip colours are data-driven per category. */
export function CategoryRailItem({ category }: { category: Category }) {
  return (
    <Link
      href={routes.category(category.slug)}
      className="group flex shrink-0 basis-24 flex-col items-center gap-3 text-center sm:flex-1"
    >
      <span
        className="grid size-[78px] place-items-center rounded-2xl shadow-(--shadow-soft) ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1.5 group-hover:shadow-(--shadow-lift)"
        style={{ backgroundColor: category.tint, color: category.ink }}
      >
        <Icon name={category.icon} className="size-8" />
      </span>
      <span className="group-hover:text-brand-700 text-[13px] font-bold transition-colors">
        {category.title}
      </span>
    </Link>
  );
}
