import type { SpecRow } from '../../../types/pdp';

export function SpecsTable({ rows }: { rows: SpecRow[] }) {
  if (rows.length === 0) return null;
  return (
    <div className="border-hairline overflow-hidden rounded-2xl border">
      <table className="w-full text-sm">
        <caption className="sr-only">مشخصات فنی</caption>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="even:bg-surface-muted">
              <th
                scope="row"
                className="text-foreground-muted w-2/5 px-4 py-3 text-start font-semibold"
              >
                {row.label}
              </th>
              <td className="text-foreground px-4 py-3 font-semibold">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
