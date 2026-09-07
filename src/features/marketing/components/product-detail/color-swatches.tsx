'use client';

import { cn } from '@/lib/utils';

import type { ColorOption } from '../../types/product-detail';

type ColorSwatchesProps = {
  colors: ColorOption[];
  active: number;
  onChange: (index: number) => void;
};

export function ColorSwatches({ colors, active, onChange }: ColorSwatchesProps) {
  return (
    <div className="flex gap-2.5">
      {colors.map((color, index) => (
        <button
          key={color.label}
          type="button"
          aria-label={color.label}
          aria-pressed={active === index}
          onClick={() => onChange(index)}
          className={cn(
            'relative size-8 rounded-full ring-offset-2 transition-transform hover:scale-110',
            active === index && 'ring-brand-500 ring-2',
          )}
          style={{ backgroundColor: color.swatch }}
        />
      ))}
    </div>
  );
}
