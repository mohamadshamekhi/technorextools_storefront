'use client';

import { Button, Icon, Spinner, fieldClassName, fieldInvalidClassName } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import { useQuestionForm } from '../../../hooks/use-question-form';

const MAX_QUESTION = 500;

/** Inline "ask a question" form. Anonymous submit → sign-in modal via `UnauthorizedError`. */
export function QuestionForm({ slug }: { slug: string }) {
  const { question, setQuestion, errors, submitted, pending, submit } = useQuestionForm(slug);

  if (submitted) {
    return (
      <div className="border-hairline bg-surface-muted flex items-start gap-3 rounded-2xl border p-5">
        <Icon name="check" className="text-success mt-0.5 size-5 shrink-0" />
        <p className="text-sm leading-7">
          <span className="block font-bold">پرسش شما ثبت شد</span>
          پس از پاسخ کارشناسان، روی همین صفحه منتشر می‌شود.
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
      aria-labelledby="question-form-title"
    >
      <label id="question-form-title" htmlFor="question-body" className="block text-base font-bold">
        پرسش خود را بنویسید
      </label>
      <textarea
        id="question-body"
        name="question"
        rows={3}
        maxLength={MAX_QUESTION}
        value={question}
        disabled={pending}
        onChange={(event) => setQuestion(event.target.value)}
        aria-invalid={Boolean(errors.question) || undefined}
        aria-describedby="question-body-help"
        placeholder="مثلاً: این مدل با آداپتور ۲۴ ولت کار می‌کند؟"
        className={cn(
          fieldClassName,
          'mt-3 resize-y py-3 leading-7',
          errors.question && fieldInvalidClassName,
        )}
      />
      <div className="mt-2 flex items-center justify-between gap-3">
        <p
          id="question-body-help"
          role={errors.question ? 'alert' : undefined}
          className={cn(
            'text-xs',
            errors.question ? 'text-sale font-semibold' : 'text-foreground-muted',
          )}
        >
          {errors.question ?? 'دست‌کم ۱۰ نویسه بنویسید.'}
        </p>
        <span className="text-foreground-muted text-xs tabular-nums">
          {toPersianDigits(question.length)}/{toPersianDigits(MAX_QUESTION)}
        </span>
      </div>

      {errors.form ? (
        <p role="alert" className="text-sale mt-4 text-sm font-semibold">
          {errors.form}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="mt-4 w-full sm:w-auto">
        {pending ? <Spinner className="size-4" /> : null}
        ثبت پرسش
      </Button>
    </form>
  );
}
