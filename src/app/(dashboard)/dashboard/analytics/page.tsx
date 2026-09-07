import type { Metadata } from 'next';

import { Heading } from '@/components/atoms';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({ title: 'Analytics', noindex: true });

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Heading as="h1" className="text-2xl">
        Analytics
      </Heading>
      {/* Feature slice: src/features/dashboard-analytics */}
    </div>
  );
}
