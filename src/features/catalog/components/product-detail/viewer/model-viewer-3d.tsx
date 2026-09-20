'use client';

import dynamic from 'next/dynamic';
import { useCallback, useRef, useState } from 'react';

import { Icon, MediaPlaceholder } from '@/components/atoms';

import type { Model3d } from '../../../types/pdp';
import type { OrbitHandle } from './model-canvas';
import { ViewerErrorBoundary } from './viewer-error-boundary';
import { ViewerToolbar } from './viewer-toolbar';
import { androidArHref, hasWebGL } from './webgl';

// Three.js + drei stay out of the initial bundle and off the LCP path.
const ModelCanvas = dynamic(() => import('./model-canvas').then((m) => m.ModelCanvas), {
  ssr: false,
});

function Poster({ model, message }: { model: Model3d; message?: string }) {
  return (
    <div className="relative size-full">
      <MediaPlaceholder label={model.alt} src={model.posterUrl} className="size-full" />
      {message ? (
        <p
          role="alert"
          className="bg-surface text-foreground absolute inset-x-4 bottom-4 rounded-xl p-3 text-center text-sm shadow-(--shadow-soft)"
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}

export function ModelViewer3D({ model }: { model: Model3d }) {
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [spinning, setSpinning] = useState(true);
  const [arHref, setArHref] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitHandle | null>(null);

  const start = () => {
    if (!hasWebGL()) return setFailed(true);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setSpinning(!reduce);
    setArHref(androidArHref(model.glbUrl, model.alt));
    setStarted(true);
  };
  const onReady = useCallback(() => setReady(true), []);
  const stopSpin = useCallback(() => setSpinning(false), []);

  const fallback = <Poster model={model} message="نمایش سه‌بعدی در این دستگاه در دسترس نیست." />;
  if (failed) return fallback;

  return (
    <div ref={containerRef} className="bg-surface relative size-full">
      <p className="sr-only">
        {model.alt}. {model.hotspots.map((h) => `${h.label}: ${h.description}`).join('؛ ')}
      </p>
      {started ? (
        <ViewerErrorBoundary onError={() => setFailed(true)}>
          <ModelCanvas
            model={model}
            autoRotate={spinning}
            controlsRef={controlsRef}
            onInteract={stopSpin}
            onReady={onReady}
          />
          <ViewerToolbar
            arHref={arHref}
            onReset={() => controlsRef.current?.reset()}
            onFullscreen={() => void containerRef.current?.requestFullscreen?.()}
          />
        </ViewerErrorBoundary>
      ) : null}
      {!started || !ready ? (
        <div className="absolute inset-0">
          <Poster model={model} />
          {started ? (
            <div className="bg-surface-muted/70 absolute inset-0 animate-pulse" aria-hidden />
          ) : (
            <button
              type="button"
              onClick={start}
              className="bg-accent-500 text-ink hover:bg-accent-400 focus-visible:ring-brand-500 absolute start-1/2 bottom-6 flex h-12 -translate-x-1/2 items-center gap-2 rounded-xl px-6 font-extrabold shadow-(--shadow-accent) transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <Icon name="rotate3d" className="size-5" />
              مشاهده سه‌بعدی
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
