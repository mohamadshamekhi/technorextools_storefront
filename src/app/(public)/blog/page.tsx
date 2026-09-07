import type { Metadata } from 'next';

import { Container } from '@/components/atoms';
import { Reveal } from '@/components/molecules';
import { routes } from '@/config/routes';
import {
  FEATURED_SLUG,
  JOURNAL_ARTICLES,
  NewsletterCta,
  journalParamsSchema,
  toJournalList,
} from '@/features/marketing';
import {
  FeaturedArticle,
  JournalList,
  TrendingStrip,
} from '@/features/marketing/components/journal-page/journal-sections';
import { JournalHero } from '@/features/marketing/components/journal-page/journal-hero';
import { breadcrumbSchema, itemListSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types';

type BlogSearch = Record<string, string | string[] | undefined>;

function parse(searchParams: BlogSearch) {
  const result = journalParamsSchema.safeParse(searchParams);
  return result.success ? result.data : {};
}

export async function generateMetadata({
  searchParams,
}: PageProps<Record<string, never>, BlogSearch>): Promise<Metadata> {
  const { cat } = parse(await searchParams);
  return buildMetadata({
    title: cat ? 'مجله پوما ایر — مقالات انتخاب‌شده' : 'مجله پوما ایر؛ راهنمای خرید و نگهداری ابزار',
    description:
      'راهنمای خرید، نگهداری و کاربرد درست ابزار بادی و شارژی صنعتی به زبان ساده؛ نوشته تیم فنی پوما ایر.',
    path: routes.blog,
    // Filtered views are thin duplicates — keep only the canonical index in Google.
    noindex: Boolean(cat),
  });
}

export default async function BlogPage({ searchParams }: PageProps<Record<string, never>, BlogSearch>) {
  const { cat } = parse(await searchParams);
  const articles = toJournalList(cat);
  const featured =
    JOURNAL_ARTICLES.find((article) => article.slug === FEATURED_SLUG) ?? JOURNAL_ARTICLES[0]!;

  const structuredData = [
    breadcrumbSchema([
      { name: 'خانه', path: routes.home },
      { name: 'مجله پوما', path: routes.blog },
    ]),
    itemListSchema(
      'مقالات مجله پوما ایر',
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
      <JournalHero activeCategory={cat} />
      <div className="mt-9">
        <TrendingStrip />
      </div>
      <FeaturedArticle article={featured} />
      <Container className="pb-24">
        <Reveal className="mt-10">
          <JournalList articles={articles} />
        </Reveal>
      </Container>
      <NewsletterCta />
    </article>
  );
}
