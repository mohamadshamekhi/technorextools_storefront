'use client';

import { Icon } from '@/components/atoms';
import { toFaDigits } from '@/features/auth/utils/format-fa';

type ResendControlProps = { canResend: boolean; remaining: number; onResend: () => void };

export function ResendControl({ canResend, remaining, onResend }: ResendControlProps) {
  return (
    <div className="mt-7 text-center text-[13px]">
      {canResend ? (
        <button
          type="button"
          onClick={onResend}
          className="text-brand-600 hover:text-brand-700 inline-flex items-center gap-1.5 font-bold"
        >
          <Icon name="refresh" className="size-3.5" />
          ارسال مجدد کد
        </button>
      ) : (
        <span className="text-foreground-muted">
          ارسال مجدد کد تا{' '}
          <span className="font-display text-foreground font-bold">{toFaDigits(remaining)}</span>{' '}
          ثانیه دیگر
        </span>
      )}
    </div>
  );
}
