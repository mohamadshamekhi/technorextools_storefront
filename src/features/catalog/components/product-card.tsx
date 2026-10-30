import Link from 'next/link';

import { routes } from '@/config/routes';

import type { ProductCard as ProductCardData } from '../types';
import { cardDiscount, cardPurchase, cardStock } from '../utils/card-variant';
import { AddToCartButton } from './add-to-cart-button';
import { ProductCardMedia } from './product-card-media';
import { ProductCardPrice } from './product-card-price';
import { ProductCardStock } from './product-card-stock';

export function ProductCard({ product }: { product: ProductCardData }) {
  const href = routes.product(product.slug);
  const purchase = cardPurchase(product);
  const discount = cardDiscount(product, purchase.price);
  const stock = cardStock(product);
  const outOfStock = stock.state === 'out';

  return (
    <article className="bg-surface group rounded-card ring-hairline hover:ring-brand-200 relative flex h-full flex-col gap-3.5 p-2.5 ring-1 transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:shadow-(--shadow-lift) motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <ProductCardMedia
        product={product}
        href={href}
        percentOff={discount?.percent ?? null}
        outOfStock={outOfStock}
      />

      <div className="flex flex-1 flex-col gap-2 px-1.5">
        {product.brand ? (
          <p className="text-brand-600 bg-brand-50 w-fit rounded-md px-2 py-0.5 text-[10.5px] font-black tracking-wider uppercase">
            {product.brand.title}
          </p>
        ) : null}

        <h3 className="min-h-11 text-[14.5px] leading-relaxed font-bold">
          <Link
            href={href}
            className="hover:text-brand-600 line-clamp-2 transition-colors after:absolute after:inset-0 after:content-['']"
          >
            {product.title}
          </Link>
        </h3>

        <ProductCardStock stock={stock} />

        <div className="border-hairline relative z-10 mt-auto flex items-end justify-between gap-3 border-t border-dashed pt-3">
          <ProductCardPrice price={purchase.price} compareAt={discount?.compareAt ?? null} />
          <AddToCartButton
            compact
            disabled={outOfStock}
            id={purchase.id}
            title={product.title}
            price={purchase.price}
            slug={product.slug}
            imageUrl={product.mainImageUrl}
            variant="1"
            className="rounded-xl"
          />
        </div>
      </div>
    </article>
  );
}
