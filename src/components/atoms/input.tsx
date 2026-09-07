import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid = false, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        'bg-surface text-foreground h-10 w-full rounded-lg border px-3 text-sm',
        'placeholder:text-foreground-muted/70',
        'focus-visible:ring-brand-500 focus-visible:ring-2 focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-60',
        invalid ? 'border-red-500' : 'border-black/15 dark:border-white/15',
        className,
      )}
      {...props}
    />
  );
});
