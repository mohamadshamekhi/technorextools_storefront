import type { Metadata } from 'next';

import { Heading, Text } from '@/components/atoms';
import { Card, CardTitle } from '@/components/molecules';
import { buildMetadata } from '@/lib/seo';
import { getSession } from '@/lib/session';

export const metadata: Metadata = buildMetadata({ title: 'Dashboard', noindex: true });

export default async function DashboardPage() {
  const user = await getSession();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Heading as="h1" className="text-2xl">
          Welcome{user?.name ? `, ${user.name}` : ''}
        </Heading>
        <Text className="mt-1">Here is what is happening across your workspace.</Text>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {['Active users', 'MRR', 'Open tickets'].map((label) => (
          <Card key={label}>
            <CardTitle>{label}</CardTitle>
            <p className="mt-2 text-3xl font-bold">—</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
