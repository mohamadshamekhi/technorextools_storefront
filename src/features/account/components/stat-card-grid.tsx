import { STAT_CARDS } from '../data/overview';
import { StatCard } from './stat-card';

export function StatCardGrid() {
  return (
    <div className="mb-7 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
      {STAT_CARDS.map((card) => (
        <StatCard key={card.label} card={card} />
      ))}
    </div>
  );
}
