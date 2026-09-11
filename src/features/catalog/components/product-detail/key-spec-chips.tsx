import type { ProductAttributeValue } from '../../types';

/** A handful of headline specs as compact chips, shown in the buy-box above the full `SpecList`. */
export function KeySpecChips({ specs }: { specs: ProductAttributeValue[] }) {
  if (specs.length === 0) return null;

  return (
    <div className="mt-3.5 flex flex-wrap gap-2">
      {specs.map((spec, index) => (
        <span
          key={`${spec.attributeTitle}-${index}`}
          className="bg-surface-sunken text-foreground-muted flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px]"
        >
          <span className="text-foreground font-bold">
            {spec.value}
            {spec.unit ? ` ${spec.unit}` : ''}
          </span>
          <span aria-hidden="true">·</span>
          {spec.attributeTitle}
        </span>
      ))}
    </div>
  );
}
