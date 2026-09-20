import { cn } from '@/lib/utils';

import type { ProductVariant } from '../../../types';

type VariantPickerProps = {
  variants: ProductVariant[];
  selected: number;
  onSelect: (index: number) => void;
};

export function VariantPicker({ variants, selected, onSelect }: VariantPickerProps) {
  if (variants.length < 2) return null;
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-bold">مدل</legend>
      <div className="flex flex-wrap gap-2">
        {variants.map((option, index) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={index === selected}
            onClick={() => onSelect(index)}
            className={cn(
              'focus-visible:ring-brand-500 min-h-11 rounded-xl border px-4 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none',
              index === selected
                ? 'border-brand-500 bg-brand-50 text-brand-700'
                : 'border-hairline text-foreground-muted hover:border-brand-400',
            )}
          >
            {option.colorName ?? option.sku}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
