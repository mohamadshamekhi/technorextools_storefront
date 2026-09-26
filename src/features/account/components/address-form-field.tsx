import type { ChangeEvent } from 'react';

import { fieldClassName, fieldInvalidClassName } from '@/components/atoms';
import { cn } from '@/lib/utils';

type AddressFormFieldProps = {
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  dir?: string;
};

/** One labelled input row for the address form — shared text styling + inline error. */
export function AddressFormField({ className, error, ...props }: AddressFormFieldProps) {
  return (
    <div className={className}>
      <input {...props} className={cn(fieldClassName, 'py-3', error && fieldInvalidClassName)} />
      {error ? <p className="text-sale mt-1 text-[12px]">{error}</p> : null}
    </div>
  );
}
