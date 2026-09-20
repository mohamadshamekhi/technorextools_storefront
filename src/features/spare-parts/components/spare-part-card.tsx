import Link from 'next/link';

import { MediaPlaceholder } from '@/components/atoms';
import { routes } from '@/config/routes';
import { formatToman } from '@/lib/persian';

import type { SparePart } from '../services/spare-parts.schemas';
import { AddSparePartButton } from './add-spare-part-button';

export function SparePartCard({ part }: { part: SparePart }) {
  const href = routes.sparePart(part.slug);
  return (
    <article className="bg-surface rounded-card flex flex-col gap-4 p-3 shadow-(--shadow-soft) ring-1 ring-black/5">
      <Link
        href={href}
        aria-label={part.title}
        tabIndex={-1}
        className="bg-surface-muted block overflow-hidden rounded-xl"
      >
        <MediaPlaceholder
          label={part.title}
          src={part.mainImageUrl ?? undefined}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
          className="aspect-square p-6 text-[12px] mix-blend-multiply"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 px-2">
        {part.partNumber ? (
          <span className="text-foreground-muted text-[11px] font-bold tracking-wider" dir="ltr">
            {part.partNumber}
          </span>
        ) : null}
        <h3 className="min-h-12 text-[15px] leading-relaxed font-extrabold">
          <Link href={href} className="hover:text-brand-600 line-clamp-2 transition-colors">
            {part.title}
          </Link>
        </h3>
        <p className="flex items-baseline gap-1.5">
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
