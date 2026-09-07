type Option = { value: number; label: string };

type FilterRadioGroupProps = {
  name: string;
  options: Option[];
  value: number;
  onChange: (value: number) => void;
};

export function FilterRadioGroup({ name, options, value, onChange }: FilterRadioGroupProps) {
  return (
    <div className="flex flex-col gap-1">
      {options.map((option) => (
        <label
          key={option.value}
          className="text-foreground-muted flex cursor-pointer items-center gap-2.5 py-1 text-[13.5px]"
        >
          <input
            type="radio"
            name={name}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="accent-brand-500 size-4 cursor-pointer"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
