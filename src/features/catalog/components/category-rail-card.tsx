import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import { categoryPresentation } from '../data/presentation';
import type { CategoryNode } from '../types';

type CategoryRailCardProps = {
  category: CategoryNode;
  /** Wide hero card spanning both columns — used for the first category. */
  featured?: boolean;
};

/** Mobile category card: thumbnail + title + sub-category count. */
export function CategoryRailCard({ category, featured }: CategoryRailCardProps) {
  const style = categoryPresentation(category.slug);
  const subCount = category.children.length;

  return (
    <Link
      href={routes.category(category.slug)}
      className={cn(
        'group border-hairline relative flex items-center overflow-hidden rounded-2xl border shadow-(--shadow-soft) transition-transform active:scale-[0.98]',
        featured
          ? 'from-brand-50 to-surface col-span-2 min-h-28 gap-4 bg-linear-to-l p-4'
          : 'bg-surface min-h-20 gap-3 p-3',
      )}
    >
      <span
        className={cn(
          'relative grid shrink-0 place-items-center overflow-hidden rounded-xl',
          featured ? 'bg-surface size-20 shadow-(--shadow-soft)' : 'bg-surface-muted size-14',
        )}
        style={category.imageUrl ? undefined : { backgroundColor: style.tint, color: style.ink }}
      >
        {category.imageUrl ? (
          <Image
            src={category.imageUrl}
            alt=""
            fill
            sizes={featured ? '80px' : '56px'}
            className="object-contain p-2"
          />
        ) : (
          <Icon name={style.icon} className={featured ? 'size-8' : 'size-6'} />
        )}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span
          className={cn(
            'line-clamp-2 leading-snug font-bold',
            featured ? 'text-base font-black' : 'text-[13px]',
          )}
        >
          {category.title}
        </span>
        <span className="text-foreground-muted text-[11px] font-medium">
          {subCount > 0 ? `${toPersianDigits(subCount)} زیردسته` : 'مشاهده محصولات'}
        </span>
      </span>
      {featured ? (
        <span className="bg-brand-600 grid size-9 shrink-0 place-items-center rounded-full text-white">
          <Icon name="chevron" className="size-4" />
        </span>
      ) : null}
    </Link>
  );
}
