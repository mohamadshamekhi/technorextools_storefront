import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Container, Icon, MediaPlaceholder } from '@/components/atoms';
import { Reveal } from '@/components/molecules';
import { routes } from '@/config/routes';
import { AUTHOR_NAME, JOURNAL_ARTICLES } from '@/features/marketing/data/journal';
import { ARTICLE_BODIES } from '@/features/marketing/data/journal-bodies';
import { ArticleBody } from '@/features/marketing/components/journal-page/article-body';
import { categoryOf } from '@/features/marketing/components/journal-page/journal-sections';
import { findArticle, relatedArticles } from '@/features/marketing/utils/journal-detail';
import { breadcrumbSchema, articleSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types';

export function generateStaticParams() {
  return JOURNAL_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<{ slug: string }>): Promise<Metadata> {
  const article = findArticle((await params).slug);
  if (!article) return {};

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: routes.blogPost(article.slug),
  });
}

export default async function ArticlePage({ params }: PageProps<{ slug: string }>) {
  const { slug } = await params;
  const article = findArticle(slug);
  const blocks = ARTICLE_BODIES[slug];
  if (!article || !blocks) notFound();

  const category = categoryOf(article);
  const related = relatedArticles(article, 3);
  const structuredData = [
    breadcrumbSchema([
      { name: 'خانه', path: routes.home },
      { name: 'مجله پوما', path: routes.blog },
      { name: article.title, path: routes.blogPost(article.slug) },
    ]),
    articleSchema({
      title: article.title,
      description: article.excerpt,
      path: routes.blogPost(article.slug),
      publishedAt: article.date,
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
            مجله پوما
          </Link>
          <Icon name="chevronEnd" className="text-foreground-muted size-3.5" />
          <span className="text-brand-600 font-bold">{category.label}</span>
        </nav>

        <span
          className={`${category.chip} ${category.ink} mb-4 inline-block rounded-full px-3 py-1 text-[11.5px] font-extrabold`}
        >
          {category.label}
        </span>
        <h1 className="mb-4 text-3xl leading-[1.5] font-black tracking-tight text-balance">
          {article.title}
        </h1>
        <div className="text-foreground-muted mb-8 flex flex-wrap items-center gap-2.5 text-[13px]">
          <span className="font-bold text-foreground">{AUTHOR_NAME}</span>
          <span aria-hidden>·</span>
          <span>{article.date}</span>
          <span aria-hidden>·</span>
          <span>{article.readTime} دقیقه مطالعه</span>
        </div>
      </Container>

      <Container className="max-w-4xl">
        <Reveal>
          <MediaPlaceholder
            label="تصویر شاخص مقاله"
            className="border-hairline aspect-[16/9] rounded-3xl border"
          />
        </Reveal>
      </Container>

      <Container className="max-w-3xl pt-10">
        <Reveal>
          <ArticleBody blocks={blocks} />
        </Reveal>
      </Container>

      {related.length > 0 ? (
        <Container className="max-w-4xl pt-16">
          <h2 className="mb-6 text-xl font-black tracking-tight">مقالات مرتبط</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={routes.blogPost(item.slug)}
                className="border-hairline bg-surface rounded-card hover:border-brand-400/50 flex flex-col gap-2 border p-4 transition-colors"
              >
                <span className={`${categoryOf(item).ink} text-[11px] font-extrabold`}>
                  {categoryOf(item).label}
                </span>
                <span className="text-sm leading-relaxed font-bold text-balance">{item.title}</span>
              </Link>
            ))}
          </div>
        </Container>
      ) : null}
    </article>
  );
}
