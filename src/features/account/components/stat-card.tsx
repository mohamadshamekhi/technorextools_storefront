import { Icon } from '@/components/atoms';

import type { StatCard as StatCardData } from '../types';

export function StatCard({ card }: { card: StatCardData }) {
  return (
    <div className="border-hairline bg-surface group relative overflow-hidden rounded-2xl border p-5 shadow-(--shadow-soft) transition-shadow hover:shadow-(--shadow-lift)">
      <span
        aria-hidden
        className="absolute -end-8 -top-10 size-24 rounded-full opacity-60 blur-2xl transition-opacity group-hover:opacity-90"
        style={{ backgroundColor: card.tint }}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-foreground-muted text-[12px] font-bold">{card.label}</p>
          <p className="font-display mt-2 text-[26px] leading-none font-black tracking-tight">
            {card.value}
          </p>
          {card.delta ? (
            <p className="text-success mt-2 text-[11.5px] font-bold">{card.delta}</p>
          ) : null}
        </div>
        <span
          className="grid size-10 shrink-0 place-items-center rounded-xl ring-1 ring-black/5"
          style={{ backgroundColor: card.tint, color: card.ink }}
        >
          <Icon name={card.icon} className="size-5" />
        </span>
      </div>
    </div>
  );
}
