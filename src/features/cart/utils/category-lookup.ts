import { categoryPresentation } from '@/features/catalog/data/presentation';

/** Visual chip (icon + OKLCH tint pair) for a category slug — always resolves. */
export function categoryChip(slug: string | undefined) {
  return categoryPresentation(slug ?? '');
}
