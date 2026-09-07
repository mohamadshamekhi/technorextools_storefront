import { cn } from '@/lib/utils';

import { USAGE_OPTIONS, type CatalogFilters } from '../../types/catalog';

type UsageToggleProps = {
  value: CatalogFilters['usage'];
  onChange: (value: CatalogFilters['usage']) => void;
};

export function UsageToggle({ value, onChange }: UsageToggleProps) {
  return (
    <div className="flex gap-2">
      {USAGE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'flex-1 rounded-lg border py-2 text-[13px] font-bold transition-colors',
            value === option.value
              ? 'border-brand-500 bg-brand-500 text-white'
              : 'border-hairline text-foreground-muted hover:border-brand-500',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
