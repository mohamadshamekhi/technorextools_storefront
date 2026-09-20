import type { TrendPoint } from '../types';

/** Six-month purchase-volume bar chart (pure CSS, server-rendered). */
export function PurchaseTrendCard({ points }: { points: TrendPoint[] }) {
  const peak = Math.max(...points.map((point) => point.percent));
  return (
    <div className="border-hairline bg-surface rounded-2xl border p-5 shadow-sm">
      <p className="mb-4.5 text-[14.5px] font-black">روند خرید ۶ ماه اخیر</p>
      <div className="flex h-32 items-end gap-2.5">
        {points.map((point) => (
          <div
            key={point.label}
            className="flex h-full flex-1 flex-col items-center justify-end gap-2"
          >
            <div
              className="from-brand-500/60 to-brand-500 w-full max-w-9 rounded-t-lg bg-linear-to-t"
              style={{ height: `${point.percent}%`, opacity: point.percent === peak ? 1 : 0.35 }}
            />
            <span className="text-foreground-muted text-[11px]">{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
