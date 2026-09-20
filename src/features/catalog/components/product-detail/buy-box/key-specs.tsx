import { Icon } from '@/components/atoms';

import type { Highlight } from '../../../types/pdp';

export function KeySpecs({ items }: { items: Highlight[] }) {
  return (
    <ul className="border-hairline grid grid-cols-3 divide-x divide-[var(--color-hairline)] rounded-2xl border py-3 divide-x-reverse">
      {items.map((item) => (
        <li key={item.label} className="flex flex-col items-center gap-1 px-2 text-center">
          <Icon name={item.icon} className="text-brand-600 size-5" />
          <span className="font-display text-sm font-bold">{item.value}</span>
          <span className="text-foreground-muted text-xs">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
