import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

/** Confirmation shown in place of the form after a successful submit. */
export function RepairSent() {
  return (
    <div className="border-hairline bg-surface rounded-card border p-10 text-center shadow-(--shadow-lift)">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-[oklch(0.95_0.04_155)] text-[oklch(0.45_0.13_155)]">
        <Icon name="check" className="size-8" />
      </span>
      <h2 className="mt-5 text-lg font-black">درخواست تعمیر ثبت شد</h2>
      <p className="text-foreground-muted mt-2 text-sm leading-loose">
        کارشناس فنی پس از بررسی با شما تماس می‌گیرد. وضعیت درخواست را می‌توانید در حساب کاربری دنبال
        کنید.
      </p>
      <Link
        href={routes.dashboard.root}
        className="text-brand-700 bg-brand-50 ring-brand-100 mt-5 inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold ring-1"
      >
        <Icon name="user" className="size-4" />
        رفتن به حساب کاربری
      </Link>
    </div>
  );
}
