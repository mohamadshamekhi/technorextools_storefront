'use client';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

const LABELS = ['خیلی ضعیف', 'ضعیف', 'متوسط', 'خوب', 'عالی'] as const;

type RatingInputProps = {
  value: number;
  onChange: (value: number) => void;
  invalid?: boolean;
  disabled?: boolean;
};

/** Five native radios with star skins — keyboard/screen-reader accessible by default. */
export function RatingInput({ value, onChange, invalid = false, disabled }: RatingInputProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div
        className={cn(
          'flex items-center gap-1 rounded-xl px-1 py-1',
          invalid && 'ring-sale/40 ring-2',
        )}
      >
        {LABELS.map((label, index) => {
          const star = index + 1;
          return (
            <label
              key={label}
              title={label}
              className="cursor-pointer p-1 has-disabled:cursor-not-allowed"
            >
              <input
                type="radio"
                name="rating"
                value={star}
                checked={value === star}
                disabled={disabled}
                onChange={() => onChange(star)}
                className="peer sr-only"
              />
              <span className="sr-only">
                {star} ستاره — {label}
              </span>
              <Icon
                name="star"
                aria-hidden
                className={cn(
                  'peer-focus-visible:outline-brand-500 size-7 rounded transition-colors duration-150 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
                  star <= value ? 'text-accent-500 fill-current' : 'text-hairline',
                )}
              />
            </label>
          );
        })}
      </div>
      <span aria-live="polite" className="text-foreground-muted text-sm font-semibold">
        {value > 0 ? LABELS[value - 1] : 'امتیاز خود را انتخاب کنید'}
      </span>
    </div>
  );
}
