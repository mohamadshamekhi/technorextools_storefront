import Link from 'next/link';

import { routes } from '@/config/routes';
import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import type { ExplodedPart } from '../../../types/pdp';

type PartsTableProps = {
  parts: ExplodedPart[];
  active?: number | null;
  onActive?: (part: number | null) => void;
  onPin?: (part: number) => void;
};

/** Real text table — the diagram's accessible equivalent. Rows sync two-way with the SVG. */
export function PartsTable({ parts, active = null, onActive, onPin }: PartsTableProps) {
  return (
    <table className="w-full text-sm">
      <caption className="sr-only">فهرست قطعات نمای انفجاری</caption>
      <thead className="text-foreground-muted text-xs">
        <tr>
          <th scope="col" className="w-10 py-2 text-start font-semibold">
            #
          </th>
          <th scope="col" className="py-2 text-start font-semibold">
            نام قطعه
          </th>
          <th scope="col" className="py-2 text-start font-semibold">
            کد قطعه
          </th>
          <th scope="col" className="py-2 text-end font-semibold">
            <span className="sr-only">سفارش</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {parts.map((part) => (
          <tr
            key={part.number}
            onPointerEnter={onActive && (() => onActive(part.number))}
            onPointerLeave={onActive && (() => onActive(null))}
            onClick={onPin && (() => onPin(part.number))}
            className={cn(
              'border-hairline hover:bg-surface-muted border-t transition-colors duration-150',
              onPin && 'cursor-pointer',
              active === part.number && 'bg-brand-50',
            )}
          >
            <td className="py-2.5">
              <span className="bg-accent-500 text-ink grid size-6 place-items-center rounded-full text-xs font-bold">
                {toPersianDigits(part.number)}
              </span>
            </td>
            <th scope="row" className="py-2.5 text-start font-semibold">
              {part.name}
            </th>
            <td className="font-display text-foreground-muted py-2.5">
              <bdi>{part.code}</bdi>
            </td>
            <td className="py-2.5 text-end">
              {part.sellable ? (
                <Link
                  href={`${routes.search}?q=${encodeURIComponent(part.code)}`}
                  className="text-brand-600 focus-visible:ring-brand-500 inline-flex min-h-11 items-center rounded-lg px-1 text-xs font-semibold hover:underline focus-visible:ring-2 focus-visible:outline-none"
                >
                  سفارش قطعه
                </Link>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
