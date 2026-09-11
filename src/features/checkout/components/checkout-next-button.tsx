'use client';

import type { ReactNode } from 'react';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

type CheckoutNextButtonProps = {
  onClick: () => void;
  children: ReactNode;
  /** `back` leads with a reversed arrow; `forward` trails with a plain one. */
  variant?: 'forward' | 'back';
  /** Flex sizing on the row it sits in — defaults to sharing space evenly. */
  className?: string;
  disabled?: boolean;
};

export function CheckoutNextButton({
  onClick,
  children,
  variant = 'forward',
  className,
  disabled = false,
}: CheckoutNextButtonProps) {
  const arrow = <Icon name="arrowStart" className={cn('size-4', variant === 'back' && 'rotate-180')} />;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex h-12.5 flex-1 items-center justify-center gap-2 rounded-2xl text-[14.5px] font-extrabold transition-[background-color,transform] hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50',
        variant === 'forward' && 'bg-brand-500 hover:bg-brand-600 text-white',
        variant === 'back' && 'bg-surface border-hairline text-foreground border',
        className,
      )}
    >
      {variant === 'back' ? arrow : null}
      {children}
      {variant === 'forward' ? arrow : null}
    </button>
  );
}
