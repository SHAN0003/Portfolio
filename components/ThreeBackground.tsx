import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
        // Rotate the shape based on time
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        
        // Subtle move based on mouse position (parallax)
        const { x, y } = state.mouse;
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 2, 0.05);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 2, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      {/* @ts-ignore */}
      <mesh ref={meshRef} position={[0, 0, -5]} scale={2.5}>
        {/* @ts-ignore */}
        <icosahedronGeometry args={[1, 15]} />
        <MeshDistortMaterial
          color="#222"
          envMapIntensity={0.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
          wireframe={true}
        />
      {/* @ts-ignore */}
      </mesh>
    </Float>
  );
};

const Particles = () => {
    const points = useRef<THREE.Points>(null);
    useFrame((state) => {
        if(points.current) {
            points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
            points.current.rotation.x = state.clock.getElapsedTime() * 0.02;
        }
    })

    return (
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    )
}

export const ThreeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        {/* @ts-ignore */}
        <ambientLight intensity={0.5} />
        {/* @ts-ignore */}
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
        {/* @ts-ignore */}
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#06b6d4" />
        <FloatingShape />
        <Particles />
        {/* @ts-ignore */}
        <fog attach="fog" args={['#050505', 5, 20]} />
      </Canvas>
    </div>
  );
};