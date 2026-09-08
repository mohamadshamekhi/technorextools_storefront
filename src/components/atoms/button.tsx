import { forwardRef, type ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-brand-500 bg-(image:--gradient-brand) text-white shadow-(--shadow-brand) hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:opacity-60',
  secondary:
    'bg-surface text-foreground border border-hairline shadow-(--shadow-soft) hover:border-brand-300 hover:-translate-y-0.5',
  ghost: 'bg-transparent text-foreground hover:bg-surface-sunken',
  danger: 'bg-sale text-white shadow-(--shadow-soft) hover:-translate-y-0.5',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-bold',
        'transition-[transform,box-shadow,background-color,border-color] duration-200',
        'focus-visible:ring-brand-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-70',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  );
});
