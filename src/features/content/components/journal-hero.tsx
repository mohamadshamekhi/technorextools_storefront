import { Container, Icon } from '@/components/atoms';

/** Journal index hero — identity block. Category tabs were dropped: the API has no article taxonomy. */
export function JournalHero() {
  return (
    <section className="relative overflow-hidden pt-14 [background:radial-gradient(120%_120%_at_85%_-10%,var(--color-brand-50)_0%,transparent_55%)]">
      <Container className="relative">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="bg-brand-500 bg-(image:--gradient-brand) text-white shadow-(--shadow-brand) grid size-[34px] place-items-center rounded-[11px]">
            <Icon name="doc" className="size-[17px]" />
          </span>
          <span className="font-display text-brand-600 ring-brand-100 rounded-full bg-brand-50 px-3 py-1 text-[12px] font-bold tracking-[0.18em] ring-1">
            PUMA AIR JOURNAL
          </span>
        </div>
        <h1 className="mb-2 text-3xl font-black tracking-tight sm:text-4xl">مجله پوما ایر</h1>
        <p className="text-foreground-muted mb-8 max-w-xl text-[15px] leading-loose">
          راهنمای خرید، نگهداری و کاربرد درست ابزار بادی و شارژی صنعتی، به زبان ساده.
        </p>
      </Container>
    </section>
  );
}
