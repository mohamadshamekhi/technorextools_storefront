'use client';

import { Icon } from '@/components/atoms';
import { formatToman } from '@/lib/persian';
import { cn } from '@/lib/utils';

import { useScrollDirection } from '../../../hooks/use-scroll-direction';
import { AddToCartButton, type AddStatus } from '../buy-box/add-to-cart-button';

type StickyBuyBarProps = {
  visible: boolean;
  price: number;
  inStock: boolean;
  status: AddStatus;
  onAdd: (source: HTMLElement) => void;
  onOpenOptions: () => void;
};

/** Mobile bar: appears once the main CTA scrolls away; hides while scrolling down. */
export function StickyBuyBar({
  visible,
  price,
  inStock,
  status,
  onAdd,
  onOpenOptions,
}: StickyBuyBarProps) {
  const direction = useScrollDirection();
  const shown = visible && direction === 'up';

  return (
    <div
      aria-hidden={!shown}
      inert={!shown}
      className={cn(
        'bg-surface border-hairline fixed inset-x-0 bottom-0 z-50 flex items-center gap-3 border-t px-4 py-3 shadow-(--shadow-float) lg:hidden',
        'transition-transform duration-200 ease-out',
        shown ? 'translate-y-0' : 'translate-y-full duration-150',
      )}
    >
      <button
        type="button"
        onClick={onOpenOptions}
        aria-label="تعداد و زمان ارسال"
        className="border-hairline focus-visible:ring-brand-500 grid size-12 shrink-0 place-items-center rounded-xl border focus-visible:ring-2 focus-visible:outline-none"
      >
        <Icon name="sliders" className="size-5" />
      </button>
      <p className="flex min-w-0 flex-col leading-tight">
        <span className="font-display text-lg font-bold tabular-nums">{formatToman(price)}</span>
        <span className="text-foreground-muted text-xs">تومان</span>
      </p>
      <AddToCartButton status={status} disabled={!inStock} onClick={onAdd} className="flex-1" />
    </div>
  );
}
