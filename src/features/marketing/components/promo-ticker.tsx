import { Marquee } from '@/components/molecules';

import { TICKER_PHRASES } from '../data/content';

export function PromoTicker() {
  return (
    <div className="bg-brand-600 bg-(image:--gradient-brand) py-4 text-white">
      <Marquee label="مزیت‌های خرید از تکنورکس" speed="normal">
        {TICKER_PHRASES.map((phrase) => (
          <span key={phrase} className="flex items-center gap-4 px-4 text-[15px] font-bold whitespace-nowrap">
            {phrase}
            <span className="bg-accent-500 size-1.5 rounded-full" aria-hidden />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
