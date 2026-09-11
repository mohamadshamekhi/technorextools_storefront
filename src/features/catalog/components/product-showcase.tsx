import Link from 'next/link';

import { Container } from '@/components/atoms';
import { SectionHeading } from '@/components/molecules';
import { routes } from '@/config/routes';

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
    <Container as="section" id="products" aria-labelledby="products-heading" className="scroll-mt-24 py-20">
      <SectionHeading
        id="products-heading"
        eyebrow="NEW ARRIVALS"
        title="جدیدترین ابزارها"
        className="mb-9"
        action={
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={`${routes.products}?category=${tab.slug}`}
                className="border-hairline text-foreground-muted hover:border-brand-500 rounded-full border px-5 py-2.5 text-sm font-bold transition-colors"
              >
                {tab.title}
              </Link>
            ))}
          </div>
        }
      />
      <ProductGrid
        products={result.items}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      />
    </Container>
  );
}
