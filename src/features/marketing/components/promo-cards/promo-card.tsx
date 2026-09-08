import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

import type { PromoCard as PromoCardData } from '../../types';

export function PromoCard({ promo }: { promo: PromoCardData }) {
  return (
    <Link
      href={routes.contact}
      className="rounded-card group relative flex min-h-[160px] flex-col gap-2.5 overflow-hidden p-7 shadow-(--shadow-soft) ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-(--shadow-lift)"
      style={{ backgroundColor: promo.tint, color: promo.ink }}
    >
      <span
        aria-hidden
        className="absolute -end-10 -top-10 size-32 rounded-full bg-white/25 blur-2xl transition-transform duration-500 group-hover:scale-150"
      />
      <span className="relative text-lg font-black">{promo.title}</span>
      <span className="relative text-sm leading-relaxed opacity-90">{promo.description}</span>
      <span className="relative mt-auto flex items-center gap-1.5 text-[13px] font-bold">
        {promo.cta}
        <Icon name="chevronEnd" className="size-4 transition-transform group-hover:-translate-x-1" />
      </span>
    </Link>
  );
}
