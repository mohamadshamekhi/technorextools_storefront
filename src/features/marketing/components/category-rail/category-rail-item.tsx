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
        className="grid size-[76px] place-items-center rounded-full transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:scale-105"
        style={{ backgroundColor: category.tint, color: category.ink }}
      >
        <Icon name={category.icon} className="size-8" />
      </span>
      <span className="text-[13px] font-bold">{category.title}</span>
    </Link>
  );
}
