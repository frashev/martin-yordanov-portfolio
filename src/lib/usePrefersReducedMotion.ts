import { useEffect, useState } from "react";

// The OS-level accessibility signal: "I get motion sick / distracted by movement."
// We honour it for *autoplay* motion (looping hero video, auto-advancing carousel)
// while keeping the subtle, user-triggered reveals that carry the brand feel.
const QUERY = "(prefers-reduced-motion: reduce)";

export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia?.(QUERY);
    if (!mq) return;
    const onChange = () => setPrefersReduced(mq.matches);
    onChange();
    // Modern API first; fall back to addListener for legacy WebKit (Safari ≤13).
    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);

  return prefersReduced;
}
