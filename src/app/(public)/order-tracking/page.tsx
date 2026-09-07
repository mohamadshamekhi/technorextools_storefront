import type { Metadata } from 'next';

import { OrderTrackingView } from '@/features/order-tracking';
import { breadcrumbSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'پیگیری سفارش',
  description:
    'وضعیت ارسال سفارش خود را با وارد کردن کد سفارش و شماره موبایل به‌صورت لحظه‌ای دنبال کنید.',
  path: '/order-tracking',
});

export default function OrderTrackingPage() {
  const schema = breadcrumbSchema([
    { name: 'خانه', path: '/' },
    { name: 'پیگیری سفارش', path: '/order-tracking' },
  ]);

  return (
    <div className="bg-surface-muted min-h-[70vh]">
      <script
        type="application/ld+json"
        // Static, server-generated structured data — XSS-safe.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <OrderTrackingView />
    </div>
  );
}
