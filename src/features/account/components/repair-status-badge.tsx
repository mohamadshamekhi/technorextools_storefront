import type { RepairStatus } from '@/features/repairs';
import { cn } from '@/lib/utils';

import { REPAIR_STATUS_META } from '../data/repairs';

/** `onTint`: the badge sits on a surface already tinted with the same colour (detail hero) —
 * needs a solid white chip instead of its own tint to stay legible. */
export function RepairStatusBadge({
  status,
  label,
  onTint = false,
}: {
  status: RepairStatus;
  label: string;
  onTint?: boolean;
}) {
  const meta = REPAIR_STATUS_META[status];

  return (
    <span
      className={cn(
        'rounded-full px-3.5 py-1.5 text-[12px] font-bold',
        onTint && 'bg-white/70 shadow-sm',
      )}
      style={{ backgroundColor: onTint ? undefined : meta.tint, color: meta.ink }}
    >
      {label}
    </span>
  );
}
