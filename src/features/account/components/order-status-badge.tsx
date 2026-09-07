import type { OrderStatusMeta } from '../types';

export function OrderStatusBadge({ meta }: { meta: OrderStatusMeta }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-[12px] font-bold"
      style={{ backgroundColor: meta.tint, color: meta.ink }}
    >
      {meta.label}
    </span>
  );
}
