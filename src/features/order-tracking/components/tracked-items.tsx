import { formatToman, toPersianDigits } from '@/lib/persian';

import type { TrackedItem } from '../types';

/** Read-only line items for the tracked order. */
export function TrackedItems({ items }: { items: TrackedItem[] }) {
  return (
    <div className="border-hairline bg-surface rounded-3xl border p-6 sm:p-8">
      <h2 className="mb-4 text-sm font-black">اقلام سفارش</h2>
      <ul className="divide-hairline divide-y">
        {items.map((item) => (
          <li
            key={item.title}
            className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0 last:pb-0"
          >
            <span className="text-sm">
              {item.title} × {toPersianDigits(item.quantity)}
            </span>
            <span className="text-sm font-bold whitespace-nowrap">
              {formatToman(item.total)} تومان
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
