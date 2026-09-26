'use client';

import type { FormEvent } from 'react';

import { Button, Icon, fieldClassName, fieldInvalidClassName } from '@/components/atoms';
import { FormField } from '@/components/molecules';
import { AttachmentPicker } from '@/features/media';
import { cn } from '@/lib/utils';

import { useRepairForm } from '../hooks/use-repair-form';
import { RepairSent } from './repair-sent';

/** Repair-request form. Posts to the `/api/repairs` BFF (session required). */
export function RepairForm() {
  const form = useRepairForm();

  if (form.submitted) return <RepairSent />;

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
      <h2 className="mb-5 text-base font-black">فرم درخواست تعمیر</h2>

      <FormField
        label="سریال گارانتی (اختیاری)"
        value={form.warrantySerial}
        onChange={(event) => form.setWarrantySerial(event.target.value)}
        error={form.errors.warrantySerial}
        hint="روی برچسب گارانتی دستگاه درج شده است؛ ثبت آن بررسی را سریع‌تر می‌کند."
        placeholder="TNX-000000"
        dir="ltr"
      />

      <div className="mt-4">
        <label htmlFor="repair-issue" className="mb-2 block text-[13px] font-bold">
          شرح مشکل
        </label>
        <textarea
          id="repair-issue"
          rows={6}
          value={form.issueDescription}
          onChange={(event) => form.setIssueDescription(event.target.value)}
          placeholder="مدل دستگاه و ایرادی که مشاهده کرده‌اید را بنویسید…"
          aria-invalid={form.errors.issueDescription ? true : undefined}
          aria-describedby={form.errors.issueDescription ? 'repair-issue-error' : undefined}
          className={cn(
            fieldClassName,
            'resize-none py-3',
            form.errors.issueDescription && fieldInvalidClassName,
          )}
        />
        {form.errors.issueDescription ? (
          <p id="repair-issue-error" className="text-sale mt-1.5 text-xs font-semibold">
            {form.errors.issueDescription}
          </p>
        ) : null}
      </div>

      <AttachmentPicker
        label="عکس یا فایل (اختیاری)"
        hint="حداکثر ۵ فایل، هرکدام تا ۱۰ مگابایت — JPEG، PNG، WebP یا PDF"
        controller={form.attachments}
      />

      {form.errors.form ? (
        <p role="alert" className="mt-4 text-xs font-semibold text-red-600">
          {form.errors.form}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="mt-5 w-full"
        disabled={form.pending || form.attachments.uploading}
      >
        <Icon name="wrench" className="size-4" />
        {form.pending ? 'در حال ثبت…' : 'ثبت درخواست تعمیر'}
      </Button>
    </form>
  );
}
