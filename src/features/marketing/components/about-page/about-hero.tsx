import { Container } from '@/components/atoms';
import { cn } from '@/lib/utils';

import { AboutEyebrow } from './about-eyebrow';

/** Ambient drifting blob behind the hero headline. */
function Blob({ className }: { className: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'animate-blob pointer-events-none absolute size-[420px] rounded-full',
        'bg-[radial-gradient(circle,oklch(0.82_0.13_60/0.28)_0%,transparent_68%)]',
        className,
      )}
    />
  );
}

/** About-page opening: story badge, headline and intro copy. */
export function AboutHero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-[90px]">
      <Blob className="-top-[150px] -left-[100px]" />
      <Container className="relative max-w-3xl text-center">
        <AboutEyebrow>داستان پوما ایر</AboutEyebrow>
        <h1 className="mt-5 mb-4 text-3xl leading-[1.4] font-black tracking-tight text-balance sm:text-4xl">
          ۱۴ سال در کنار صنعت ابزار ایران
        </h1>
        <p className="text-foreground-muted text-base leading-loose text-pretty">
          از یک فروشگاه کوچک ابزار تا نمایندگی رسمی پوما ایر در ایران؛ مسیری که با اعتماد کارگاه‌ها
          و خطوط تولید صنعتی ساخته شد.
        </p>
      </Container>
    </section>
  );
}
