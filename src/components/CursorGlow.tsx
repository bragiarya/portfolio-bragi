import { useEffect, useRef } from "react";

/**
 * Soft teal glow that trails the pointer. Palette-derived (accent), screen-blended.
 * Disabled for reduced-motion and for devices without a fine pointer.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none)").matches;
    if (reduce || coarse) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;
    let shown = false;

    const onMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      if (!shown) {
        el.style.opacity = "0.5";
        shown = true;
      }
    };

    const onLeave = () => {
      el.style.opacity = "0";
      shown = false;
    };

    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="cursor-glow" />;
}
