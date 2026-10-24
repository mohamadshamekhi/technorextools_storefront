'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';
import type { CategoryNode } from '@/features/catalog';
import { cn } from '@/lib/utils';

import { CategoryAccordion } from './category-accordion';

/** «دسته‌بندی‌ها» row in the mobile drawer — expands in place into the full category accordion. */
export function DrawerCategories({
  categories,
  onNavigate,
}: {
  categories: CategoryNode[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-semibold transition-colors',
          open ? 'bg-brand-50 text-brand-700' : 'hover:bg-brand-50 hover:text-brand-700',
        )}
      >
        <Icon name="grid" className="text-brand-500 size-[18px]" />
        <span className="flex-1 text-start">دسته‌بندی‌ها</span>
        <Icon
          name="chevronDown"
          className={cn('text-foreground-muted size-4 transition-transform', open && 'rotate-180')}
        />
      </button>
      {open ? (
        <div className="mt-1 ps-2">
          <CategoryAccordion nodes={categories} onNavigate={onNavigate} />
        </div>
      ) : null}
    </div>
  );
}
