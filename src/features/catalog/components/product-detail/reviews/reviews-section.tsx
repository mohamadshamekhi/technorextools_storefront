'use client';

import { useState } from 'react';

import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import type { ProductComments } from '../../../types';
import { RatingSummary } from './rating-summary';
import { ReviewCard } from './review-card';
import { ReviewForm } from './review-form';

const FILTERS: Array<{ id: number | 'all'; label: string }> = [
  { id: 'all', label: 'همه' },
  { id: 5, label: '۵ ستاره' },
  { id: 4, label: '۴ ستاره' },
  { id: 3, label: '۳ ستاره و کمتر' },
];

export function ReviewsSection({ comments, slug }: { comments: ProductComments; slug: string }) {
  const [filter, setFilter] = useState<number | 'all'>('all');
  const shown = comments.items.filter((item) => {
    const stars = Math.round(item.rating);
    return filter === 'all' || (filter === 3 ? stars <= 3 : stars === filter);
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <RatingSummary comments={comments} />
      <div className="flex flex-col gap-4">
        {comments.items.length > 0 ? (
          <div role="group" aria-label="فیلتر دیدگاه‌ها" className="flex flex-wrap gap-2">
            {FILTERS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                aria-pressed={filter === chip.id}
                onClick={() => setFilter(chip.id)}
                className={cn(
                  'focus-visible:ring-brand-500 min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none',
                  filter === chip.id
                    ? 'bg-ink border-ink text-white'
                    : 'border-hairline text-foreground-muted hover:border-foreground',
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>
        ) : null}

        {comments.items.length === 0 ? (
          <div className="border-hairline bg-surface-muted rounded-2xl border border-dashed p-5 text-center">
            <p className="text-base font-bold">هنوز کسی این محصول را ارزیابی نکرده است</p>
            <p className="text-foreground-muted mt-2 text-sm leading-7">
              اولین دیدگاه را همین‌جا بنویسید.
            </p>
            <a
              href="#qa"
              className="text-brand-600 mt-2 inline-flex min-h-11 items-center text-sm font-semibold hover:underline"
            >
              سؤالی دارید؟ به بخش پرسش و پاسخ بروید
            </a>
          </div>
        ) : shown.length === 0 ? (
          <p className="text-foreground-muted text-sm">
            دیدگاهی با این فیلتر یافت نشد ({toPersianDigits(0)}).
          </p>
        ) : (
          shown.map((review) => <ReviewCard key={review.id} review={review} />)
        )}

        <ReviewForm slug={slug} />
      </div>
    </div>
  );
}
