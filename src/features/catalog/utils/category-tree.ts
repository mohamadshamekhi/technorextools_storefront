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
