import type { IconName } from '@/components/atoms';
import { Icon } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';

/** Carrier + parcel tracking number. Rows the API has not filled yet are omitted. */
export function ShippingInfo({
  carrier,
  trackingNumber,
}: {
  carrier: string | null;
  trackingNumber: string | null;
}) {
  const rows: Array<{ icon: IconName; label: string; value: string }> = [
    ...(carrier ? [{ icon: 'truck' as const, label: 'شرکت پستی', value: carrier }] : []),
    ...(trackingNumber
      ? [
          {
            icon: 'doc' as const,
            label: 'کد رهگیری مرسوله',
            value: toPersianDigits(trackingNumber),
          },
        ]
      : []),
  ];

  if (rows.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {rows.map((row) => (
        <div
          key={row.label}
          className="border-hairline bg-surface flex items-center gap-3 rounded-2xl border p-4"
        >
          <span className="bg-surface-sunken text-brand-600 grid size-10 shrink-0 place-items-center rounded-xl">
            <Icon name={row.icon} className="size-5" />
          </span>
          <div>
            <div className="text-foreground-muted text-xs">{row.label}</div>
            <div className="text-sm font-bold">{row.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
