import Link from 'next/link';

import { Container, Icon } from '@/components/atoms';
import { Reveal } from '@/components/molecules';
import { routes } from '@/config/routes';

import { SECTION } from '../../anchors';
import { DEALS } from '../../data/catalog';
import { DealCard } from './deal-card';
import { DealsCountdown } from './deals-countdown';

export function FlashDeals() {
  return (
    <Container as="section" id={SECTION.deals} aria-labelledby="deals-heading" className="scroll-mt-24 pt-14">
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
            href={routes.products}
            className="mt-auto flex items-center gap-1.5 text-sm font-bold"
          >
            مشاهدهٔ همه
            <Icon name="chevronEnd" className="size-4" />
          </Link>
        </div>
        <div className="bg-surface grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {DEALS.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </Reveal>
    </Container>
  );
}
