import { Icon } from '@/components/atoms';

import type { StatCard as StatCardData } from '../types';

export function StatCard({ card }: { card: StatCardData }) {
  return (
    <div className="border-hairline bg-surface rounded-2xl border p-5 shadow-(--shadow-soft) transition-shadow hover:shadow-(--shadow-lift)">
      <div className="mb-3.5 flex items-center justify-between">
        <span
          className="grid size-9 place-items-center rounded-xl ring-1 ring-black/5"
          style={{ backgroundColor: card.tint, color: card.ink }}
        >
          <Icon name={card.icon} className="size-[18px]" />
        </span>
        {card.delta ? (
          <span className="text-[11.5px] font-bold text-[oklch(0.5_0.14_155)]">{card.delta}</span>
        ) : null}
      </div>
      <p className="font-display text-[22px] font-bold">{card.value}</p>
      <p className="text-foreground-muted mt-0.5 text-xs">{card.label}</p>
    </div>
  );
}
