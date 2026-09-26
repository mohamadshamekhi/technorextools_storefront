import type { SpecRow } from '../../../types/pdp';

/**
 * Spec sheet as a hairline grid of label/value tiles — reads far better than a
 * two-column zebra table when values are short codes. Dividers come from
 * `gap-px` over a hairline-coloured container.
 */
export function SpecsTable({ rows }: { rows: SpecRow[] }) {
  if (rows.length === 0) return null;
  const filler = rows.length % 2 === 1;

  return (
    <dl className="bg-hairline ring-hairline grid gap-px overflow-hidden rounded-2xl ring-1 sm:grid-cols-2">
      {rows.map((row) => (
        <div
          key={row.label}
          className="bg-surface hover:bg-brand-50/60 group flex items-center justify-between gap-4 px-4 py-4 transition-colors sm:px-5"
        >
          <dt className="text-foreground-muted flex items-center gap-2 text-[13px]">
            <span
              aria-hidden
              className="bg-hairline group-hover:bg-brand-400 h-4 w-0.5 rounded-full transition-colors"
            />
            {row.label}
          </dt>
          <dd className="text-foreground text-end text-[14.5px] font-black" dir="auto">
            {row.value}
          </dd>
        </div>
      ))}
      {filler ? <div className="bg-surface hidden sm:block" aria-hidden /> : null}
    </dl>
  );
}
