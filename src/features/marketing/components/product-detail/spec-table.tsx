import { Icon } from '@/components/atoms';

import type { SpecRow } from '../../types/product-detail';

export function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <dl className="grid max-w-3xl gap-3 sm:grid-cols-2">
      {rows.map((row) => (
        <div
          key={row.label}
          className="border-hairline bg-surface hover:border-brand-500/40 flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-colors"
        >
          <span className="bg-surface-sunken text-brand-600 grid size-8 shrink-0 place-items-center rounded-lg">
            <Icon name={row.icon} className="size-4" />
          </span>
          <dt className="text-foreground-muted flex-1 text-[13px]">{row.label}</dt>
          <dd className="text-sm font-bold">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
