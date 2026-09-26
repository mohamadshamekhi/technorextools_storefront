import type { Metadata } from 'next';

import { routes } from '@/config/routes';
import { RepairsView } from '@/features/account';
import { repairsApi } from '@/features/account/services/repairs.api';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'درخواست‌های تعمیر',
  path: routes.dashboard.repairs,
  noindex: true,
});

export default async function RepairsPage() {
  // A swallowed error here reads as "no repairs" in the UI, so make the real cause visible.
  const result = await repairsApi.list({ take: 50 }).catch((error: unknown) => {
    console.error('[repairs] list failed', error);
    return null;
  });

  return <RepairsView repairs={result?.items ?? []} />;
}
