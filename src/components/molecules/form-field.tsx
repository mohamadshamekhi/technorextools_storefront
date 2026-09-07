'use client';

import { useId, type ReactNode } from 'react';

import { Input, type InputProps } from '@/components/atoms';
import { cn } from '@/lib/utils';

export type FormFieldProps = Omit<InputProps, 'id'> & {
  label: string;
  error?: string;
  hint?: ReactNode;
};

export function FormField({ label, error, hint, className, ...inputProps }: FormFieldProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-foreground text-sm font-medium">
        {label}
      </label>
      <Input id={id} invalid={Boolean(error)} aria-describedby={describedBy} {...inputProps} />
      {hint && !error && (
        <span id={`${id}-hint`} className="text-foreground-muted text-xs">
          {hint}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} className="text-xs text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}
