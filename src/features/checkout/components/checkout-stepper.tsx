import { Icon } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import type { CheckoutStep } from '../types';

const STEP_ORDER: CheckoutStep[] = ['address', 'payment', 'review', 'success'];
const STEPS: { key: CheckoutStep; label: string }[] = [
  { key: 'address', label: 'آدرس' },
  { key: 'payment', label: 'پرداخت' },
  { key: 'review', label: 'بازبینی نهایی' },
];

export function CheckoutStepper({ current }: { current: CheckoutStep }) {
  const currentIndex = STEP_ORDER.indexOf(current);

  return (
    <div className="mb-9 flex items-center justify-center" aria-hidden>
      {STEPS.map((step, index) => {
        const done = currentIndex > index;
        const active = currentIndex === index;
        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <span
                className={cn(
                  'flex size-10 items-center justify-center rounded-full text-sm font-bold transition-colors',
                  done && 'bg-[oklch(0.5_0.14_155)] text-white',
                  active && 'bg-brand-500 shadow-brand-500/35 text-white shadow-lg',
                  !done && !active && 'bg-surface-sunken text-foreground-muted',
                )}
              >
                {done ? <Icon name="check" className="size-4" /> : toPersianDigits(index + 1)}
              </span>
              <span
                className={cn(
                  'text-[12.5px] font-bold whitespace-nowrap',
                  done || active ? 'text-foreground' : 'text-foreground-muted',
                )}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 ? (
              <span
                className={cn(
                  'mx-2 mb-6 h-0.5 w-14 transition-colors sm:w-22',
                  done ? 'bg-[oklch(0.5_0.14_155)]' : 'bg-hairline',
                )}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
