import { discountPercent, formatToman, toPersianDigits } from '../../utils/persian';

type ProductPriceProps = {
  price: number;
  compareAt: number | null;
};

export function ProductPrice({ price, compareAt }: ProductPriceProps) {
  return (
    <div>
      {compareAt ? (
        <div className="mb-1 flex items-center gap-2">
          <span className="bg-sale rounded-full px-2 py-0.5 text-[11px] font-extrabold text-white">
            {toPersianDigits(discountPercent(price, compareAt))}٪
          </span>
          <span className="text-foreground-muted text-[12px] line-through">
            {formatToman(compareAt)}
          </span>
        </div>
      ) : null}
      <p className="flex items-baseline gap-1.5">
        <span className="font-display text-xl font-bold">{formatToman(price)}</span>
        <span className="text-foreground-muted text-[12px]">تومان</span>
      </p>
    </div>
  );
}
