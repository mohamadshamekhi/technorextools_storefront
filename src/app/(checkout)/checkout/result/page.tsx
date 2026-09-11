import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { routes } from '@/config/routes';
import { ordersApi } from '@/features/account/services/orders.api';
import { CheckoutResultView } from '@/features/checkout';
import { buildMetadata } from '@/lib/seo';
import { getSession } from '@/lib/session';

export const metadata: Metadata = buildMetadata({
  title: 'نتیجه پرداخت',
  path: routes.checkoutResult,
  noindex: true,
});

/** Only `orderNumber` is load-bearing — the payment gateway also appends its own `status`
 * hint, but that's never trusted (see `CheckoutResultView`). */
const searchParamsSchema = z.object({ orderNumber: z.string().trim().min(1) });

type SearchParams = Record<string, string | string[] | undefined>;

/** Gateway return page for `online` checkout. Authenticated + owner-scoped: re-fetches the
 * real order from `abzar/api` instead of trusting the query string the gateway redirected with. */
export default async function CheckoutResultPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await getSession();
  if (!session) {
    redirect(`${routes.auth.login}?next=${encodeURIComponent(routes.checkoutResult)}`);
  }

  const parsed = searchParamsSchema.safeParse(await searchParams);
  if (!parsed.success) redirect(routes.dashboard.orders);

  const order = await ordersApi.detail(parsed.data.orderNumber).catch(() => null);
  if (!order) redirect(routes.dashboard.orders);

  return <CheckoutResultView order={order} />;
}
