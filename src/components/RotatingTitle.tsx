import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type Props = {
  words: readonly string[];
  /** Interval between swaps (ms). PRD: 2000. */
  intervalMs?: number;
  /** Swap duration (s). PRD/DESIGN: 0.4. */
  duration?: number;
  className?: string;
};

/**
 * Rotating title using the free GSAP TextPlugin.
 * Cycles every `intervalMs` with a `duration`-second text swap.
 */
export default function RotatingTitle({
  words,
  intervalMs = 2000,
  duration = 0.4,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || words.length === 0) return;

    el.textContent = words[0];
    if (reduced || words.length === 1) return;

    let index = 0;
    const swap = () => {
      index = (index + 1) % words.length;
      gsap.to(el, {
        duration,
        text: words[index],
        ease: "power2.out",
      });
    };

    const id = window.setInterval(swap, intervalMs);
    return () => window.clearInterval(id);
  }, [words, intervalMs, duration, reduced]);

  return (
    <span ref={ref} className={className} aria-live="polite">
      {words[0]}
    </span>
  );
}
