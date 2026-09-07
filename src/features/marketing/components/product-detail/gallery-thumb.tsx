'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type GalleryThumbProps = {
  active: boolean;
  onClick: () => void;
  label: string;
  children: ReactNode;
};

export function GalleryThumb({ active, onClick, label, children }: GalleryThumbProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        'grid size-16 shrink-0 place-items-center overflow-hidden rounded-xl border-2 p-1 text-center font-display text-[8px] leading-tight transition-colors',
        active
          ? 'border-brand-500 text-brand-600'
          : 'border-hairline text-foreground-muted hover:border-brand-500/50',
      )}
    >
      {children}
    </button>
  );
}
