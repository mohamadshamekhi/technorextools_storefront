import { ProductCard } from '../../product-card';
import type { ProductCard as ProductCardData } from '../../../types';

type ProductCarouselProps = { id: string; title: string; products: ProductCardData[] };

/** Scroll-snap rail of uniform product cards (pure CSS — no JS, swipes natively). */
export function ProductCarousel({ id, title, products }: ProductCarouselProps) {
  if (products.length === 0) return null;
  return (
    <section aria-labelledby={`${id}-heading`} className="mt-12">
      <h2 id={`${id}-heading`} className="mb-5 text-[22px] font-bold tracking-tight">
        {title}
      </h2>
      <ul className="-mx-5 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-5 pt-1 pb-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <li key={product.id} className="w-[240px] shrink-0 snap-start">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
