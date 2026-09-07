import { Container } from '@/components/atoms';
import { Reveal } from '@/components/molecules';
import { cn } from '@/lib/utils';

import { ABOUT_TIMELINE } from '../../data/about';
import { AboutSectionHeading } from './about-section-heading';

type TimelineRowProps = {
  year: string;
  title: string;
  description: string;
  /** Even rows sit on the start column, odd rows on the end column. */
  flipped: boolean;
};

function TimelineRow({ year, title, description, flipped }: TimelineRowProps) {
  return (
    <li className="relative pb-9 lg:grid lg:grid-cols-[1fr_40px_1fr] lg:items-center lg:gap-0 lg:pb-0 lg:mb-9">
      <span
        aria-hidden
        className="border-surface-muted bg-brand-500 absolute start-0 top-1.5 size-4 rounded-full border-4 lg:static lg:col-start-2 lg:row-start-1 lg:mx-auto"
      />
      <Reveal
        className={cn(
          'ps-8 lg:ps-0 lg:row-start-1',
          flipped ? 'lg:col-start-3 lg:text-right' : 'lg:col-start-1 lg:text-left',
        )}
      >
        <div className="font-display text-brand-600 mb-1 text-[15px] font-bold">{year}</div>
        <div className="mb-1 text-sm font-bold">{title}</div>
        <p className="text-foreground-muted text-[12.5px] leading-relaxed">{description}</p>
      </Reveal>
    </li>
  );
}

/** Alternating vertical timeline of company milestones (1391 → today). */
export function TimelineSection() {
  return (
    <section className="py-24">
      <Container>
        <AboutSectionHeading eyebrow="مسیر ما" title="از ۱۳۹۱ تا امروز" id="timeline-heading" />
        <div className="relative ps-0">
          <div
            aria-hidden
            className="bg-hairline absolute inset-y-0 start-[7px] w-0.5 lg:start-[calc(50%-1px)]"
          />
          <ol className="relative">
            {ABOUT_TIMELINE.map((entry, index) => (
              <TimelineRow key={entry.year} {...entry} flipped={index % 2 === 1} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
