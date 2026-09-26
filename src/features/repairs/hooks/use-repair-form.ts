'use client';

import { useState } from 'react';

import { useAttachments } from '@/features/media';

import { MAX_REPAIR_ATTACHMENTS, repairFormSchema } from '../types';

type FieldErrors = Partial<Record<'issueDescription' | 'warrantySerial' | 'form', string>>;

/** Owns the repair-request fields, validation errors and the submitted flag. */
export function useRepairForm() {
  const [issueDescription, setIssueDescription] = useState('');
  const [warrantySerial, setWarrantySerial] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const attachments = useAttachments(MAX_REPAIR_ATTACHMENTS);

  const submit = async () => {
    const parsed = repairFormSchema.safeParse({ issueDescription, warrantySerial });
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors({
        issueDescription: flat.issueDescription?.[0],
        warrantySerial: flat.warrantySerial?.[0],
      });
      return;
    }
    if (attachments.uploading) {
      setErrors({ form: 'تا پایان بارگذاری فایل‌ها صبر کنید.' });
      return;
    }
    setErrors({});
    setPending(true);
    try {
      const serial = parsed.data.warrantySerial;
      const res = await fetch('/api/repairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issueDescription: parsed.data.issueDescription,
          ...(serial ? { warrantySerial: serial } : {}),
          ...(attachments.mediaIds.length ? { mediaIds: attachments.mediaIds } : {}),
        }),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null;
        setErrors({ form: payload?.error ?? 'ثبت درخواست ناموفق بود. دوباره تلاش کنید.' });
        return;
      }
      attachments.reset();
      setSubmitted(true);
    } catch {
      setErrors({ form: 'ارتباط با سرور برقرار نشد.' });
    } finally {
      setPending(false);
    }
  };

  return {
    issueDescription,
    setIssueDescription,
    warrantySerial,
    setWarrantySerial,
    errors,
    submitted,
    pending,
    attachments,
    submit,
  };
}
