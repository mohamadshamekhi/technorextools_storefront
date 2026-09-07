import Link from 'next/link';

import { Container, Icon } from '@/components/atoms';
import { Reveal } from '@/components/molecules';

import { SECTION } from '../../anchors';
import { DEALS } from '../../data/catalog';
import { DealCard } from './deal-card';
import { DealsCountdown } from './deals-countdown';

export function FlashDeals() {
  return (
    <Container as="section" id={SECTION.deals} aria-labelledby="deals-heading" className="scroll-mt-24 pt-14">
      <Reveal className="bg-sale grid overflow-hidden rounded-3xl shadow-2xl lg:grid-cols-[240px_1fr]">
        <div className="flex flex-col gap-4 p-7 text-white">
          <div className="flex items-center gap-2.5">
            <Icon name="bolt" className="size-6" />
            <h2 id="deals-heading" className="text-xl font-black">
              پیشنهاد شگفت‌انگیز
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-white/85">
            تخفیف‌های محدود ابزار بادی — تا پایان موجودی
          </p>
          <DealsCountdown />
          <Link href="#products" className="mt-auto flex items-center gap-1.5 text-sm font-bold">
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
