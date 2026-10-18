'use client';
/** Code-split WebGL concept: glass and wireframe plates, orange drive rings, pointer-weighted idle.
 * Pixel ratio is capped at two; frameloop stops offscreen and under reduced motion. */
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import type { Group } from 'three';
function Module({ still }: { still: boolean }) {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current || still) return;
    group.current.rotation.y +=
      (state.pointer.x * 0.25 - 0.45 - group.current.rotation.y) * Math.min(delta * 2, 1);
    group.current.rotation.x +=
      (state.pointer.y * 0.08 + 0.25 - group.current.rotation.x) * Math.min(delta * 2, 1);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.08;
  });
  return (
    <group ref={group} rotation={[0.25, -0.45, -0.15]}>
      <RoundedBox args={[3.35, 0.22, 2.15]} radius={0.08} smoothness={2} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#2b3432" metalness={0.9} roughness={0.32} />
      </RoundedBox>
      <RoundedBox args={[2.9, 0.14, 1.85]} radius={0.04} smoothness={2} position={[0, 0.35, 0]}>
        <meshPhysicalMaterial
          color="#99aa97"
          metalness={0.65}
          roughness={0.22}
          transparent
          opacity={0.55}
        />
      </RoundedBox>
      <mesh position={[0, 0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[2.75, 1.7, 0.08]} />
        <meshBasicMaterial color="#ff864c" wireframe transparent opacity={0.55} />
      </mesh>
      <RoundedBox args={[1.55, 0.25, 1.2]} radius={0.04} smoothness={2} position={[0, 1.15, 0]}>
        <meshStandardMaterial color="#ff6b2c" metalness={0.8} roughness={0.3} />
      </RoundedBox>
      {[-1.15, 0, 1.15].flatMap((x, i) =>
        [-1.15, 1.15].map((z, j) => (
          <group key={i + '-' + j} position={[x, -0.55, z]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[0.43, 0.43, 0.3, 24]} />
              <meshStandardMaterial color="#101413" metalness={0.35} roughness={0.7} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, z > 0 ? 0.17 : -0.17, 0]}>
              <torusGeometry args={[0.27, 0.075, 8, 24]} />
              <meshStandardMaterial color="#ff6b2c" metalness={0.85} roughness={0.25} />
            </mesh>
            <mesh>
              <cylinderGeometry args={[0.11, 0.11, 0.4, 16]} />
              <meshStandardMaterial color="#b8bdac" metalness={1} roughness={0.25} />
            </mesh>
          </group>
        )),
      )}
      {[-1.2, 1.2].flatMap((x, i) =>
        [-0.7, 0.7].map((z, j) => (
          <mesh key={i + 'r' + j} position={[x, 0.06, z]}>
            <cylinderGeometry args={[0.035, 0.035, 1.3, 8]} />
            <meshStandardMaterial color="#c0c7b7" metalness={1} roughness={0.3} />
          </mesh>
        )),
      )}
      <mesh position={[0, 1.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.34, 0.12, 8, 32]} />
        <meshStandardMaterial color="#ffb478" metalness={0.85} roughness={0.22} />
      </mesh>
    </group>
  );
}
export default function RobotScene({ active, onReady }: { active: boolean; onReady: () => void }) {
  const [still, setStill] = useState(true);
  useEffect(() => {
    const q = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setStill(q.matches);
    update();
    q.addEventListener('change', update);
    return () => q.removeEventListener('change', update);
  }, []);
  return (
    <Canvas
      className="webgl-concept"
      dpr={[1, 2]}
      camera={{ position: [5, 4.2, 6], fov: 38 }}
      frameloop={active && !still ? 'always' : 'demand'}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      onCreated={onReady}
    >
      <ambientLight intensity={1.3} />
      <directionalLight position={[4, 7, 3]} intensity={4} color="#ffe2b8" />
      <pointLight position={[-3, 2, -3]} intensity={25} color="#ff6b2c" />
      <Module still={still} />
    </Canvas>
  );
}
