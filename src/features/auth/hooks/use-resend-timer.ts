'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Counts a number of seconds down to zero. `restart()` sets it back to the
 * full duration; the interval clears itself on unmount and at zero.
 */
export function useResendTimer(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = undefined;
  }, []);

  const restart = useCallback(() => {
    stop();
    setRemaining(seconds);
    timer.current = setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          stop();
          return 0;
        }
        return value - 1;
      });
    }, 1000);
  }, [seconds, stop]);

  useEffect(() => stop, [stop]);

  return { remaining, canResend: remaining <= 0, restart, stop };
}
