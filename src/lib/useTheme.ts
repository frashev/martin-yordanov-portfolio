import { useEffect, useState } from "react";

// The user's *choice* — what we persist. "system" follows the OS preference.
export type ThemeChoice = "light" | "dark" | "system";
// The *resolved* theme — what actually paints.
type ResolvedTheme = "light" | "dark";

// Click order: Light → Dark → System → Light.
const CYCLE: ThemeChoice[] = ["light", "dark", "system"];

function osPrefersDark(): boolean {
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
}

function readChoice(): ThemeChoice {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved;
    }
  } catch {
    // localStorage unavailable (private mode / storage quota)
  }
  // First visit: follow the device until the user picks.
  return "system";
}

function applyResolved(resolved: ResolvedTheme) {
  if (resolved === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

export function useTheme(): [ThemeChoice, ResolvedTheme, () => void] {
  const [choice, setChoice] = useState<ThemeChoice>(() => readChoice());
  const [systemDark, setSystemDark] = useState<boolean>(() => osPrefersDark());

  // Resolved theme is derived (no effect-driven state) so render stays the
  // single source of truth: a pinned choice wins; "system" tracks the OS.
  const resolved: ResolvedTheme =
    choice === "system" ? (systemDark ? "dark" : "light") : choice;

  // Side-effect only: keep the <html> attribute in sync with the resolved theme.
  useEffect(() => {
    applyResolved(resolved);
  }, [resolved]);

  // Side-effect only: persist the choice.
  useEffect(() => {
    try {
      localStorage.setItem("theme", choice);
    } catch {
      // localStorage unavailable (private mode / storage quota)
    }
  }, [choice]);

  // Track live OS-preference changes; only affects render while in System mode.
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return;
    const onChange = () => setSystemDark(mq.matches);
    // Prefer the modern API; fall back to the deprecated addListener for
    // legacy WebKit (Safari ≤13) where MediaQueryList has no addEventListener.
    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);

  function cycleTheme() {
    setChoice((current) => CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length]);
  }

  return [choice, resolved, cycleTheme];
}
