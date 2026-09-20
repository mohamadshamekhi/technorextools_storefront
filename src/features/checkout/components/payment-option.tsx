'use client';

import { Icon, type IconName } from '@/components/atoms';
import { cn } from '@/lib/utils';

import type { CheckoutPaymentMethod } from '../types';

const CODE_META: Record<CheckoutPaymentMethod['code'], { icon: IconName; fallbackDesc: string }> = {
  online: { icon: 'card', fallbackDesc: 'پرداخت امن با تمام کارت‌های بانکی از طریق درگاه' },
  cash: { icon: 'cash', fallbackDesc: 'پرداخت نقدی یا کارت‌خوان هنگام تحویل سفارش' },
};

type PaymentOptionProps = {
  method: CheckoutPaymentMethod;
  selected: boolean;
  onSelect: () => void;
};

export function PaymentOption({ method, selected, onSelect }: PaymentOptionProps) {
  const meta = CODE_META[method.code];

  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-3.5 rounded-2xl border-[1.5px] p-4.5 transition-[border-color,transform] hover:-translate-y-0.5',
        selected ? 'border-brand-500 bg-brand-50' : 'border-hairline bg-surface',
      )}
    >
      <input
        type="radio"
        name="checkout-payment"
        checked={selected}
        onChange={onSelect}
        className="accent-brand-500 size-4"
      />
      <span className="bg-surface-sunken flex size-10.5 shrink-0 items-center justify-center rounded-xl">
        <Icon name={meta.icon} className="text-brand-600 size-5" />
      </span>
      <span className="flex-1">
        <span className="block text-[14px] font-bold">{method.title}</span>
        <span className="text-foreground-muted block text-[12.5px]">
          {method.description ?? meta.fallbackDesc}
        </span>
      </span>
    </label>
  );
}
