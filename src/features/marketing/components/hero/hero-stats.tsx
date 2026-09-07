import { CountUp } from '@/components/atoms';

import { HERO_STATS } from '../../data/content';

export function HeroStats() {
  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-5">
      {HERO_STATS.map((stat) => (
        <div key={stat.label}>
          <dt className="sr-only">{stat.label}</dt>
          <dd className="font-display text-3xl font-bold">
            <CountUp to={stat.value} suffix={stat.suffix} />
          </dd>
          <p className="text-foreground-muted mt-0.5 text-[13px]">{stat.label}</p>
        </div>
      ))}
    </dl>
  );
}
