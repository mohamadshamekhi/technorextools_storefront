import { toPersianDigits } from '@/lib/persian';

import type { TrendPoint } from '../types';

const GRIDLINES = [100, 75, 50, 25, 0];

/** Six-month purchase-volume bar chart (pure CSS, server-rendered). */
export function PurchaseTrendCard({ points }: { points: TrendPoint[] }) {
  const peak = Math.max(...points.map((point) => point.percent), 0);
  const hasData = peak > 0;

  return (
    <section
      aria-labelledby="trend-heading"
      className="border-hairline bg-surface flex flex-col rounded-2xl border p-5 shadow-(--shadow-soft)"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 id="trend-heading" className="text-[14.5px] font-black">
          روند خرید ۶ ماه اخیر
        </h2>
        <span className="bg-surface-sunken text-foreground-muted rounded-full px-2.5 py-1 text-[11px] font-bold">
          نسبت به پرخریدترین ماه
        </span>
      </div>

      {hasData ? (
        <div className="relative flex-1">
          <div aria-hidden className="absolute inset-0 bottom-7 flex flex-col justify-between">
            {GRIDLINES.map((line) => (
              <span key={line} className="bg-hairline h-px w-full" />
            ))}
          </div>
          <div className="relative flex h-44 items-end gap-2 sm:gap-3">
            {points.map((point) => (
              <div
                key={point.label}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                title={`${point.label}: ${toPersianDigits(point.percent)}٪`}
              >
                <div
                  className={
                    point.percent === peak
                      ? 'from-brand-400 to-brand-600 w-full max-w-10 rounded-t-xl bg-linear-to-t shadow-(--shadow-brand)'
                      : 'from-brand-200/70 to-brand-400/70 w-full max-w-10 rounded-t-xl bg-linear-to-t'
                  }
                  style={{ height: `${Math.max(point.percent, 2)}%` }}
                />
                <span className="text-foreground-muted text-[11px] font-medium">{point.label}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="border-hairline text-foreground-muted flex h-44 items-center justify-center rounded-xl border border-dashed text-center text-[13px]">
          هنوز خریدی در ۶ ماه گذشته ثبت نشده است.
        </p>
      )}
    </section>
  );
}
