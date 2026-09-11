'use client';

import { useMemo, useState } from 'react';

import { Icon } from '@/components/atoms';
import { siteConfig } from '@/config/site';
import { formatToman, toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

import type { ProductDetail } from '../../types';
import { QuantityStepper } from './quantity-stepper';

export function ProductBuyBox({ product }: { product: ProductDetail }) {
  const addItem = useCartStore((state) => state.addItem);
  const [variantIndex, setVariantIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = product.variants[variantIndex] ?? null;
  const price = variant?.effectivePrice ?? product.basePrice;
  const inStock = variant ? variant.stockQty > 0 : product.variants.length === 0;

  const variantLabel = useMemo(
    () => (variant?.colorName ? variant.colorName : variant?.sku),
    [variant],
  );

  const handleAdd = () => {
    addItem(
      {
        id: variant?.id ?? product.id,
        title: product.title,
        price,
        variant: variantLabel,
        compareAt: null,
        categorySlug: product.category.slug,
      },
      qty,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="border-hairline bg-surface rounded-card border p-6 shadow-(--shadow-lift) lg:sticky lg:top-24">
      <div className="mb-3.5 flex flex-wrap items-center gap-2">
        {product.brand ? (
          <span className="bg-brand-50 text-brand-700 rounded-full px-3 py-1 text-[12px] font-bold">
            {product.brand.title}
          </span>
        ) : null}
        <span
          className={cn(
            'rounded-full px-3 py-1 text-[12px] font-bold',
            inStock
              ? 'bg-[oklch(0.95_0.04_150)] text-[oklch(0.5_0.14_155)]'
              : 'bg-surface-sunken text-foreground-muted',
          )}
        >
          {inStock ? 'موجود در انبار' : 'ناموجود'}
        </span>
      </div>

      <h1 className="text-[1.35rem] leading-relaxed font-black tracking-tight">{product.title}</h1>
      {product.shortDesc ? (
        <p className="text-foreground-muted mt-2 text-[13.5px] leading-relaxed">{product.shortDesc}</p>
      ) : null}

      <p className="mt-5 flex items-baseline gap-2">
        <span className="font-display text-gradient-brand text-[27px] font-black">
          {formatToman(price)}
        </span>
        <span className="text-foreground-muted text-[13px]">تومان</span>
      </p>

      {product.variants.length > 1 ? (
        <div className="border-hairline mt-5 border-t pt-5">
          <p className="mb-2 text-[13px] font-bold">مدل</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((option, index) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setVariantIndex(index)}
                className={cn(
                  'rounded-xl border px-3 py-2 text-[13px] font-bold transition-colors',
                  index === variantIndex
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-hairline text-foreground-muted hover:border-brand-400',
                )}
              >
                {option.colorName ?? option.sku}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-5 flex items-center gap-2.5">
        <QuantityStepper value={qty} onChange={setQty} max={Math.max(1, variant?.stockQty ?? 10)} />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!inStock}
          className="bg-brand-500 bg-(image:--gradient-brand) shadow-(--shadow-brand) flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
        >
          <Icon name={added ? 'check' : 'cart'} className="size-4" />
          {added ? 'به سبد اضافه شد' : 'افزودن به سبد خرید'}
        </button>
      </div>

      <a
        href={`tel:${siteConfig.phoneHref}`}
        className="border-brand-500 text-brand-600 hover:bg-brand-500 mt-2.5 flex h-11 items-center justify-center gap-2 rounded-xl border-[1.5px] text-sm font-bold transition-colors hover:text-white"
      >
        <Icon name="phone" className="size-4" />
        تماس برای سفارش ({toPersianDigits(siteConfig.phone)})
      </a>
    </div>
  );
}
