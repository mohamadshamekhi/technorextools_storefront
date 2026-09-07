import { Icon } from '@/components/atoms';

import type { FilterChip } from '../../types/catalog';

export function ActiveFilterChips({ chips }: { chips: FilterChip[] }) {
  if (chips.length === 0) return null;

  return (
    <ul className="mb-6 flex flex-wrap gap-2">
      {chips.map((chip) => (
        <li key={chip.key}>
          <button
            type="button"
            onClick={chip.onRemove}
            className="bg-brand-50 text-brand-700 hover:bg-brand-100 flex items-center gap-1.5 rounded-full py-1.5 ps-3 pe-2 text-[13px] font-bold transition-colors"
          >
            {chip.label}
            <Icon name="close" className="size-3.5" title="حذف فیلتر" />
          </button>
        </li>
      ))}
    </ul>
  );
}
