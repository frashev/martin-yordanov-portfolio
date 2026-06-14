import { useState } from "react";
import type { ReactElement } from "react";
import { Link, NavLink } from "react-router";
import { primaryNav } from "../content/navigation";
import { useTheme } from "../lib/useTheme";

const SunIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM2 10a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 2 10ZM15 10a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 15 10ZM4.04 4.04a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 1 1-1.06 1.06L4.04 5.1a.75.75 0 0 1 0-1.06ZM13.84 13.84a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 1 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06ZM4.04 15.96a.75.75 0 0 1 0-1.06l1.06-1.06a.75.75 0 1 1 1.06 1.06l-1.06 1.06a.75.75 0 0 1-1.06 0ZM13.84 6.16a.75.75 0 0 1 0-1.06l1.06-1.06a.75.75 0 1 1 1.06 1.06l-1.06 1.06a.75.75 0 0 1-1.06 0ZM10 6.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
  </svg>
);

const MoonIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z"
      clipRule="evenodd"
    />
  </svg>
);

const MonitorIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M3 4a1.5 1.5 0 0 0-1.5 1.5v7A1.5 1.5 0 0 0 3 14h5v2H6.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5H12v-2h5a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 17 4H3Zm0 1.5h14v7H3v-7Z"
      clipRule="evenodd"
    />
  </svg>
);

// Icon shows the current choice; the label announces what the next click does.
// Cycle order: Light → Dark → System → Light.
const THEME_UI: Record<
  "light" | "dark" | "system",
  { Icon: () => ReactElement; nextLabel: string }
> = {
  light: { Icon: SunIcon, nextLabel: "Switch to dark mode" },
  dark: { Icon: MoonIcon, nextLabel: "Switch to system theme" },
  system: { Icon: MonitorIcon, nextLabel: "Switch to light mode" },
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [choice, , cycleTheme] = useTheme();
  const { Icon, nextLabel } = THEME_UI[choice];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "link-underline px-2 py-1 text-sm font-medium transition-colors",
      isActive
        ? "text-[color:var(--accent)]"
        : "text-[color:var(--ink-muted)] hover:text-[color:var(--accent)]",
    ].join(" ");

  return (
    <header
      className="sticky top-0 z-20 border-b backdrop-blur relative"
      style={{
        background: "var(--header-bg)",
        borderColor: "var(--soft-border)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          to="/"
          viewTransition
          onClick={() => setOpen(false)}
          className="text-xl tracking-wide"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          Martin Yordanov
        </Link>

        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {primaryNav.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  viewTransition
                  className={linkClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={cycleTheme}
            aria-label={nextLabel}
            className="inline-flex items-center justify-center rounded-md border p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)]"
            style={{
              borderColor: "var(--soft-border)",
              color: "var(--ink-muted)",
            }}
          >
            <Icon />
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)] md:hidden"
            style={{
              borderColor: "var(--soft-border)",
              color: "var(--ink-muted)",
            }}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`hamburger${open ? " is-open" : ""}`}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </span>
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-y shadow-lg md:hidden"
          style={{
            background: "var(--header-bg)",
            borderColor: "var(--soft-border)",
          }}
          aria-label="Primary mobile"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {primaryNav.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  viewTransition
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    [
                      "block py-2 text-base font-medium",
                      isActive
                        ? "text-[color:var(--accent)]"
                        : "text-[color:var(--ink-muted)]",
                    ].join(" ")
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
