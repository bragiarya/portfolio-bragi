import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { skills } from "../data/skills";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import SkillBall from "./SkillBall";
import type { BallState } from "./SkillBall";

function SimulationCluster({
  reduced,
  cursorActive,
}: {
  reduced: boolean;
  cursorActive: React.MutableRefObject<boolean>;
}) {
  const cursorWorld = useRef(new THREE.Vector3(9999, 9999, 0));
  const tmpVec = useMemo(() => new THREE.Vector3(), []);

  // Compute spherical home positions for the 7 skills
  const balls = useMemo<BallState[]>(() => {
    const n = skills.length;
    const R = 3.6;
    const offset = 2 / n;
    const inc = Math.PI * (3 - Math.sqrt(5));
    return skills.map((skill, i) => {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = i * inc;
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;
      const home: [number, number, number] = [x * R, y * R, z * R * 0.4];
      return {
        skill,
        home,
        pos: new THREE.Vector3(...home),
        vel: new THREE.Vector3(0, 0, 0),
        phase: i * 1.7,
        radius: skill.radius,
        meshRef: { current: null },
        hovered: false,
      };
    });
  }, []);

  useFrame((state) => {
    const camera = state.camera;

    // Unproject 2D cursor to z=0 world plane
    if (cursorActive.current) {
      tmpVec.set(state.pointer.x, state.pointer.y, 0.5).unproject(camera);
      tmpVec.sub(camera.position).normalize();
      const distance = -camera.position.z / tmpVec.z;
      cursorWorld.current.set(
        camera.position.x + tmpVec.x * distance,
        camera.position.y + tmpVec.y * distance,
        0,
      );
    } else {
      cursorWorld.current.set(9999, 9999, 0);
    }

    // Convert 200px threshold to 3D world units at z=0 plane
    const visibleHeightWorld = 2 * 11 * Math.tan((45 * Math.PI) / 360);
    const pxToWorld = visibleHeightWorld / Math.max(state.size.height, 1);
    const radius200World = 200 * pxToWorld;
    const t = state.clock.elapsedTime;

    // 1 & 2 & 4: Physics update per ball
    for (let i = 0; i < balls.length; i++) {
      const b = balls[i];

      if (reduced) {
        b.pos.set(...b.home);
        if (b.meshRef.current) b.meshRef.current.position.copy(b.pos);
        continue;
      }

      // 4. Floating idle slight oscillation using sin(time) per ball
      const idleX = Math.sin(t * 0.7 + b.phase) * 0.06;
      const idleY = Math.cos(t * 0.55 + b.phase * 1.3) * 0.06;
      const idleZ = Math.sin(t * 0.6 + b.phase * 0.7) * 0.05;
      const originX = b.home[0] + idleX;
      const originY = b.home[1] + idleY;
      const originZ = b.home[2] + idleZ;

      // Distance from ball to cursor on XY plane
      const dx = cursorWorld.current.x - b.pos.x;
      const dy = cursorWorld.current.y - b.pos.y;
      const distToCursor = Math.sqrt(dx * dx + dy * dy);

      // 1. ATTRACTION (tarik ke cursor saat dalam radius 200px)
      // Kekuatan tarik: velocity += (cursorPos - ballPos) * 0.008
      if (cursorActive.current && distToCursor <= radius200World) {
        b.vel.x += (cursorWorld.current.x - b.pos.x) * 0.008;
        b.vel.y += (cursorWorld.current.y - b.pos.y) * 0.008;
        b.vel.z += (originZ - b.pos.z) * 0.03;
      } else {
        // 2. FLOAT BACK (balik ke posisi asal saat > 200px)
        // velocity += (origin - ballPos) * 0.03
        b.vel.x += (originX - b.pos.x) * 0.03;
        b.vel.y += (originY - b.pos.y) * 0.03;
        b.vel.z += (originZ - b.pos.z) * 0.03;
      }

      // Damping: velocity *= 0.88 setiap frame
      b.vel.x *= 0.88;
      b.vel.y *= 0.88;
      b.vel.z *= 0.88;

      // Update position
      b.pos.x += b.vel.x;
      b.pos.y += b.vel.y;
      b.pos.z += b.vel.z;
    }

    // 3. COLLISION antar bola (bola tidak tumpang tindih)
    if (!reduced) {
      for (let iter = 0; iter < 3; iter++) {
        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            const b1 = balls[i];
            const b2 = balls[j];
            const cdx = b1.pos.x - b2.pos.x;
            const cdy = b1.pos.y - b2.pos.y;
            const cdz = (b1.pos.z - b2.pos.z) * 0.5;
            const dist = Math.sqrt(cdx * cdx + cdy * cdy + cdz * cdz);
            const minDist = b1.radius + b2.radius;

            if (dist < minDist && dist > 0.0001) {
              const overlap = (minDist - dist) / dist;
              const pushX = cdx * overlap * 0.5;
              const pushY = cdy * overlap * 0.5;
              const pushZ = cdz * overlap * 0.5;

              b1.pos.x += pushX;
              b1.pos.y += pushY;
              b1.pos.z += pushZ;
              b2.pos.x -= pushX;
              b2.pos.y -= pushY;
              b2.pos.z -= pushZ;

              // Damp relative velocity along collision normal
              const dvx = b1.vel.x - b2.vel.x;
              const dvy = b1.vel.y - b2.vel.y;
              const dvz = b1.vel.z - b2.vel.z;
              const normalDot = (dvx * cdx + dvy * cdy + dvz * cdz) / (dist * dist);
              if (normalDot < 0) {
                b1.vel.x -= normalDot * cdx * 0.5;
                b1.vel.y -= normalDot * cdy * 0.5;
                b1.vel.z -= normalDot * cdz * 0.5;
                b2.vel.x += normalDot * cdx * 0.5;
                b2.vel.y += normalDot * cdy * 0.5;
                b2.vel.z += normalDot * cdz * 0.5;
              }
            }
          }
        }
      }
    }

    // Sync positions and visual hover states to Three.js objects
    for (let i = 0; i < balls.length; i++) {
      const b = balls[i];
      if (b.meshRef.current) {
        b.meshRef.current.position.copy(b.pos);
        const targetScale = b.hovered ? 1.28 : 1;
        const currentScale = b.meshRef.current.scale.x;
        b.meshRef.current.scale.setScalar(
          currentScale + (targetScale - currentScale) * 0.15,
        );
      }
    }
  });

  return (
    <group>
      {/* Invisible plane covering whole canvas for smooth cursor interaction */}
      <mesh
        visible={false}
        position={[0, 0, -1]}
        onPointerMove={() => {
          cursorActive.current = true;
        }}
      >
        <planeGeometry args={[50, 50]} />
      </mesh>

      {balls.map((ball) => (
        <SkillBall key={ball.skill.id} ball={ball} />
      ))}
    </group>
  );
}

export default function PhysicsSkillBalls() {
  const reduced = usePrefersReducedMotion();
  const cursorActive = useRef(false);

  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop={reduced ? "demand" : "always"}
      onPointerEnter={() => {
        cursorActive.current = true;
      }}
      onPointerMove={() => {
        cursorActive.current = true;
      }}
      onPointerLeave={() => {
        cursorActive.current = false;
      }}
    >
      {/* Neutral ambient — allows base teal to show without color cast */}
      <ambientLight intensity={0.25} color="#ffffff" />
      {/* Asymmetric key light from bottom-right-front → dark top-left, bright teal bottom-right */}
      <pointLight position={[5, -8, 10]} intensity={5} color="#68cfeb" />
      {/* Soft rim from top-left to separate sphere edge from background */}
      <pointLight position={[-4, 6, 8]} intensity={0.8} color="#aaddee" />
      <SimulationCluster reduced={reduced} cursorActive={cursorActive} />
    </Canvas>
  );
}
