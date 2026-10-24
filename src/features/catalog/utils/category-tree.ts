import type { CategoryNode } from '../types';

/** Depth-first flatten of the category tree. */
export function flattenCategories(nodes: CategoryNode[]): CategoryNode[] {
  return nodes.flatMap((node) => [node, ...flattenCategories(node.children)]);
}

/** Find one category anywhere in the tree by slug. */
export function findCategoryNode(nodes: CategoryNode[], slug: string): CategoryNode | undefined {
  return flattenCategories(nodes).find((node) => node.slug === slug);
}

/** Top-level categories, sorted for display. */
export function topLevelCategories(nodes: CategoryNode[]): CategoryNode[] {
  return [...nodes].sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Serializable `{ slug, title, children }` tree for client facets. */
export type CategoryOption = { slug: string; title: string; children: CategoryOption[] };

export function toCategoryOptions(nodes: CategoryNode[]): CategoryOption[] {
  return topLevelCategories(nodes).map((node) => ({
    slug: node.slug,
    title: node.title,
    children: toCategoryOptions(node.children),
  }));
}

/** Slugs of every ancestor of `slug` (root first), or `[]` when not found. */
export function categoryAncestors(nodes: CategoryOption[], slug: string): string[] {
  for (const node of nodes) {
    if (node.slug === slug) return [];
    const path = categoryAncestors(node.children, slug);
    if (path.length > 0 || node.children.some((child) => child.slug === slug)) {
      return [node.slug, ...path];
    }
  }
  return [];
}
