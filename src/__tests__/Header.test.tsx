import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import Header from "../components/Header";
import { primaryNav } from "../content/navigation";

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
}

describe("Header", () => {
  it("renders one link per primaryNav entry (desktop nav)", () => {
    renderHeader();
    const desktopNav = screen.getByRole("navigation", { name: /^primary$/i });
    const links = within(desktopNav).getAllByRole("link");
    expect(links).toHaveLength(primaryNav.length);
    for (const item of primaryNav) {
      expect(
        within(desktopNav).getByRole("link", { name: item.label }),
      ).toBeInTheDocument();
    }
  });

  it("reveals the mobile nav when the toggle is clicked", async () => {
    const user = userEvent.setup();
    renderHeader();

    expect(
      screen.queryByRole("navigation", { name: /primary mobile/i }),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /toggle navigation menu/i }),
    );

    const mobileNav = screen.getByRole("navigation", {
      name: /primary mobile/i,
    });
    expect(within(mobileNav).getAllByRole("link")).toHaveLength(
      primaryNav.length,
    );
  });

  it("cycles the theme choice Light → Dark → System → Light", async () => {
    const user = userEvent.setup();
    localStorage.setItem("theme", "light");
    renderHeader();

    // Starts on Light → next action is Dark.
    let button = screen.getByRole("button", { name: /switch to dark mode/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
    button = screen.getByRole("button", { name: /switch to system theme/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
    button = screen.getByRole("button", { name: /switch to light mode/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(
      screen.getByRole("button", { name: /switch to dark mode/i }),
    ).toBeInTheDocument();
  });

  it("toggles the hamburger icon state and aria-expanded", async () => {
    const user = userEvent.setup();
    renderHeader();

    const button = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button.querySelector(".hamburger.is-open")).toBeNull();

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button.querySelector(".hamburger.is-open")).not.toBeNull();

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button.querySelector(".hamburger.is-open")).toBeNull();
  });
});
