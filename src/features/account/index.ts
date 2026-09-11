/**
 * Customer account area (`/dashboard/*`).
 * Server-only modules are imported directly by path — none are re-exported here.
 */
export { AccountShell } from './components/account-shell';
export { OverviewView } from './components/overview-view';
export { OrdersView } from './components/orders-view';
export { OrderDetailView } from './components/order-detail-view';
export { AddressesView } from './components/addresses-view';
export { AccountView } from './components/account-view';
export { WishlistView } from './components/wishlist-view';
export { NotificationsView } from './components/notifications-view';
export { RetryPaymentButton } from './components/retry-payment-button';
export { ORDER_STATUS_META } from './data/orders';
export type { OrderDetail, OrderStatus } from './types';
