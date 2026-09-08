import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger';

const TONES: Record<Tone, string> = {
  neutral: 'bg-surface-sunken text-foreground-muted ring-1 ring-hairline',
  brand: 'bg-brand-50 text-brand-700 ring-1 ring-brand-100',
  success: 'bg-[oklch(0.95_0.04_155)] text-[oklch(0.42_0.12_155)]',
  warning: 'bg-accent-100 text-accent-600',
  danger: 'bg-[oklch(0.95_0.04_25)] text-[oklch(0.5_0.18_25)]',
};

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & { tone?: Tone };

export function Badge({ className, tone = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        TONES[tone],
        className,
      )}
      {...props}
    />
  );
}
