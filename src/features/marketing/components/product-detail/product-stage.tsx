'use client';

import dynamic from 'next/dynamic';

import { Icon } from '@/components/atoms';

import { StageBoundary } from './stage-boundary';

const StageScene = dynamic(() => import('./stage-scene'), {
  ssr: false,
  loading: () => (
    <div className="text-foreground-muted grid h-full place-items-center gap-2 text-xs">
      <Icon name="cube" className="size-6 animate-pulse" />
      در حال بارگذاری نمای سه‌بعدی…
    </div>
  ),
});

/** Client-only 3D product viewer; the heavy `three` bundle loads on demand. */
export function ProductStage() {
  return (
    <StageBoundary>
      <StageScene />
    </StageBoundary>
  );
}
