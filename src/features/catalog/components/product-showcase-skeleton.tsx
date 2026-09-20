import { Container } from '@/components/atoms';

import { ProductGridSkeleton } from './product-grid-skeleton';

/** Streamed fallback for `<ProductShowcase>` — mirrors its section chrome so nothing shifts on load. */
export function ProductShowcaseSkeleton() {
  return (
    <Container as="section" aria-hidden className="scroll-mt-24 py-20 lg:py-28">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2.5">
          <div className="bg-surface-muted h-3.5 w-24 animate-pulse rounded-full" />
          <div className="bg-surface-muted h-8 w-56 animate-pulse rounded-full" />
        </div>
        <div className="flex gap-2">
          <div className="bg-surface-muted h-10 w-24 animate-pulse rounded-full" />
          <div className="bg-surface-muted h-10 w-24 animate-pulse rounded-full" />
        </div>
      </div>
      <ProductGridSkeleton />
    </Container>
  );
}
