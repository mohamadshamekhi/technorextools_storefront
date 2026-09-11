'use client';

import { useRouter } from 'next/navigation';

import { Icon, Spinner } from '@/components/atoms';
import { routes } from '@/config/routes';
import { useCurrentUser } from '@/features/auth';
import { useAuthModalStore } from '@/store/auth-modal-store';

/**
 * Gates checkout on auth without leaving the cart: signed-in customers go
 * straight to `/checkout`; guests get the global sign-in modal (reusing the
 * phone/OTP flow) that lands them on `/checkout` itself once done.
 */
export function CheckoutButton() {
  const router = useRouter();
  const { data: user, isPending } = useCurrentUser();
  const openAuthModal = useAuthModalStore((state) => state.open);

  const handleClick = () => {
    if (user) {
      router.push(routes.checkout);
      return;
    }
    openAuthModal(routes.checkout);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="bg-brand-500 bg-(image:--gradient-brand) shadow-(--shadow-brand) mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-extrabold text-white transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
      >
        {isPending ? <Spinner className="size-4.5" /> : <Icon name="lock" className="size-4.5" />}
        تکمیل سفارش و پرداخت
      </button>
      <p className="text-foreground-muted mt-3 flex items-center justify-center gap-1.5 text-[11.5px]">
        <Icon name="shield" className="size-3.5" />
        پرداخت امن با گارانتی اصالت کالا
      </p>
    </>
  );
}
