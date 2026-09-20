import type { StatCard as StatCardData } from '../types';
import { StatCard } from './stat-card';

export function StatCardGrid({ cards }: { cards: StatCardData[] }) {
  return (
    <div className="mb-7 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.label} card={card} />
      ))}
    </div>
  );
}
