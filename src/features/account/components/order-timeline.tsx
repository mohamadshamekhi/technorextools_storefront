import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

import { FULFILMENT_STAGES } from '../data/orders';
import type { Order } from '../types';
import { statusMeta } from '../utils/orders';

/** Four-stage fulfilment stepper shown inside an expanded order card. */
export function OrderTimeline({ order }: { order: Order }) {
  const done = statusMeta(order).stagesDone;

  return (
    <ol className="flex justify-between">
      {FULFILMENT_STAGES.map((label, index) => {
        const complete = index < done;
        return (
          <li key={label} className="flex flex-1 flex-col items-center gap-2 text-center">
            <span
              className={cn(
                'grid size-7 place-items-center rounded-full',
                complete ? 'bg-brand-500 text-white' : 'bg-surface-sunken',
              )}
            >
              {complete ? <Icon name="check" className="size-3.5" /> : null}
            </span>
            <span
              className={cn(
                'text-[11.5px] font-semibold',
                complete ? 'text-foreground' : 'text-foreground-muted',
              )}
            >
              {label}
            </span>
            <span className="text-foreground-muted text-[10px]">
              {complete ? order.date : '—'}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
