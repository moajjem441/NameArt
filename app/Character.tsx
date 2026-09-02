// type CharacterProps = {
//   isTalking: boolean;
// };

// export default function Character({ isTalking }: CharacterProps) {
//   return (
//     <svg
//       viewBox="0 0 200 200"
//       className="w-28 h-28 sm:w-36 sm:h-36"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       {/* Body */}
//       <ellipse cx="100" cy="150" rx="45" ry="40" fill="#22d3ee" />

//       {/* Waving arm (right side, animated) */}
//       <g style={{ transformOrigin: "130px 130px" }} className="animate-wave">
//         <ellipse cx="150" cy="120" rx="10" ry="30" fill="#22d3ee" />
//         <circle cx="155" cy="95" r="10" fill="#fcd34d" />
//       </g>

//       {/* Still arm (left side) */}
//       <ellipse cx="60" cy="140" rx="10" ry="28" fill="#22d3ee" />

//       {/* Head */}
//       <circle cx="100" cy="85" r="45" fill="#fcd34d" />

//       {/* Eyes */}
//       <circle cx="85" cy="80" r="5" fill="#1e1e1e" />
//       <circle cx="115" cy="80" r="5" fill="#1e1e1e" />

//       {/* Mouth: talking hole isTalking-er upor depend kore shape change hobe */}
//       {isTalking ? (
//         <ellipse
//           cx="100"
//           cy="102"
//           rx="12"
//           ry="8"
//           fill="#7c2d12"
//           className="animate-talk"
//         />
//       ) : (
//         <path
//           d="M 85 100 Q 100 110 115 100"
//           stroke="#7c2d12"
//           strokeWidth="4"
//           fill="none"
//           strokeLinecap="round"
//         />
//       )}
//     </svg>
//   );
// }








"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  OrbitControls,
  RoundedBox,
  ContactShadows,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type CharacterProps = {
  isTalking: boolean;
};

/* -----------------------------
   Character Model
------------------------------ */

