'use client';

import { PAYMENT_METHODS } from '../data/payment-methods';
import { CheckoutNextButton } from './checkout-next-button';
import { PaymentOption } from './payment-option';

type PaymentStepProps = {
  selectedKey: string;
  onSelect: (key: string) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function PaymentStep({ selectedKey, onSelect, onBack, onContinue }: PaymentStepProps) {
  return (
    <div className="border-hairline bg-surface rounded-card border p-7">
      <h2 className="mb-5 text-[17px] font-black">روش پرداخت</h2>

      <div className="flex flex-col gap-3">
        {PAYMENT_METHODS.map((method) => (
          <PaymentOption
            key={method.key}
            method={method}
            selected={selectedKey === method.key}
            onSelect={() => onSelect(method.key)}
          />
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <CheckoutNextButton onClick={onBack} variant="back">
          بازگشت
        </CheckoutNextButton>
        <CheckoutNextButton onClick={onContinue} className="flex-2">
          ادامه به بازبینی نهایی
        </CheckoutNextButton>
      </div>
    </div>
  );
}
