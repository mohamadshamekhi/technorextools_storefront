import { listBrands, getCategoryTree, listProducts } from '../services/catalog.api';
import type { CatalogParams } from '../services/catalog.query';
import { flattenCategories, toCategoryOptions } from '../utils/category-tree';
import { CatalogEmptyState } from './catalog-empty-state';
import { CatalogFilters } from './catalog-filters';
import { CatalogPagination } from './catalog-pagination';
import { CatalogToolbar } from './catalog-toolbar';
import { ProductGrid } from './product-grid';

type CatalogViewProps = {
  params: CatalogParams;
  /** When set, the page is scoped to one department and the category facet is hidden. */
  lockedCategory?: string;
};

/**
 * Server-rendered catalog: filters sidebar (client, writes to the URL) +
 * results grid fetched from `abzar/api` per the current `searchParams`.
 */
export async function CatalogView({ params, lockedCategory }: CatalogViewProps) {
  const [tree, brands, result] = await Promise.all([
    getCategoryTree().catch(() => []),
    listBrands().catch(() => []),
    listProducts(params, lockedCategory ? { category: lockedCategory } : undefined).catch(
      () => null,
    ),
  ]);

  if (!result) return <CatalogEmptyState variant="error" />;

  const categories = flattenCategories(tree).map((node) => ({
    slug: node.slug,
    title: node.title,
  }));
  const brandOptions = brands.map((brand) => ({ slug: brand.slug, title: brand.title }));
  const page = params.page ?? 1;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[260px_1fr]">
      <CatalogFilters
        categoryTree={toCategoryOptions(tree)}
        brands={brandOptions}
        lockedCategory={lockedCategory}
      />
      <div>
        <CatalogToolbar
          total={result.total}
          page={page}
          shown={result.items.length}
          categories={categories}
          brands={brandOptions}
          lockedCategory={lockedCategory}
        />
        <ProductGrid products={result.items} />
        <CatalogPagination total={result.total} page={page} lockedCategory={lockedCategory} />
      </div>
    </div>
  );
}
