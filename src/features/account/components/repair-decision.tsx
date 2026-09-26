'use client';

import { useState } from 'react';

import { Button, Icon } from '@/components/atoms';
import type { RepairRequest } from '@/features/repairs';
import { formatToman } from '@/lib/persian';

import { useRepairDecision } from '../hooks/use-repair-decision';

type Choice = 'approve' | 'reject';

/** Customer's answer to the technician's cost estimate. Rendered only while `abzar/api` would
 * accept it: `awaiting_customer` + a quoted `estimatedCost` (anything else → upstream `409`). */
export function RepairDecision({ repair }: { repair: RepairRequest }) {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [note, setNote] = useState('');
  const decision = useRepairDecision(repair.id);

  if (repair.status !== 'awaiting_customer' || repair.estimatedCost === null) return null;

  const submit = (value: Choice) => {
    setChoice(value);
    decision.mutate({ decision: value, note: note.trim() || null });
  };

  return (
    <section className="border-brand-200 bg-brand-50/50 rounded-2xl border p-5">
      <div className="flex items-start gap-3">
        <span className="bg-brand-500 grid size-9 shrink-0 place-items-center rounded-xl text-white">
          <Icon name="handshake" className="size-4" />
        </span>
        <div className="min-w-0">
          <h2 className="text-[14px] font-black">تأیید هزینه تعمیر</h2>
          <p className="text-foreground-muted mt-1 text-[12.5px] leading-7">
            برای ادامه‌ی تعمیر، هزینه تخمینی{' '}
            <span className="font-display text-foreground font-bold">
              {formatToman(repair.estimatedCost)}
            </span>{' '}
            تومان را تأیید کنید یا درخواست را لغو کنید.
          </p>
        </div>
      </div>

      <label htmlFor="repair-decision-note" className="mt-4 block text-[12.5px] font-bold">
        توضیح (اختیاری)
      </label>
      <textarea
        id="repair-decision-note"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        maxLength={500}
        rows={2}
        disabled={decision.isPending || decision.isSuccess}
        placeholder="اگر توضیحی برای کارشناس دارید اینجا بنویسید"
        className="border-hairline bg-surface focus:border-brand-400 mt-1.5 w-full resize-none rounded-xl border px-3.5 py-2.5 text-[13px] leading-6 outline-none disabled:opacity-60"
      />

      <div className="mt-3 flex flex-wrap gap-2.5">
        <Button
          onClick={() => submit('approve')}
          disabled={decision.isPending || decision.isSuccess}
        >
          {decision.isPending && choice === 'approve' ? 'در حال ثبت…' : 'تأیید و ادامه تعمیر'}
        </Button>
        <Button
          variant="secondary"
          onClick={() => submit('reject')}
          disabled={decision.isPending || decision.isSuccess}
        >
          {decision.isPending && choice === 'reject' ? 'در حال ثبت…' : 'انصراف از تعمیر'}
        </Button>
      </div>

      {decision.isError ? (
        <p role="alert" className="text-sale mt-3 text-[12.5px] font-bold">
          {decision.error.message}
        </p>
      ) : null}
    </section>
  );
}
