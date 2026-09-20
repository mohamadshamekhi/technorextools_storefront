import { Icon } from '@/components/atoms';
import { formatToman, toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import type { ShippingMethod } from '../types';

type FreeShippingBarProps = { subtotal: number; methods: ShippingMethod[] };

export function FreeShippingBar({ subtotal, methods }: FreeShippingBarProps) {
  const withThreshold = methods.filter(
    (method): method is ShippingMethod & { freeOverAmount: number } =>
      method.freeOverAmount !== null,
  );
  if (withThreshold.length === 0) return null;

  const threshold = Math.min(...withThreshold.map((method) => method.freeOverAmount));
  const freeShipping = subtotal >= threshold;
  const progress = Math.min(100, Math.round((subtotal / threshold) * 100));

  return (
    <div
      className={cn(
        'mb-6 rounded-2xl border p-4 shadow-sm transition-colors',
        freeShipping
          ? 'border-[oklch(0.85_0.08_150)] bg-[oklch(0.97_0.03_150)]'
          : 'border-hairline bg-surface',
      )}
    >
      <div className="mb-2.5 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[13px] font-bold">
          <span
            className={cn(
              'grid size-6 place-items-center rounded-full',
              freeShipping
                ? 'bg-[oklch(0.9_0.06_150)] text-[oklch(0.45_0.14_155)]'
                : 'bg-brand-50 text-brand-600',
            )}
          >
            <Icon name={freeShipping ? 'check' : 'truck'} className="size-3.5" />
          </span>
          {freeShipping
            ? 'ارسال این سفارش رایگان شد'
            : `تا ارسال رایگان ${formatToman(threshold - subtotal)} تومان باقی مانده`}
        </span>
        <span className="text-foreground-muted text-xs">{toPersianDigits(progress)}٪</span>
      </div>
      <div className="bg-surface-sunken h-2 overflow-hidden rounded-full">
        <div
          className={cn(
            'h-full rounded-full transition-[width] duration-500',
            freeShipping
              ? 'bg-[oklch(0.6_0.15_150)]'
              : 'from-brand-500 to-accent-500 bg-linear-to-l',
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
