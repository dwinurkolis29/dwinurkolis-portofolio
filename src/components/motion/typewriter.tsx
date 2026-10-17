"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

const MS_PER_CHAR = 60;

/**
 * Renders the full text on the server and on first client render, then types it
 * out once after mount. Screen readers always get the full text (sr-only copy).
 */
export function Typewriter({ text, className }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(text.length);

  useEffect(() => {
    if (reduced) return;
    let shown = 0;
    let interval: number | undefined;
    const frame = requestAnimationFrame(() => {
      setCount(0);
      interval = window.setInterval(() => {
        shown += 1;
        setCount(shown);
        if (shown >= text.length) window.clearInterval(interval);
      }, MS_PER_CHAR);
    });
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(interval);
      setCount(text.length);
    };
  }, [reduced, text]);

  const visible = reduced ? text : text.slice(0, count);
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{visible}</span>
    </span>
  );
}
