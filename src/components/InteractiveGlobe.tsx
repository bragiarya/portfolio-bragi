import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { identity } from "../data/content";

useGLTF.preload("/models/holographic-globe.glb");

function GlobeModel({
  onLoad,
  mouseRef,
  reduced,
}: {
  onLoad: () => void;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  reduced: boolean;
}) {
  const { scene } = useGLTF("/models/holographic-globe.glb");
  const modelRef = useRef<THREE.Group>(null);
  const pivotRef = useRef<THREE.Group>(null);
  const baseRotationY = useRef(0);

  // Normalize the loaded scene to a consistent size and center it on the origin.
  useLayoutEffect(() => {
    const obj = modelRef.current;
    if (!obj) return;
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2 / maxDim;
    obj.scale.setScalar(scale);
    obj.position.copy(center).multiplyScalar(-scale);
  }, []);

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  useFrame(() => {
    const pivot = pivotRef.current;
    if (!pivot) return;

    if (!reduced) {
      // Auto-rotate idle (kecepatan 0.001 per frame)
      baseRotationY.current += 0.001;
    }

    // Cursor tracking target rotation
    // rotation.y target = mouseX * 0.4 (kiri-kanan)
    // rotation.x target = mouseY * 0.2 (atas-bawah)
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;

    const targetY = baseRotationY.current + mouseX * 0.4;
    const targetX = mouseY * 0.2;

    // Smooth lerp (faktor 0.05)
    pivot.rotation.y += (targetY - pivot.rotation.y) * 0.05;
    pivot.rotation.x += (targetX - pivot.rotation.x) * 0.05;
  });

  return (
    <group ref={pivotRef}>
      <primitive ref={modelRef} object={scene} />
    </group>
  );
}

export default function InteractiveGlobe() {
  const reduced = usePrefersReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  // 1. Lacak posisi mouse di window, normalisasi ke -1..1 per axis
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div className="globe-stage">
      {!loaded && <div className="globe-loader" aria-hidden="true" />}

      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        frameloop={reduced ? "demand" : "always"}
      >
        <ambientLight intensity={0.8} />
        <hemisphereLight color="#78cdd7" groundColor="#0d5c63" intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={1.1} />
        <pointLight position={[-3, -2, 2]} intensity={2} color="#78cdd7" distance={14} />
        <pointLight position={[3, 2, -2]} intensity={1.4} color="#44a1a0" distance={14} />

        <GlobeModel onLoad={() => setLoaded(true)} mouseRef={mouseRef} reduced={reduced} />
      </Canvas>

      <p className="globe-credit" title={identity.globeCredit}>
        {identity.globeCredit}
      </p>
    </div>
  );
}
