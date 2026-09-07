import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

import styles from './media-placeholder.module.css';

export type MediaPlaceholderProps = HTMLAttributes<HTMLDivElement> & {
  /** Short caption describing the art that will replace this box. */
  label: string;
};

/**
 * Zero-CLS stand-in for a `next/image`. Give it an `aspect-*` class; swap
 * the whole element for `<Image fill />` once real art lands.
 */
export function MediaPlaceholder({ label, className, ...props }: MediaPlaceholderProps) {
  return (
    <div
      className={cn(
        styles.surface,
        'text-foreground-muted flex items-center justify-center p-6 text-center',
        'font-display text-xs tracking-wide',
        className,
      )}
      {...props}
    >
      {label}
    </div>
  );
}
