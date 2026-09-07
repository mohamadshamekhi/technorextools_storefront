'use client';

import { cn } from '@/lib/utils';

import { PRODUCT_TABS } from '../../data/catalog';

export type ProductTabId = (typeof PRODUCT_TABS)[number]['id'];

type ProductTabsProps = {
  active: ProductTabId;
  onChange: (id: ProductTabId) => void;
};

export function ProductTabs({ active, onChange }: ProductTabsProps) {
  return (
    <div role="tablist" aria-label="فیلتر محصولات" className="flex flex-wrap gap-2">
      {PRODUCT_TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'rounded-full border px-5 py-2.5 text-sm font-bold transition-colors',
            active === tab.id
              ? 'border-brand-500 bg-brand-500 text-white'
              : 'border-hairline text-foreground-muted hover:border-brand-500',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
