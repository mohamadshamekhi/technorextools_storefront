import Link from 'next/link';

import { Icon } from '@/components/atoms';

import { anchor } from '../../anchors';
import type { PromoCard as PromoCardData } from '../../types';

export function PromoCard({ promo }: { promo: PromoCardData }) {
  return (
    <Link
      href={anchor('contact')}
      className="flex min-h-[150px] flex-col gap-2.5 rounded-card p-7 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl"
      style={{ backgroundColor: promo.tint, color: promo.ink }}
    >
      <span className="text-lg font-black">{promo.title}</span>
      <span className="text-sm leading-relaxed opacity-90">{promo.description}</span>
      <span className="mt-auto flex items-center gap-1.5 text-[13px] font-bold">
        {promo.cta}
        <Icon name="chevronEnd" className="size-4" />
      </span>
    </Link>
  );
}
