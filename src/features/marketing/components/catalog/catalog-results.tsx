import type { Product } from '../../types';
import type { CatalogView } from '../../types/catalog';
import { ProductCard } from '../products/product-card';
import { ProductListRow } from '../products/product-list-row';

type CatalogResultsProps = {
  products: Product[];
  view: CatalogView;
};

export function CatalogResults({ products, view }: CatalogResultsProps) {
  if (view === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <ProductListRow key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
