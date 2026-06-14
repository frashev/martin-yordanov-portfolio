import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll helper. Returns a `ref` to attach to the element and an
 * `isRevealed` flag that flips to `true` once the element scrolls into view.
 *
 * Degrades gracefully: when `IntersectionObserver` is unavailable (e.g. jsdom
 * in tests), the element is revealed immediately so content is never stuck
 * hidden. The element should render fully visible in its baseline state - the
 * hidden start state is a motion enhancement applied via CSS (`.reveal`).
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node || typeof IntersectionObserver === "undefined") {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isRevealed };
}
