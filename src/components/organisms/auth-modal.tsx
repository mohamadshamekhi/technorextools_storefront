'use client';

import { Modal } from '@/components/molecules';
import { PhoneAuthFlow } from '@/features/auth';
import { useAuthModalStore } from '@/store/auth-modal-store';

/**
 * Single global sign-in modal, mounted once (`providers/index.tsx`). Anything that needs
 * an authenticated request — a query/mutation throwing `UnauthorizedError`, the checkout
 * button, … — opens it via `useAuthModalStore` instead of redirecting to `/login`.
 */
export function AuthModal() {
  const isOpen = useAuthModalStore((state) => state.isOpen);
  const redirectTo = useAuthModalStore((state) => state.redirectTo);
  const close = useAuthModalStore((state) => state.close);

  return (
    <Modal open={isOpen} onClose={close} labelledBy="auth-modal-heading">
      <h2 id="auth-modal-heading" className="mb-1 text-[16px] font-black">
        ورود یا ثبت‌نام
      </h2>
      <p className="text-foreground-muted mb-5 text-[13px]">
        برای ادامه، ابتدا وارد حساب کاربری خود شوید.
      </p>
      <PhoneAuthFlow redirectTo={redirectTo} onDone={close} />
    </Modal>
  );
}
