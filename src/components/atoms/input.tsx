import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

/**
 * Shared field skin for inputs, textareas and selects. Filled by default so the
 * field is visible on a white card; the border is the token hairline and focus
 * lifts it to the brand ring.
 */
export const fieldClassName =
  'w-full rounded-xl border border-hairline bg-surface-muted px-3.5 text-[13.5px] text-foreground outline-none transition-colors placeholder:text-foreground-muted/80 focus:border-brand-400 focus:bg-surface focus:ring-4 focus:ring-brand-500/15 disabled:cursor-not-allowed disabled:opacity-60';

/** Error skin — pair with `fieldClassName` when the value failed validation. */
export const fieldInvalidClassName = 'border-sale bg-sale/5 focus:border-sale focus:ring-sale/15';

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
      className={cn(fieldClassName, 'min-h-11', invalid && fieldInvalidClassName, className)}
      {...props}
    />
  );
});
