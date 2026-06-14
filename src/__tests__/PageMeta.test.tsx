import { describe, expect, it, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PageMeta from "../components/PageMeta";
import { siteUrl } from "../content/seo";

afterEach(() => {
  cleanup();
  document.title = "";
});

function renderMeta(props: {
  title: string;
  description: string;
  path?: string;
}) {
  return render(
    <MemoryRouter initialEntries={[props.path ?? "/"]}>
      <PageMeta title={props.title} description={props.description} />
    </MemoryRouter>,
  );
}

describe("PageMeta", () => {
  it("sets document.title to the provided title", () => {
    renderMeta({ title: "Hello World", description: "A test page" });
    expect(document.title).toBe("Hello World");
  });

  it("sets a meta description matching the provided description", () => {
    renderMeta({ title: "X", description: "A unique description 12345" });
    const meta = document.querySelector('meta[name="description"]');
    expect(meta).not.toBeNull();
    expect(meta?.getAttribute("content")).toBe("A unique description 12345");
  });

  it("sets og:title to match the page title", () => {
    renderMeta({ title: "About", description: "..." });
    const og = document.querySelector('meta[property="og:title"]');
    expect(og?.getAttribute("content")).toBe("About");
  });

  it("bases canonical + og:url on siteUrl, not the current host", () => {
    renderMeta({ title: "Process", description: "...", path: "/process" });
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute("href")).toBe(`${siteUrl}/process`);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    expect(ogUrl?.getAttribute("content")).toBe(`${siteUrl}/process`);
  });

  it("removes its meta tags on unmount", () => {
    const { unmount } = renderMeta({
      title: "TempTitle",
      description: "TempDesc",
    });
    expect(document.title).toBe("TempTitle");
    unmount();
    expect(document.title).not.toBe("TempTitle");
    expect(document.querySelector('meta[property="og:title"]')).toBeNull();
  });
});
