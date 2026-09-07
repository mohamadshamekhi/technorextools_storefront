'use client';

import { useTransition } from 'react';

import { Button } from '@/components/atoms';
import { logoutAction } from '@/features/auth/services/auth.actions';

export function LogoutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="secondary"
      size="sm"
      disabled={pending}
      onClick={() => startTransition(() => void logoutAction())}
    >
      {pending ? 'Signing out…' : 'Sign out'}
    </Button>
  );
}
