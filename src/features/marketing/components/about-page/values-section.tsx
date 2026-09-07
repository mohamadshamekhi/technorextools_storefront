import { Reveal } from '@/components/molecules';

import { ABOUT_VALUES } from '../../data/about';
import { PillarCard } from '../about/pillar-card';
import { AboutSectionHeading } from './about-section-heading';

/** Trust cards grid — "چرا کارگاه‌ها به ما اعتماد می‌کنند". */
export function AboutValuesSection() {
  return (
    <section className="border-hairline bg-surface border-y py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <AboutSectionHeading
          eyebrow="ارزش‌های ما"
          title="چرا کارگاه‌ها به ما اعتماد می‌کنند"
          id="values-heading"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_VALUES.map((value) => (
            <Reveal key={value.title}>
              <PillarCard item={value} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
