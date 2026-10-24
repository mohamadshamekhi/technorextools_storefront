import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { toPersianDigits } from '@/lib/persian';

import { categoryPresentation } from '../data/presentation';

type CategoryHeroProps = {
  title: string;
  slug: string;
  count: number;
  imageUrl: string | null;
};

/** Breadcrumb + department banner above the category grid (server-rendered for SEO). */
export function CategoryHero({ title, slug, count, imageUrl }: CategoryHeroProps) {
  const style = categoryPresentation(slug);
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
        <span className="text-foreground font-semibold">{title}</span>
      </nav>

      <div className="border-hairline bg-surface rounded-card relative flex flex-col gap-5 overflow-hidden border p-6 shadow-(--shadow-soft) sm:flex-row sm:items-center sm:gap-7 sm:p-8">
        {imageUrl ? (
          <span className="bg-surface border-hairline relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl border shadow-(--shadow-soft) sm:size-17.5">
            <Image src={imageUrl} alt={title} fill sizes="70px" className="object-contain p-1" />
          </span>
        ) : (
          <span
            className="relative grid size-16 shrink-0 place-items-center rounded-2xl shadow-(--shadow-soft) ring-1 ring-black/5 sm:size-17.5"
            style={{ backgroundColor: style.tint, color: style.ink }}
          >
            <Icon name={style.icon} className="size-8" />
          </span>
        )}

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-black tracking-tight sm:text-[1.7rem]">{title}</h1>
        </div>

        <div className="border-hairline relative flex shrink-0 items-center gap-3 border-t pt-4 sm:flex-col sm:gap-0.5 sm:border-s sm:border-t-0 sm:ps-7">
          <span className="text-gradient-brand font-display text-2xl font-black">
            {toPersianDigits(count)}
          </span>
          <span className="text-foreground-muted text-[12px]">محصول در این دسته</span>
        </div>
      </div>
    </header>
  );
}
