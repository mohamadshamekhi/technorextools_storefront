import { CATEGORIES, type Category } from '@/features/marketing';

/** Resolve a catalogue category by slug — drives the coloured cart icon badge. */
export function categoryFor(slug: string | undefined): Category | undefined {
  if (!slug) return undefined;
  return CATEGORIES.find((category) => category.slug === slug);
}
