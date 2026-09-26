'use client';

import { useState } from 'react';

import { CONTACT_SUBJECTS, contactFormSchema, type ContactSubject } from '../types';

type FieldErrors = Partial<Record<'name' | 'phone' | 'message', string>>;

/** Owns the contact-form fields, validation errors and the success flag. */
export function useContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState<ContactSubject>(CONTACT_SUBJECTS[0]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  const submit = async () => {
    const parsed = contactFormSchema.safeParse({ name, phone, message });
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors({ name: flat.name?.[0], phone: flat.phone?.[0], message: flat.message?.[0] });
      return;
    }
    setErrors({});
    setPending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...parsed.data, subject }),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null;
        setErrors({ message: payload?.error ?? 'ارسال پیام ناموفق بود. دوباره تلاش کنید.' });
        return;
      }
      setSubmitted(true);
    } catch {
      setErrors({ message: 'ارتباط با سرور برقرار نشد.' });
    } finally {
      setPending(false);
    }
  };

  return {
    name,
    setName,
    phone,
    setPhone,
    subject,
    setSubject,
    message,
    setMessage,
    errors,
    submitted,
    pending,
    submit,
  };
}
