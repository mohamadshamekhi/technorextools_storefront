import { discountPercent, formatToman, toPersianDigits } from '../../utils/persian';

type BuyBoxPriceProps = {
  price: number;
  compareAt: number | null;
};

export function BuyBoxPrice({ price, compareAt }: BuyBoxPriceProps) {
  return (
    <div>
      <p className="flex items-baseline gap-2">
        <span className="font-display text-gradient-brand text-[27px] font-black">
          {formatToman(price)}
        </span>
        <span className="text-foreground-muted text-[13px]">تومان</span>
      </p>
      {compareAt ? (
        <p className="mt-1.5 flex items-center gap-2.5">
          <span className="text-foreground-muted text-[13px] line-through">
            {formatToman(compareAt)} تومان
          </span>
          <span className="bg-sale rounded-full px-2 py-0.5 text-[11px] font-extrabold text-white">
            {toPersianDigits(discountPercent(price, compareAt))}٪ صرفه‌جویی
          </span>
        </p>
      ) : null}
    </div>
  );
}
