"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function Knot({ active }: { active: boolean }) {
  const group = useRef<{ rotation: { x: number; y: number } } | null>(null);
  const target = useRef({ x: 0.28, y: -0.4 });
  const { gl, invalidate } = useThree();
  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (!active) return;
      const rect = gl.domElement.getBoundingClientRect();
      target.current = { x: 0.28 + ((event.clientY - rect.top) / rect.height - 0.5) * 0.7, y: -0.4 + ((event.clientX - rect.left) / rect.width - 0.5) * 1.2 };
      invalidate();
    };
    gl.domElement.addEventListener("pointermove", move, { passive: true });
    return () => gl.domElement.removeEventListener("pointermove", move);
  }, [active, gl, invalidate]);
  useFrame((_, delta) => {
    if (!group.current || !active) return;
    const factor = 1 - Math.exp(-6 * Math.min(delta, 0.05));
    group.current.rotation.x = lerp(group.current.rotation.x, target.current.x, factor);
    group.current.rotation.y = lerp(group.current.rotation.y, target.current.y, factor);
    if (Math.abs(group.current.rotation.x - target.current.x) + Math.abs(group.current.rotation.y - target.current.y) > 0.001) invalidate();
  });
  return <group ref={group} rotation={[0.28, -0.4, -0.25]}>
    <mesh><torusKnotGeometry args={[1.18, 0.34, 160, 24, 2, 3]} /><meshStandardMaterial color="#c86232" metalness={0.72} roughness={0.27} /></mesh>
    <mesh scale={1.035}><torusKnotGeometry args={[1.18, 0.34, 80, 8, 2, 3]} /><meshBasicMaterial color="#f7b67b" wireframe transparent opacity={0.16} /></mesh>
    <mesh rotation={[Math.PI / 2.8, 0.3, 0]}><torusGeometry args={[2, 0.009, 8, 100]} /><meshBasicMaterial color="#aa9a80" /></mesh>
    <mesh position={[1.88, 0.15, 0.55]}><sphereGeometry args={[0.11, 16, 12]} /><meshStandardMaterial color="#ff5b28" roughness={0.3} metalness={0.4} /></mesh>
  </group>;
}
export default function Sculpture({ active, onReady, onFailure }: { active: boolean; onReady: () => void; onFailure: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  const onFailureRef = useRef(onFailure);
  useEffect(() => {
    onFailureRef.current = onFailure;
  }, [onFailure]);
  useEffect(() => {
    // Capture phase on the wrapper: webglcontextlost does not bubble, but
    // ancestors still observe it while capturing — independent of when R3F
    // mounts the underlying canvas element.
    const element = host.current;
    const lost = (event: Event) => { event.preventDefault(); onFailureRef.current(); };
    element?.addEventListener("webglcontextlost", lost, true);
    return () => element?.removeEventListener("webglcontextlost", lost, true);
  }, []);
  return <div ref={host} style={{ width: "100%", height: "100%", display: "contents" }}><Canvas data-testid="hero-canvas" frameloop={active ? "demand" : "never"} dpr={[1, 1.5]} camera={{ position: [0, 0, 6.5], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }} fallback={<span className="sr-only">Static sculpture</span>} onCreated={onReady}>
    <ambientLight intensity={1.4} /><directionalLight position={[3, 4, 5]} intensity={5} color="#fff1d6" /><directionalLight position={[-4, 0, 3]} intensity={3} color="#ffcda9" /><directionalLight position={[0, -3, -2]} intensity={4} color="#e87543" />
    <Suspense fallback={null}><Knot active={active} /></Suspense>
  </Canvas></div>;
}
