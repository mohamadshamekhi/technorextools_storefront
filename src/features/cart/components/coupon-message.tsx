import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

import type { CouponFeedback } from '../types';

export function CouponMessage({ feedback }: { feedback: CouponFeedback | null }) {
  if (!feedback) return null;

  return (
    <p
      className={cn(
        'mb-4 flex items-center gap-1.5 text-[12.5px]',
        feedback.valid ? 'text-[oklch(0.5_0.14_155)]' : 'text-sale',
      )}
    >
      <Icon name={feedback.valid ? 'check' : 'close'} className="size-3.5" />
      {feedback.text}
    </p>
  );
}
