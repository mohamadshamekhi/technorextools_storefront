import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import type { RepairRequest } from '@/features/repairs';

import { PageHeading } from './page-heading';
import { RepairCard } from './repair-card';

/** `/dashboard/repairs` — every repair request the signed-in customer has filed, newest first. */
export function RepairsView({ repairs }: { repairs: RepairRequest[] }) {
  return (
    <div>
      <PageHeading
        title="درخواست‌های تعمیر"
        subtitle="وضعیت هر درخواست تعمیر و سابقه پیگیری‌های شما"
        action={
          <Link
            href={routes.repairRequest}
            className="bg-accent-500 text-ink hover:bg-accent-400 focus-visible:ring-brand-500 inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-[13px] font-extrabold transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <Icon name="plus" className="size-4" />
            درخواست تعمیر جدید
          </Link>
        }
      />
      {repairs.length === 0 ? (
        <div className="border-hairline text-foreground-muted flex flex-col items-center gap-3 rounded-2xl border border-dashed px-6 py-14 text-center text-sm leading-7">
          <Icon name="wrench" className="size-7" />
          هنوز درخواست تعمیری ثبت نکرده‌اید.
          <Link
            href={routes.repairRequest}
            className="text-brand-600 font-semibold hover:underline"
          >
            ثبت اولین درخواست تعمیر
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {repairs.map((repair) => (
            <RepairCard key={repair.id} repair={repair} />
          ))}
        </div>
      )}
    </div>
  );
}
