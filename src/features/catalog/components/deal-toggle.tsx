'use client';

import { Icon } from '@/components/atoms';

type DealToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

/** "Amazing deals only" switch, styled as a promo card. */
export function DealToggle({ checked, onChange }: DealToggleProps) {
  return (
    <label className="group from-sale/10 to-accent-100/60 has-checked:from-sale has-checked:to-accent-600 border-sale/15 relative flex min-h-16 cursor-pointer items-center gap-3 overflow-hidden rounded-2xl border bg-linear-to-l p-3 transition-all has-checked:border-transparent has-checked:shadow-(--shadow-accent)">
      <span className="bg-surface text-sale grid size-10 shrink-0 place-items-center rounded-xl shadow-sm">
        <Icon name="fire" className="size-5" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-foreground text-[13px] font-black group-has-checked:text-white">
          شگفت‌انگیزها
        </span>
        <span className="text-foreground-muted truncate text-[11.5px] group-has-checked:text-white/85">
          فقط کالاهای تخفیف‌دار
        </span>
      </span>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="bg-foreground/15 peer-focus-visible:ring-sale/40 relative h-6 w-11 shrink-0 rounded-full transition-colors peer-checked:bg-white/35 peer-focus-visible:ring-2 after:absolute after:start-1 after:top-1 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:-translate-x-5"
      />
    </label>
  );
}
