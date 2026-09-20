'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { formatToman, toPersianDigits } from '@/lib/persian';
import { selectCartSubtotal, useCartStore } from '@/store/cart-store';

type MiniCartDrawerProps = { open: boolean; onClose: () => void };

/** Edge drawer confirming an add; edge = inline-start so it slides from the left in RTL. */
export function MiniCartDrawer({ open, onClose }: MiniCartDrawerProps) {
  const lines = useCartStore((state) => state.lines);
  const subtotal = useCartStore(selectCartSubtotal);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="بستن"
        onClick={onClose}
        tabIndex={-1}
        className="animate-fade-in absolute inset-0 bg-black/40"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="سبد خرید"
        className="animate-drawer-in bg-surface absolute inset-y-0 left-0 flex w-[min(24rem,92vw)] flex-col shadow-(--shadow-float)"
      >
        <header className="border-hairline flex items-center justify-between border-b p-4">
          <h2 className="text-base font-bold">سبد خرید ({toPersianDigits(lines.length)} کالا)</h2>
          <button
            ref={closeRef}
            type="button"
            aria-label="بستن سبد"
            onClick={onClose}
            className="focus-visible:ring-brand-500 grid size-11 place-items-center rounded-lg focus-visible:ring-2 focus-visible:outline-none"
          >
            <Icon name="close" className="size-5" />
          </button>
        </header>
        <ul className="flex-1 divide-y divide-[var(--color-hairline)] overflow-y-auto px-4">
          {lines.map((line) => (
            <li key={line.id} className="flex items-center justify-between gap-3 py-3 text-sm">
              <span className="line-clamp-2 flex-1 font-semibold">{line.title}</span>
              <span className="text-foreground-muted tabular-nums">
                {toPersianDigits(line.quantity)}× {formatToman(line.price)}
              </span>
            </li>
          ))}
        </ul>
        <footer className="border-hairline flex flex-col gap-3 border-t p-4">
          <p className="flex justify-between text-sm font-bold">
            <span>جمع کل</span>
            <span className="tabular-nums">{formatToman(subtotal)} تومان</span>
          </p>
          <Link
            href={routes.cart}
            className="bg-accent-500 text-ink hover:bg-accent-400 grid h-12 place-items-center rounded-xl font-extrabold transition-colors"
          >
            مشاهده سبد و پرداخت
          </Link>
        </footer>
      </aside>
    </div>
  );
}
