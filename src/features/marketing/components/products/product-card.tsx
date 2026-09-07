import Link from 'next/link';

import { routes } from '@/config/routes';

import type { Product } from '../../types';
import { AddToCartButton } from './add-to-cart-button';
import { NotifyButton } from './notify-button';
import { ProductBadge } from './product-badge';
import { ProductMedia } from './product-media';
import { ProductPrice } from './product-price';
import { RatingStars } from './rating-stars';
import { WishlistButton } from './wishlist-button';

export function ProductCard({ product }: { product: Product }) {
  const href = routes.product(product.id);

  return (
    <article className="border-hairline bg-surface hover:border-brand-500/45 relative flex flex-col overflow-hidden rounded-card border transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {product.badge ? <ProductBadge badge={product.badge} /> : null}
      <WishlistButton title={product.title} />
      <Link href={href} aria-label={product.title} tabIndex={-1}>
        <ProductMedia inStock={product.inStock} />
      </Link>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <h3 className="min-h-[2.75rem] text-[15px] leading-relaxed font-bold">
          <Link href={href} className="hover:text-brand-600 line-clamp-2 transition-colors">
            {product.title}
          </Link>
        </h3>
        <RatingStars rating={product.rating} reviews={product.reviews} />
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
