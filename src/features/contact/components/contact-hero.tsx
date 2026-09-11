import { Container } from '@/components/atoms';

/** Centered opener with a drifting cobalt blob behind the headline. */
export function ContactHero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-4 [background:radial-gradient(120%_120%_at_85%_-10%,var(--color-brand-50)_0%,transparent_55%)] lg:pt-20">
      <span
        aria-hidden
        className="animate-blob pointer-events-none absolute -top-[150px] -left-[100px] size-[420px] rounded-full bg-[radial-gradient(circle,oklch(0.7_0.19_260/0.22)_0%,transparent_68%)]"
      />
      <Container className="relative max-w-xl text-center">
        <span className="font-display text-brand-600 ring-brand-100 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold tracking-[0.18em] ring-1">
          <span className="bg-accent-500 size-1.5 rounded-full" aria-hidden />
          CONTACT
        </span>
        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-[2.4rem]">
          با <span className="text-gradient-brand">تکنورکس</span> در تماس باشید
        </h1>
        <p className="text-foreground-muted mt-3 text-sm leading-loose text-pretty">
          سؤال، مشاورهٔ خرید یا پیشنهاد همکاری دارید؟ تیم تکنورکس در ساعات کاری آمادهٔ
          پاسخگویی است.
        </p>
      </Container>
    </section>
  );
}
