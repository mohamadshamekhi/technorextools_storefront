import { CATALOG_MAX_PRICE } from '../../types/catalog';
import { formatToman } from '../../utils/persian';

type PriceRangeFilterProps = {
  value: number;
  onChange: (value: number) => void;
};

export function PriceRangeFilter({ value, onChange }: PriceRangeFilterProps) {
  return (
    <div>
      <input
        type="range"
        min={1_000_000}
        max={CATALOG_MAX_PRICE}
        step={500_000}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label="حداکثر قیمت"
        className="accent-brand-500 w-full cursor-pointer"
      />
      <div className="text-foreground-muted mt-2 flex justify-between text-xs">
        <span>تا {formatToman(value)} تومان</span>
        <span>۰</span>
      </div>
    </div>
  );
}
