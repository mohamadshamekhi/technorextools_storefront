import { Icon } from '@/components/atoms';
import type { UpsellProduct } from '../types';

import { UpsellCard } from './upsell-card';

export function CartUpsells({ products }: { products: UpsellProduct[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="upsells-heading">
      <div className="mb-5.5 flex items-center gap-2.5">
        <span className="flex size-8.5 items-center justify-center rounded-[0.7rem] bg-[oklch(0.94_0.035_250)]">
          <Icon name="bolt" className="size-4 text-[oklch(0.53_0.16_250)]" />
        </span>
        <h2 id="upsells-heading" className="text-[1.35rem] font-black tracking-tight">
          این‌ها را هم اضافه کنید
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4.5 sm:grid-cols-4">
        {products.map((product) => (
          <UpsellCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
