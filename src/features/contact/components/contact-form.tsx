'use client';

import type { FormEvent } from 'react';

import { Button, Icon, fieldClassName, fieldInvalidClassName } from '@/components/atoms';
import { FormField } from '@/components/molecules';
import { cn } from '@/lib/utils';

import { useContactForm } from '../hooks/use-contact-form';
import { ContactSent } from './contact-sent';
import { SubjectChips } from './subject-chips';

/** Left column: the message form — posts to the `/api/contact` BFF route. */
export function ContactForm() {
  const form = useContactForm();

  if (form.submitted) return <ContactSent />;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void form.submit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-hairline bg-surface rounded-card border p-6 shadow-(--shadow-soft) sm:p-8"
    >
      <h2 className="mb-5 text-base font-black">فرم ارسال پیام</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="نام و نام خانوادگی"
          value={form.name}
          onChange={(event) => form.setName(event.target.value)}
          error={form.errors.name}
          placeholder="مثلاً: علی رضایی"
        />
        <FormField
          label="شماره موبایل"
          value={form.phone}
          onChange={(event) => form.setPhone(event.target.value)}
          error={form.errors.phone}
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          inputMode="numeric"
          dir="ltr"
        />
      </div>

      <SubjectChips value={form.subject} onChange={form.setSubject} />

      <div className="mt-4">
        <label htmlFor="contact-message" className="mb-2 block text-[13px] font-bold">
          پیام شما
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={form.message}
          onChange={(event) => form.setMessage(event.target.value)}
          placeholder="پیام خود را بنویسید…"
          aria-invalid={form.errors.message ? true : undefined}
          className={cn(
            fieldClassName,
            'resize-none py-3',
            form.errors.message && fieldInvalidClassName,
          )}
        />
        {form.errors.message ? (
          <p className="text-sale mt-1.5 text-xs font-semibold">{form.errors.message}</p>
        ) : null}
      </div>

      <Button type="submit" size="lg" className="mt-5 w-full" disabled={form.pending}>
        <Icon name="check" className="size-4" />
        {form.pending ? 'در حال ارسال…' : 'ارسال پیام'}
      </Button>
    </form>
  );
}
