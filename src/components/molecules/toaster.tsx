'use client';

import { useEffect } from 'react';

import { Icon } from '@/components/atoms';
import { useToastStore, type Toast } from '@/store/toast-store';

const TOAST_MS = 3200;

function ToastItem({ toast }: { toast: Toast }) {
  const dismiss = useToastStore((s) => s.dismiss);

  useEffect(() => {
    const timer = window.setTimeout(() => dismiss(toast.id), TOAST_MS);
    return () => window.clearTimeout(timer);
  }, [toast.id, dismiss]);

  return (
    <div className="animate-toast-in bg-ink flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-(--shadow-float)">
      <Icon name="check" className="text-success size-4" />
      {toast.message}
    </div>
  );
}

/** Polite live region for transient confirmations (download started, etc.). */
export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex flex-col items-center gap-2 px-4 lg:bottom-8"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
