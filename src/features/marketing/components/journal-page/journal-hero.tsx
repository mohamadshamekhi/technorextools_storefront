import Link from 'next/link';

import { Container, Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

import { JOURNAL_CATEGORIES } from '../../data/journal-taxonomy';

type CategoryTabsProps = {
  active?: string;
};

/** Server-rendered filter pills — every category is a crawlable link. */
export function CategoryTabs({ active }: CategoryTabsProps) {
  const tabs = [{ slug: undefined, label: 'همه مقالات' }, ...JOURNAL_CATEGORIES.map(
    (category) => ({ slug: category.slug, label: category.label }),
  )];

  return (
    <div className="flex flex-wrap gap-2.5">
      {tabs.map((tab) => {
        const isActive = tab.slug === active;
        return (
          <Link
            key={tab.label}
            href={tab.slug ? `${routes.blog}?cat=${tab.slug}` : routes.blog}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'rounded-full border px-5 py-2.5 text-[13.5px] font-bold transition-colors',
              isActive
                ? 'border-brand-500 bg-brand-500 bg-(image:--gradient-brand) text-white shadow-(--shadow-brand)'
                : 'border-hairline bg-surface text-foreground-muted shadow-(--shadow-soft) hover:border-brand-300 hover:text-foreground',
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

/** Journal hero — identity block, quick stats and the filter tabs. */
export function JournalHero({ activeCategory }: { activeCategory?: string }) {
  return (
    <section className="relative overflow-hidden pt-14 [background:radial-gradient(120%_120%_at_85%_-10%,var(--color-brand-50)_0%,transparent_55%)]">
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute -top-[150px] -left-[100px] size-[420px] rounded-full bg-[radial-gradient(circle,oklch(0.7_0.19_260/0.24)_0%,transparent_68%)]"
      />
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
        <p className="text-foreground-muted mb-6 max-w-xl text-[15px] leading-loose">
          راهنمای خرید، نگهداری و کاربرد درست ابزار بادی و شارژی صنعتی، به زبان ساده.
        </p>
        <div className="mb-8 flex flex-wrap gap-7">
          <div className="flex items-center gap-2.5">
            <span className="font-display text-brand-600 text-[22px] font-bold">۱۳+</span>
            <span className="text-foreground-muted text-[12.5px]">مقاله تخصصی</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-display text-brand-600 text-[22px] font-bold">۵</span>
            <span className="text-foreground-muted text-[12.5px]">دسته‌بندی موضوعی</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="inline-block size-2 animate-pulse rounded-full bg-[oklch(0.5_0.14_155)]" />
            <span className="text-foreground-muted text-[12.5px]">به‌روزرسانی هفتگی</span>
          </div>
        </div>
        <CategoryTabs active={activeCategory} />
      </Container>
    </section>
  );
}
