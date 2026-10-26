import { useRef } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { Skill } from "../data/skills";

export type BallState = {
  skill: Skill;
  home: [number, number, number];
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  phase: number;
  radius: number;
  meshRef: { current: THREE.Mesh | null };
  hovered: boolean;
};

type Props = {
  ball: BallState;
};

/**
 * Renders a single skill sphere using MeshPhongMaterial for the Apple Siri /
 * AI gradient-sphere look: dark base + specular highlight driven by point light.
 */
export default function SkillBall({ ball }: Props) {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Sync internal ref so the simulation cluster can move this mesh
  ball.meshRef.current = meshRef.current;

  // Font size proportional to sphere radius, clamped between 8px and 14px
  const fontSize = Math.round(
    Math.min(14, Math.max(8, ball.radius * 9.5)),
  );

  return (
    <mesh
      ref={(node) => {
        meshRef.current = node!;
        ball.meshRef.current = node;
      }}
      position={ball.home}
      onPointerOver={(e) => {
        e.stopPropagation();
        ball.hovered = true;
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        ball.hovered = false;
        document.body.style.cursor = "";
      }}
    >
      {/* Outer wireframe shell */}
      <sphereGeometry args={[ball.radius, 16, 12]} />
      <meshBasicMaterial
        color="#2a7a8a"
        wireframe={true}
        transparent={true}
        opacity={0.3}
      />

      {/* Inner solid fill — gives depth behind the wireframe */}
      <mesh scale={0.97}>
        <sphereGeometry args={[ball.radius, 16, 12]} />
        <meshBasicMaterial
          color="#0d2a35"
          transparent={true}
          opacity={0.7}
        />
      </mesh>

      {/* Skill label — HTML overlay centred on the sphere */}
      <Html
        center
        style={{ pointerEvents: "none" }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: `${fontSize}px`,
            fontWeight: 600,
            color: "#fafafa",
            whiteSpace: "nowrap",
            textShadow: "0 1px 6px rgba(0,0,0,0.8)",
            userSelect: "none",
            letterSpacing: "0.02em",
          }}
        >
          {ball.skill.label}
        </span>
      </Html>
    </mesh>
  );
}
