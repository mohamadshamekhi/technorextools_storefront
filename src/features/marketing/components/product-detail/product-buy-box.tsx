'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';
import { siteConfig } from '@/config/site';
import { useCartStore } from '@/store/cart-store';

import type { Product } from '../../types';
import type { ProductDetail } from '../../types/product-detail';
import { toPersianDigits } from '../../utils/persian';
import { BuyBoxPrice } from './buy-box-price';
import { ColorSwatches } from './color-swatches';
import { KeySpecChips } from './key-spec-chips';
import { ModelPicker } from './model-picker';
import { QuantityStepper } from './quantity-stepper';
import { StarRow } from './star-row';

type ProductBuyBoxProps = {
  product: Product;
  detail: ProductDetail;
};

export function ProductBuyBox({ product, detail }: ProductBuyBoxProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [color, setColor] = useState(0);
  const [model, setModel] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const variant = [detail.colors[color]?.label, detail.models[model]]
      .filter((part): part is string => Boolean(part))
      .join(' · ');
    addItem(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        variant: variant || undefined,
        compareAt: product.compareAt,
        categorySlug: product.categorySlug,
      },
      qty,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="border-hairline bg-surface rounded-card border p-6 lg:sticky lg:top-24">
      <div className="mb-3.5 flex flex-wrap items-center gap-2">
        <span className="bg-brand-50 text-brand-700 rounded-full px-3 py-1 text-[12px] font-bold">
          {product.brand}
        </span>
        {product.inStock ? (
          <span className="flex items-center gap-1.5 rounded-full bg-[oklch(0.95_0.04_150)] px-3 py-1 text-[12px] font-bold text-[oklch(0.5_0.14_155)]">
            <span className="size-1.5 rounded-full bg-current" />
            موجود در انبار
          </span>
        ) : (
          <span className="bg-surface-sunken text-foreground-muted rounded-full px-3 py-1 text-[12px] font-bold">
            ناموجود
          </span>
        )}
      </div>

      <h1 className="text-[1.35rem] leading-relaxed font-black tracking-tight">{product.title}</h1>

      <a href="#reviews" className="mt-3 mb-5 flex items-center gap-2 text-[12.5px]">
        <StarRow rating={product.rating} />
        <span className="font-bold">{toPersianDigits(product.rating.toFixed(1))}</span>
        <span className="text-foreground-muted">({toPersianDigits(product.reviews)} نظر)</span>
      </a>

      <BuyBoxPrice price={product.price} compareAt={product.compareAt} />

      <div className="my-5">
        <KeySpecChips specs={detail.keySpecs} />
      </div>

      <div className="border-hairline flex flex-col gap-4 border-t pt-5">
        <div>
          <p className="mb-2 text-[13px] font-bold">رنگ</p>
          <ColorSwatches colors={detail.colors} active={color} onChange={setColor} />
        </div>
        <div>
          <p className="mb-2 text-[13px] font-bold">مدل</p>
          <ModelPicker models={detail.models} active={model} onChange={setModel} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2.5">
        <QuantityStepper value={qty} onChange={setQty} />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!product.inStock}
          className="bg-brand-500 hover:bg-brand-600 flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-extrabold text-white transition-colors disabled:opacity-50"
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
        تماس برای سفارش
      </a>
    </div>
  );
}
