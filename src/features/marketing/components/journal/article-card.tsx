import Link from 'next/link';

import { MediaPlaceholder } from '@/components/atoms';
import { routes } from '@/config/routes';

import type { Article } from '../../types';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={routes.blogPost(article.slug)}
      className="border-hairline bg-surface block overflow-hidden rounded-card border transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
    >
      <MediaPlaceholder label="عکس مقاله" className="aspect-[16/10] text-[12px]" />
      <div className="p-5">
        <p className="text-brand-600 mb-2.5 text-[12px] font-bold">{article.date}</p>
        <h3 className="text-[17px] leading-relaxed font-bold text-balance">{article.title}</h3>
      </div>
    </Link>
  );
}
