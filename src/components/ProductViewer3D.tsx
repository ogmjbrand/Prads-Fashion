'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTexture, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function ProductCard3D({ image }: { image: string }) {
  const texture = useTexture(image);
  texture.colorSpace = THREE.SRGBColorSpace;

  const source = texture.image as { naturalWidth?: number; naturalHeight?: number; width?: number; height?: number };
  const aspect = (source.naturalWidth ?? source.width ?? 1) / (source.naturalHeight ?? source.height ?? 1);

  const width = aspect >= 1 ? 2.4 : 2.4 * aspect;
  const height = aspect >= 1 ? 2.4 / aspect : 2.4;

  return (
    <mesh>
      <boxGeometry args={[width, height, 0.08]} />
      <meshStandardMaterial attach="material-0" color="#e0ddd8" roughness={0.7} />
      <meshStandardMaterial attach="material-1" color="#e0ddd8" roughness={0.7} />
      <meshStandardMaterial attach="material-2" color="#e0ddd8" roughness={0.7} />
      <meshStandardMaterial attach="material-3" color="#e0ddd8" roughness={0.7} />
      <meshStandardMaterial attach="material-4" map={texture} roughness={0.5} />
      <meshStandardMaterial attach="material-5" color="#1a1815" roughness={0.8} />
    </mesh>
  );
}

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-brand-cream">
      <p className="text-sm text-brand-gray-500">Loading 3D view...</p>
    </div>
  );
}

export default function ProductViewer3D({ image }: { image: string }) {
  return (
    <div className="relative w-full h-full bg-brand-cream overflow-hidden">
      <Suspense fallback={<Loader />}>
        <Canvas camera={{ position: [0, 0, 4], fov: 40 }} gl={{ antialias: true }}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[2, 3, 4]} intensity={1} />
          <directionalLight position={[-2, -1, -3]} intensity={0.3} />
          <ProductCard3D image={image} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2 - 0.6}
            maxPolarAngle={Math.PI / 2 + 0.6}
            minAzimuthAngle={-0.9}
            maxAzimuthAngle={0.9}
            rotateSpeed={0.6}
          />
        </Canvas>
      </Suspense>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-medium text-brand-gray-600 bg-brand-white/80 px-3 py-1 rounded-full pointer-events-none">
        Drag to tilt
      </div>
    </div>
  );
}
