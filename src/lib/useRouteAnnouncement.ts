import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

/**
 * On every client-side route change, move keyboard focus to the new page's
 * `<h1>` (or to `<main id="main">` as a fallback) so assistive technology
 * re-announces the page. Does NOT fire on the initial render.
 */
export function useRouteAnnouncement(): void {
  const { pathname } = useLocation();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    if (previousPathname.current === null) {
      previousPathname.current = pathname;
      return;
    }
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    const moveFocus = () => {
      const main = document.getElementById("main");
      const heading = main?.querySelector("h1");
      const target = heading ?? main;
      target?.focus({ preventScroll: true });
    };

    if (typeof queueMicrotask === "function") {
      queueMicrotask(moveFocus);
    } else {
      Promise.resolve().then(moveFocus);
    }
  }, [pathname]);
}
