import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Projects from "../pages/Projects";
import { projects } from "../content/projects";

describe("Projects", () => {
  it("renders one card per project in the content module", () => {
    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>,
    );
    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(projects.length);
  });
});
