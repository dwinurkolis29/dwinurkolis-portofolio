"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

/**
 * Giant headline that slides and fades as it travels through the viewport.
 * Progress p ∈ [0, 1] (0 = just entering at the bottom, 1 = just left at the top)
 * drives `--shift` and `--fade`; a faint outlined copy moves the opposite way.
 * Server HTML and reduced motion render it centred at full opacity.
 */
export function ScrollHeadline({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--shift", (0.5 - p).toFixed(4));
      el.style.setProperty("--fade", (1 - Math.abs(p - 0.5)).toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      el.style.removeProperty("--shift");
      el.style.removeProperty("--fade");
    };
  }, [reduced]);

  return (
    <div ref={ref} className="relative overflow-hidden py-4">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-4 select-none text-center font-mono text-[clamp(3rem,12vw,9rem)] font-bold leading-[0.95] tracking-tighter text-transparent opacity-30 [-webkit-text-stroke:1px_var(--accent)] [translate:calc(var(--shift,0)*-30vw)_0]"
      >
        {text}
      </p>
      <h2 className="relative text-center font-mono text-[clamp(3rem,12vw,9rem)] font-bold leading-[0.95] tracking-tighter text-foreground [opacity:var(--fade,1)] [translate:calc(var(--shift,0)*30vw)_0]">
        {text}
      </h2>
    </div>
  );
}
