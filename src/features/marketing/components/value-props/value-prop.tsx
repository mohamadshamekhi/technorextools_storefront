import { Icon } from '@/components/atoms';

import type { ValueProp as ValuePropData } from '../../types';

export function ValueProp({ item }: { item: ValuePropData }) {
  return (
    <div className="flex items-center gap-3.5">
      <span className="bg-brand-50 text-brand-600 grid size-12 shrink-0 place-items-center rounded-2xl">
        <Icon name={item.icon} className="size-6" />
      </span>
      <div>
        <div className="text-[15px] font-bold">{item.title}</div>
        <div className="text-foreground-muted text-[13px]">{item.description}</div>
      </div>
    </div>
  );
}
