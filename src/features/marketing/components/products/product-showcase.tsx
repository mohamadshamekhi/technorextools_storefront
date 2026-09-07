'use client';

import { useMemo, useState } from 'react';

import { Container, Icon } from '@/components/atoms';
import { SectionHeading } from '@/components/molecules';

import { SECTION } from '../../anchors';
import { PRODUCTS } from '../../data/catalog';
import { ProductCard } from './product-card';
import { ProductTabs, type ProductTabId } from './product-tabs';

export function ProductShowcase() {
  const [tab, setTab] = useState<ProductTabId>('all');

  const visible = useMemo(
    () => (tab === 'all' ? PRODUCTS : PRODUCTS.filter((product) => product.group === tab)),
    [tab],
  );

  return (
    <Container as="section" id={SECTION.products} aria-labelledby="products-heading" className="scroll-mt-24 py-20">
      <SectionHeading
        id="products-heading"
        eyebrow="BEST SELLERS"
        title="پرفروش‌های این ماه"
        className="mb-9"
        action={<ProductTabs active={tab} onChange={setTab} />}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="text-foreground-muted flex items-center gap-2 py-10 text-sm">
          <Icon name="box" className="size-5" />
          به‌زودی محصولات این دسته اضافه می‌شود.
        </p>
      ) : null}
    </Container>
  );
}
