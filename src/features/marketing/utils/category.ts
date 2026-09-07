import { PRODUCTS } from '../data/catalog';
import { CATEGORIES } from '../data/categories';
import type { Category } from '../types';

/** Resolve a department by its slug. */
export function findCategory(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

/** Categories that currently hold at least one product — the indexable set. */
export function stockedCategories(): Category[] {
  const slugs = new Set(PRODUCTS.map((product) => product.categorySlug));
  return CATEGORIES.filter((category) => slugs.has(category.slug));
}

/** How many catalogue items sit in a category. */
export function categoryProductCount(slug: string): number {
  return PRODUCTS.filter((product) => product.categorySlug === slug).length;
}
