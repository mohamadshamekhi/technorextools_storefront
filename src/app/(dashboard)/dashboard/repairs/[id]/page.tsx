import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { routes } from '@/config/routes';
import { RepairDetailView } from '@/features/account';
import { repairsApi } from '@/features/account/services/repairs.api';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'جزئیات درخواست تعمیر',
  path: routes.dashboard.repairs,
  noindex: true,
});

export default async function RepairDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const repair = await repairsApi.detail(id).catch((error: unknown) => {
    console.error('[repairs] detail failed', error);
    return null;
  });
  if (!repair) notFound();

  return <RepairDetailView repair={repair} />;
}
