'use client';

import { useEffect, useRef, type ReactNode } from 'react';

import { Icon } from '@/components/atoms';

type BottomSheetProps = { open: boolean; title: string; onClose: () => void; children: ReactNode };

export function BottomSheet({ open, title, onClose, children }: BottomSheetProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <button
        type="button"
        aria-label="بستن"
        tabIndex={-1}
        onClick={onClose}
        className="animate-fade-in absolute inset-0 bg-black/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="animate-sheet-in bg-surface absolute inset-x-0 bottom-0 rounded-t-3xl p-5 pb-8 shadow-(--shadow-float)"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold">{title}</h2>
          <button
            ref={closeRef}
            type="button"
            aria-label="بستن"
            onClick={onClose}
            className="focus-visible:ring-brand-500 grid size-11 place-items-center rounded-lg focus-visible:ring-2 focus-visible:outline-none"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>
        <div className="flex flex-col gap-5">{children}</div>
      </div>
    </div>
  );
}
