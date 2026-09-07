'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

import type { Order } from '../types';
import { OrderRow } from './order-row';
import { OrderTimeline } from './order-timeline';

/** Expandable order card used on the full orders list. */
export function OrderCard({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-hairline bg-surface overflow-hidden rounded-2xl border shadow-sm">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="hover:bg-surface-sunken/50 flex w-full items-center gap-3 p-4 text-start transition-colors"
      >
        <div className="min-w-0 flex-1">
          <OrderRow order={order} />
        </div>
        <Icon
          name="chevronDown"
          className={cn(
            'text-foreground-muted size-4 shrink-0 transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>
      {open ? (
        <div className="border-hairline border-t px-5 pt-5 pb-6">
          <OrderTimeline order={order} />
        </div>
      ) : null}
    </div>
  );
}
