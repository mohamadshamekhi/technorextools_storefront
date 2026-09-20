import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

/** Guest state: the API scopes repairs to the owner, so login comes first. */
export function RepairLoginNotice() {
  return (
    <div className="border-hairline bg-surface rounded-card border p-8 text-center shadow-(--shadow-soft)">
      <span className="bg-surface-sunken text-foreground-muted mx-auto grid size-12 place-items-center rounded-2xl">
        <Icon name="lock" className="size-6" />
      </span>
      <h2 className="mt-4 text-base font-black">برای ثبت درخواست وارد شوید</h2>
      <p className="text-foreground-muted mt-2 text-sm leading-loose">
        درخواست تعمیر به حساب کاربری شما متصل می‌شود تا بتوانید وضعیت آن را دنبال کنید.
      </p>
      <Link
        href={`${routes.auth.login}?next=${encodeURIComponent(routes.repairRequest)}`}
        className="bg-brand-500 mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-(image:--gradient-brand) px-6 text-sm font-bold text-white shadow-(--shadow-brand)"
      >
        <Icon name="user" className="size-4" />
        ورود / ثبت‌نام
      </Link>
    </div>
  );
}
