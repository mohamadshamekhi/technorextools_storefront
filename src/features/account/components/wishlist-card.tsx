import Link from 'next/link';

import { Icon, MediaPlaceholder } from '@/components/atoms';
import { routes } from '@/config/routes';
import { formatToman } from '@/lib/persian';

import type { WishlistItem } from '../types';

type WishlistCardProps = {
  item: WishlistItem;
  onRemove: () => void;
  removing?: boolean;
};

export function WishlistCard({ item, onRemove, removing }: WishlistCardProps) {
  return (
    <div className="border-hairline bg-surface overflow-hidden rounded-2xl border shadow-sm">
      <Link href={routes.product(item.slug)} aria-label={item.title}>
        <MediaPlaceholder
          label={item.title}
          src={item.mainImageUrl ?? undefined}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
          className="aspect-square text-[11px]"
        />
      </Link>
      <div className="p-4">
        {item.brand ? (
          <span className="text-brand-600 bg-brand-50 mb-2 inline-block w-fit rounded-full px-2.5 py-1 text-[11px] font-bold">
            {item.brand.title}
          </span>
        ) : null}
        <Link href={routes.product(item.slug)}>
          <p className="line-clamp-2 min-h-10 text-[13.5px] leading-relaxed font-bold">
            {item.title}
          </p>
        </Link>
        <div className="mt-2.5 flex items-center justify-between">
          <span className="font-display text-[15px] font-bold">
            {formatToman(item.basePrice)}{' '}
            <span className="text-foreground-muted font-sans text-[11px] font-medium">تومان</span>
          </span>
          <button
            type="button"
            aria-label={`حذف ${item.title} از علاقه‌مندی‌ها`}
            onClick={onRemove}
            disabled={removing}
            className="border-hairline bg-surface-sunken hover:border-sale/50 grid size-8 place-items-center rounded-lg border transition-colors disabled:opacity-50"
          >
            <Icon name="trash" className="text-sale size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
