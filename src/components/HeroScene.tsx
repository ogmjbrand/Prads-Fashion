'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function GoldBlob({ reduceMotion }: { reduceMotion: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current || reduceMotion) return;
    mesh.current.rotation.x += delta * 0.08;
    mesh.current.rotation.y += delta * 0.12;
  });

  return (
    <mesh ref={mesh} scale={1.6}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color="#b8935a"
        distort={0.35}
        speed={reduceMotion ? 0 : 1.4}
        roughness={0.25}
        metalness={0.6}
      />
    </mesh>
  );
}

export default function HeroScene() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const dpr = useMemo<[number, number]>(() => [1, 1.5], []);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1.2} color="#ffffff" />
      <GoldBlob reduceMotion={reduceMotion} />
      {!reduceMotion && (
        <Sparkles count={40} scale={5} size={2} speed={0.3} color="#b8935a" opacity={0.5} />
      )}
    </Canvas>
  );
}
