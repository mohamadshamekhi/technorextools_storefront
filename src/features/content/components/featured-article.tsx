import Link from 'next/link';

import { Container, Icon, MediaPlaceholder } from '@/components/atoms';
import { routes } from '@/config/routes';

import type { ArticleCardData } from '../types';
import { formatJalaliDate } from '../utils/date';

/** The most recent article, pinned above the index grid. */
export function FeaturedArticle({ article }: { article: ArticleCardData }) {
  return (
    <section className="pt-10">
      <Container>
        <Link
          href={routes.blogPost(article.slug)}
          className="border-hairline bg-surface group relative grid overflow-hidden rounded-3xl border transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:shadow-2xl lg:grid-cols-[1.1fr_1fr]"
        >
          <span className="bg-ink/85 absolute top-4 start-4 z-2 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11.5px] font-bold text-white">
            <span className="bg-accent-500 inline-block size-1.5 animate-pulse rounded-full" />
            تازه‌ترین مقاله
          </span>
          <MediaPlaceholder label="تصویر شاخص مقاله" className="min-h-56 rounded-none lg:rounded-s-3xl" />
          <div className="flex flex-col justify-center p-8 lg:p-9">
            <h2 className="mb-3.5 text-2xl leading-[1.5] font-black text-balance">{article.title}</h2>
            {article.excerpt ? (
              <p className="text-foreground-muted mb-5 text-sm leading-loose">{article.excerpt}</p>
            ) : null}
            <div className="text-foreground-muted flex items-center gap-3 text-[12.5px]">
              <span>تیم فنی پوما ایر</span>
              <span aria-hidden>·</span>
              <span>{formatJalaliDate(article.publishedAt)}</span>
            </div>
            <span className="text-brand-600 mt-5 inline-flex items-center gap-2 text-[13.5px] font-bold">
              ادامه مطلب
              <Icon name="chevronEnd" className="size-4" />
            </span>
          </div>
        </Link>
      </Container>
    </section>
  );
}
