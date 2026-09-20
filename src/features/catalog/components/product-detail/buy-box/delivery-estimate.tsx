'use client';

import { useId } from 'react';

import { Icon } from '@/components/atoms';

import { deliveryCities } from '../../../data/delivery';

type DeliveryEstimateProps = { cityId: string; onChange: (cityId: string) => void };

export function DeliveryEstimate({ cityId, onChange }: DeliveryEstimateProps) {
  const selectId = useId();
  const city = deliveryCities.find((item) => item.id === cityId) ?? deliveryCities[0];

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={selectId} className="flex items-center gap-2 text-sm font-bold">
        <Icon name="truck" className="size-4" />
        زمان تحویل به شهر
      </label>
      <select
        id={selectId}
        value={cityId}
        onChange={(event) => onChange(event.target.value)}
        className="border-hairline bg-surface focus-visible:ring-brand-500 h-11 rounded-xl border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
      >
        {deliveryCities.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
      <p className="text-foreground-muted text-[13px]" aria-live="polite">
        {city?.eta}
      </p>
    </div>
  );
}
