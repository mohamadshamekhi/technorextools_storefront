'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Open/close + two-level hover state for the header category flyout. Closes on escape or outside click. */
export function useCategoryMenu() {
  const [open, setOpen] = useState(false);
  const [l1, setL1] = useState<string | null>(null);
  const [l2, setL2] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const clearCloseTimer = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = undefined;
  }, []);

  const close = useCallback(() => {
    clearCloseTimer();
    setOpen(false);
    setL1(null);
    setL2(null);
  }, [clearCloseTimer]);

  /** Hover-intent open: cancels any pending close from a brief mouse-out. */
  const openOnHover = () => {
    clearCloseTimer();
    setOpen(true);
  };

  /** Delayed close so moving the pointer from the trigger into the panel doesn't drop it. */
  const closeOnHoverOut = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(close, 150);
  };

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  return {
    open,
    setOpen,
    l1,
    setL1,
    l2,
    setL2,
    close,
    openOnHover,
    closeOnHoverOut,
    rootRef,
    panelRef,
  };
}
