'use client';

import { useEffect, useState } from 'react';

import type { CartLine } from '@/store/cart-store';
import { useCartStore } from '@/store/cart-store';

import type { ShippingMethod, UpsellProduct } from '../types';
import { pickUpsells } from '../utils/pick-upsells';
import { CartHeading } from './cart-heading';
import { CartItemList } from './cart-item-list';
import { CartUpsells } from './cart-upsells';
import { EmptyCart } from './empty-cart';
import { FreeShippingBar } from './free-shipping-bar';
import { OrderSummary } from './order-summary';

type CartPageViewProps = {
  upsellPool: UpsellProduct[];
  shippingMethods: ShippingMethod[];
};

export function CartPageView({ upsellPool, shippingMethods }: CartPageViewProps) {
  const lines = useCartStore((state) => state.lines);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  if (!hydrated) return null;
  if (lines.length === 0) return <EmptyCart />;

  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const itemCount = lines.reduce((n, line) => n + line.quantity, 0);
  const upsells = pickUpsells(
    upsellPool,
    lines.map((line) => line.id),
  );

  const categoryByProductId = new Map(upsellPool.map((product) => [product.id, product.categorySlug]));
  const resolveCategory = (line: CartLine) => line.categorySlug ?? categoryByProductId.get(line.id);

  return (
    <div className="pt-6 pb-24">
      <CartHeading count={itemCount} />

      <FreeShippingBar subtotal={subtotal} methods={shippingMethods} />

      <div className="grid min-w-0 items-start gap-7 lg:grid-cols-[1fr_380px]">
        <CartItemList
          lines={lines}
          resolveCategory={resolveCategory}
          onChangeQuantity={setQuantity}
          onRemove={removeItem}
        />
        <OrderSummary shippingMethods={shippingMethods} />
      </div>

      <CartUpsells products={upsells} />
    </div>
  );
}
