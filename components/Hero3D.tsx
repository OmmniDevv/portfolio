"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial } from "@react-three/drei";
import type { Mesh, Points } from "three";

function CoreCrystal() {
  const mesh = useRef<Mesh>(null);
  const ring = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.25;
      mesh.current.rotation.x += delta * 0.1;
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.25;
    }
    if (ring.current) {
      ring.current.rotation.z -= delta * 0.4;
      ring.current.rotation.x = Math.PI / 2.4;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.15, 1]} />
        <MeshDistortMaterial
          color="#C8A96E"
          emissive="#7a5c22"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.85}
          distort={0.28}
          speed={2.2}
        />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[1.9, 0.025, 12, 90]} />
        <meshStandardMaterial color="#4FC3F7" emissive="#4FC3F7" emissiveIntensity={1.4} transparent opacity={0.75} />
      </mesh>
    </Float>
  );
}

function ParticleField({ count = 260 }: { count?: number }) {
  const ref = useRef<Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[Float32Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 22), 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#EF9A9A" transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ opacity: 0.9 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 4, 4]} intensity={28} color="#C8A96E" />
        <pointLight position={[-6, -3, 3]} intensity={18} color="#9B72CF" />
        <pointLight position={[0, 5, -4]} intensity={12} color="#4FC3F7" />
        <group position={[2.6, 0.4, 0]} scale={0.85}>
          <CoreCrystal />
        </group>
        <ParticleField />
        <Stars radius={40} depth={20} count={1200} factor={3} saturation={0} fade speed={0.6} />
      </Canvas>
    </div>
  );
}
