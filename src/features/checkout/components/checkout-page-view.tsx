'use client';

import { useEffect, useState } from 'react';

import { useCartStore } from '@/store/cart-store';

import { ADDRESSES } from '../data/addresses';
import { PAYMENT_METHODS } from '../data/payment-methods';
import { useCheckout } from '../hooks/use-checkout';
import { AddressStep } from './address-step';
import { CheckoutStepper } from './checkout-stepper';
import { CheckoutSummarySidebar } from './checkout-summary-sidebar';
import { EmptyCheckout } from './empty-checkout';
import { PaymentStep } from './payment-step';
import { ReviewStep } from './review-step';
import { SuccessStep } from './success-step';

export function CheckoutPageView() {
  const lines = useCartStore((state) => state.lines);
  const clearCart = useCartStore((state) => state.clear);
  const [hydrated, setHydrated] = useState(false);
  const checkout = useCheckout();

  useEffect(() => setHydrated(true), []);

  if (!hydrated) return null;
  if (lines.length === 0 && checkout.step !== 'success') return <EmptyCheckout />;

  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const address = ADDRESSES.find((item) => item.id === checkout.addressId) ?? ADDRESSES[0];
  const payment = PAYMENT_METHODS.find((item) => item.key === checkout.paymentKey) ?? PAYMENT_METHODS[0];

  const handleConfirm = () => {
    checkout.confirm(lines, subtotal);
    clearCart();
  };

  if (checkout.step === 'success' && checkout.placedOrder) {
    return <SuccessStep order={checkout.placedOrder} />;
  }

  return (
    <div>
      <CheckoutStepper current={checkout.step} />
      <div className="grid min-w-0 items-start gap-7 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          {checkout.step === 'address' ? (
            <AddressStep
              selectedId={checkout.addressId}
              onSelect={checkout.selectAddress}
              showNewAddress={checkout.showNewAddress}
              onToggleNewAddress={checkout.toggleNewAddress}
              onContinue={checkout.goToPayment}
            />
          ) : null}
          {checkout.step === 'payment' ? (
            <PaymentStep
              selectedKey={checkout.paymentKey}
              onSelect={checkout.selectPayment}
              onBack={checkout.backToAddress}
              onContinue={checkout.goToReview}
            />
          ) : null}
          {checkout.step === 'review' && address && payment ? (
            <ReviewStep
              address={address}
              payment={payment}
              lines={lines}
              onEditAddress={checkout.backToAddress}
              onEditPayment={checkout.backToPayment}
              onConfirm={handleConfirm}
            />
          ) : null}
        </div>
        <CheckoutSummarySidebar lines={lines} total={subtotal} />
      </div>
    </div>
  );
}