function CharacterModel({ isTalking }: CharacterProps) {
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    /* Hand Waving & Idle Motion */
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.sin(time * 3.5) * 0.25 - 0.1;
      rightArmRef.current.rotation.x = Math.cos(time * 2) * 0.1;
    }

    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.cos(time * 2.5) * 0.15 + 0.1;
    }

    /* Head Motion during talking */
    if (headRef.current) {
      if (isTalking) {
        headRef.current.rotation.y = Math.sin(time * 6) * 0.12;
        headRef.current.rotation.z = Math.cos(time * 5) * 0.05;
      } else {
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, 0, 0.1);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0, 0.1);
      }
    }

    /* Talking mouth sync */
    if (mouthRef.current) {
      if (isTalking) {
        const mouthScale = 0.5 + Math.abs(Math.sin(time * 10)) * 0.6;
        mouthRef.current.scale.y = mouthScale;
        mouthRef.current.scale.x = 1 + Math.sin(time * 8) * 0.1;
      } else {
        mouthRef.current.scale.y = THREE.MathUtils.lerp(mouthRef.current.scale.y, 0.35, 0.1);
        mouthRef.current.scale.x = THREE.MathUtils.lerp(mouthRef.current.scale.x, 1, 0.1);
      }
    }

    /* Breathing bounce */
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(time * 2) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={bodyRef}>

        {/* =========================
            HEAD & FACIAL FEATURES
        ========================== */}
        <group ref={headRef} position={[0, 0.65, 0]}>
          {/* Main Head Base */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[1.12, 64, 64]} />
            <meshPhysicalMaterial
              color="#38bdf8"
              clearcoat={0.6}
              clearcoatRoughness={0.1}
              roughness={0.2}
              metalness={0.2}
            />
          </mesh>

          {/* Visor Screen Background */}
          <mesh position={[0, 0.1, 0.62]} rotation={[0.1, 0, 0]}>
            <sphereGeometry args={[0.72, 32, 32]} />
            <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.9} />
          </mesh>

          {/* Left Eye */}
          <group position={[-0.34, 0.22, 1.25]}>
            <mesh castShadow>
              <sphereGeometry args={[0.12, 32, 32]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} />
            </mesh>
            <mesh position={[-0.03, 0.04, 0.09]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color="white" />
            </mesh>
          </group>

          {/* Right Eye */}
          <group position={[0.34, 0.22, 1.25]}>
            <mesh castShadow>
              <sphereGeometry args={[0.12, 32, 32]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} />
            </mesh>
            <mesh position={[-0.03, 0.04, 0.09]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color="white" />
            </mesh>
          </group>

          {/* Dynamic Mouth */}
          <mesh ref={mouthRef} position={[0, -0.15, 1.28]} scale={[1, 0.35, 0.4]}>
            <capsuleGeometry args={[0.12, 0.22, 16, 16]} />
            <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={1.2} />
          </mesh>
        </group>

        {/* =========================
            TORSO / BODY
        ========================== */}
        <RoundedBox
          args={[1.7, 1.55, 1.3]}
          radius={0.4}
          smoothness={5}
          position={[0, -0.9, 0]}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color="#0f172a"
            roughness={0.3}
            metalness={0.4}
            clearcoat={0.3}
          />
        </RoundedBox>

        {/* Cyber Core / Chest Reactor */}
        {/* Cyber Core / Chest Reactor */}
        <mesh position={[0, -0.85, 0.68]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.1, 32]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={3}
          />
        </mesh>

        {/* Outer Ring on Chest */}
        <mesh position={[0, -0.85, 0.66]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.38, 0.04, 16, 32]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* =========================
            LEFT ARM
        ========================== */}
        <group ref={leftArmRef} position={[-1.1, -0.65, 0]}>
          <RoundedBox
            args={[0.38, 1.0, 0.4]}
            radius={0.16}
            smoothness={4}
            rotation={[0, 0, 0.25]}
            castShadow
          >
            <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.3} />
          </RoundedBox>

          <mesh position={[-0.15, -0.55, 0]}>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.2} />
          </mesh>
        </group>

        {/* =========================
            RIGHT ARM (WAVING)
        ========================== */}
        <group ref={rightArmRef} position={[1.1, -0.3, 0]}>
          <RoundedBox
            args={[0.38, 1.05, 0.4]}
            radius={0.16}
            smoothness={4}
            rotation={[0, 0, -0.4]}
            castShadow
          >
            <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.3} />
          </RoundedBox>

          <mesh position={[0.15, 0.55, 0]} castShadow>
            <sphereGeometry args={[0.24, 32, 32]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.2} />
          </mesh>
        </group>

        {/* =========================
            STAGING PLATFORM (TECH RING)
        ========================== */}
        <mesh position={[0, -2.0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.3, 64]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>

      </group>
    </Float>
  );
}

/* -----------------------------
   Main Component Container
------------------------------ */

export default function Character({ isTalking }: CharacterProps) {
  return (
    <div className="relative w-full h-[320px] sm:h-[340px] flex items-center justify-center">
      {/* Background Soft Neon Radial Gradient */}
      <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent blur-2xl pointer-events-none" />

      <Canvas
        shadows
        camera={{
          position: [0, 0.4, 5.8],
          fov: 42,
        }}
        className="w-full h-full"
      >
        {/* Ambient & Key Lights */}
        <ambientLight intensity={0.6} />

        <directionalLight
          position={[5, 8, 5]}
          intensity={2.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Neon Rim Lights */}
        <pointLight position={[-4, 3, 2]} intensity={2} color="#06b6d4" />
        <pointLight position={[4, -1, 2]} intensity={1.5} color="#ec4899" />

        {/* Character */}
        <CharacterModel isTalking={isTalking} />

        {/* Floor Shadows */}
        <ContactShadows
          position={[0, -2.0, 0]}
          opacity={0.6}
          scale={6}
          blur={2.2}
          far={4}
        />

        {/* Lighting Atmosphere */}
        <Environment preset="night" />


        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={(Math.PI * 2) / 3.2}
        />
      </Canvas>
    </div>
  );
}