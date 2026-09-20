'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, type ComponentRef, type KeyboardEvent, type RefObject } from 'react';

import type { Model3d } from '../../../types/pdp';
import { ModelScene } from './model-scene';

export type OrbitHandle = ComponentRef<typeof OrbitControls>;

type ModelCanvasProps = {
  model: Model3d;
  autoRotate: boolean;
  controlsRef: RefObject<OrbitHandle | null>;
  onInteract: () => void;
  onReady: () => void;
};

const KEY_STEP = 0.25;

export function ModelCanvas({
  model,
  autoRotate,
  controlsRef,
  onInteract,
  onReady,
}: ModelCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const controls = controlsRef.current;
    if (!controls) return;
    const step = event.key === 'ArrowLeft' ? -KEY_STEP : event.key === 'ArrowRight' ? KEY_STEP : 0;
    const tilt = event.key === 'ArrowUp' ? -KEY_STEP : event.key === 'ArrowDown' ? KEY_STEP : 0;
    if (!step && !tilt) return;
    event.preventDefault();
    onInteract();
    controls.setAzimuthalAngle(controls.getAzimuthalAngle() + step);
    controls.setPolarAngle(controls.getPolarAngle() + tilt);
    controls.update();
  };

  return (
    <div
      ref={wrapperRef}
      tabIndex={0}
      role="application"
      aria-label={`${model.alt}. برای چرخاندن از کلیدهای جهت‌نما استفاده کنید.`}
      onKeyDown={onKeyDown}
      className="focus-visible:ring-brand-500 size-full touch-none focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
    >
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 2], fov: 40 }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} />
        <Suspense fallback={null}>
          <ModelScene url={model.glbUrl} hotspots={model.hotspots} onReady={onReady} />
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enablePan={false}
          enableDamping
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
          minDistance={0.6}
          maxDistance={4}
          onStart={onInteract}
        />
      </Canvas>
    </div>
  );
}
