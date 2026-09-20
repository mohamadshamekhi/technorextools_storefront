'use client';

import type { Ref } from 'react';

import { Icon, Spinner } from '@/components/atoms';
import { cn } from '@/lib/utils';

export type AddStatus = 'idle' | 'loading' | 'done';

type AddToCartButtonProps = {
  status: AddStatus;
  disabled?: boolean;
  onClick: (source: HTMLElement) => void;
  ref?: Ref<HTMLButtonElement>;
  className?: string;
};

/** Amber primary action: idle → spinner → animated checkmark. */
export function AddToCartButton({
  status,
  disabled,
  onClick,
  ref,
  className,
}: AddToCartButtonProps) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={(event) => onClick(event.currentTarget)}
      disabled={disabled || status === 'loading'}
      aria-busy={status === 'loading'}
      className={cn(
        'bg-accent-500 text-ink flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-extrabold shadow-(--shadow-accent)',
        'enabled:hover:bg-accent-400 transition-[transform,background-color,box-shadow] duration-150 active:scale-[0.96]',
        'focus-visible:ring-brand-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'disabled:bg-surface-sunken disabled:text-foreground-muted disabled:shadow-none',
        className,
      )}
    >
      {status === 'loading' ? (
        <Spinner className="size-5" />
      ) : status === 'done' ? (
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M5 12.5l4.5 4.5L19 7.5" className="animate-check-draw" />
        </svg>
      ) : (
        <Icon name="cart" className="size-5" />
      )}
      <span aria-live="polite">
        {status === 'done' ? 'به سبد اضافه شد' : disabled ? 'ناموجود' : 'افزودن به سبد خرید'}
      </span>
    </button>
  );
}
