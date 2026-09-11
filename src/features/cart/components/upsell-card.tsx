import { MediaPlaceholder } from '@/components/atoms';
import type { UpsellProduct } from '../types';
import { formatToman } from '@/lib/persian';

import { ProductMediaBadge } from './product-media-badge';
import { UpsellAddButton } from './upsell-add-button';

export function UpsellCard({ product }: { product: UpsellProduct }) {
  return (
    <div className="border-hairline hover:border-brand-500/40 bg-surface overflow-hidden rounded-2xl border shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative">
        <MediaPlaceholder
          label={product.title}
          src={product.imageUrl ?? undefined}
          className="aspect-square text-xs"
        />
        <ProductMediaBadge categorySlug={product.categorySlug} />
      </div>
      <div className="p-4">
        <p className="line-clamp-2 min-h-10.5 text-[13.5px] leading-relaxed font-bold">
          {product.title}
        </p>
        <div className="mt-2.5 flex items-center justify-between">
          <span className="font-display text-[15px] font-bold">{formatToman(product.price)}</span>
          <UpsellAddButton product={product} />
        </div>
      </div>
    </div>
  );
}
