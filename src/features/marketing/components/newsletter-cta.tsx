'use client';

import { useActionState } from 'react';

import { Container } from '@/components/atoms';
import { Reveal } from '@/components/molecules';
import { cn } from '@/lib/utils';

import { subscribeToNewsletter } from '../services/newsletter.actions';
import styles from './newsletter-cta.module.css';

export function NewsletterCta() {
  const [state, action, pending] = useActionState(subscribeToNewsletter, null);
  const fieldError = state && !state.ok ? state.fieldErrors?.contact?.[0] : undefined;

  return (
    <Container as="section" className="py-20" aria-labelledby="newsletter-heading">
      <Reveal className={cn(styles.panel, 'bg-brand-500 relative grid items-center gap-11 overflow-hidden rounded-[2rem] p-12 text-white shadow-2xl lg:grid-cols-2')}>
        <div className="relative">
          <h2 id="newsletter-heading" className="mb-3 text-[2.1rem] leading-tight font-black tracking-tight">
            اول از تخفیف‌ها باخبر شو
          </h2>
          <p className="text-[15px] leading-relaxed text-white/85">
            محصولات جدید، تخفیف‌های کارگاهی و راهنمای خرید ابزار — بدون هرزنامه.
          </p>
        </div>
        <div className="relative">
          {state?.ok ? (
            <p className="bg-surface text-brand-600 rounded-3xl px-6 py-5 text-base font-bold">
              ثبت شد! جدیدترین پیشنهادها به‌زودی برایت ارسال می‌شود.
            </p>
          ) : (
            <form action={action} className="flex flex-wrap gap-3">
              <input
                type="text"
                name="contact"
                required
                aria-label="ایمیل یا شماره موبایل"
                aria-invalid={fieldError ? true : undefined}
                placeholder="ایمیل یا شماره موبایل"
                className="text-foreground min-w-0 flex-1 rounded-full bg-white px-6 py-4 text-[15px] outline-none"
              />
              <button
                type="submit"
                disabled={pending}
                className="bg-ink rounded-full px-8 py-4 text-[15px] font-extrabold text-white transition-opacity disabled:opacity-60"
              >
                {pending ? 'در حال ثبت…' : 'عضویت'}
              </button>
              {fieldError ? (
                <p className="w-full text-[13px] font-semibold text-white">{fieldError}</p>
              ) : null}
            </form>
          )}
        </div>
      </Reveal>
    </Container>
  );
}
