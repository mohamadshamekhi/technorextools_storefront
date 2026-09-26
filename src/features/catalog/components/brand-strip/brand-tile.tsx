import Image from 'next/image';
import Link from 'next/link';

import { routes } from '@/config/routes';

import type { Brand } from '../../types';

type BrandTileProps = { brand: Brand };

/** One partner card — real logo when the API has one, wordmark fallback otherwise. */
export function BrandTile({ brand }: BrandTileProps) {
  return (
    <Link
      href={`${routes.products}?brand=${brand.slug}`}
      className="border-hairline bg-surface hover:border-brand-300 group relative grid h-24 w-44 shrink-0 place-items-center overflow-hidden rounded-2xl border shadow-(--shadow-soft) transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-(--shadow-lift) sm:h-26 sm:w-52"
    >
      <span className="from-brand-50/0 via-brand-50/60 to-brand-50/0 pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-full group-hover:opacity-100" />
      {brand.logoUrl ? (
        <Image
          src={brand.logoUrl}
          alt={brand.title}
          width={132}
          height={48}
          sizes="(max-width: 640px) 132px, 160px"
          className="h-10 w-auto object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-12"
        />
      ) : (
        <span className="font-display text-foreground-muted group-hover:text-brand-600 px-3 text-center text-[15px] font-black tracking-tight transition-colors sm:text-base">
          {brand.title}
        </span>
      )}
      {brand.isExclusiveDistributor ? (
        <span className="bg-accent-500 text-ink absolute top-0 left-0 rounded-tl-2xl rounded-br-xl px-2 py-0.5 text-[10px] font-black">
          نمایندگی رسمی
        </span>
      ) : null}
    </Link>
  );
}
