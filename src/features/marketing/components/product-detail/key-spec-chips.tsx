import { Icon } from '@/components/atoms';

import type { SpecRow } from '../../types/product-detail';

export function KeySpecChips({ specs }: { specs: SpecRow[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {specs.map((spec) => (
        <li
          key={spec.label}
          className="bg-surface-sunken text-foreground-muted hover:bg-brand-50 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] transition-colors"
        >
          <Icon name={spec.icon} className="text-brand-600 size-3.5" />
          {spec.value}
        </li>
      ))}
    </ul>
  );
}
