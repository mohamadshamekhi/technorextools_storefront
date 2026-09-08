import { cn } from '@/lib/utils';

import { CONTACT_SUBJECTS, type ContactSubject } from '../types';

type Props = {
  value: ContactSubject;
  onChange: (subject: ContactSubject) => void;
};

/** Single-select pill group for the enquiry subject. */
export function SubjectChips({ value, onChange }: Props) {
  return (
    <fieldset className="mt-4">
      <legend className="mb-2 text-[13px] font-bold">موضوع</legend>
      <div className="flex flex-wrap gap-2">
        {CONTACT_SUBJECTS.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={value === item}
            onClick={() => onChange(item)}
            className={cn(
              'rounded-full px-4 py-1.5 text-[12.5px] font-bold transition-colors',
              value === item
                ? 'bg-brand-500 bg-(image:--gradient-brand) text-white shadow-(--shadow-brand)'
                : 'border-hairline bg-surface text-foreground-muted border hover:border-brand-300',
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
