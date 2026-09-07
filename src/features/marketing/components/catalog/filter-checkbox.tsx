import { toPersianDigits } from '../../utils/persian';

type FilterCheckboxProps = {
  label: string;
  checked: boolean;
  onToggle: () => void;
  /** Optional trailing facet count. */
  count?: number;
};

export function FilterCheckbox({ label, checked, onToggle, count }: FilterCheckboxProps) {
  return (
    <label className="text-foreground-muted flex cursor-pointer items-center justify-between gap-2 py-1 text-[13.5px]">
      <span className="flex items-center gap-2.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="accent-brand-500 size-4 cursor-pointer"
        />
        {label}
      </span>
      {count !== undefined ? (
        <span className="text-foreground-muted/70 text-xs">{toPersianDigits(count)}</span>
      ) : null}
    </label>
  );
}
