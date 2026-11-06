'use client';

import { useRef, useState } from 'react';

import { WishlistButton } from '@/features/account';

import { useInView } from '../../../hooks/use-in-view';
import type { ProductComments, ProductDetail } from '../../../types';
import type { ProductExtras, DownloadableDocument } from '../../../types/pdp';
import { CALL_TO_ORDER_MAX_QTY } from '../../../utils/card-variant';
import { CallToOrderButton, CALL_TO_ORDER_MESSAGE } from '../../call-to-order';
import { BottomSheet } from '../mobile/bottom-sheet';
import { StickyBuyBar } from '../mobile/sticky-buy-bar';
import { AddToCartButton } from './add-to-cart-button';
import { BuyBoxHeading } from './buy-box-heading';
import { DeliveryEstimate } from './delivery-estimate';
import { KeySpecs } from './key-specs';
import { PriceBlock } from './price-block';
import { QuantityStepper } from './quantity-stepper';
import { StockLine } from './stock-line';
import { SupportLinks } from './support-links';
import { TrustRow } from './trust-row';
import { useAddToCart } from './use-add-to-cart';
import { VariantPicker } from './variant-picker';

type ProductBuyBoxProps = {
  product: ProductDetail;
  comments: ProductComments;
  extras: ProductExtras;
  catalog: DownloadableDocument | null;
};

export function ProductBuyBox({ product, comments, extras, catalog }: ProductBuyBoxProps) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [cityId, setCityId] = useState('tehran');
  const [sheetOpen, setSheetOpen] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaVisible = useInView(ctaRef);

  const variant = product.variants[variantIndex] ?? null;
  const price = variant?.effectivePrice ?? product.basePrice;
  const callToOrder = variant ? variant.stockQty <= CALL_TO_ORDER_MAX_QTY : false;
  const maxQty = Math.max(1, variant?.stockQty ?? 10);
  const shownQty = callToOrder ? 1 : qty;

  const cart = useAddToCart({
    product,
    lineId: variant?.id ?? product.id,
    price,
    label: variant?.colorName ?? variant?.sku,
    qty,
  });

  return (
    <div className="border-hairline bg-surface flex flex-col gap-5 rounded-2xl border p-6 shadow-(--shadow-lift) lg:sticky lg:top-24">
      <BuyBoxHeading
        product={product}
        sku={variant?.sku ?? product.id.slice(0, 8)}
        comments={comments}
        action={
          <span title="افزودن به علاقه‌مندی‌ها">
            <WishlistButton productId={product.id} title={product.title} variant="inline" />
          </span>
        }
      />
      <PriceBlock unitPrice={price} quantity={shownQty} />
      <KeySpecs items={extras.highlights} />
      {callToOrder ? null : <StockLine />}
      <VariantPicker
        variants={product.variants}
        selected={variantIndex}
        onSelect={setVariantIndex}
      />

      <div ref={ctaRef}>
        {callToOrder ? (
          <div className="bg-brand-50 flex flex-col gap-3 rounded-xl p-4">
            <p className="text-brand-700 text-sm leading-6 font-bold">{CALL_TO_ORDER_MESSAGE}</p>
            <CallToOrderButton />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <QuantityStepper value={qty} onChange={setQty} max={maxQty} />
            <AddToCartButton status={cart.status} onClick={cart.add} />
          </div>
        )}
      </div>

      <SupportLinks catalog={catalog} />
      <div className="hidden lg:block">
        <DeliveryEstimate cityId={cityId} onChange={setCityId} />
      </div>
      <TrustRow />

      <StickyBuyBar
        visible={!ctaVisible && !sheetOpen}
        price={price * shownQty}
        callToOrder={callToOrder}
        status={cart.status}
        onAdd={cart.add}
        onOpenOptions={() => setSheetOpen(true)}
      />
      <BottomSheet open={sheetOpen} title="تعداد و زمان ارسال" onClose={() => setSheetOpen(false)}>
        <QuantityStepper value={qty} onChange={setQty} max={maxQty} />
        <DeliveryEstimate cityId={cityId} onChange={setCityId} />
      </BottomSheet>
    </div>
  );
}
