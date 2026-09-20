import { cn } from '@/lib/utils';

import type { OrderStatusMeta } from '../types';

/** `onTint`: the badge sits on a surface already tinted with `meta.tint` (order hero) —
 * needs a solid white chip instead of its own tint to stay legible. */
export function OrderStatusBadge({
  meta,
  onTint = false,
}: {
  meta: OrderStatusMeta;
  onTint?: boolean;
}) {
  return (
    <span
      className={cn(
        'rounded-full px-3.5 py-1.5 text-[12px] font-bold',
        onTint && 'bg-white/70 shadow-sm',
      )}
      style={{ backgroundColor: onTint ? undefined : meta.tint, color: meta.ink }}
    >
      {meta.label}
    </span>
  );
}
