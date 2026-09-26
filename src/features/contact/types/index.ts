import { z } from 'zod';

/** Enquiry categories shown as selectable chips on the contact form. */
export const CONTACT_SUBJECTS = [
  'مشاورهٔ خرید',
  'پشتیبانی فنی',
  'همکاری و نمایندگی',
  'سایر',
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

/** Client-side mirror of the `POST /storefront/contact` body, validated again in the BFF. */
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'نام و نام خانوادگی را وارد کنید'),
  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
  message: z.string().trim().min(5, 'متن پیام کوتاه است'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
