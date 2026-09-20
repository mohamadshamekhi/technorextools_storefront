import Link from 'next/link';

import { MediaPlaceholder } from '@/components/atoms';
import { routes } from '@/config/routes';
import { formatToman, toPersianDigits } from '@/lib/persian';

import type { SparePart } from '../services/spare-parts.schemas';
import { AddSparePartButton } from './add-spare-part-button';

export function SparePartDetailView({ part }: { part: SparePart }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="bg-surface-muted overflow-hidden rounded-2xl">
        <MediaPlaceholder
          label={part.title}
          src={part.mainImageUrl ?? undefined}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="aspect-square p-8 mix-blend-multiply"
        />
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl leading-relaxed font-black sm:text-3xl">{part.title}</h1>
        {part.partNumber ? (
          <p className="text-foreground-muted text-sm">
            شماره قطعه: <span dir="ltr">{part.partNumber}</span>
          </p>
        ) : null}
        {part.shortDesc ? (
          <p className="text-foreground-muted leading-loose">{part.shortDesc}</p>
        ) : null}
        <p className="flex items-baseline gap-2">
          <span className="font-display text-3xl font-black tabular-nums">
            {formatToman(part.price)}
          </span>
          <span className="text-foreground-muted text-sm">تومان</span>
        </p>
        <p
          className={
            part.stockQty > 0 ? 'text-success text-sm font-bold' : 'text-sale text-sm font-bold'
          }
        >
          {part.stockQty > 0 ? `موجود (${toPersianDigits(part.stockQty)} عدد)` : 'ناموجود'}
        </p>
        <AddSparePartButton
          id={part.id}
          title={part.title}
          price={part.price}
          imageUrl={part.mainImageUrl}
          partNumber={part.partNumber}
          stockQty={part.stockQty}
          className="sm:max-w-xs"
        />
        {part.compatibleProducts.length > 0 ? (
          <section aria-labelledby="compat-heading" className="border-hairline border-t pt-5">
            <h2 id="compat-heading" className="mb-3 text-base font-bold">
              سازگار با محصولات
            </h2>
            <ul className="flex flex-wrap gap-2">
              {part.compatibleProducts.map((product) => (
                <li key={product.id}>
                  <Link
                    href={routes.product(product.slug)}
                    className="bg-surface-sunken hover:text-brand-600 inline-block rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors"
                  >
                    {product.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {part.description ? (
          <section className="border-hairline border-t pt-5">
            <h2 className="mb-3 text-base font-bold">توضیحات</h2>
            <p className="text-foreground-muted leading-loose whitespace-pre-line">
              {part.description}
            </p>
          </section>
        ) : null}
      </div>
    </div>
  );
}
