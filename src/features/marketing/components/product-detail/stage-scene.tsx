'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const METAL = { color: '#3a3f47', metalness: 0.55, roughness: 0.3 } as const;
const ACCENT = { color: '#b45a2c', metalness: 0.25, roughness: 0.45 } as const;
const RUBBER = { color: '#1b1b1e', metalness: 0.05, roughness: 0.9 } as const;

/** Procedural stand-in impact wrench — swapped for a real GLB later. */
function ImpactWrench() {
  return (
    <group rotation={[0.1, Math.PI / 5, 0]} position={[-0.05, -0.05, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.11, 0.12, 0.44, 40]} />
        <meshStandardMaterial {...METAL} />
      </mesh>
      <mesh position={[0.3, 0.22, 0]}>
        <boxGeometry args={[0.18, 0.18, 0.15]} />
        <meshStandardMaterial {...ACCENT} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.44, 0.22, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.12, 20]} />
        <meshStandardMaterial {...METAL} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.52, 0.22, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.06, 6]} />
        <meshStandardMaterial {...METAL} />
      </mesh>
      <mesh rotation={[0, 0, 0.16]} position={[-0.18, -0.08, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.34, 28]} />
        <meshStandardMaterial {...RUBBER} />
      </mesh>
      <mesh position={[0.02, 0.04, 0]}>
        <boxGeometry args={[0.06, 0.1, 0.05]} />
        <meshStandardMaterial {...ACCENT} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[-0.3, -0.24, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 0.06, 18]} />
        <meshStandardMaterial {...METAL} />
      </mesh>
    </group>
  );
}

export default function StageScene() {
  return (
    <Canvas camera={{ position: [1, 0.7, 1.6], fov: 42 }} dpr={[1, 2]} resize={{ debounce: 0 }}>
      <color attach="background" args={['#fbfaf8']} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 3]} intensity={2.2} />
      <directionalLight position={[-2, 1, -3]} intensity={0.7} color="#b45a2c" />
      <ImpactWrench />
      <OrbitControls
        makeDefault
        enablePan={false}
        autoRotate
        autoRotateSpeed={1}
        minDistance={1.1}
        maxDistance={3}
      />
    </Canvas>
  );
}
