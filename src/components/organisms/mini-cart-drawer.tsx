'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { formatToman, toPersianDigits } from '@/lib/persian';
import { selectCartQuantity, selectCartSubtotal, useCartStore } from '@/store/cart-store';
import { useUiStore } from '@/store/ui-store';

import { MiniCartLine } from './mini-cart-line';

/** Edge drawer confirming an add; edge = inline-start so it slides from the left in RTL.
 * Portalled to `body`: the buy box is `lg:sticky`, which creates a stacking context the drawer
 * could never escape — it rendered *under* the sticky site header.
 * Mounted once in the public layout; `useUiStore.miniCartOpen` drives it, so the header cart
 * button and the add-to-cart flow open the same instance. */
export function MiniCartDrawer() {
  const open = useUiStore((state) => state.miniCartOpen);
  const setOpen = useUiStore((state) => state.setMiniCartOpen);
  const lines = useCartStore((state) => state.lines);
  const subtotal = useCartStore(selectCartSubtotal);
  const quantity = useCartStore(selectCartQuantity);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const onClose = useCallback(() => setOpen(false), [setOpen]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="بستن"
        onClick={onClose}
        tabIndex={-1}
        className="animate-fade-in bg-ink/45 absolute inset-0 backdrop-blur-[2px]"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="سبد خرید"
        className="animate-drawer-in bg-surface-muted absolute inset-y-0 left-0 flex w-[min(25rem,92vw)] flex-col shadow-(--shadow-float)"
      >
        <header className="border-hairline bg-surface flex items-start gap-3 border-b p-4">
          <span className="bg-success/12 text-success grid size-9 shrink-0 place-items-center rounded-xl">
            <Icon name="check" className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-[14px] font-black">به سبد خرید اضافه شد</h2>
            <p className="text-foreground-muted mt-0.5 text-[12px]">
              {toPersianDigits(quantity)} کالا در سبد شما
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            aria-label="بستن سبد"
            onClick={onClose}
            className="border-hairline text-foreground-muted hover:text-foreground focus-visible:ring-brand-500 grid size-9 shrink-0 place-items-center rounded-xl border transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <Icon name="close" className="size-4" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="text-foreground-muted flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <Icon name="cart" className="size-8" />
            <p className="text-[13px]">سبد خرید شما خالی است.</p>
          </div>
        ) : (
          <ul className="divide-hairline flex-1 divide-y overflow-y-auto px-4">
            {lines.map((line) => (
              <MiniCartLine key={line.id} line={line} />
            ))}
          </ul>
        )}

        <footer className="border-hairline bg-surface flex flex-col gap-3 border-t p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-foreground-muted text-[12.5px]">جمع کل</span>
            <span className="text-[16px] font-black tabular-nums">
              {formatToman(subtotal)}{' '}
              <span className="text-foreground-muted text-[12px] font-normal">تومان</span>
            </span>
          </div>
          <p className="text-foreground-muted text-[11.5px] leading-5">
            هزینه ارسال در مرحله پرداخت بر اساس آدرس شما محاسبه می‌شود.
          </p>
          <Link
            href={routes.cart}
            className="bg-accent-500 text-ink hover:bg-accent-400 focus-visible:ring-brand-500 grid h-12 place-items-center rounded-xl text-[14px] font-extrabold transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            مشاهده سبد و پرداخت
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="text-foreground-muted hover:text-foreground h-10 rounded-xl text-[13px] font-bold transition-colors"
          >
            ادامه خرید
          </button>
        </footer>
      </aside>
    </div>,
    document.body,
  );
}
