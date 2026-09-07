import { Container } from '@/components/atoms';

import { SECTION } from '../../anchors';
import { CATEGORIES } from '../../data/categories';
import { CategoryRailItem } from './category-rail-item';

export function CategoryRail() {
  return (
    <section
      id={SECTION.categories}
      aria-labelledby="categories-heading"
      className="bg-surface border-hairline scroll-mt-24 border-y"
    >
      <h2 id="categories-heading" className="sr-only">
        دسته‌بندی ابزارها
      </h2>
      <Container className="flex gap-4 overflow-x-auto py-8 sm:justify-between">
        {CATEGORIES.map((category) => (
          <CategoryRailItem key={category.slug} category={category} />
        ))}
      </Container>
    </section>
  );
}
