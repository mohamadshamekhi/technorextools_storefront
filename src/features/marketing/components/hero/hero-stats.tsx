import { CountUp, Icon, type IconName } from '@/components/atoms';

import { HERO_STATS } from '../../data/content';

function iconForStat(label: string): IconName {
  if (label.includes('تجربه')) return 'award';
  if (label.includes('مشتری')) return 'user';
  return 'box';
}

export function HeroStats() {
  return (
    <dl className="mt-2 grid grid-cols-3 gap-2 sm:gap-3.5">
      {HERO_STATS.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface border-hairline flex flex-col items-center gap-1.5 rounded-2xl border px-2.5 py-2.5 text-center shadow-(--shadow-soft) sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:py-3 sm:text-start"
        >
          <span className="bg-brand-50 text-brand-600 grid size-8 shrink-0 place-items-center rounded-xl sm:size-9">
            <Icon name={iconForStat(stat.label)} className="size-4 sm:size-4.5" />
          </span>
          <div className="min-w-0">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="font-display text-[17px] leading-tight font-black sm:text-xl">
              <CountUp to={stat.value} suffix={stat.suffix} />
            </dd>
            <p className="text-foreground-muted mt-0.5 text-[10.5px] leading-tight font-medium sm:text-[12px]">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </dl>
  );
}
