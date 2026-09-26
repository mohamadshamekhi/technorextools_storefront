import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { formatJalaliDate } from '@/features/content';
import type { RepairRequest } from '@/features/repairs';

import { RepairStatusBadge } from './repair-status-badge';

/** One row on the repairs list — links out to the request's own detail page. */
export function RepairCard({ repair }: { repair: RepairRequest }) {
  return (
    <Link
      href={routes.dashboard.repairDetail(repair.id)}
      className="border-hairline bg-surface hover:border-brand-500/40 flex items-center gap-3 rounded-2xl border p-4 shadow-sm transition-colors"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <RepairStatusBadge status={repair.status} label={repair.statusLabel} />
          <span className="text-foreground-muted text-[11.5px]">
            ثبت: {formatJalaliDate(repair.createdAt)}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-[13.5px] leading-6">{repair.issueDescription}</p>
        {repair.warrantySerial ? (
          <p className="text-foreground-muted mt-1 text-[11.5px]">
            سریال گارانتی: <bdi className="font-display">{repair.warrantySerial}</bdi>
          </p>
        ) : null}
      </div>
      <Icon name="chevronEnd" className="text-foreground-muted size-4 shrink-0" />
    </Link>
  );
}
