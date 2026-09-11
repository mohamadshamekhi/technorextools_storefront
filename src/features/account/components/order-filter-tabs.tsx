'use client';

import { cn } from '@/lib/utils';

import type { OrderStatus } from '../types';

export type OrderFilter = OrderStatus | 'all';

const FILTERS: { key: OrderFilter; label: string }[] = [
  { key: 'all', label: 'همه' },
  { key: 'pending_payment', label: 'در انتظار پرداخت' },
  { key: 'processing', label: 'در حال پردازش' },
  { key: 'shipped', label: 'ارسال شده' },
  { key: 'delivered', label: 'تحویل‌شده' },
  { key: 'cancelled', label: 'لغو شده' },
];

type OrderFilterTabsProps = {
  value: OrderFilter;
  onChange: (value: OrderFilter) => void;
};

export function OrderFilterTabs({ value, onChange }: OrderFilterTabsProps) {
  return (
    <div className="mb-5 flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter.key}
          type="button"
          onClick={() => onChange(filter.key)}
          className={cn(
            'rounded-full border px-4 py-2 text-[13px] font-bold transition-colors',
            value === filter.key
              ? 'border-brand-500 bg-brand-500 text-white'
              : 'border-hairline bg-surface text-foreground-muted hover:border-brand-500/50',
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
