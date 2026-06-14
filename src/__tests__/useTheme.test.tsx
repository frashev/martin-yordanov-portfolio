import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useTheme } from "../lib/useTheme";

// Controllable matchMedia mock: lets a test flip the "OS" preference and fire
// the `change` event a real OS toggle would (Playwright's emulateMedia mutates
// `.matches` but does NOT dispatch `change`, so this is where live-follow is proven).
function mockMatchMedia(initialDark: boolean) {
  let matches = initialDark;
  const listeners = new Set<() => void>();
  const mql = {
    get matches() {
      return matches;
    },
    media: "(prefers-color-scheme: dark)",
    addEventListener: (_type: string, cb: () => void) => listeners.add(cb),
    removeEventListener: (_type: string, cb: () => void) =>
      listeners.delete(cb),
    addListener: (cb: () => void) => listeners.add(cb),
    removeListener: (cb: () => void) => listeners.delete(cb),
    dispatchEvent: () => true,
  };
  window.matchMedia = vi
    .fn()
    .mockReturnValue(mql) as unknown as typeof window.matchMedia;
  return {
    setDark(next: boolean) {
      matches = next;
      listeners.forEach((cb) => cb());
    },
  };
}

describe("useTheme — system mode", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("follows a live OS change while in system mode", () => {
    const ctrl = mockMatchMedia(false);
    localStorage.setItem("theme", "system");

    const { result } = renderHook(() => useTheme());
    expect(result.current[0]).toBe("system"); // choice
    expect(result.current[1]).toBe("light"); // resolved
    expect(document.documentElement.getAttribute("data-theme")).toBeNull();

    act(() => ctrl.setDark(true));
    expect(result.current[1]).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

    act(() => ctrl.setDark(false));
    expect(result.current[1]).toBe("light");
    expect(document.documentElement.getAttribute("data-theme")).toBeNull();
  });

  it("a pinned choice ignores OS changes", () => {
    const ctrl = mockMatchMedia(false);
    localStorage.setItem("theme", "dark");

    const { result } = renderHook(() => useTheme());
    expect(result.current[1]).toBe("dark");

    act(() => ctrl.setDark(true));
    expect(result.current[1]).toBe("dark");
    act(() => ctrl.setDark(false));
    expect(result.current[1]).toBe("dark");
  });

  it("cycles the choice Light → Dark → System → Light", () => {
    mockMatchMedia(false);
    localStorage.setItem("theme", "light");

    const { result } = renderHook(() => useTheme());
    expect(result.current[0]).toBe("light");

    act(() => result.current[2]());
    expect(result.current[0]).toBe("dark");
    act(() => result.current[2]());
    expect(result.current[0]).toBe("system");
    act(() => result.current[2]());
    expect(result.current[0]).toBe("light");
  });
});
