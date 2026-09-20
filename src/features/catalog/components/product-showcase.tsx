import Link from 'next/link';

import { Container } from '@/components/atoms';
import { SectionHeading } from '@/components/molecules';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

import { getCategoryTree, listProducts } from '../services/catalog.api';
import { topLevelCategories } from '../utils/category-tree';
import { ProductGrid } from './product-grid';

export async function ProductShowcase() {
  const [tree, result] = await Promise.all([
    getCategoryTree().catch(() => []),
    listProducts({ sort: 'newest' }, { take: 8 }).catch(() => null),
  ]);
  if (!result || result.items.length === 0) return null;

  const tabs = topLevelCategories(tree).slice(0, 5);

  return (
    <Container
      as="section"
      id="products"
      aria-labelledby="products-heading"
      className="scroll-mt-24 py-20 lg:py-28"
    >
      <SectionHeading
        id="products-heading"
        eyebrow="NEW ARRIVALS"
        title="جدیدترین ابزارها"
        className="mb-9"
        action={
          <div className="bg-surface-sunken flex w-fit flex-wrap gap-1 rounded-full p-1">
            {tabs.map((tab, index) => (
              <Link
                key={tab.id}
                href={`${routes.products}?category=${tab.slug}`}
                className={cn(
                  'rounded-full px-5 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-200',
                  index === 0
                    ? 'bg-surface text-brand-700 shadow-(--shadow-soft)'
                    : 'text-foreground-muted hover:text-brand-600',
                )}
              >
                {tab.title}
              </Link>
            ))}
          </div>
        }
      />
      <ProductGrid products={result.items} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" />
    </Container>
  );
}
