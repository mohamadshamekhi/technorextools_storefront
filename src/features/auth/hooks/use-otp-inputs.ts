'use client';

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from 'react';

type Options = { length: number; onComplete: (code: string) => void };

/** Owns the state and keyboard behaviour of an N-box one-time-code field. */
export function useOtpInputs({ length, onComplete }: Options) {
  const [digits, setDigits] = useState<string[]>(() => Array<string>(length).fill(''));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const focus = useCallback((index: number) => {
    refs.current[index]?.focus();
  }, []);

  const reset = useCallback(() => {
    setDigits(Array<string>(length).fill(''));
    focus(0);
  }, [length, focus]);

  const commit = useCallback(
    (next: string[]) => {
      setDigits(next);
      if (next.every(Boolean)) onComplete(next.join(''));
    },
    [onComplete],
  );

  const inputProps = useMemo(
    () =>
      digits.map((value, index) => ({
        value,
        ref: (el: HTMLInputElement | null) => {
          refs.current[index] = el;
        },
        onChange: (event: { target: { value: string } }) => {
          const digit = event.target.value.replace(/\D/g, '').slice(-1);
          const next = [...digits];
          next[index] = digit;
          commit(next);
          if (digit && index < length - 1) focus(index + 1);
        },
        onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Backspace' && !digits[index] && index > 0) focus(index - 1);
        },
        onPaste: (event: ClipboardEvent<HTMLInputElement>) => {
          event.preventDefault();
          const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
          if (!pasted) return;
          const next = Array.from({ length }, (_, i) => pasted[i] ?? '');
          commit(next);
          focus(Math.min(pasted.length, length - 1));
        },
      })),
    [digits, length, commit, focus],
  );

  return { inputProps, reset, focusFirst: () => focus(0) };
}
