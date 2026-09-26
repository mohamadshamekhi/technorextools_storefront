import type { RepairRequest } from '@/features/repairs';
import { formatToman } from '@/lib/persian';

/** Technician's review result — hidden until the backoffice records either field. */
export function RepairVerdict({
  technicianNote,
  estimatedCost,
}: Pick<RepairRequest, 'technicianNote' | 'estimatedCost'>) {
  if (!technicianNote && estimatedCost === null) return null;

  return (
    <section className="border-hairline bg-surface rounded-2xl border p-4 shadow-sm">
      <h2 className="text-[13.5px] font-bold">نتیجه بررسی کارشناس</h2>
      {technicianNote ? (
        <p className="text-foreground-muted mt-2 text-[13px] leading-7 whitespace-pre-line">
          {technicianNote}
        </p>
      ) : null}
      {estimatedCost !== null ? (
        <p className="border-hairline mt-3 border-t pt-3 text-[13px]">
          هزینه تخمینی تعمیر:{' '}
          <span className="font-display font-bold">{formatToman(estimatedCost)}</span> تومان
          <span className="text-foreground-muted mr-1 text-[11.5px]">
            (تخمینی؛ مبلغ نهایی پس از تعمیر اعلام می‌شود)
          </span>
        </p>
      ) : null}
    </section>
  );
}
