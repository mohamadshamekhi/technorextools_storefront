'use client';

import { Icon, type IconName } from '@/components/atoms';
import { cn } from '@/lib/utils';

import type { GalleryMode } from '../../../types/pdp';

const META: Record<GalleryMode, { label: string; icon: IconName }> = {
  photos: { label: 'تصاویر', icon: 'grid' },
  '3d': { label: 'سه‌بعدی', icon: 'rotate3d' },
  exploded: { label: 'نمای انفجاری', icon: 'gear' },
  video: { label: 'ویدیو', icon: 'spark' },
};

type ModeSwitcherProps = {
  modes: GalleryMode[];
  active: GalleryMode;
  onChange: (mode: GalleryMode) => void;
};

export function ModeSwitcher({ modes, active, onChange }: ModeSwitcherProps) {
  if (modes.length < 2) return null;
  return (
    <div
      role="tablist"
      aria-label="نوع نمایش محصول"
      className="bg-surface-muted mb-3 inline-flex max-w-full gap-1 overflow-x-auto rounded-xl p-1"
    >
      {modes.map((mode) => {
        const meta = META[mode];
        const selected = mode === active;
        return (
          <button
            key={mode}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(mode)}
            className={cn(
              'focus-visible:ring-brand-500 flex min-h-11 items-center gap-2 rounded-lg px-4 text-sm font-semibold whitespace-nowrap transition-[background-color,color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:outline-none',
              selected
                ? 'bg-surface text-foreground shadow-(--shadow-soft)'
                : 'text-foreground-muted hover:text-foreground',
            )}
          >
            <Icon name={meta.icon} className="size-4" />
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}
