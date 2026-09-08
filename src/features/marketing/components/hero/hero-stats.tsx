import { CountUp } from '@/components/atoms';
import { cn } from '@/lib/utils';

import { HERO_STATS } from '../../data/content';

export function HeroStats() {
  return (
    <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-5">
      {HERO_STATS.map((stat, index) => (
        <div
          key={stat.label}
          className={cn('ps-8', index === 0 ? 'ps-0' : 'border-hairline border-s')}
        >
          <dt className="sr-only">{stat.label}</dt>
          <dd className="font-display text-gradient-brand text-3xl font-black">
            <CountUp to={stat.value} suffix={stat.suffix} />
          </dd>
          <p className="text-foreground-muted mt-1 text-[13px] font-medium">{stat.label}</p>
        </div>
      ))}
    </dl>
  );
}
