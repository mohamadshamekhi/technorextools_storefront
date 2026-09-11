import { Container, MediaPlaceholder } from '@/components/atoms';
import { Reveal } from '@/components/molecules';

import { ABOUT_TEAM } from '../../data/about';
import { AboutSectionHeading } from './about-section-heading';

/** Leadership grid with portrait placeholders. */
export function TeamSection() {
  return (
    <section className="py-24">
      <Container>
        <AboutSectionHeading eyebrow="تیم ما" title="پشت صحنه تکنورکس" id="team-heading" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_TEAM.map((member) => (
            <Reveal key={member.name} className="text-center">
              <MediaPlaceholder
                label={`تصویر ${member.name}`}
                className="border-hairline mb-3.5 aspect-square rounded-[1.25rem] border"
              />
              <div className="mb-1 text-sm font-bold">{member.name}</div>
              <div className="text-foreground-muted text-[12.5px]">{member.role}</div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
