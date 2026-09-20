import { Icon } from '@/components/atoms';
import { formatJalaliDate } from '@/features/content';
import { cn } from '@/lib/utils';

import type { OrderDetail } from '../types';
import { ORDER_STATUS_META } from '../data/orders';

/** Real chronological status log for one order (`abzar/api`'s `statusHistory`) —
 * every entry already happened, so each renders as done, oldest first. */
export function OrderStatusTimeline({ history }: { history: OrderDetail['statusHistory'] }) {
  if (history.length === 0) return null;

  return (
    <ol className="flex flex-col">
      {history.map((entry, index) => {
        const meta = ORDER_STATUS_META[entry.status];
        const isLast = index === history.length - 1;

        return (
          <li key={`${entry.status}-${entry.at}`} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className="ring-surface grid size-8 shrink-0 place-items-center rounded-full ring-4"
                style={{ backgroundColor: meta.tint, color: meta.ink }}
              >
                <Icon name={meta.icon} className="size-4" />
              </span>
              {!isLast ? <span className="bg-brand-200 w-0.5 flex-1" /> : null}
            </div>
            <div className={cn('flex flex-1 flex-col gap-0.5 pb-6', isLast && 'pb-0')}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[13.5px] font-bold">{meta.label}</span>
                <span className="text-foreground-muted text-[11.5px]">
                  {formatJalaliDate(entry.at)}
                </span>
              </div>
              {entry.note ? (
                <p className="text-foreground-muted text-[12.5px]">{entry.note}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
