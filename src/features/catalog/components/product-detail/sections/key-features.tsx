import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

import type { KeyFeature } from '../../../types/pdp';

export function KeyFeatures({ items }: { items: KeyFeature[] }) {
  return (
    <ul className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item, index) => (
        <li
          key={item.title}
          className={cn(
            'bg-surface-muted rounded-2xl p-4 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-(--shadow-soft) motion-reduce:transition-none motion-reduce:hover:translate-y-0',
            index === 0 && 'col-span-2',
          )}
        >
          <span className="bg-surface text-brand-600 mb-3 grid size-10 place-items-center rounded-xl shadow-(--shadow-soft)">
            <Icon name={item.icon} className="size-5" />
          </span>
          <p className="text-foreground-muted text-xs">{item.title}</p>
          <p className="font-display mt-0.5 text-base font-bold">{item.value}</p>
          <p className="text-foreground-muted mt-1 text-xs leading-5">{item.hint}</p>
        </li>
      ))}
    </ul>
  );
}
