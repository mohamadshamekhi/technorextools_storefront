import type { Order } from '../types';
import { OrderList } from './order-list';
import { PageHeading } from './page-heading';

export function OrdersView({ orders }: { orders: Order[] }) {
  return (
    <div>
      <PageHeading title="همه سفارش‌ها" subtitle="پیگیری وضعیت و تاریخچه سفارش‌های شما" />
      <OrderList orders={orders} />
    </div>
  );
}
