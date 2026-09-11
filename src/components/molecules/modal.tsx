'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** id of the element that names the dialog, for `aria-labelledby`. */
  labelledBy?: string;
  className?: string;
};

/** Domain-agnostic centered dialog: backdrop click + Escape close, scroll-locked, portalled to `body`. */
export function Modal({ open, onClose, children, labelledBy, className }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('input, button, [tabindex]')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div
        className="bg-ink/50 animate-modal-backdrop-in absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={cn(
          'bg-surface animate-modal-in relative w-full max-w-sm rounded-3xl p-7 shadow-(--shadow-float)',
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="بستن"
          className="text-foreground-muted hover:bg-surface-muted hover:text-foreground absolute end-4 top-4 grid size-8 place-items-center rounded-full transition-colors"
        >
          <Icon name="close" className="size-4" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
