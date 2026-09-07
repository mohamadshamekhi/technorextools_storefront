import type { Product } from '../../types';
import { AddToCartButton } from './add-to-cart-button';
import { NotifyButton } from './notify-button';
import { ProductBadge } from './product-badge';
import { ProductMedia } from './product-media';
import { ProductPrice } from './product-price';
import { RatingStars } from './rating-stars';

export function ProductListRow({ product }: { product: Product }) {
  return (
    <article className="border-hairline bg-surface hover:border-brand-500/40 relative grid gap-5 rounded-card border p-4 transition-[box-shadow,border-color] hover:shadow-xl sm:grid-cols-[150px_1fr] lg:grid-cols-[150px_1fr_auto]">
      {product.badge ? <ProductBadge badge={product.badge} /> : null}
      <div className="overflow-hidden rounded-2xl">
        <ProductMedia inStock={product.inStock} />
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-base font-bold">{product.title}</h3>
        <RatingStars rating={product.rating} reviews={product.reviews} />
        <p className="text-foreground-muted max-w-xl text-[13px] leading-relaxed">
          {product.description}
        </p>
      </div>
      <div className="flex flex-col items-stretch gap-3 lg:w-52">
        <ProductPrice price={product.price} compareAt={product.compareAt} />
        {product.inStock ? (
          <AddToCartButton product={product} />
        ) : (
          <NotifyButton title={product.title} />
        )}
      </div>
    </article>
  );
}
