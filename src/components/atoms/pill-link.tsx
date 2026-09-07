import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

export type PillLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
    variant?: Variant;
    size?: Size;
    className?: string;
  };

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-600',
  outline: 'border border-hairline hover:border-brand-500 text-foreground',
  ghost: 'text-brand-600 hover:text-brand-700',
};

const SIZES: Record<Size, string> = {
  md: 'gap-2 px-5 py-2.5 text-sm',
  lg: 'gap-2.5 px-8 py-4 text-base',
};

/** A `next/link` dressed as a pill button. Use `Button` for real actions. */
export function PillLink({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: PillLinkProps) {
  return (
    <Link
      className={cn(
        'inline-flex items-center justify-center rounded-full font-bold transition-colors',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
