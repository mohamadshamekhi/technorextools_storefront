'use client';

import { Button, Icon, Spinner, fieldClassName, fieldInvalidClassName } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import { useReviewForm } from '../../../hooks/use-review-form';
import { RatingInput } from './rating-input';

const MAX_BODY = 1000;

/** Inline "write a review" form. Anonymous submit → sign-in modal via `UnauthorizedError`. */
export function ReviewForm({ slug }: { slug: string }) {
  const { rating, setRating, body, setBody, errors, submitted, pending, submit } =
    useReviewForm(slug);

  if (submitted) {
    return (
      <div className="border-hairline bg-surface-muted flex items-start gap-3 rounded-2xl border p-5">
        <Icon name="check" className="text-success mt-0.5 size-5 shrink-0" />
        <p className="text-sm leading-7">
          <span className="block font-bold">دیدگاه شما ثبت شد</span>
          پس از بررسی و تأیید، روی همین صفحه منتشر می‌شود.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      className="border-hairline bg-surface rounded-2xl border p-5"
      aria-labelledby="review-form-title"
    >
      <p id="review-form-title" className="text-base font-bold">
        دیدگاه خود را بنویسید
      </p>
      <p className="text-foreground-muted mt-1 text-sm leading-7">
        تجربه‌تان از کار با این ابزار به خریداران بعدی کمک می‌کند.
      </p>

      <fieldset className="mt-4" disabled={pending}>
        <legend className="mb-2 text-sm font-semibold">امتیاز شما</legend>
        <RatingInput value={rating} onChange={setRating} invalid={Boolean(errors.rating)} />
        {errors.rating ? (
          <p role="alert" className="text-sale mt-2 text-xs font-semibold">
            {errors.rating}
          </p>
        ) : null}
      </fieldset>

      <div className="mt-5">
        <label htmlFor="review-body" className="mb-2 block text-sm font-semibold">
          متن دیدگاه
        </label>
        <textarea
          id="review-body"
          name="body"
          rows={4}
          maxLength={MAX_BODY}
          value={body}
          disabled={pending}
          onChange={(event) => setBody(event.target.value)}
          aria-invalid={Boolean(errors.body) || undefined}
          aria-describedby="review-body-help"
          placeholder="کیفیت ساخت، قدرت، عمر باتری و هر نکته‌ای که به دیگران کمک می‌کند…"
          className={cn(
            fieldClassName,
            'resize-y py-3 leading-7',
            errors.body && fieldInvalidClassName,
          )}
        />
        <div className="mt-2 flex items-center justify-between gap-3">
          <p
            id="review-body-help"
            role={errors.body ? 'alert' : undefined}
            className={cn(
              'text-xs',
              errors.body ? 'text-sale font-semibold' : 'text-foreground-muted',
            )}
          >
            {errors.body ?? 'دست‌کم ۱۰ نویسه بنویسید.'}
          </p>
          <span className="text-foreground-muted text-xs tabular-nums">
            {toPersianDigits(body.length)}/{toPersianDigits(MAX_BODY)}
          </span>
        </div>
      </div>

      {errors.form ? (
        <p role="alert" className="text-sale mt-4 text-sm font-semibold">
          {errors.form}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="mt-5 w-full sm:w-auto">
        {pending ? <Spinner className="size-4" /> : null}
        ثبت دیدگاه
      </Button>
    </form>
  );
}
