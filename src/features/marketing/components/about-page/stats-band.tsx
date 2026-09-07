import { CountUp } from '@/components/atoms';
import { Reveal } from '@/components/molecules';

import { ABOUT_STATS } from '../../data/about';

/** Dark full-width band of animated trust counters. */
export function AboutStatsBand() {
  return (
    <section className="bg-ink py-16 text-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-5 text-center sm:px-8 lg:grid-cols-4 lg:px-12">
        {ABOUT_STATS.map((stat) => (
          <Reveal key={stat.label}>
            <div className="font-display text-accent-500 mb-2 text-[1.75rem] font-bold sm:text-[2.125rem]">
              <CountUp to={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-[13px] text-white/70">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
