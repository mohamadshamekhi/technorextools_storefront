'use client';

import { Icon } from '@/components/atoms';
import { formatToman } from '@/lib/persian';
import { cn } from '@/lib/utils';

import type { ShippingMethod } from '../types';

type ShippingOptionProps = {
  method: ShippingMethod;
  price: number;
  selected: boolean;
  onSelect: () => void;
};

export function ShippingOption({ method, price, selected, onSelect }: ShippingOptionProps) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-center justify-between gap-2.5 rounded-xl border-[1.5px] px-3.5 py-3 transition-colors',
        selected ? 'border-brand-500 bg-brand-50' : 'border-hairline bg-surface',
      )}
    >
      <span className="flex items-center gap-2.5">
        <input
          type="radio"
          name="shipping"
          checked={selected}
          onChange={onSelect}
          className="accent-brand-500 size-4"
        />
        <span
          className={cn(
            'grid size-8 place-items-center rounded-lg transition-colors',
            selected ? 'bg-brand-500 text-white' : 'bg-surface-sunken text-brand-600',
          )}
        >
          <Icon name={method.costType === 'by_weight' ? 'weight' : 'truck'} className="size-4" />
        </span>
        <span className="block text-[13px] font-bold">{method.title}</span>
      </span>
      <span className="text-[12.5px] font-bold whitespace-nowrap">
        {price === 0 ? 'رایگان' : `${formatToman(price)} تومان`}
      </span>
    </label>
  );
}
