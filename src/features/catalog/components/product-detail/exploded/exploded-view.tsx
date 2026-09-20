'use client';

import { useState } from 'react';

import type { ExplodedView as ExplodedViewData } from '../../../types/pdp';
import { Lightbox } from '../gallery/lightbox';
import { PhotoStage } from '../gallery/photo-stage';
import { PartHotspots } from './part-hotspots';
import { PartInfoCard } from './part-info-card';

type ExplodedViewProps = { view: ExplodedViewData };

/** Gallery exploded mode — admin-uploaded image: zoomable, with optional numbered hotspots synced to the parts list. */
export function ExplodedView({ view }: ExplodedViewProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const active = hovered ?? pinned;
  const activePart = view.parts.find((part) => part.number === active);
  const pin = (part: number) => setPinned((current) => (current === part ? null : part));
  const hasParts = view.parts.length > 0;
  // The info card only pays for itself when markers on the image can drive it.
  const hasHotspots = view.parts.some((part) => part.hotspot);
  const photo = { id: 'exploded', url: view.imageUrl, alt: view.alt };

  return (
    <div className="flex size-full flex-col gap-4">
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <div className="border-hairline bg-surface relative min-h-0 flex-1 overflow-hidden rounded-2xl border">
          {view.imageUrl ? (
            <PhotoStage photo={photo} onOpen={() => setZoomed(true)} />
          ) : (
            <p className="text-foreground-muted grid size-full min-h-48 place-items-center p-6 text-center text-sm leading-7">
              تصویر نمای انفجاری این محصول هنوز بارگذاری نشده است.
            </p>
          )}
          <PartHotspots
            parts={view.parts}
            active={active}
            pinned={pinned}
            onActive={setHovered}
            onPin={pin}
          />
        </div>
        {hasHotspots ? <PartInfoCard part={activePart} /> : null}
        {hasParts ? (
          <a
            href="#structure"
            className="text-brand-600 focus-visible:ring-brand-500 inline-flex min-h-11 items-center rounded-lg text-sm font-semibold hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            مشاهده فهرست کامل قطعات
          </a>
        ) : null}
      </div>
      {zoomed && view.imageUrl ? (
        <Lightbox
          photos={[photo]}
          index={0}
          onIndex={() => undefined}
          onClose={() => setZoomed(false)}
        />
      ) : null}
    </div>
  );
}
