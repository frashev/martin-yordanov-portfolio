import { useEffect, useState } from "react";

const HYSTERESIS = 50;

export function useScrollDepth(threshold = 300) {
  const [hasReachedDepth, setHasReachedDepth] = useState(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setHasReachedDepth((prev) => {
        if (!prev && y >= threshold) return true;
        if (prev && y < threshold - HYSTERESIS) return false;
        return prev;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [threshold]);

  return hasReachedDepth;
}
