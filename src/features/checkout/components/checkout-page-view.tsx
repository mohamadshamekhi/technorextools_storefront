'use client';

import { useEffect, useState } from 'react';

import { useCartTotals, type ShippingMethod } from '@/features/cart';
import { useCartStore } from '@/store/cart-store';

import { useAddresses } from '../hooks/use-addresses';
import { useCheckout } from '../hooks/use-checkout';
import type { CheckoutPaymentMethod } from '../types';
import { AddressStep } from './address-step';
import { CashPendingStep } from './cash-pending-step';
import { CheckoutStepper } from './checkout-stepper';
import { CheckoutSummarySidebar } from './checkout-summary-sidebar';
import { EmptyCheckout } from './empty-checkout';
import { PaymentStep } from './payment-step';
import { ReviewStep } from './review-step';
import { SuccessStep } from './success-step';

type CheckoutPageViewProps = {
  shippingMethods: ShippingMethod[];
  paymentMethods: CheckoutPaymentMethod[];
};

export function CheckoutPageView({ shippingMethods, paymentMethods }: CheckoutPageViewProps) {
  const lines = useCartStore((state) => state.lines);
  const shippingMethodId = useCartStore((state) => state.shippingMethodId);
  const discountCode = useCartStore((state) => state.discountCode) ?? '';
  const [hydrated, setHydrated] = useState(false);
  const checkout = useCheckout();
  const addressesQuery = useAddresses();
  const addresses = addressesQuery.data ?? [];

  // Same shipping method chosen back on /cart (persisted in the cart store); falls back
  // to the first available one if none was ever picked (e.g. checkout reached directly).
  const selectedShippingId = shippingMethodId ?? shippingMethods[0]?.id ?? '';
  const totals = useCartTotals(shippingMethods, selectedShippingId);

  useEffect(() => setHydrated(true), []);

  // Default to the customer's default address (or the first one) once the list loads.
  useEffect(() => {
    if (checkout.addressId || addresses.length === 0) return;
    const defaultAddress = addresses.find((address) => address.isDefault) ?? addresses[0];
    if (defaultAddress) checkout.selectAddress(defaultAddress.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run when the list itself changes
  }, [addresses]);

  // Default to the first (sort-order) payment method once the catalog loads.
  useEffect(() => {
    if (checkout.paymentMethod || paymentMethods.length === 0) return;
    const first = paymentMethods[0];
    if (first) checkout.selectPayment(first.code);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run when the list itself changes
  }, [paymentMethods]);

  const isTerminalStep = checkout.step === 'success' || checkout.step === 'cash-pending';
  if (!hydrated) return null;
  if (lines.length === 0 && !isTerminalStep) return <EmptyCheckout />;

  const address = addresses.find((item) => item.id === checkout.addressId);
  const payment = paymentMethods.find((item) => item.code === checkout.paymentMethod);

  const handleConfirm = () => {
    checkout.confirm({
      lines,
      shippingMethodId: selectedShippingId,
      discountCode: discountCode || null,
    });
  };

  if (checkout.step === 'success' && checkout.placedOrder) {
    return <SuccessStep order={checkout.placedOrder} />;
  }
  if (checkout.step === 'cash-pending' && checkout.placedOrder) {
    return <CashPendingStep order={checkout.placedOrder} />;
  }

  return (
    <div>
      <CheckoutStepper current={checkout.step} />
      <div className="grid min-w-0 items-start gap-7 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          {checkout.step === 'address' ? (
            <AddressStep
              addresses={addresses}
              isLoading={addressesQuery.isPending}
              isError={addressesQuery.isError}
              selectedId={checkout.addressId}
              onSelect={checkout.selectAddress}
              showNewAddress={checkout.showNewAddress}
              onToggleNewAddress={checkout.toggleNewAddress}
              onContinue={checkout.goToPayment}
            />
          ) : null}
          {checkout.step === 'payment' ? (
            <PaymentStep
              methods={paymentMethods}
              selectedCode={checkout.paymentMethod}
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
              confirming={checkout.confirming}
              conflict={checkout.conflict}
              blockingOrder={checkout.blockingOrder}
              conflictResolved={checkout.conflictResolved}
              confirmError={checkout.confirmError}
            />
          ) : null}
        </div>
        <CheckoutSummarySidebar lines={lines} totals={totals} discountCode={discountCode} />
      </div>
    </div>
  );
}
