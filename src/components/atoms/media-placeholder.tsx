import Image from 'next/image';
import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

import styles from './media-placeholder.module.css';

export type MediaPlaceholderProps = HTMLAttributes<HTMLDivElement> & {
  /** Short caption; also the `alt` text when `src` is provided. */
  label: string;
  /** Local `public/` path to a real product shot. Omit for the striped stand-in. */
  src?: string;
  /** How the image sits in the box. Product shots on transparent art → `contain`. */
  fit?: 'contain' | 'cover';
  /** `sizes` hint for the responsive image. */
  sizes?: string;
  /** Render with loading priority (above-the-fold hero art). */
  priority?: boolean;
};

/**
 * Zero-CLS media slot. Give it an `aspect-*` class. With `src` it renders a
 * real `next/image` over the textured surface (which shows through if the file
 * is missing); without one it stays a labelled stand-in.
 */
export function MediaPlaceholder({
  label,
  src,
  fit = 'contain',
  sizes = '(max-width: 768px) 100vw, 33vw',
  priority = false,
  className,
  ...props
}: MediaPlaceholderProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        'text-foreground-muted font-display p-6 text-center text-xs tracking-wide',
        src ? styles.photo : styles.surface,
        className,
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={label}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(fit === 'contain' ? 'object-contain p-[7%]' : 'object-cover')}
        />
      ) : (
        label
      )}
    </div>
  );
}
