'use client';

import { Icon, type IconName } from '@/components/atoms';

type ToolbarProps = {
  onReset: () => void;
  onFullscreen: () => void;
  arHref: string | null;
};

const btn =
  'bg-surface text-foreground focus-visible:ring-brand-500 grid size-11 place-items-center rounded-xl shadow-(--shadow-soft) transition-transform duration-150 active:scale-[0.96] focus-visible:ring-2 focus-visible:outline-none';

function ToolButton({
  icon,
  label,
  onClick,
}: {
  icon: IconName;
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} className={btn}>
      <Icon name={icon} className="size-5" />
    </button>
  );
}

export function ViewerToolbar({ onReset, onFullscreen, arHref }: ToolbarProps) {
  return (
    <div className="absolute end-3 top-3 z-10 flex flex-col gap-2">
      <ToolButton icon="refresh" label="بازنشانی زاویه دید" onClick={onReset} />
      <ToolButton icon="grid" label="تمام‌صفحه" onClick={onFullscreen} />
      {arHref ? (
        <a
          href={arHref}
          aria-label="مشاهده در فضای شما (AR)"
          title="مشاهده در فضای شما"
          className={btn}
        >
          <Icon name="cube" className="size-5" />
        </a>
      ) : null}
    </div>
  );
}
