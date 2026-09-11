import type { OrderDetail } from '@/features/account';

import { CashPendingStep } from './cash-pending-step';
import { FailedStep } from './failed-step';
import { PendingConfirmationStep } from './pending-confirmation-step';
import { SuccessStep } from './success-step';

const SETTLED_STATUSES: OrderDetail['status'][] = ['paid', 'processing', 'shipped', 'delivered'];
const FAILED_STATUSES: OrderDetail['status'][] = ['payment_failed', 'abandoned', 'cancelled'];

/** `/checkout/result` — the gateway's return page. Trusts `order.status` (fetched fresh from
 * `abzar/api`, owner-scoped) rather than the `status` query param the gateway appended, which
 * is only a redirect hint and never verified. */
export function CheckoutResultView({ order }: { order: OrderDetail }) {
  if (SETTLED_STATUSES.includes(order.status)) return <SuccessStep order={order} />;
  if (order.status === 'pending_payment' && order.paymentMethod === 'cash') {
    return <CashPendingStep order={order} />;
  }
  if (FAILED_STATUSES.includes(order.status)) return <FailedStep order={order} />;
  return <PendingConfirmationStep order={order} />;
}
