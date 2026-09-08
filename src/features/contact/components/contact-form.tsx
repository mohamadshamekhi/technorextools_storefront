'use client';

import type { FormEvent } from 'react';

import { Button, Icon } from '@/components/atoms';
import { FormField } from '@/components/molecules';
import { cn } from '@/lib/utils';

import { useContactForm } from '../hooks/use-contact-form';
import { ContactSent } from './contact-sent';
import { SubjectChips } from './subject-chips';

/** Left column: the message form. Demo-only — validated client-side. */
export function ContactForm() {
  const form = useContactForm();

  if (form.submitted) return <ContactSent />;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.submit();
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
            'bg-surface w-full resize-none rounded-lg border px-3 py-2.5 text-sm outline-none',
            'focus-visible:ring-brand-500/15 focus-visible:border-brand-400 focus-visible:ring-4',
            form.errors.message ? 'border-red-500' : 'border-black/15 dark:border-white/15',
          )}
        />
        {form.errors.message ? (
          <p className="mt-1.5 text-xs font-semibold text-red-600">{form.errors.message}</p>
        ) : null}
      </div>

      <Button type="submit" size="lg" className="mt-5 w-full">
        <Icon name="check" className="size-4" />
        ارسال پیام
      </Button>
    </form>
  );
}
