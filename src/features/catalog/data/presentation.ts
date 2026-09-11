import type { IconName } from '@/components/atoms';

/**
 * Purely visual metadata the API does not carry — icon chip + OKLCH tint pair
 * per category slug. Unknown slugs fall back to `DEFAULT_CATEGORY_PRESENTATION`.
 */
export type CategoryPresentation = {
  icon: IconName;
  tint: string;
  ink: string;
};

export const DEFAULT_CATEGORY_PRESENTATION: CategoryPresentation = {
  icon: 'gear',
  tint: 'oklch(0.95 0.02 250)',
  ink: 'oklch(0.5 0.14 250)',
};

export const CATEGORY_PRESENTATION: Record<string, CategoryPresentation> = {
  'air-screwdriver': { icon: 'wrench', tint: 'oklch(0.95 0.035 45)', ink: 'oklch(0.6 0.19 45)' },
  'air-drill': { icon: 'drill', tint: 'oklch(0.94 0.035 250)', ink: 'oklch(0.53 0.16 250)' },
  'air-wrench': { icon: 'bolt', tint: 'oklch(0.95 0.04 85)', ink: 'oklch(0.58 0.15 75)' },
  'cordless-screwdriver': {
    icon: 'battery',
    tint: 'oklch(0.94 0.04 150)',
    ink: 'oklch(0.5 0.14 155)',
  },
  'air-hammer': { icon: 'hammer', tint: 'oklch(0.94 0.035 300)', ink: 'oklch(0.5 0.16 300)' },
  measurement: { icon: 'gauge', tint: 'oklch(0.95 0.03 200)', ink: 'oklch(0.5 0.13 215)' },
  accessories: { icon: 'gear', tint: 'oklch(0.95 0.02 30)', ink: 'oklch(0.52 0.12 30)' },
  'spare-parts': { icon: 'box', tint: 'oklch(0.94 0.02 70)', ink: 'oklch(0.45 0.04 70)' },
};

export function categoryPresentation(slug: string): CategoryPresentation {
  return CATEGORY_PRESENTATION[slug] ?? DEFAULT_CATEGORY_PRESENTATION;
}
