import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "../pages/Home";

describe("Home", () => {
  it("introduces Martin and links to the core portfolio routes", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /martin yordanov/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view projects/i })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(
      screen.getByRole("link", { name: /discuss a project/i }),
    ).toHaveAttribute("href", "/contact");
  });

  it("features both supplied project stories", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getAllByText(/kinetic sand table/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/wall plotter/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /motion made visible/i,
      }),
    ).toBeInTheDocument();
  });
});
