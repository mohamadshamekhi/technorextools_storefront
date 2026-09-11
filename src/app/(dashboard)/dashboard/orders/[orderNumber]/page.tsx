import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { OrderDetailView } from '@/features/account';
import { ordersApi } from '@/features/account/services/orders.api';
import { ApiError } from '@/lib/api-client';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types';

export const metadata: Metadata = buildMetadata({ title: 'جزئیات سفارش', noindex: true });

export default async function OrderDetailPage({ params }: PageProps<{ orderNumber: string }>) {
  const { orderNumber } = await params;

  try {
    const order = await ordersApi.detail(orderNumber);
    return <OrderDetailView order={order} />;
  } catch (error) {
    if (error instanceof ApiError && (error.status === 404 || error.status === 403)) notFound();
    throw error;
  }
}
