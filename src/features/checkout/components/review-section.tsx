'use client';

import type { ReactNode } from 'react';

import { Icon, type IconName } from '@/components/atoms';

type ReviewSectionProps = {
  icon: IconName;
  title: string;
  onEdit?: () => void;
  children: ReactNode;
};

export function ReviewSection({ icon, title, onEdit, children }: ReviewSectionProps) {
  return (
    <div className="border-hairline bg-surface rounded-card border p-6">
      <div className="mb-3.5 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-[15px] font-black">
          <Icon name={icon} className="text-brand-600 size-4" />
          {title}
        </h3>
        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            className="text-brand-600 text-[12.5px] font-bold"
          >
            ویرایش
          </button>
        ) : null}
      </div>
      {children}
    </div>
  );
}
