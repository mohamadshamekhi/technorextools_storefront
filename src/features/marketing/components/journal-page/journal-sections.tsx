import Link from 'next/link';

import { Container, Icon, MediaPlaceholder } from '@/components/atoms';
import { Marquee } from '@/components/molecules';
import { routes } from '@/config/routes';

import { JOURNAL_CATEGORIES, JOURNAL_TRENDING } from '../../data/journal-taxonomy';
import type { JournalArticle, JournalCategory } from '../../types';

/** Find the category record for an article (falls back to guides). */
export function categoryOf(article: JournalArticle): JournalCategory {
  return (
    JOURNAL_CATEGORIES.find((category) => category.slug === article.categorySlug) ??
    JOURNAL_CATEGORIES[0]!
  );
}

/** Fire-badge strip with the trending topics looping seamlessly. */
export function TrendingStrip() {
  return (
    <section className="border-hairline bg-surface overflow-hidden border-y py-6">
      <Container className="mb-3.5 flex items-center gap-2.5">
        <span className="grid size-[30px] place-items-center rounded-[10px] bg-[oklch(0.95_0.05_25)]">
          <Icon name="fire" className="text-sale size-[15px]" />
        </span>
        <span className="text-[14.5px] font-extrabold">پرطرفدارترین موضوعات</span>
      </Container>
      <Marquee label="پرطرفدارترین موضوعات مجله" speed="slow">
        {JOURNAL_TRENDING.map((topic) => (
          <span
            key={topic.rank}
            className="flex items-center gap-2.5 border-hairline border-s px-5.5 whitespace-nowrap"
          >
            <span className="font-display text-brand-600 text-[13px] font-bold">#{topic.rank}</span>
            <span className="text-foreground-muted text-[13px]">{topic.title}</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/** The pinned weekly editor's pick. */
export function FeaturedArticle({ article }: { article: JournalArticle }) {
  const category = categoryOf(article);

  return (
    <section className="pt-10">
      <Container>
        <Link
          href={routes.blogPost(article.slug)}
          className="border-hairline bg-surface group relative grid overflow-hidden rounded-3xl border transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:shadow-2xl lg:grid-cols-[1.1fr_1fr]"
        >
          <span className="absolute top-4 left-4 z-2 flex items-center gap-1.5 rounded-full bg-ink/85 px-3.5 py-1.5 text-[11.5px] font-bold text-white">
            <span className="accent-500 inline-block size-1.5 animate-pulse rounded-full bg-accent-500" />
            پرمخاطب‌ترین این هفته
          </span>
          <MediaPlaceholder
            label="تصویر شاخص مقاله"
            className="min-h-56 rounded-none lg:rounded-s-3xl"
          />
          <div className="flex flex-col justify-center p-8 lg:p-9">
            <span
              className={`${category.chip} ${category.ink} mb-4 w-fit rounded-full px-3 py-1 text-[11.5px] font-extrabold`}
            >
              مقاله ویژه · {category.label}
            </span>
            <h2 className="mb-3.5 text-2xl leading-[1.5] font-black text-balance">{article.title}</h2>
            <p className="text-foreground-muted mb-5 text-sm leading-loose">{article.excerpt}</p>
            <div className="text-foreground-muted flex items-center gap-3 text-[12.5px]">
              <span>تیم فنی پوما ایر</span>
              <span aria-hidden>·</span>
              <span>{article.date}</span>
              <span aria-hidden>·</span>
              <span>{article.readTime} دقیقه مطالعه</span>
            </div>
            <span className="text-brand-600 mt-5 inline-flex items-center gap-2 text-[13.5px] font-bold">
              ادامه مطلب
              <Icon name="chevronEnd" className="size-4 transition-transform group-hover:-translate-x-1" />
            </span>
          </div>
        </Link>
      </Container>
    </section>
  );
}

/** Grid card for a standard journal article. */
export function JournalArticleCard({ article }: { article: JournalArticle }) {
  const category = categoryOf(article);

  return (
    <Link
      href={routes.blogPost(article.slug)}
      className="border-hairline bg-surface group flex h-full flex-col overflow-hidden rounded-[1.25rem] border transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-brand-400/45 hover:shadow-2xl"
    >
      <div className="relative">
        <MediaPlaceholder label="عکس مقاله" className="aspect-[16/10] rounded-none text-[12px]" />
        <span className="bg-surface/92 absolute top-3 left-3 grid size-[34px] place-items-center rounded-full">
          <Icon name={category.icon} className={`${category.ink} size-4`} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span
          className={`${category.chip} ${category.ink} mb-3 w-fit rounded-full px-2.5 py-1 text-[11px] font-extrabold`}
        >
          {category.label}
        </span>
        <h3 className="mb-2.5 min-h-[50px] text-[15.5px] leading-[1.6] font-bold text-balance">
          {article.title}
        </h3>
        <p className="text-foreground-muted mb-3.5 text-[13px] leading-relaxed">{article.excerpt}</p>
        <div className="text-foreground-muted mt-auto flex items-center gap-2 text-[12px]">
          <Icon name="clock" className="size-3.5" />
          <span>{article.date}</span>
          <span aria-hidden>·</span>
          <span>{article.readTime} دقیقه مطالعه</span>
        </div>
      </div>
    </Link>
  );
}

/** Journal index grid; the page pre-filters `articles` server-side. */
export function JournalList({ articles }: { articles: JournalArticle[] }) {
  if (articles.length === 0) {
    return (
      <p className="text-foreground-muted py-16 text-center text-sm">
        هنوز مقاله‌ای در این دسته منتشر نشده است.
      </p>
    );
  }

  return (
    <div className="grid gap-5.5 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <JournalArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
