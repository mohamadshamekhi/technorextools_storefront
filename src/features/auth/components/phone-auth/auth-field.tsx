'use client';

import { useId, type ComponentPropsWithoutRef } from 'react';

import { Icon, type IconName } from '@/components/atoms';
import { cn } from '@/lib/utils';

type AuthFieldProps = Omit<ComponentPropsWithoutRef<'input'>, 'id'> & {
  label: string;
  icon?: IconName;
  invalid?: boolean;
};

/** Labelled text input used across the sign-in steps. */
export function AuthField({ label, icon, invalid, className, ...input }: AuthFieldProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-foreground-muted mb-2 block text-[12.5px] font-bold">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          aria-invalid={invalid || undefined}
          className={cn(
            'bg-surface w-full rounded-2xl border-[1.5px] px-4 py-3.5 text-[15px] outline-none transition-colors',
            'focus:border-brand-500 focus:ring-brand-500/15 focus:ring-2',
            invalid ? 'border-sale' : 'border-hairline',
            icon && 'pe-11',
            className,
          )}
          {...input}
        />
        {icon ? (
          <Icon
            name={icon}
            className="text-foreground-muted pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2"
          />
        ) : null}
      </div>
    </div>
  );
}
