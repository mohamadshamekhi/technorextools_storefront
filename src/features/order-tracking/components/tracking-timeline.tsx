import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

import type { TimelineStep, TrackingStatus } from '../types';

const STATUS_ORDER: TrackingStatus[] = ['processing', 'packed', 'shipped', 'delivered'];

/** Vertical fulfilment rail — steps up to and including `current` render as done. */
export function TrackingTimeline({
  steps,
  current,
}: {
  steps: TimelineStep[];
  current: TrackingStatus;
}) {
  const currentIndex = STATUS_ORDER.indexOf(current);

  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => {
        const done = index <= currentIndex;
        const isLast = index === steps.length - 1;

        return (
          <li key={step.key} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  'grid size-5 shrink-0 place-items-center rounded-full',
                  done
                    ? 'bg-brand-500 text-white'
                    : 'border-hairline bg-surface border',
                )}
              >
                {done ? <Icon name="check" className="size-3" /> : null}
              </span>
              {!isLast ? (
                <span className={cn('w-px flex-1', done ? 'bg-brand-500/40' : 'bg-hairline')} />
              ) : null}
            </div>
            <div
              className={cn(
                'flex flex-1 flex-wrap items-center justify-between gap-2 pb-6',
                isLast && 'pb-0',
              )}
            >
              <span className={cn('text-sm font-semibold', !done && 'text-foreground-muted')}>
                {step.label}
              </span>
              <span className="text-foreground-muted text-xs">{step.date ?? 'در انتظار'}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
