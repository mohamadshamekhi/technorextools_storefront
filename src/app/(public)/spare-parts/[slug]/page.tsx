import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Container } from '@/components/atoms';
import { routes } from '@/config/routes';
import { SparePartDetailView } from '@/features/spare-parts';
import { getSparePart } from '@/features/spare-parts/services/spare-parts.api';
import { ApiError } from '@/lib/api-client';
import { breadcrumbSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types';

type Params = { slug: string };

export async function generateMetadata({ params }: PageProps<Params>): Promise<Metadata> {
  const { slug } = await params;
  try {
    const part = await getSparePart(slug);
    return buildMetadata({
      title: `${part.title} | قطعه یدکی`,
      description: part.shortDesc ?? part.title,
      path: routes.sparePart(slug),
    });
  } catch {
    return buildMetadata({ title: 'قطعه یافت نشد', noindex: true });
  }
}

export default async function SparePartPage({ params }: PageProps<Params>) {
  const { slug } = await params;
  let part;
  try {
    part = await getSparePart(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
  const structuredData = breadcrumbSchema([
    { name: 'خانه', path: routes.home },
    { name: 'قطعات یدکی', path: routes.spareParts },
    { name: part.title, path: routes.sparePart(slug) },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // Static, server-generated structured data — XSS-safe.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Container className="py-10">
        <SparePartDetailView part={part} />
      </Container>
    </>
  );
}
