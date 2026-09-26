import { Icon } from '@/components/atoms';
import { formatToman, toPersianDigits } from '@/lib/persian';

import type { Bundle } from '../../services/bundles.schemas';
import { bundleSavings, bundleSavingsPercent } from '../../utils/bundle';
import { BundleAddButton } from './bundle-add-button';

/** Dark side of a package band: naming, price stack and the CTA. */
export function BundlePricePanel({ bundle }: { bundle: Bundle }) {
  const savings = bundleSavings(bundle);
  const percent = bundleSavingsPercent(bundle);

  return (
    <div className="surface-ink texture-grid relative flex flex-col gap-5 p-7 text-white sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-accent-500 text-ink inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-black">
          <Icon name="cube" className="size-3.5" />
          پکیج ویژه
        </span>
        {percent > 0 ? (
          <span className="rounded-full bg-white/12 px-3 py-1 text-[11.5px] font-bold text-white/90">
            {toPersianDigits(percent)}٪ ارزان‌تر از خرید تکی
          </span>
        ) : null}
      </div>

      <div>
        <h3 className="text-[1.6rem] leading-tight font-black tracking-tight">{bundle.title}</h3>
        <p className="mt-2 text-[13px] leading-7 text-white/70">
          {bundle.description ??
            `${toPersianDigits(bundle.items.length)} ابزار مکمل، یک‌جا و با یک قیمت.`}
        </p>
      </div>

      <div className="mt-auto">
        <p className="text-[11.5px] font-bold text-white/55">قیمت پکیج</p>
        <p className="font-display mt-1.5 text-[2rem] leading-none font-black">
          {formatToman(bundle.bundlePrice)}
          <span className="font-sans text-[13px] font-medium text-white/70"> تومان</span>
        </p>
        {savings > 0 ? (
          <p className="text-accent-300 mt-2 text-[12.5px] font-bold">
            {formatToman(savings)} تومان سود نسبت به خرید تکی
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <BundleAddButton bundle={bundle} />
        {bundle.available && bundle.packagesInStock <= 3 ? (
          <p className="text-accent-300 text-center text-[11.5px] font-bold">
            فقط {toPersianDigits(bundle.packagesInStock)} پکیج موجود است
          </p>
        ) : null}
      </div>
    </div>
  );
}
