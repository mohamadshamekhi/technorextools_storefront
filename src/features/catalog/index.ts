/**
 * Catalog domain — client-safe surface only. Data-fetching server components
 * (`CatalogView`, `CategoryRail`, `FlashDeals`, `ProductShowcase`, `BrandStrip`)
 * and `services/catalog.api.ts` are imported by direct path from RSC / route
 * handlers — never through this barrel (barrel hygiene).
 */
export { ProductCard } from './components/product-card';
export { ProductGrid } from './components/product-grid';
export { CatalogHero } from './components/catalog-hero';
export { CategoryHero } from './components/category-hero';
export { CatalogEmptyState } from './components/catalog-empty-state';
export { ProductDetailView } from './components/product-detail/product-detail-view';

export {
  catalogParamsSchema,
  parseCatalogParams,
  hasActiveFilters,
  CATALOG_PAGE_SIZE,
  type CatalogParams,
} from './services/catalog.query';
export { flattenCategories, findCategoryNode, topLevelCategories } from './utils/category-tree';
export { categoryPresentation } from './data/presentation';

export type {
  Brand,
  CategoryNode,
  ProductAttributeValue,
  ProductCard as ProductCardData,
  ProductComment,
  ProductComments,
  ProductDetail,
  ProductList,
} from './types';
