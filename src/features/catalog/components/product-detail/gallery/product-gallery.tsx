'use client';

import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import type { ProductDetail } from '../../../types';
import type { GalleryMode, ProductExtras } from '../../../types/pdp';
import { ExplodedView } from '../exploded/exploded-view';
import { ModelViewer3D } from '../viewer/model-viewer-3d';
import type { GalleryPhoto, RailEntry } from './gallery-types';
import { Lightbox } from './lightbox';
import { ModeSwitcher } from './mode-switcher';
import { PhotoStage } from './photo-stage';
import { PhotoSwiper } from './photo-swiper';
import { ThumbRail } from './thumb-rail';

type ProductGalleryProps = {
  product: ProductDetail;
  extras: ProductExtras;
};

const panel = 'absolute inset-0 transition-opacity duration-200 motion-reduce:transition-none';

export function ProductGallery({ product, extras }: ProductGalleryProps) {
  const { model3d, explodedView, video } = extras;
  const [mode, setMode] = useState<GalleryMode>('photos');
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const photos: GalleryPhoto[] = useMemo(
    () =>
      product.images.map((image) => ({
        id: image.id,
        url: image.url,
        alt: image.alt ?? product.title,
      })),
    [product],
  );

  const modes = useMemo(() => {
    const list: GalleryMode[] = ['photos'];
    if (model3d) list.push('3d');
    if (explodedView) list.push('exploded');
    if (video) list.push('video');
    return list;
  }, [model3d, explodedView, video]);

  const entries = useMemo<RailEntry[]>(() => {
    const list: RailEntry[] = photos.map((photo, index) => ({
      key: photo.id,
      mode: 'photos',
      photoIndex: index,
      src: photo.url,
      label: `تصویر ${index + 1}`,
    }));
    if (model3d)
      list.push({
        key: '3d',
        mode: '3d',
        src: model3d.posterUrl,
        label: 'مدل سه‌بعدی',
        badge: '3D',
      });
    if (explodedView)
      list.push({
        key: 'exploded',
        mode: 'exploded',
        src: explodedView.imageUrl || undefined,
        label: 'نمای انفجاری',
        badge: 'انفجاری',
      });
    if (video)
      list.push({
        key: 'video',
        mode: 'video',
        src: video.posterUrl,
        label: 'ویدیو',
        badge: 'ویدیو',
      });
    return list;
  }, [photos, model3d, explodedView, video]);

  const activeRail = entries.findIndex((entry) =>
    entry.mode === 'photos'
      ? mode === 'photos' && entry.photoIndex === photoIndex
      : entry.mode === mode,
  );

  const selectEntry = (entry: RailEntry) => {
    setMode(entry.mode);
    if (entry.photoIndex !== undefined) setPhotoIndex(entry.photoIndex);
  };

  const visibility = (target: GalleryMode) =>
    cn(panel, mode === target ? 'opacity-100' : 'pointer-events-none opacity-0');

  return (
    <div>
      <ModeSwitcher modes={modes} active={mode} onChange={setMode} />
      <div className="flex items-start gap-4">
        <ThumbRail entries={entries} activeIndex={Math.max(0, activeRail)} onSelect={selectEntry} />
        <div className="border-hairline bg-surface relative aspect-square min-w-0 flex-1 overflow-hidden rounded-2xl border shadow-(--shadow-soft)">
          <div className={visibility('photos')} inert={mode !== 'photos'}>
            <div className="hidden size-full md:block">
              <PhotoStage photo={photos[photoIndex]} onOpen={() => setLightbox(photoIndex)} />
            </div>
            <div className="size-full md:hidden">
              <PhotoSwiper photos={photos} onOpen={setLightbox} />
            </div>
          </div>
          {model3d ? (
            <div className={visibility('3d')} inert={mode !== '3d'}>
              <ModelViewer3D model={model3d} />
            </div>
          ) : null}
          {explodedView ? (
            <div
              className={cn(visibility('exploded'), 'flex flex-col p-3')}
              inert={mode !== 'exploded'}
            >
              <ExplodedView view={explodedView} />
            </div>
          ) : null}
          {video ? (
            <div className={visibility('video')} inert={mode !== 'video'}>
              <video
                controls
                preload="none"
                poster={video.posterUrl}
                src={video.url}
                className="size-full object-contain"
              />
            </div>
          ) : null}
        </div>
      </div>
      {lightbox !== null ? (
        <Lightbox
          photos={photos}
          index={lightbox}
          onIndex={setLightbox}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </div>
  );
}
