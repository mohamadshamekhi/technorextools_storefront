import { Icon } from '@/components/atoms';

import type { ValueProp as ValuePropData } from '../../types';

export function ValueProp({ item }: { item: ValuePropData }) {
  return (
    <div className="border-hairline bg-surface group flex items-center gap-3.5 rounded-2xl border p-4 shadow-(--shadow-soft) transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-(--shadow-lift)">
      <span className="bg-brand-50 text-brand-600 ring-brand-100 group-hover:bg-brand-500 grid size-12 shrink-0 place-items-center rounded-2xl ring-1 transition-colors group-hover:text-white">
        <Icon name={item.icon} className="size-6" />
      </span>
      <div>
        <div className="text-[15px] font-bold">{item.title}</div>
        <div className="text-foreground-muted text-[13px]">{item.description}</div>
      </div>
    </div>
  );
}
