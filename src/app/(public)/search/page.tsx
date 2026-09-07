import type { Metadata } from 'next';
import { z } from 'zod';

import { Container, Icon } from '@/components/atoms';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types';

export const metadata: Metadata = buildMetadata({
  title: 'جست‌وجو',
  path: '/search',
  noindex: true,
});

const querySchema = z.object({ q: z.string().trim().max(120).optional() });

export default async function SearchPage({
  searchParams,
}: PageProps<Record<string, never>, { q?: string }>) {
  const { q } = querySchema.parse(await searchParams);

  return (
    <Container className="py-20">
      <h1 className="text-2xl font-black">جست‌وجوی محصولات</h1>
      <p className="text-foreground-muted mt-3 flex items-center gap-2 text-sm">
        <Icon name="search" className="size-4" />
        {q ? `نتیجه‌ای برای «${q}» یافت نشد.` : 'عبارت مورد نظر را در نوار جست‌وجوی بالا وارد کنید.'}
      </p>
    </Container>
  );
}
