import { Container, Icon } from '@/components/atoms';
import { siteConfig } from '@/config/site';

/** Centered opener with a drifting cobalt blob, response promise and direct actions. */
export function ContactHero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-4 [background:radial-gradient(120%_120%_at_85%_-10%,var(--color-brand-50)_0%,transparent_55%)] lg:pt-20">
      <span
        aria-hidden
        className="animate-blob pointer-events-none absolute -top-[150px] -left-[100px] size-[420px] rounded-full bg-[radial-gradient(circle,oklch(0.7_0.19_260/0.22)_0%,transparent_68%)]"
      />
      <Container className="relative max-w-2xl text-center">
        <span className="font-display text-brand-600 ring-brand-100 bg-brand-50 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.18em] ring-1">
          <span className="bg-accent-500 size-1.5 rounded-full" aria-hidden />
          CONTACT
        </span>
        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-[2.4rem]">
          با <span className="text-gradient-brand">تکنورکس</span> در تماس باشید
        </h1>
        <p className="text-foreground-muted mt-3 text-sm leading-loose text-pretty">
          انتخاب ابزار درست برای کار شما، پیدا کردن یک قطعهٔ یدکی یا پیگیری سفارش — کارشناسان ما
          همان روز راهنمایی‌تان می‌کنند. در ساعات کاری تلفن و واتساپ سریع‌ترین راه است و پیام‌های
          فرم حداکثر تا یک روز کاری پاسخ می‌گیرند.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${siteConfig.phoneHref}`}
            className="bg-brand-500 flex min-h-11 items-center gap-2 rounded-xl bg-(image:--gradient-brand) px-5 text-sm font-bold text-white shadow-(--shadow-brand) transition-[filter,transform] duration-200 hover:brightness-110 active:scale-95"
          >
            <Icon name="phone" className="size-4" />
            تماس فوری
          </a>
          <a
            href={siteConfig.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="border-hairline bg-surface text-foreground hover:border-brand-300 hover:text-brand-600 flex min-h-11 items-center gap-2 rounded-xl border px-5 text-sm font-bold transition-colors"
          >
            <Icon name="whatsapp" className="size-4" />
            گفت‌وگو در واتساپ
          </a>
        </div>
      </Container>
    </section>
  );
}
