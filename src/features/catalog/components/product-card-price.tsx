import { formatToman } from '@/lib/persian';

type ProductCardPriceProps = {
  price: number;
  compareAt: number | null;
};

/** Selling price, with the struck-through list price above it when discounted. */
export function ProductCardPrice({ price, compareAt }: ProductCardPriceProps) {
  return (
    <div className="flex min-w-0 flex-col">
      {compareAt ? (
        <span className="text-foreground-muted decoration-sale/60 text-[12px] tabular-nums line-through">
          {formatToman(compareAt)}
        </span>
      ) : (
        <span className="text-foreground-muted text-[11px]">قیمت</span>
      )}
      <p className="flex items-baseline gap-1">
        <span className="font-display text-foreground truncate text-[19px] leading-tight font-black tabular-nums">
          {formatToman(price)}
        </span>
        <span className="text-foreground-muted shrink-0 text-[11px] font-semibold">تومان</span>
      </p>
    </div>
  );
}
