import { Fragment } from 'react';

import { Icon } from '@/components/atoms';
import { formatToman, toPersianDigits } from '@/lib/persian';

import type { Bundle } from '../../services/bundles.schemas';
import { bundleListPrice, bundleSavings } from '../../utils/bundle';
import { BundlePricePanel } from './bundle-band-panel';
import { BundleMemberCard } from './bundle-member-card';

/** One package, as a full-width band: the offer panel plus the "this + that" line-up it buys. */
export function BundleBand({ bundle }: { bundle: Bundle }) {
  const listPrice = bundleListPrice(bundle);
  const savings = bundleSavings(bundle);

  return (
    <article className="border-hairline bg-surface grid overflow-hidden rounded-3xl border shadow-(--shadow-lift) lg:grid-cols-[minmax(0,1fr)_23rem]">
      <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
        <p className="text-foreground-muted text-[11.5px] font-black tracking-[0.14em]">
          شامل {toPersianDigits(bundle.items.length)} کالا
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {bundle.items.map((item, index) => (
            <Fragment key={item.variant.id}>
              {index > 0 ? (
                <span
                  aria-hidden
                  className="bg-surface-sunken text-foreground-muted grid size-7 shrink-0 place-items-center rounded-full"
                >
                  <Icon name="plus" className="size-3.5" />
                </span>
              ) : null}
              <BundleMemberCard item={item} />
            </Fragment>
          ))}
        </div>

        {savings > 0 ? (
          <div className="border-hairline flex items-center justify-between border-t pt-4 text-[12.5px]">
            <span className="text-foreground-muted">قیمت این کالاها به‌صورت جداگانه</span>
            <span className="font-display font-bold tabular-nums line-through">
              {formatToman(listPrice)} تومان
            </span>
          </div>
        ) : null}
      </div>

      <BundlePricePanel bundle={bundle} />
    </article>
  );
}
