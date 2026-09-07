import type { IconName } from '@/components/atoms';
import { Icon } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';

/** Carrier + parcel tracking number, side by side. */
export function ShippingInfo({
  carrier,
  trackingNumber,
}: {
  carrier: string;
  trackingNumber: string;
}) {
  const rows: Array<{ icon: IconName; label: string; value: string }> = [
    { icon: 'truck', label: 'شرکت پستی', value: carrier },
    {
      icon: 'doc',
      label: 'کد رهگیری مرسوله',
      value: `IR${toPersianDigits(trackingNumber)}`,
    },
  ];

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
