'use client';

import { usePhoneAuth } from '@/features/auth/hooks/use-phone-auth';
import { AuthProgress } from './auth-progress';
import { DoneStep } from './done-step';
import { OtpStep } from './otp-step';
import { PhoneStep } from './phone-step';
import { ProfileStep } from './profile-step';

const STEP_INDEX = { phone: 0, otp: 1, profile: 2, done: 2 } as const;

type PhoneAuthFlowProps = {
  redirectTo?: string;
  /** Called right before the success step navigates — e.g. closes a modal this flow sits in. */
  onDone?: () => void;
};

/** Client entry point for the phone / OTP sign-in experience. */
export function PhoneAuthFlow({ redirectTo, onDone }: PhoneAuthFlowProps) {
  const auth = usePhoneAuth();

  return (
    <div className="w-full max-w-sm">
      <AuthProgress total={3} current={STEP_INDEX[auth.step]} />

      <div key={auth.step} className="animate-[auth-fade-up_0.4s_ease]">
        {auth.step === 'phone' && <PhoneStep auth={auth} />}
        {auth.step === 'otp' && <OtpStep auth={auth} />}
        {auth.step === 'profile' && <ProfileStep auth={auth} />}
        {auth.step === 'done' && (
          <DoneStep isNewUser={auth.isNewUser} redirectTo={redirectTo} onContinue={onDone} />
        )}
      </div>
    </div>
  );
}
