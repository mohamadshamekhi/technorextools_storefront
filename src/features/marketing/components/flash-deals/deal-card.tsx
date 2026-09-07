import { MediaPlaceholder } from '@/components/atoms';

import type { Deal } from '../../types';
import { discountPercent, formatToman, toPersianDigits } from '../../utils/persian';

export function DealCard({ deal }: { deal: Deal }) {
  return (
    <article className="border-hairline hover:bg-surface-muted flex flex-col gap-3 border-e p-5 transition-colors last:border-e-0">
      <MediaPlaceholder label="عکس" className="aspect-square rounded-xl text-[11px]" />
      <h3 className="line-clamp-2 min-h-[2.6rem] text-[13px] leading-relaxed font-semibold">
        {deal.title}
      </h3>
      <div className="flex items-center gap-2">
        <span className="bg-sale rounded-full px-2 py-0.5 text-[11px] font-extrabold text-white">
          {toPersianDigits(discountPercent(deal.price, deal.compareAt))}٪
        </span>
        <span className="text-foreground-muted text-[11px] line-through">
          {formatToman(deal.compareAt)}
        </span>
      </div>
      <p className="font-display text-base font-bold">
        {formatToman(deal.price)}
        <span className="text-foreground-muted ms-1 font-sans text-[11px] font-medium">تومان</span>
      </p>
    </article>
  );
}
