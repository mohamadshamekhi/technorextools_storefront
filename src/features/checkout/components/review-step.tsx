'use client';

import { Icon, Spinner } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';
import type { CartLine } from '@/store/cart-store';

import type { Address, CheckoutPaymentMethod } from '../types';
import { ReviewItemRow } from './review-item-row';
import { ReviewSection } from './review-section';

type ReviewStepProps = {
  address: Address;
  payment: CheckoutPaymentMethod;
  lines: CartLine[];
  onEditAddress: () => void;
  onEditPayment: () => void;
  onConfirm: () => void;
  confirming: boolean;
  confirmError: string;
};

export function ReviewStep({
  address,
  payment,
  lines,
  onEditAddress,
  onEditPayment,
  onConfirm,
  confirming,
  confirmError,
}: ReviewStepProps) {
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <div className="flex flex-col gap-4">
      <ReviewSection icon="pin" title="آدرس تحویل" onEdit={onEditAddress}>
        <p className="text-foreground-muted text-[13.5px] leading-loose">
          {address.receiverName} — {address.province}، {address.city}، {address.fullAddress}
        </p>
      </ReviewSection>

      <ReviewSection icon="card" title="روش پرداخت" onEdit={onEditPayment}>
        <p className="text-foreground-muted text-[13.5px]">{payment.title}</p>
      </ReviewSection>

      <ReviewSection icon="cart" title={`اقلام سفارش (${toPersianDigits(itemCount)})`}>
        <div className="flex flex-col gap-3">
          {lines.map((line) => (
            <ReviewItemRow key={line.id} line={line} />
          ))}
        </div>
      </ReviewSection>

      {confirmError ? (
        <p className="text-sale flex items-center gap-1.5 text-[13px] font-bold">
          <Icon name="alert" className="size-4" />
          {confirmError}
        </p>
      ) : null}

      <button
        type="button"
        onClick={onConfirm}
        disabled={confirming}
        className="bg-brand-500 hover:bg-brand-600 shadow-brand-500/32 flex h-13.5 items-center justify-center gap-2 rounded-2xl text-[15px] font-extrabold text-white shadow-lg transition-[background-color,transform] hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
      >
        {confirming ? <Spinner className="size-4.5" /> : <Icon name="lock" className="size-4.5" />}
        {confirming ? 'در حال ثبت سفارش…' : 'پرداخت و ثبت نهایی سفارش'}
      </button>
    </div>
  );
}
