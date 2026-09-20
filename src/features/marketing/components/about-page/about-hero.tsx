import { Container } from '@/components/atoms';
import { cn } from '@/lib/utils';

import { AboutEyebrow } from './about-eyebrow';

/** Ambient drifting blob behind the hero headline. */
function Blob({ className }: { className: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'animate-blob pointer-events-none absolute size-[460px] rounded-full',
        'bg-[radial-gradient(circle,oklch(0.7_0.19_260/0.24)_0%,transparent_68%)]',
        className,
      )}
    />
  );
}

/** About-page opening: story badge, headline and intro copy. */
export function AboutHero() {
  return (
    <section className="relative overflow-hidden py-20 [background:radial-gradient(120%_120%_at_85%_-10%,var(--color-brand-50)_0%,transparent_55%)] lg:py-[90px]">
      <Blob className="-top-[150px] -left-[100px]" />
      <Blob className="-right-[120px] -bottom-[200px] [background:radial-gradient(circle,oklch(0.84_0.16_82/0.22)_0%,transparent_68%)]" />
      <Container className="relative max-w-3xl text-center">
        <AboutEyebrow>داستان تکنورکس</AboutEyebrow>
        <h1 className="mt-5 mb-4 text-3xl leading-[1.4] font-black tracking-tight text-balance sm:text-4xl">
          ۱۴ سال در کنار صنعت ابزار ایران
        </h1>
        <p className="text-foreground-muted text-base leading-loose text-pretty">
          از یک فروشگاه کوچک ابزار تا نمایندگی رسمی تکنورکس در ایران؛ مسیری که با اعتماد کارگاه‌ها و
          خطوط تولید صنعتی ساخته شد.
        </p>
      </Container>
    </section>
  );
}
