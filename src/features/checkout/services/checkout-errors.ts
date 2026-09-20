import { checkoutConflictSchema, type CheckoutConflict } from './checkout.schemas';

/**
 * `abzar/api` answers `POST /storefront/checkout` with `409` when the customer's own request is
 * still running (`checkout_in_progress`) or an unpaid order already holds the cart
 * (`pending_order_exists`). Neither is a failure: the UI waits or points at that order.
 */
export class CheckoutConflictError extends Error {
  constructor(
    readonly conflict: CheckoutConflict,
    message = 'درخواست ثبت سفارش شما در حال پردازش است',
  ) {
    super(message);
    this.name = 'CheckoutConflictError';
  }
}

/** Reads the `409` envelope's `details`; falls back to the in-progress case when it's missing. */
export function toCheckoutConflict(details: unknown): CheckoutConflict {
  const parsed = checkoutConflictSchema.safeParse(details);
  return parsed.success ? parsed.data : { code: 'checkout_in_progress', orderNumber: null };
}
