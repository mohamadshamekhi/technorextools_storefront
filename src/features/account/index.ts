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
export { RepairsView } from './components/repairs-view';
export { RepairDetailView } from './components/repair-detail-view';
export { WishlistView } from './components/wishlist-view';
export { WishlistButton } from './components/wishlist-button';
export { useWishlist, useAddWishlistItem, useRemoveWishlistItem } from './hooks/use-wishlist';
export { NotificationsView } from './components/notifications-view';
export {
  useNotifications,
  useUnreadNotificationsCount,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from './hooks/use-notifications';
export { RetryPaymentButton } from './components/retry-payment-button';
export { useUpdateProfile } from './hooks/use-update-profile';
export { useRetryPayment } from './hooks/use-retry-payment';
export { ORDER_STATUS_META } from './data/orders';
export { REPAIR_STATUS_META } from './data/repairs';
export type { OrderDetail, OrderStatus } from './types';
