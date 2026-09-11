import Link from 'next/link';

import { Container, Icon, MediaPlaceholder } from '@/components/atoms';
import { Reveal } from '@/components/molecules';
import { routes } from '@/config/routes';
import { formatToman } from '@/lib/persian';

import { listProducts } from '../services/catalog.api';
import { DealsCountdown } from './deals-countdown';

export async function FlashDeals() {
  const result = await listProducts({ deal: '1' }, { take: 5 }).catch(() => null);
  if (!result || result.items.length === 0) return null;

  return (
    <Container as="section" aria-labelledby="deals-heading" className="scroll-mt-24 pt-14">
      <Reveal className="bg-sale grid overflow-hidden rounded-3xl shadow-(--shadow-float) bg-[linear-gradient(150deg,oklch(0.62_0.22_25)_0%,oklch(0.5_0.2_18)_100%)] lg:grid-cols-[240px_1fr]">
        <div className="flex flex-col gap-4 p-7 text-white">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-white/15">
              <Icon name="bolt" className="size-5" />
            </span>
            <h2 id="deals-heading" className="text-xl font-black">
              پیشنهاد شگفت‌انگیز
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-white/85">
            تخفیف‌های محدود ابزار بادی — تا پایان موجودی
          </p>
          <DealsCountdown />
          <Link
            href={`${routes.products}?deal=1`}
            className="mt-auto flex items-center gap-1.5 text-sm font-bold"
          >
            مشاهدهٔ همه
            <Icon name="chevronEnd" className="size-4" />
          </Link>
        </div>
        <div className="bg-surface grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {result.items.map((deal) => (
            <Link
              key={deal.id}
              href={routes.product(deal.slug)}
              className="border-hairline hover:bg-brand-50/60 group flex flex-col gap-3 border-e p-5 transition-colors last:border-e-0"
            >
              <MediaPlaceholder
                label={deal.title}
                src={deal.mainImageUrl ?? undefined}
                sizes="(max-width: 640px) 45vw, 18vw"
                className="aspect-square rounded-xl text-[11px] transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <h3 className="line-clamp-2 min-h-[2.6rem] text-[13px] leading-relaxed font-semibold">
                {deal.title}
              </h3>
              <p className="font-display text-base font-bold">
                {formatToman(deal.basePrice)}
                <span className="text-foreground-muted ms-1 font-sans text-[11px] font-medium">
                  تومان
                </span>
              </p>
            </Link>
          ))}
        </div>
      </Reveal>
    </Container>
  );
}
