import type { Metadata } from 'next';
import { z } from 'zod';

import { Container } from '@/components/atoms';
import { Reveal } from '@/components/molecules';
import { routes } from '@/config/routes';
import { ArticleCard, FeaturedArticle, JournalHero } from '@/features/content';
import { listArticles } from '@/features/content/services/content.api';
import { NewsletterCta } from '@/features/marketing';
import { breadcrumbSchema, itemListSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types';

type BlogSearch = { page?: string };

const searchSchema = z.object({ page: z.coerce.number().int().min(1).max(999).optional() });

export const metadata: Metadata = buildMetadata({
  title: 'مجله تکنورکس؛ راهنمای خرید و نگهداری ابزار',
  description:
    'راهنمای خرید، نگهداری و کاربرد درست ابزار بادی و شارژی صنعتی به زبان ساده؛ نوشته تیم فنی تکنورکس.',
  path: routes.blog,
});

export default async function BlogPage({ searchParams }: PageProps<Record<string, never>, BlogSearch>) {
  const { page = 1 } = searchSchema.parse(await searchParams);
  const result = await listArticles({ page, take: 12 }).catch(() => null);
  const articles = result?.items ?? [];
  const featured = page === 1 ? articles[0] : undefined;
  const rest = featured ? articles.slice(1) : articles;

  const structuredData = [
    breadcrumbSchema([
      { name: 'خانه', path: routes.home },
      { name: 'مجله تکنورکس', path: routes.blog },
    ]),
    itemListSchema(
      'مقالات مجله تکنورکس',
      articles.map((article) => ({ name: article.title, url: routes.blogPost(article.slug) })),
    ),
  ];

  return (
    <article className="bg-surface-muted">
      <script
        type="application/ld+json"
        // Static, server-generated structured data — XSS-safe.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <JournalHero />
      {featured ? <FeaturedArticle article={featured} /> : null}
      <Container className="pb-24">
        {articles.length === 0 ? (
          <p className="text-foreground-muted py-16 text-center text-sm">
            هنوز مقاله‌ای منتشر نشده است.
          </p>
        ) : (
          <Reveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </Reveal>
        )}
      </Container>
      <NewsletterCta />
    </article>
  );
}
