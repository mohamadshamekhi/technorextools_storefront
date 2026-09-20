'use client';

import type { CheckoutPaymentMethod } from '../types';
import { CheckoutNextButton } from './checkout-next-button';
import { PaymentOption } from './payment-option';

type PaymentStepProps = {
  methods: CheckoutPaymentMethod[];
  selectedCode: string;
  onSelect: (code: CheckoutPaymentMethod['code']) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function PaymentStep({
  methods,
  selectedCode,
  onSelect,
  onBack,
  onContinue,
}: PaymentStepProps) {
  return (
    <div className="border-hairline bg-surface rounded-card border p-7">
      <h2 className="mb-5 text-[17px] font-black">روش پرداخت</h2>

      {methods.length === 0 ? (
        <p className="text-sale text-[13.5px]">
          هیچ روش پرداختی در دسترس نیست. لطفاً بعداً تلاش کنید.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {methods.map((method) => (
            <PaymentOption
              key={method.code}
              method={method}
              selected={selectedCode === method.code}
              onSelect={() => onSelect(method.code)}
            />
          ))}
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <CheckoutNextButton onClick={onBack} variant="back">
          بازگشت
        </CheckoutNextButton>
        <CheckoutNextButton onClick={onContinue} disabled={!selectedCode} className="flex-2">
          ادامه به بازبینی نهایی
        </CheckoutNextButton>
      </div>
    </div>
  );
}
