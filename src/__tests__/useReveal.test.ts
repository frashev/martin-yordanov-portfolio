import { createElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, renderHook, waitFor } from "@testing-library/react";
import { useReveal } from "../lib/useReveal";

describe("useReveal", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("reveals immediately when IntersectionObserver is unavailable (jsdom)", async () => {
    // jsdom provides neither IntersectionObserver nor matchMedia, so the hook
    // should fall back to revealing content right away — never leaving it hidden.
    const { result } = renderHook(() => useReveal());
    await waitFor(() => expect(result.current.isRevealed).toBe(true));
  });

  it("returns a ref to attach to the target element", () => {
    const { result } = renderHook(() => useReveal<HTMLDivElement>());
    expect(result.current).toHaveProperty("ref");
    expect(result.current.ref).toHaveProperty("current");
  });

  it("disconnects the IntersectionObserver on unmount", async () => {
    const observe = vi.fn();
    const disconnect = vi.fn();

    class MockIntersectionObserver {
      readonly root = null;
      readonly rootMargin = "";
      readonly thresholds = [];
      observe = observe;
      unobserve = vi.fn();
      disconnect = disconnect;
      takeRecords = () => [];
    }

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

    function Target() {
      const { ref } = useReveal<HTMLDivElement>();
      return createElement("div", { ref });
    }

    const { unmount } = render(createElement(Target));

    await waitFor(() => {
      expect(observe).toHaveBeenCalledTimes(1);
    });

    unmount();

    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it("still observes when the OS reports reduced motion", async () => {
    const observe = vi.fn();

    class MockIntersectionObserver {
      readonly root = null;
      readonly rootMargin = "";
      readonly thresholds = [];
      observe = observe;
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = () => [];
    }

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: true,
        media: "(prefers-reduced-motion: reduce)",
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    );

    function Target() {
      const { ref } = useReveal<HTMLDivElement>();
      return createElement("div", { ref });
    }

    render(createElement(Target));

    await waitFor(() => {
      expect(observe).toHaveBeenCalledTimes(1);
    });
  });
});
