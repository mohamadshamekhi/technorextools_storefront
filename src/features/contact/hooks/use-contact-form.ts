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

  const submit = () => {
    const parsed = contactFormSchema.safeParse({ name, phone, message });
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors({ name: flat.name?.[0], phone: flat.phone?.[0], message: flat.message?.[0] });
      return;
    }
    setErrors({});
    setSubmitted(true);
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
    submit,
  };
}
