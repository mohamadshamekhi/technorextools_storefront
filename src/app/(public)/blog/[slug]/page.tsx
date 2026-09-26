import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Container, Icon, MediaPlaceholder } from '@/components/atoms';
import { Reveal } from '@/components/molecules';
import { routes } from '@/config/routes';
import { ArticleBody, firstImageFromHtml, formatJalaliDate } from '@/features/content';
import { getArticle, listArticles } from '@/features/content/services/content.api';
import { ApiError } from '@/lib/api-client';
import { articleSchema, breadcrumbSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types';

const AUTHOR_NAME = 'تیم فنی تکنورکس';

export const dynamicParams = true;

export async function generateStaticParams() {
  const result = await listArticles({ take: 100 }).catch(() => null);
  return (result?.items ?? []).map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<{ slug: string }>): Promise<Metadata> {
  try {
    const article = await getArticle((await params).slug);
    return buildMetadata({
      title: article.title,
      description: article.excerpt ?? article.title,
      path: routes.blogPost(article.slug),
    });
  } catch {
    return buildMetadata({ title: 'مقاله یافت نشد', noindex: true });
  }
}

export default async function ArticlePage({ params }: PageProps<{ slug: string }>) {
  const { slug } = await params;

  let article;
  try {
    article = await getArticle(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const structuredData = [
    breadcrumbSchema([
      { name: 'خانه', path: routes.home },
      { name: 'مجله تکنورکس', path: routes.blog },
      { name: article.title, path: routes.blogPost(article.slug) },
    ]),
    articleSchema({
      title: article.title,
      description: article.excerpt ?? article.title,
      path: routes.blogPost(article.slug),
      publishedAt: article.publishedAt ?? new Date().toISOString(),
    }),
  ];

  return (
    <article className="bg-surface-muted pb-24">
      <script
        type="application/ld+json"
        // Static, server-generated structured data — XSS-safe.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Container className="max-w-3xl pt-14">
        <nav aria-label="مسیر صفحه" className="mb-6 flex items-center gap-1.5 text-[13px]">
          <Link href={routes.home} className="text-foreground-muted hover:text-brand-600">
            خانه
          </Link>
          <Icon name="chevronEnd" className="text-foreground-muted size-3.5" />
          <Link href={routes.blog} className="text-foreground-muted hover:text-brand-600">
            مجله تکنورکس
          </Link>
        </nav>
        <h1 className="mb-4 text-3xl leading-[1.5] font-black tracking-tight text-balance">
          {article.title}
        </h1>
        <div className="text-foreground-muted mb-8 flex flex-wrap items-center gap-2.5 text-[13px]">
          <span className="text-foreground font-bold">{AUTHOR_NAME}</span>
          <span aria-hidden>·</span>
          <span>{formatJalaliDate(article.publishedAt)}</span>
        </div>
      </Container>

      <Container className="max-w-4xl">
        <Reveal>
          <MediaPlaceholder
            label={article.title}
            src={article.coverImage ?? firstImageFromHtml(article.body) ?? undefined}
            fit="cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
            className="border-hairline aspect-[16/9] rounded-3xl border"
          />
        </Reveal>
      </Container>

      <Container className="max-w-3xl pt-10">
        <Reveal>
          <ArticleBody html={article.body} />
        </Reveal>
      </Container>
    </article>
  );
}
