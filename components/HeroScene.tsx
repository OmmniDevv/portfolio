"use client";
import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Mesh, Points } from "three";

// Patung kaca abstrak: torus knot besar dengan material fisik.
// Satu-satunya objek 3D di situs ini, jadi dibuat menonjol.
function GlassKnot() {
  const mesh = useRef<Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.12;
    mesh.current.rotation.x += delta * 0.05;
    // parallax halus mengikuti mouse
    const t = state.clock.elapsedTime;
    mesh.current.rotation.z = pointer.x * 0.15 + Math.sin(t * 0.2) * 0.05;
    mesh.current.position.x = pointer.x * 0.25;
    mesh.current.position.y = pointer.y * 0.25;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.9}>
      <mesh ref={mesh} scale={1.9}>
        <torusKnotGeometry args={[1, 0.32, 140, 20]} />
        <meshPhysicalMaterial
          color="#9adcff"
          metalness={0.1}
          roughness={0.08}
          transmission={0.92}
          thickness={1.4}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
        />
      </mesh>
    </Float>
  );
}

function Dust({ count = 180 }: { count?: number }) {
  const ref = useRef<Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[Float32Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 16), 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#38bdf8" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.6} color="#ffffff" />
        <pointLight position={[-6, -2, 4]} intensity={30} color="#38bdf8" />
        <pointLight position={[5, 3, -2]} intensity={18} color="#a78bfa" />
        <GlassKnot />
        <Dust />
      </Canvas>
    </div>
  );
}
