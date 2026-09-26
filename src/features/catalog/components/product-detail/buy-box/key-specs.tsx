import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

import type { Highlight } from '../../../types/pdp';
import { toPdpIcon } from '../../../utils/pdp-icon';

/** Column count follows the highlight count `abzar/api` sends; hidden when there are none. */
const COLUMNS: Record<number, string> = { 1: 'grid-cols-1', 2: 'grid-cols-2' };

export function KeySpecs({ items }: { items: Highlight[] }) {
  if (items.length === 0) return null;

  return (
    <ul
      className={cn(
        'border-hairline grid divide-x divide-[var(--color-hairline)] rounded-2xl border py-3 divide-x-reverse',
        COLUMNS[items.length] ?? 'grid-cols-3',
      )}
    >
      {items.map((item) => (
        <li key={item.label} className="flex flex-col items-center gap-1 px-2 text-center">
          <Icon name={toPdpIcon(item.icon)} className="text-brand-600 size-5" />
          <span className="font-display text-sm font-bold">{item.value}</span>
          <span className="text-foreground-muted text-xs">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
