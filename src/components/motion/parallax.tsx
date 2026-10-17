"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Tracks the pointer (fine pointers only, motion allowed) and exposes its position
 * relative to this element's centre as CSS vars `--px` / `--py` in [-1, 1].
 */
export function ParallaxGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    const apply = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--px", clamp((x - (r.left + r.width / 2)) / (r.width / 2)).toFixed(3));
      el.style.setProperty("--py", clamp((y - (r.top + r.height / 2)) / (r.height / 2)).toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      el.style.removeProperty("--px");
      el.style.removeProperty("--py");
    };
  }, [reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Shifts by up to `depth` px along each axis following the nearest ParallaxGroup. */
export function ParallaxLayer({
  depth,
  children,
  className = "",
}: {
  depth: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`parallax-layer ${className}`}
      style={{ "--depth": depth } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
