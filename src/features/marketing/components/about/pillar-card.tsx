import { Icon } from '@/components/atoms';

import type { ValueProp } from '../../types';

export function PillarCard({ item }: { item: ValueProp }) {
  return (
    <div className="border-hairline bg-surface rounded-[1.125rem] border p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl">
      <span className="bg-brand-50 text-brand-600 mb-3.5 grid size-10 place-items-center rounded-xl">
        <Icon name={item.icon} className="size-5" />
      </span>
      <div className="mb-1.5 text-[15px] font-bold">{item.title}</div>
      <p className="text-foreground-muted text-[13px] leading-relaxed">{item.description}</p>
    </div>
  );
}
