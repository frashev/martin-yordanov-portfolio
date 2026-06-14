import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, Route, Routes } from "react-router";
import Layout from "../components/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/projects"
          element={
            <div>
              <h1 tabIndex={-1}>Projects</h1>
              <Link to="/process">Go to process</Link>
            </div>
          }
        />
        <Route
          path="/process"
          element={
            <div>
              <h1 tabIndex={-1}>Process</h1>
              <Link to="/no-h1">Go to no-h1</Link>
            </div>
          }
        />
        <Route path="/no-h1" element={<p>No heading here</p>} />
      </Route>
    </Routes>
  );
}

describe("Layout - page-level accessibility", () => {
  it("renders a skip-to-content link pointing at #main", () => {
    render(
      <MemoryRouter initialEntries={["/projects"]}>
        <App />
      </MemoryRouter>,
    );
    const skip = screen.getByRole("link", { name: /skip to main content/i });
    expect(skip).toBeInTheDocument();
    expect(skip).toHaveAttribute("href", "#main");
  });

  it("makes the main element programmatically focusable", () => {
    render(
      <MemoryRouter initialEntries={["/projects"]}>
        <App />
      </MemoryRouter>,
    );
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main");
    expect(main).toHaveAttribute("tabindex", "-1");
  });

  it("activates the skip link and moves focus to main", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/projects"]}>
        <App />
      </MemoryRouter>,
    );
    const skip = screen.getByRole("link", { name: /skip to main content/i });
    const main = screen.getByRole("main");
    await user.click(skip);
    expect(document.activeElement).toBe(main);
  });

  it("moves focus to the new page h1 on route change", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/projects"]}>
        <App />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole("link", { name: /go to process/i }));
    const h1 = await screen.findByRole("heading", {
      level: 1,
      name: "Process",
    });
    await waitFor(() => {
      expect(document.activeElement).toBe(h1);
    });
  });

  it("falls back to main when the new page has no h1", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/process"]}>
        <App />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole("link", { name: /go to no-h1/i }));
    const main = screen.getByRole("main");
    await waitFor(() => {
      expect(document.activeElement).toBe(main);
    });
  });
});
