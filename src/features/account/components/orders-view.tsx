import { ORDERS } from '../data/orders';
import { OrderList } from './order-list';
import { PageHeading } from './page-heading';

export function OrdersView() {
  return (
    <div>
      <PageHeading title="همه سفارش‌ها" subtitle="پیگیری وضعیت و تاریخچه سفارش‌های شما" />
      <OrderList orders={ORDERS} />
    </div>
  );
}
