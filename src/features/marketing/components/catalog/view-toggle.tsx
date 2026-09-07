import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

import type { CatalogView } from '../../types/catalog';

const VIEWS: { value: CatalogView; icon: 'grid' | 'list'; label: string }[] = [
  { value: 'grid', icon: 'grid', label: 'نمایش شبکه‌ای' },
  { value: 'list', icon: 'list', label: 'نمایش فهرستی' },
];

type ViewToggleProps = {
  value: CatalogView;
  onChange: (value: CatalogView) => void;
};

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="bg-surface-sunken flex gap-1 rounded-xl p-1">
      {VIEWS.map((view) => (
        <button
          key={view.value}
          type="button"
          aria-label={view.label}
          aria-pressed={value === view.value}
          onClick={() => onChange(view.value)}
          className={cn(
            'grid size-9 place-items-center rounded-lg transition-colors',
            value === view.value ? 'bg-surface text-brand-600 shadow-sm' : 'text-foreground-muted',
          )}
        >
          <Icon name={view.icon} className="size-4" />
        </button>
      ))}
    </div>
  );
}
