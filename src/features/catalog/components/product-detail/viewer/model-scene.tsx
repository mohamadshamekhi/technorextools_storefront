'use client';

import { Bounds, Center, Html, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

import type { Hotspot } from '../../../types/pdp';
import { HotspotMarker } from './hotspot-marker';

type ModelSceneProps = { url: string; hotspots: Hotspot[]; onReady: () => void };

/** Draco-compressed GLB (drei fetches the decoder on demand) + hotspot overlays. */
export function ModelScene({ url, hotspots, onReady }: ModelSceneProps) {
  const { scene } = useGLTF(url, true);

  useEffect(onReady, [onReady]);

  return (
    <Bounds fit clip observe margin={1.5}>
      <Center>
        <primitive object={scene} />
        {hotspots.map((hotspot, index) => (
          <Html key={hotspot.id} position={hotspot.position} center zIndexRange={[20, 0]}>
            <HotspotMarker hotspot={hotspot} index={index} />
          </Html>
        ))}
      </Center>
    </Bounds>
  );
}
