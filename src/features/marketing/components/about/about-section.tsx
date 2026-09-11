import { Container } from '@/components/atoms';
import { Reveal } from '@/components/molecules';

import { SECTION } from '../../anchors';
import { PILLARS } from '../../data/content';
import { AboutMedia } from './about-media';
import { PillarCard } from './pillar-card';

export function AboutSection() {
  return (
    <Container
      as="section"
      id={SECTION.about}
      aria-labelledby="about-heading"
      className="grid scroll-mt-24 items-center gap-16 py-24 lg:grid-cols-2"
    >
      <Reveal>
        <AboutMedia />
      </Reveal>
      <div>
        <Reveal>
          <span className="font-display text-brand-600 ring-brand-100 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold tracking-[0.18em] ring-1">
            <span className="bg-accent-500 size-1.5 rounded-full" aria-hidden />
            WHY TECHNOREXTOOLS
          </span>
          <h2 id="about-heading" className="mt-3 mb-4 text-[2.35rem] leading-tight font-black tracking-tight">
            ابزار حرفه‌ای، بدون ریسک خرید
          </h2>
          <p className="text-foreground-muted mb-8 text-base leading-relaxed">
            ۱۴ سال است ابزار بادی و شارژی کارگاه‌ها، تعمیرگاه‌ها و خطوط تولید صنعتی ایران را تأمین
            می‌کنیم. هر ابزاری که می‌فروشیم، قطعات یدکی و پشتیبانی فنی‌اش هم پشتش هست.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {PILLARS.map((item) => (
            <Reveal key={item.title}>
              <PillarCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
}
