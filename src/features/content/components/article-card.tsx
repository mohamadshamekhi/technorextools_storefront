import Link from 'next/link';

import { MediaPlaceholder } from '@/components/atoms';
import { routes } from '@/config/routes';

import type { ArticleCardData } from '../types';
import { formatJalaliDate } from '../utils/date';

export function ArticleCard({ article }: { article: ArticleCardData }) {
  return (
    <Link
      href={routes.blogPost(article.slug)}
      className="border-hairline bg-surface group block overflow-hidden rounded-card border shadow-(--shadow-soft) transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-(--shadow-float)"
    >
      <div className="overflow-hidden">
        <MediaPlaceholder
          label="عکس مقاله"
          className="aspect-[16/10] text-[12px] transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </div>
      <div className="p-5">
        <p className="text-brand-600 mb-2.5 flex items-center gap-1.5 text-[12px] font-bold">
          <span className="bg-brand-500 size-1 rounded-full" aria-hidden />
          {formatJalaliDate(article.publishedAt)}
        </p>
        <h3 className="group-hover:text-brand-700 text-[17px] leading-relaxed font-bold text-balance transition-colors">
          {article.title}
        </h3>
        {article.excerpt ? (
          <p className="text-foreground-muted mt-2 line-clamp-2 text-[13px] leading-relaxed">
            {article.excerpt}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
