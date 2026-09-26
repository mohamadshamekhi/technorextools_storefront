import Link from 'next/link';

import { Icon, type IconName } from '@/components/atoms';
import { routes } from '@/config/routes';

const ACTIONS: Array<{ href: string; label: string; hint: string; icon: IconName }> = [
  {
    href: routes.dashboard.orders,
    label: 'پیگیری سفارش‌ها',
    hint: 'وضعیت و جزئیات ارسال',
    icon: 'truck',
  },
  {
    href: routes.dashboard.addresses,
    label: 'آدرس‌های من',
    hint: 'افزودن یا ویرایش نشانی',
    icon: 'pin',
  },
  {
    href: routes.dashboard.wishlist,
    label: 'علاقه‌مندی‌ها',
    hint: 'محصولات ذخیره‌شده',
    icon: 'heart',
  },
  { href: routes.products, label: 'ادامه خرید', hint: 'کاتالوگ ابزار', icon: 'cart' },
];

/** Side rail on the overview: the four things customers come back to do. */
export function QuickActionsCard() {
  return (
    <section
      aria-labelledby="quick-actions-heading"
      className="border-hairline bg-surface rounded-2xl border p-5 shadow-(--shadow-soft)"
    >
      <h2 id="quick-actions-heading" className="mb-4 text-[14.5px] font-black">
        دسترسی سریع
      </h2>
      <ul className="flex flex-col gap-1.5">
        {ACTIONS.map((action) => (
          <li key={action.href}>
            <Link
              href={action.href}
              className="hover:bg-surface-sunken focus-visible:ring-brand-500 group flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <span className="bg-brand-50 text-brand-600 group-hover:bg-brand-100 grid size-9 shrink-0 place-items-center rounded-xl transition-colors">
                <Icon name={action.icon} className="size-[18px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-bold">{action.label}</span>
                <span className="text-foreground-muted block text-[11.5px]">{action.hint}</span>
              </span>
              <Icon name="chevronEnd" className="text-foreground-muted size-4 shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
