import type { ProductAttributeValue } from '../../types';

export function SpecList({ rows }: { rows: ProductAttributeValue[] }) {
  if (rows.length === 0) {
    return <p className="text-foreground-muted text-sm">مشخصات فنی برای این محصول ثبت نشده است.</p>;
  }

  return (
    <dl className="grid max-w-3xl gap-3 sm:grid-cols-2">
      {rows.map((row, index) => (
        <div
          key={`${row.attributeTitle}-${index}`}
          className="border-hairline bg-surface hover:border-brand-500/40 flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-colors"
        >
          <dt className="text-foreground-muted flex-1 text-[13px]">{row.attributeTitle}</dt>
          <dd className="text-sm font-bold">
            {row.value}
            {row.unit ? <span className="text-foreground-muted ms-1 font-normal">{row.unit}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
