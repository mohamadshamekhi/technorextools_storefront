import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

import type { PromoCard as PromoCardData } from '../../types';

/** Single brand+accent palette, cycled by position — keeps the 3-card row on one color scheme. */
const VARIANTS = [
  'bg-(image:--gradient-brand) text-white',
  'bg-ink text-white',
  'bg-brand-50 text-ink ring-1 ring-brand-100',
] as const;

export function PromoCard({ promo, index }: { promo: PromoCardData; index: number }) {
  const variant = VARIANTS[index % VARIANTS.length];
  const onLight = index % VARIANTS.length === 2;

  return (
    <Link
      href={routes.contact}
      className={cn(
        'rounded-card group relative flex h-full min-h-52 flex-col gap-4 overflow-hidden p-7 shadow-(--shadow-lift) ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-(--shadow-float)',
        variant,
      )}
    >
      <span
        aria-hidden
        className="absolute -inset-e-12 -top-12 size-40 rounded-full bg-white/25 blur-2xl transition-transform duration-500 group-hover:scale-125"
      />
      <span
        aria-hidden
        className={cn(
          'relative flex size-11 items-center justify-center rounded-xl ring-1 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-0.5',
          onLight
            ? 'bg-accent-100 ring-accent-200 text-brand-700'
            : 'text-accent-400 bg-white/15 ring-white/30',
        )}
      >
        <Icon name={promo.icon} className="size-5.5" />
      </span>
      <span className="relative flex flex-col gap-1.5">
        <span className="text-lg font-black tracking-tight">{promo.title}</span>
        <span
          className={cn(
            'text-sm leading-relaxed',
            onLight ? 'text-foreground-muted' : 'opacity-80',
          )}
        >
          {promo.description}
        </span>
      </span>
      <span
        className={cn(
          'relative mt-auto flex w-fit items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-bold ring-1 transition-colors duration-300',
          onLight
            ? 'bg-brand-100 text-brand-700 ring-brand-200 group-hover:bg-brand-200'
            : 'bg-white/15 ring-white/25 group-hover:bg-white/25',
        )}
      >
        {promo.cta}
        <Icon
          name="chevronEnd"
          className="size-4 transition-transform group-hover:-translate-x-1"
        />
      </span>
    </Link>
  );
}
