import Link from 'next/link';

import { Icon, MediaPlaceholder } from '@/components/atoms';
import { routes } from '@/config/routes';
import { formatToman, toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import type { SparePart } from '../services/spare-parts.schemas';
import { AddSparePartButton } from './add-spare-part-button';

export function SparePartCard({ part }: { part: SparePart }) {
  const href = routes.sparePart(part.slug);
  const inStock = part.stockQty > 0;
  const lowStock = inStock && part.stockQty <= 3;

  return (
    <article className="group bg-surface rounded-card ring-hairline flex h-full w-full flex-col overflow-hidden p-3 shadow-(--shadow-soft) ring-1 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-(--shadow-lift)">
      <div className="bg-surface-sunken relative overflow-hidden rounded-[1.05rem]">
        <span
          className={cn(
            'absolute start-3 top-3 z-10 rounded-full px-2.5 py-1 text-[11px] font-bold',
            inStock ? 'bg-success/12 text-success' : 'bg-surface text-foreground-muted',
          )}
        >
          {inStock
            ? lowStock
              ? `تنها ${toPersianDigits(part.stockQty)} عدد`
              : 'موجود'
            : 'ناموجود'}
        </span>
        {part.partNumber ? (
          <span
            dir="ltr"
            className="bg-surface/85 text-foreground-muted absolute end-3 top-3 z-10 rounded-full px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider backdrop-blur-sm"
          >
            {part.partNumber}
          </span>
        ) : null}
        <Link href={href} aria-label={part.title} tabIndex={-1} className="block">
          <MediaPlaceholder
            label={part.title}
            src={part.mainImageUrl ?? undefined}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
            className="aspect-square p-6 text-[12px] mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-2 pt-4 pb-3">
        <h3 className="text-[15px] leading-relaxed font-extrabold">
          <Link href={href} className="hover:text-brand-600 line-clamp-2 transition-colors">
            {part.title}
          </Link>
        </h3>
        {part.compatibleProducts.length > 0 ? (
          <p className="text-foreground-muted flex items-center gap-1.5 text-[12px]">
            <Icon name="wrench" className="text-brand-500 size-3.5 shrink-0" />
            سازگار با {toPersianDigits(part.compatibleProducts.length)} ابزار
          </p>
        ) : null}
        <p className="mt-auto flex items-baseline gap-1.5 pt-2">
          <span className="font-display text-xl font-black tabular-nums">
            {formatToman(part.price)}
          </span>
          <span className="text-foreground-muted text-[12px]">تومان</span>
        </p>
      </div>

      <AddSparePartButton
        id={part.id}
        title={part.title}
        price={part.price}
        imageUrl={part.mainImageUrl}
        partNumber={part.partNumber}
        stockQty={part.stockQty}
      />
    </article>
  );
}
