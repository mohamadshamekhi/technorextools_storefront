import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { formatJalaliDate } from '@/features/content';
import type { RepairRequest } from '@/features/repairs';

import { REPAIR_STATUS_HINT, REPAIR_STATUS_META } from '../data/repairs';
import { RepairStatusBadge } from './repair-status-badge';
import { PageHeading } from './page-heading';
import { RepairAttachments } from './repair-attachments';
import { RepairDecision } from './repair-decision';
import { RepairStatusTimeline } from './repair-status-timeline';
import { RepairVerdict } from './repair-verdict';

/** `/dashboard/repairs/[id]` — status, what happens next, and what the customer sent us. */
export function RepairDetailView({ repair }: { repair: RepairRequest }) {
  const meta = REPAIR_STATUS_META[repair.status];

  return (
    <div className="flex flex-col gap-4">
      <PageHeading
        title="جزئیات درخواست تعمیر"
        subtitle={`ثبت‌شده در ${formatJalaliDate(repair.createdAt)}`}
        action={
          <Link
            href={routes.dashboard.repairs}
            className="text-foreground-muted hover:text-foreground inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold"
          >
            <Icon name="arrowStart" className="size-4" />
            بازگشت به لیست
          </Link>
        }
      />

      <section
        className="rounded-2xl p-5 shadow-sm"
        style={{ backgroundColor: meta.tint }}
        aria-live="polite"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <RepairStatusBadge status={repair.status} label={repair.statusLabel} onTint />
          <span className="text-[11.5px] font-semibold" style={{ color: meta.ink }}>
            آخرین به‌روزرسانی: {formatJalaliDate(repair.updatedAt)}
          </span>
        </div>
        <p className="mt-3 text-[13px] leading-7" style={{ color: meta.ink }}>
          {REPAIR_STATUS_HINT[repair.status]}
        </p>
      </section>

      {repair.statusHistory.length > 0 ? (
        <section className="border-hairline bg-surface rounded-2xl border p-5 shadow-sm">
          <h2 className="mb-4 text-[13.5px] font-bold">روند پیگیری</h2>
          <RepairStatusTimeline history={repair.statusHistory} />
        </section>
      ) : null}

      <RepairVerdict technicianNote={repair.technicianNote} estimatedCost={repair.estimatedCost} />

      <RepairDecision repair={repair} />

      <section className="border-hairline bg-surface rounded-2xl border p-4 shadow-sm">
        <h2 className="text-[13.5px] font-bold">شرح مشکل</h2>
        <p className="text-foreground-muted mt-2 text-[13px] leading-7 whitespace-pre-line">
          {repair.issueDescription}
        </p>
        {repair.warrantySerial ? (
          <p className="text-foreground-muted border-hairline mt-3 border-t pt-3 text-[12px]">
            سریال گارانتی: <bdi className="font-display">{repair.warrantySerial}</bdi>
          </p>
        ) : null}
      </section>

      <RepairAttachments attachments={repair.attachments} />

      <p className="text-foreground-muted text-center text-[12px] leading-7">
        سوالی درباره این درخواست دارید؟ با پشتیبانی تماس بگیرید:{' '}
        <a href={`tel:${siteConfig.phoneHref}`} className="text-brand-600 font-semibold">
          <bdi className="font-display">{siteConfig.phone}</bdi>
        </a>
      </p>
    </div>
  );
}
