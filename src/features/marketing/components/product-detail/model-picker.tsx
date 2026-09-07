'use client';

import { cn } from '@/lib/utils';

type ModelPickerProps = {
  models: string[];
  active: number;
  onChange: (index: number) => void;
};

export function ModelPicker({ models, active, onChange }: ModelPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {models.map((model, index) => (
        <button
          key={model}
          type="button"
          aria-pressed={active === index}
          onClick={() => onChange(index)}
          className={cn(
            'rounded-lg border px-3.5 py-2 text-[12.5px] font-bold transition-colors',
            active === index
              ? 'border-brand-500 bg-brand-500 text-white'
              : 'border-hairline text-foreground-muted hover:border-brand-500',
          )}
        >
          {model}
        </button>
      ))}
    </div>
  );
}
