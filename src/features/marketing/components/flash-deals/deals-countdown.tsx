'use client';

import { useEffect, useMemo, useState } from 'react';

import { toPersianDigits } from '../../utils/persian';

const OFFSET_MS = 7 * 3_600_000 + 42 * 60_000;
const pad = (n: number) => toPersianDigits(String(n).padStart(2, '0'));

/** Rolling "ends in" timer. The deadline is set on the client to stay SSR-safe. */
export function DealsCountdown() {
  const [now, setNow] = useState<number | null>(null);
  const deadline = useMemo(() => Date.now() + OFFSET_MS, []);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const left = Math.max(0, deadline - (now ?? deadline));
  const units = [
    { value: pad(Math.floor(left / 3_600_000)), label: 'ساعت' },
    { value: pad(Math.floor(left / 60_000) % 60), label: 'دقیقه' },
    { value: pad(Math.floor(left / 1000) % 60), label: 'ثانیه' },
  ];

  return (
    <div className="flex gap-2" dir="ltr">
      {units.map((unit) => (
        <div key={unit.label} className="text-sale min-w-[52px] rounded-xl bg-white px-3 py-2 text-center">
          <div className="font-display text-xl leading-none font-bold">{unit.value}</div>
          <div className="text-foreground-muted mt-1 text-[10px]">{unit.label}</div>
        </div>
      ))}
    </div>
  );
}
