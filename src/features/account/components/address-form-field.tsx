import type { ChangeEvent } from 'react';

import { cn } from '@/lib/utils';

const FIELD_CLASS =
  'w-full rounded-xl border border-hairline px-3.5 py-3 text-[13.5px] outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15';

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
      <input {...props} className={cn(FIELD_CLASS, error && 'border-sale')} />
      {error ? <p className="text-sale mt-1 text-[12px]">{error}</p> : null}
    </div>
  );
}

export { FIELD_CLASS as ADDRESS_FIELD_CLASS };
