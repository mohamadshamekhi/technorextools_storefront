'use client';

import type { ClipboardEvent, KeyboardEvent, Ref } from 'react';

import { cn } from '@/lib/utils';

export type OtpInputProps = {
  value: string;
  ref: Ref<HTMLInputElement>;
  onChange: (event: { target: { value: string } }) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (event: ClipboardEvent<HTMLInputElement>) => void;
};

type OtpInputsProps = { inputs: OtpInputProps[]; invalid: boolean; shake: boolean };

export function OtpInputs({ inputs, invalid, shake }: OtpInputsProps) {
  return (
    <div
      dir="ltr"
      className={cn('flex justify-between gap-2.5', shake && 'animate-[auth-shake_0.4s_ease]')}
    >
      {inputs.map((input, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          aria-label={`رقم ${index + 1} کد تأیید`}
          className={cn(
            'font-display bg-surface size-14 rounded-2xl border-[1.5px] text-center text-2xl font-bold transition-colors outline-none',
            'focus:border-brand-500 focus:ring-brand-500/15 focus:ring-2',
            invalid ? 'border-sale' : input.value ? 'border-brand-500' : 'border-hairline',
          )}
          {...input}
        />
      ))}
    </div>
  );
}
